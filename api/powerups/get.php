<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once '../config/database.php';
require_once '../config/firebase.php';
require_once '../models/PowerUp.php';

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
    $query = "SELECT id FROM users WHERE firebase_uid = :firebase_uid LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':firebase_uid', $firebaseUid);
    $stmt->execute();
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }

    // Get power-ups
    $powerUpModel = new PowerUp($db);
    $powerUps = $powerUpModel->getAll();
    $activePowerUps = $powerUpModel->getUserActivePowerUps($user['id']);

    echo json_encode([
        'success' => true,
        'power_ups' => $powerUps,
        'active_power_ups' => $activePowerUps
    ]);

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid token: ' . $e->getMessage()]);
}
