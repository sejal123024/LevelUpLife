<?php
require_once '../config/database.php';
require_once '../config/firebase.php';
require_once '../models/User.php';
require_once '../models/Reward.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);
$reward = new Reward($db);

$token = FirebaseAuth::getAuthHeader();
$firebaseUser = FirebaseAuth::verifyToken($token);

if (!$firebaseUser) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$userData = $user->getByFirebaseUid($firebaseUser['uid']);
if (!$userData) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'User not found']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $allRewards = $reward->getAll();
    $userRewards = $reward->getUserRewards($userData['id']);
    
    echo json_encode([
        'success' => true,
        'rewards' => $allRewards,
        'user_rewards' => $userRewards
    ]);
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
