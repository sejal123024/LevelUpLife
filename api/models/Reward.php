<?php
class Reward {
    private $conn;
    private $table = 'rewards';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table . " WHERE is_active = 1 ORDER BY coin_cost ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getUserRewards($userId) {
        $query = "SELECT r.*, ur.purchased_at 
                  FROM user_rewards ur
                  JOIN " . $this->table . " r ON ur.reward_id = r.id
                  WHERE ur.user_id = :user_id
                  ORDER BY ur.purchased_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function purchaseReward($userId, $rewardId, $userCoins, $userLevel) {
        $reward = $this->getById($rewardId);
        
        if (!$reward) {
            return ['success' => false, 'message' => 'Reward not found'];
        }

        // Check if already purchased
        $query = "SELECT id FROM user_rewards WHERE user_id = :user_id AND reward_id = :reward_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':reward_id', $rewardId);
        $stmt->execute();
        
        if ($stmt->fetch()) {
            return ['success' => false, 'message' => 'Already purchased'];
        }

        // Check level requirement
        if ($userLevel < $reward['level_required']) {
            return ['success' => false, 'message' => 'Level requirement not met'];
        }

        // Check coins
        if ($userCoins < $reward['coin_cost']) {
            return ['success' => false, 'message' => 'Not enough coins'];
        }

        // Purchase reward
        $query = "INSERT INTO user_rewards (user_id, reward_id) VALUES (:user_id, :reward_id)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':reward_id', $rewardId);
        
        if ($stmt->execute()) {
            // Deduct coins
            $query = "UPDATE users SET coins = coins - :cost WHERE id = :user_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':cost', $reward['coin_cost']);
            $stmt->bindParam(':user_id', $userId);
            $stmt->execute();

            return [
                'success' => true,
                'message' => 'Reward purchased successfully',
                'reward' => $reward
            ];
        }

        return ['success' => false, 'message' => 'Purchase failed'];
    }

    public function create($data) {
        $query = "INSERT INTO " . $this->table . " 
                 (name, description, type, coin_cost, level_required, image_url, voucher_code) 
                 VALUES (:name, :description, :type, :coin_cost, :level_required, :image_url, :voucher_code)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':type', $data['type']);
        $stmt->bindParam(':coin_cost', $data['coin_cost']);
        $stmt->bindParam(':level_required', $data['level_required']);
        $stmt->bindParam(':image_url', $data['image_url']);
        $stmt->bindParam(':voucher_code', $data['voucher_code']);
        
        return $stmt->execute();
    }

    public function update($id, $data) {
        $fields = [];
        $params = [':id' => $id];

        $allowedFields = ['name', 'description', 'type', 'coin_cost', 'level_required', 'image_url', 'voucher_code'];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $params[":$field"] = $data[$field];
            }
        }

        if (empty($fields)) return false;

        $query = "UPDATE " . $this->table . " SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        return $stmt->execute();
    }

    public function delete($id) {
        $query = "UPDATE " . $this->table . " SET is_active = 0 WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
