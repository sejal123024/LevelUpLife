<?php
class PowerUp {
    private $conn;
    private $table = 'power_ups';
    private $userPowerUpsTable = 'user_power_ups';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table . " WHERE is_active = 1 ORDER BY coin_cost";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getUserActivePowerUps($userId) {
        $query = "SELECT upu.*, pu.name, pu.icon, pu.type, pu.multiplier, pu.description
                  FROM " . $this->userPowerUpsTable . " upu
                  JOIN " . $this->table . " pu ON upu.power_up_id = pu.id
                  WHERE upu.user_id = :user_id 
                    AND upu.is_active = 1 
                    AND upu.expires_at > NOW()
                  ORDER BY upu.expires_at";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function activatePowerUp($userId, $powerUpId) {
        $powerUp = $this->getById($powerUpId);
        
        if (!$powerUp) {
            return ['success' => false, 'message' => 'Power-up not found'];
        }

        // Calculate expiration time
        $expiresAt = date('Y-m-d H:i:s', strtotime("+{$powerUp['duration_hours']} hours"));

        // Insert active power-up
        $query = "INSERT INTO " . $this->userPowerUpsTable . " 
                  (user_id, power_up_id, expires_at) 
                  VALUES (:user_id, :power_up_id, :expires_at)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':power_up_id', $powerUpId);
        $stmt->bindParam(':expires_at', $expiresAt);
        
        if ($stmt->execute()) {
            return [
                'success' => true,
                'power_up' => $powerUp,
                'expires_at' => $expiresAt
            ];
        }

        return ['success' => false, 'message' => 'Failed to activate power-up'];
    }

    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getActiveMultipliers($userId) {
        $multipliers = [
            'xp' => 1.0,
            'coins' => 1.0
        ];

        $activePowerUps = $this->getUserActivePowerUps($userId);
        
        foreach ($activePowerUps as $powerUp) {
            switch ($powerUp['type']) {
                case 'xp_boost':
                    $multipliers['xp'] = max($multipliers['xp'], $powerUp['multiplier']);
                    break;
                case 'coin_boost':
                    $multipliers['coins'] = max($multipliers['coins'], $powerUp['multiplier']);
                    break;
                case 'double_rewards':
                    $multipliers['xp'] = max($multipliers['xp'], $powerUp['multiplier']);
                    $multipliers['coins'] = max($multipliers['coins'], $powerUp['multiplier']);
                    break;
            }
        }

        return $multipliers;
    }

    public function deactivateExpired() {
        $query = "UPDATE " . $this->userPowerUpsTable . " 
                  SET is_active = 0 
                  WHERE expires_at <= NOW() AND is_active = 1";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute();
    }
}
