<?php
require_once '../config/database.php';
require_once '../models/Task.php';

$database = new Database();
$db = $database->getConnection();
$task = new Task($db);

$categories = $task->getCategories();

echo json_encode([
    'success' => true,
    'categories' => $categories
]);
