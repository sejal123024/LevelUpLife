<?php
require_once '../config/database.php';
require_once '../config/firebase.php';
require_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->idToken)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID token required']);
    exit();
}

$firebaseUser = FirebaseAuth::verifyToken($data->idToken);

if (!$firebaseUser) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid token']);
    exit();
}

$userData = $user->createOrUpdate(
    $firebaseUser['uid'],
    $firebaseUser['email'],
    $firebaseUser['name'],
    $firebaseUser['picture']
);

if ($userData) {
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => $userData
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to create/update user']);
}
