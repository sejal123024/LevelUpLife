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

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $includeCompleted = isset($_GET['include_completed']) && $_GET['include_completed'] === 'true';
    $tasks = $task->getUserTasks($userData['id'], $includeCompleted);
    
    echo json_encode([
        'success' => true,
        'tasks' => $tasks
    ]);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->title) || !isset($data->category_id)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Title and category required']);
        exit();
    }

    $newTask = $task->create(
        $userData['id'],
        $data->category_id,
        $data->title,
        $data->description ?? null,
        $data->xp_reward ?? 10,
        $data->coin_reward ?? 5
    );

    if ($newTask) {
        echo json_encode([
            'success' => true,
            'message' => 'Task created',
            'task' => $newTask
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to create task']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
