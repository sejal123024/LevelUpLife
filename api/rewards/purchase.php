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

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->reward_id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Reward ID required']);
    exit();
}

$result = $reward->purchaseReward(
    $userData['id'],
    $data->reward_id,
    $userData['coins'],
    $userData['level']
);

if ($result['success']) {
    $updatedUser = $user->getById($userData['id']);
    $result['user'] = $updatedUser;
}

echo json_encode($result);
