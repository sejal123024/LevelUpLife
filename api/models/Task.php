<?php
class Task {
    private $conn;
    private $table = 'tasks';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($userId, $categoryId, $title, $description = null, $xpReward = 10, $coinReward = 5) {
        $query = "INSERT INTO " . $this->table . " 
                 (user_id, category_id, title, description, xp_reward, coin_reward) 
                 VALUES (:user_id, :category_id, :title, :description, :xp_reward, :coin_reward)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':category_id', $categoryId);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':xp_reward', $xpReward);
        $stmt->bindParam(':coin_reward', $coinReward);
        
        if ($stmt->execute()) {
            return $this->getById($this->conn->lastInsertId());
        }
        return false;
    }

    public function getById($id) {
        $query = "SELECT t.*, tc.name as category_name, tc.icon as category_icon, tc.color as category_color 
                  FROM " . $this->table . " t
                  LEFT JOIN task_categories tc ON t.category_id = tc.id
                  WHERE t.id = :id LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getUserTasks($userId, $includeCompleted = false) {
        $completedFilter = $includeCompleted ? "" : "AND t.is_completed = 0";
        
        $query = "SELECT t.*, tc.name as category_name, tc.icon as category_icon, tc.color as category_color 
                  FROM " . $this->table . " t
                  LEFT JOIN task_categories tc ON t.category_id = tc.id
                  WHERE t.user_id = :user_id AND t.is_active = 1 $completedFilter
                  ORDER BY t.created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function completeTask($taskId, $userId) {
        $task = $this->getById($taskId);
        
        if (!$task || $task['user_id'] != $userId) {
            return ['success' => false, 'message' => 'Task not found'];
        }

        if ($task['is_completed']) {
            return ['success' => false, 'message' => 'Task already completed'];
        }

        // Calculate streak bonus
        $streakBonus = 0;
        if ($task['streak_count'] >= 5) {
            $streakBonus = 10;
        }

        $totalXP = $task['xp_reward'] + $streakBonus;
        $totalCoins = $task['coin_reward'];

        // Mark task as completed
        $query = "UPDATE " . $this->table . " 
                 SET is_completed = 1, 
                     completed_at = CURRENT_TIMESTAMP,
                     streak_count = streak_count + 1,
                     streak_bonus_xp = :streak_bonus
                 WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':streak_bonus', $streakBonus);
        $stmt->bindParam(':id', $taskId);
        $stmt->execute();

        // Record completion
        $query = "INSERT INTO task_completions 
                 (task_id, user_id, xp_earned, coins_earned, streak_bonus, completed_date) 
                 VALUES (:task_id, :user_id, :xp_earned, :coins_earned, :streak_bonus, CURDATE())";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':task_id', $taskId);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':xp_earned', $totalXP);
        $stmt->bindParam(':coins_earned', $totalCoins);
        $stmt->bindParam(':streak_bonus', $streakBonus);
        $stmt->execute();

        return [
            'success' => true,
            'xp_earned' => $totalXP,
            'coins_earned' => $totalCoins,
            'streak_bonus' => $streakBonus
        ];
    }

    public function update($taskId, $userId, $data) {
        $task = $this->getById($taskId);
        
        if (!$task || $task['user_id'] != $userId) {
            return false;
        }

        $fields = [];
        $params = [':id' => $taskId];

        if (isset($data['title'])) {
            $fields[] = "title = :title";
            $params[':title'] = $data['title'];
        }
        if (isset($data['description'])) {
            $fields[] = "description = :description";
            $params[':description'] = $data['description'];
        }
        if (isset($data['category_id'])) {
            $fields[] = "category_id = :category_id";
            $params[':category_id'] = $data['category_id'];
        }
        if (isset($data['xp_reward'])) {
            $fields[] = "xp_reward = :xp_reward";
            $params[':xp_reward'] = $data['xp_reward'];
        }
        if (isset($data['coin_reward'])) {
            $fields[] = "coin_reward = :coin_reward";
            $params[':coin_reward'] = $data['coin_reward'];
        }

        if (empty($fields)) return false;

        $query = "UPDATE " . $this->table . " SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        return $stmt->execute();
    }

    public function delete($taskId, $userId) {
        $task = $this->getById($taskId);
        
        if (!$task || $task['user_id'] != $userId) {
            return false;
        }

        $query = "UPDATE " . $this->table . " SET is_active = 0 WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $taskId);
        return $stmt->execute();
    }

    public function resetDailyTasks($userId) {
        $query = "UPDATE " . $this->table . " 
                 SET is_completed = 0, completed_at = NULL 
                 WHERE user_id = :user_id AND is_daily = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        return $stmt->execute();
    }

    public function getCategories() {
        $query = "SELECT * FROM task_categories WHERE is_default = 1 ORDER BY id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
