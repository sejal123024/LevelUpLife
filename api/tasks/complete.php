<?php
require_once '../config/database.php';
require_once '../config/firebase.php';
require_once '../models/User.php';
require_once '../models/Task.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);
$task = new Task($db);

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

if (!isset($data->task_id)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Task ID required']);
    exit();
}

// Complete the task
$result = $task->completeTask($data->task_id, $userData['id']);

if (!$result['success']) {
    http_response_code(400);
    echo json_encode($result);
    exit();
}

// Check daily XP limit
$xpCheck = $user->checkDailyXPLimit($userData['id'], $result['xp_earned']);

if (!$xpCheck['allowed']) {
    http_response_code(400);
    echo json_encode($xpCheck);
    exit();
}

// Update XP and level
$xpResult = $user->updateXP($userData['id'], $result['xp_earned']);

// Update coins
$user->updateCoins($userData['id'], $result['coins_earned']);

// Update streak
$streakResult = $user->updateStreak($userData['id']);

// Get updated user data
$updatedUser = $user->getById($userData['id']);

echo json_encode([
    'success' => true,
    'message' => 'Task completed',
    'xp_earned' => $result['xp_earned'],
    'coins_earned' => $result['coins_earned'],
    'streak_bonus' => $result['streak_bonus'],
    'leveled_up' => $xpResult['leveled_up'],
    'new_level' => $xpResult['new_level'],
    'current_streak' => $streakResult['current_streak'],
    'user' => $updatedUser
]);
