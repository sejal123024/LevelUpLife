<?php
require_once '../config/database.php';
require_once '../config/firebase.php';
require_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$token = FirebaseAuth::getAuthHeader();
$firebaseUser = FirebaseAuth::verifyToken($token);

if (!$firebaseUser) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $userData = $user->getByFirebaseUid($firebaseUser['uid']);
    
    if ($userData) {
        echo json_encode([
            'success' => true,
            'user' => $userData
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    $userData = $user->getByFirebaseUid($firebaseUser['uid']);
    
    if (!$userData) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }

    $updateData = [];
    if (isset($data->display_name)) $updateData['display_name'] = $data->display_name;
    if (isset($data->theme)) $updateData['theme'] = $data->theme;
    if (isset($data->selected_avatar)) $updateData['selected_avatar'] = $data->selected_avatar;

    if ($user->updateProfile($userData['id'], $updateData)) {
        $updatedUser = $user->getById($userData['id']);
        echo json_encode([
            'success' => true,
            'message' => 'Profile updated',
            'user' => $updatedUser
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Update failed']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
