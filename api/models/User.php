<?php
class User {
    private $conn;
    private $table = 'users';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createOrUpdate($firebase_uid, $email, $display_name = null, $photo_url = null) {
        // Check if user exists
        $user = $this->getByFirebaseUid($firebase_uid);
        
        if ($user) {
            // Update existing user - only update display_name if provided and different
            $updateName = $display_name && ($user['display_name'] !== $display_name);
            $updatePhoto = $photo_url && ($user['photo_url'] !== $photo_url);
            
            // Always update email in case it changed
            $query = "UPDATE " . $this->table . " 
                     SET email = :email";
            
            // Add display_name to update if provided
            if ($updateName) {
                $query .= ", display_name = :display_name";
            }
            
            // Add photo_url to update if provided
            if ($updatePhoto) {
                $query .= ", photo_url = :photo_url";
            }
            
            $query .= ", updated_at = CURRENT_TIMESTAMP WHERE firebase_uid = :firebase_uid";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':firebase_uid', $firebase_uid);
            $stmt->bindParam(':email', $email);
            
            if ($updateName) {
                $stmt->bindParam(':display_name', $display_name);
            }
            if ($updatePhoto) {
                $stmt->bindParam(':photo_url', $photo_url);
            }
            
            $stmt->execute();
            
            return $this->getByFirebaseUid($firebase_uid);
        } else {
            // Create new user - use provided name or extract from email
            if (!$display_name && $email) {
                $display_name = explode('@', $email)[0];
            }
            
            $query = "INSERT INTO " . $this->table . " 
                     (firebase_uid, email, display_name, photo_url) 
                     VALUES (:firebase_uid, :email, :display_name, :photo_url)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':firebase_uid', $firebase_uid);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':display_name', $display_name);
            $stmt->bindParam(':photo_url', $photo_url);
            
            if ($stmt->execute()) {
                // Create default user settings
                $userId = $this->conn->lastInsertId();
                $this->createDefaultSettings($userId);
                return $this->getByFirebaseUid($firebase_uid);
            }
            return false;
        }
    }

    private function createDefaultSettings($userId) {
        $query = "INSERT INTO user_settings (user_id) VALUES (:user_id)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
    }

    public function getByFirebaseUid($firebase_uid) {
        $query = "SELECT * FROM " . $this->table . " WHERE firebase_uid = :firebase_uid LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':firebase_uid', $firebase_uid);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function updateXP($userId, $xpToAdd) {
        $user = $this->getById($userId);
        if (!$user) return false;

        $newXP = $user['xp'] + $xpToAdd;
        $newLevel = floor($newXP / 100) + 1;
        $leveledUp = $newLevel > $user['level'];

        $query = "UPDATE " . $this->table . " 
                 SET xp = :xp, level = :level 
                 WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':xp', $newXP);
        $stmt->bindParam(':level', $newLevel);
        $stmt->bindParam(':id', $userId);
        $stmt->execute();

        return [
            'leveled_up' => $leveledUp,
            'new_level' => $newLevel,
            'new_xp' => $newXP
        ];
    }

    public function updateCoins($userId, $coins) {
        $query = "UPDATE " . $this->table . " 
                 SET coins = :coins 
                 WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':coins', $coins);
        $stmt->bindParam(':id', $userId);
        return $stmt->execute();
    }

    public function addCoins($userId, $coinsToAdd) {
        $query = "UPDATE " . $this->table . " 
                 SET coins = coins + :coins 
                 WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':coins', $coinsToAdd);
        $stmt->bindParam(':id', $userId);
        return $stmt->execute();
    }

    public function updateStreak($userId) {
        $user = $this->getById($userId);
        if (!$user) return false;

        $today = date('Y-m-d');
        $lastActivity = $user['last_activity_date'];

        if ($lastActivity === $today) {
            // Already updated today
            return ['streak_updated' => false, 'current_streak' => $user['current_streak']];
        }

        $yesterday = date('Y-m-d', strtotime('-1 day'));
        
        if ($lastActivity === $yesterday) {
            // Continue streak
            $newStreak = $user['current_streak'] + 1;
            $longestStreak = max($user['longest_streak'], $newStreak);
        } else {
            // Streak broken, reset to 1
            $newStreak = 1;
            $longestStreak = $user['longest_streak'];
        }

        $query = "UPDATE " . $this->table . " 
                 SET current_streak = :current_streak,
                     longest_streak = :longest_streak,
                     last_activity_date = :today,
                     daily_xp_earned = 0
                 WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':current_streak', $newStreak);
        $stmt->bindParam(':longest_streak', $longestStreak);
        $stmt->bindParam(':today', $today);
        $stmt->bindParam(':id', $userId);
        $stmt->execute();

        return [
            'streak_updated' => true,
            'current_streak' => $newStreak,
            'longest_streak' => $longestStreak
        ];
    }

    public function checkDailyXPLimit($userId, $xpToAdd) {
        $user = $this->getById($userId);
        if (!$user) return false;

        $today = date('Y-m-d');
        if ($user['last_activity_date'] !== $today) {
            // Reset daily XP
            $query = "UPDATE " . $this->table . " 
                     SET daily_xp_earned = 0, last_activity_date = :today 
                     WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':today', $today);
            $stmt->bindParam(':id', $userId);
            $stmt->execute();
            $user['daily_xp_earned'] = 0;
        }

        $newDailyXP = $user['daily_xp_earned'] + $xpToAdd;
        
        if ($newDailyXP > $user['daily_xp_limit']) {
            return [
                'allowed' => false,
                'message' => 'Daily XP limit reached',
                'remaining' => max(0, $user['daily_xp_limit'] - $user['daily_xp_earned'])
            ];
        }

        // Update daily XP
        $query = "UPDATE " . $this->table . " 
                 SET daily_xp_earned = :daily_xp 
                 WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':daily_xp', $newDailyXP);
        $stmt->bindParam(':id', $userId);
        $stmt->execute();

        return [
            'allowed' => true,
            'new_daily_xp' => $newDailyXP,
            'remaining' => $user['daily_xp_limit'] - $newDailyXP
        ];
    }

    public function getAllUsers($limit = 50, $offset = 0) {
        $query = "SELECT id, firebase_uid, email, display_name, xp, level, coins, 
                         current_streak, longest_streak, created_at 
                  FROM " . $this->table . " 
                  ORDER BY level DESC, xp DESC 
                  LIMIT :limit OFFSET :offset";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function updateProfile($userId, $data) {
        $fields = [];
        $params = [':id' => $userId];

        if (isset($data['display_name'])) {
            $fields[] = "display_name = :display_name";
            $params[':display_name'] = $data['display_name'];
        }
        if (isset($data['theme'])) {
            $fields[] = "theme = :theme";
            $params[':theme'] = $data['theme'];
        }
        if (isset($data['selected_avatar'])) {
            $fields[] = "selected_avatar = :selected_avatar";
            $params[':selected_avatar'] = $data['selected_avatar'];
        }

        if (empty($fields)) return false;

        $query = "UPDATE " . $this->table . " SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        return $stmt->execute();
    }
}
