<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT quote, author FROM motivational_quotes WHERE is_active = 1 ORDER BY RAND() LIMIT 1";
$stmt = $db->prepare($query);
$stmt->execute();
$quote = $stmt->fetch();

if ($quote) {
    echo json_encode([
        'success' => true,
        'quote' => $quote
    ]);
} else {
    echo json_encode([
        'success' => true,
        'quote' => [
            'quote' => 'Every day is a new opportunity to level up!',
            'author' => 'Level Up Life'
        ]
    ]);
}
