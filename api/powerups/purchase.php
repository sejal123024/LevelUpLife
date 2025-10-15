<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../config/firebase.php';
require_once '../models/PowerUp.php';
require_once '../models/User.php';

// Get authorization header
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (empty($authHeader)) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'No authorization token provided']);
    exit();
}

// Extract token
$token = str_replace('Bearer ', '', $authHeader);

try {
    // Verify Firebase token
    $verifiedIdToken = $auth->verifyIdToken($token);
    $firebaseUid = $verifiedIdToken->claims()->get('sub');

    // Get database connection
    $database = new Database();
    $db = $database->getConnection();

    // Get user from database
    $userModel = new User($db);
    $user = $userModel->getByFirebaseUid($firebaseUid);

    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }

    // Get request data
    $data = json_decode(file_get_contents("php://input"), true);
    $powerUpId = $data['power_up_id'] ?? null;

    if (!$powerUpId) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Power-up ID required']);
        exit();
    }

    $powerUpModel = new PowerUp($db);
    $powerUp = $powerUpModel->getById($powerUpId);

    if (!$powerUp) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Power-up not found']);
        exit();
    }

    // Check if user has enough coins
    if ($user['coins'] < $powerUp['coin_cost']) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Not enough coins']);
        exit();
    }

    // Check level requirement
    if ($user['level'] < $powerUp['level_required']) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Level requirement not met']);
        exit();
    }

    // Deduct coins
    $newCoins = $user['coins'] - $powerUp['coin_cost'];
    $userModel->updateCoins($user['id'], $newCoins);

    // Activate power-up
    $result = $powerUpModel->activatePowerUp($user['id'], $powerUpId);

    if ($result['success']) {
        // Get updated user data
        $updatedUser = $userModel->getById($user['id']);

        echo json_encode([
            'success' => true,
            'message' => 'Power-up activated!',
            'power_up' => $result['power_up'],
            'expires_at' => $result['expires_at'],
            'user' => $updatedUser
        ]);
    } else {
        http_response_code(500);
        echo json_encode($result);
    }

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid token: ' . $e->getMessage()]);
}
