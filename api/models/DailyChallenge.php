<?php
class DailyChallenge {
    private $conn;
    private $table = 'daily_challenges';
    private $userChallengesTable = 'user_daily_challenges';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getTodaysChallenges($userId) {
        $today = date('Y-m-d');
        
        // Get all active challenges with user progress
        $query = "SELECT 
                    dc.*,
                    COALESCE(udc.progress, 0) as user_progress,
                    COALESCE(udc.is_completed, 0) as is_completed,
                    udc.completed_at
                  FROM " . $this->table . " dc
                  LEFT JOIN " . $this->userChallengesTable . " udc 
                    ON dc.id = udc.challenge_id 
                    AND udc.user_id = :user_id 
                    AND udc.challenge_date = :today
                  WHERE dc.is_active = 1
                  ORDER BY dc.difficulty, dc.xp_reward";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':today', $today);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }

    public function updateProgress($userId, $challengeId, $incrementBy = 1) {
        $today = date('Y-m-d');
        
        // Get challenge details
        $challenge = $this->getChallengeById($challengeId);
        if (!$challenge) return false;

        // Check if user challenge record exists
        $query = "INSERT INTO " . $this->userChallengesTable . " 
                  (user_id, challenge_id, progress, challenge_date) 
                  VALUES (:user_id, :challenge_id, :progress, :today)
                  ON DUPLICATE KEY UPDATE 
                  progress = progress + :progress";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':challenge_id', $challengeId);
        $stmt->bindParam(':progress', $incrementBy);
        $stmt->bindParam(':today', $today);
        $stmt->execute();

        // Check if challenge is now completed
        $query = "SELECT progress FROM " . $this->userChallengesTable . " 
                  WHERE user_id = :user_id AND challenge_id = :challenge_id AND challenge_date = :today";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':challenge_id', $challengeId);
        $stmt->bindParam(':today', $today);
        $stmt->execute();
        $result = $stmt->fetch();

        if ($result && $result['progress'] >= $challenge['requirement_value']) {
            return $this->completeChallenge($userId, $challengeId);
        }

        return ['success' => true, 'completed' => false];
    }

    public function completeChallenge($userId, $challengeId) {
        $today = date('Y-m-d');
        $challenge = $this->getChallengeById($challengeId);
        
        if (!$challenge) {
            return ['success' => false, 'message' => 'Challenge not found'];
        }

        // Mark challenge as completed
        $query = "UPDATE " . $this->userChallengesTable . " 
                  SET is_completed = 1, completed_at = CURRENT_TIMESTAMP 
                  WHERE user_id = :user_id AND challenge_id = :challenge_id AND challenge_date = :today";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':challenge_id', $challengeId);
        $stmt->bindParam(':today', $today);
        $stmt->execute();

        // Award rewards
        $xpReward = $challenge['xp_reward'];
        $coinReward = $challenge['coin_reward'];

        return [
            'success' => true,
            'completed' => true,
            'xp_earned' => $xpReward,
            'coins_earned' => $coinReward,
            'challenge' => $challenge
        ];
    }

    public function getChallengeById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function checkAndUpdateChallenges($userId, $type, $value = 1) {
        $today = date('Y-m-d');
        $completedChallenges = [];

        // Get relevant challenges
        $query = "SELECT dc.* FROM " . $this->table . " dc
                  LEFT JOIN " . $this->userChallengesTable . " udc 
                    ON dc.id = udc.challenge_id 
                    AND udc.user_id = :user_id 
                    AND udc.challenge_date = :today
                  WHERE dc.requirement_type = :type 
                    AND dc.is_active = 1 
                    AND (udc.is_completed IS NULL OR udc.is_completed = 0)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':today', $today);
        $stmt->bindParam(':type', $type);
        $stmt->execute();
        $challenges = $stmt->fetchAll();

        foreach ($challenges as $challenge) {
            $result = $this->updateProgress($userId, $challenge['id'], $value);
            if ($result['completed']) {
                $completedChallenges[] = $result;
            }
        }

        return $completedChallenges;
    }
}
