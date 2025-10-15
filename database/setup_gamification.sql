-- ============================================
-- GAMIFICATION SETUP - SAFE VERSION
-- Run this file to add gamification features
-- ============================================

USE leveluplife;

-- ============================================
-- STEP 1: Update Users Table
-- ============================================

-- Check if columns exist before adding
SET @query1 = IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'leveluplife' 
     AND TABLE_NAME = 'users' 
     AND COLUMN_NAME = 'combo_count') = 0,
    'ALTER TABLE users ADD COLUMN combo_count INT DEFAULT 0 AFTER longest_streak',
    'SELECT "Column combo_count already exists" AS Info'
);
PREPARE stmt1 FROM @query1;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

SET @query2 = IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'leveluplife' 
     AND TABLE_NAME = 'users' 
     AND COLUMN_NAME = 'combo_multiplier') = 0,
    'ALTER TABLE users ADD COLUMN combo_multiplier DECIMAL(3,2) DEFAULT 1.0 AFTER combo_count',
    'SELECT "Column combo_multiplier already exists" AS Info'
);
PREPARE stmt2 FROM @query2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

SET @query3 = IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'leveluplife' 
     AND TABLE_NAME = 'users' 
     AND COLUMN_NAME = 'total_tasks_completed') = 0,
    'ALTER TABLE users ADD COLUMN total_tasks_completed INT DEFAULT 0 AFTER combo_multiplier',
    'SELECT "Column total_tasks_completed already exists" AS Info'
);
PREPARE stmt3 FROM @query3;
EXECUTE stmt3;
DEALLOCATE PREPARE stmt3;

-- ============================================
-- STEP 2: Update Tasks Table
-- ============================================

SET @query4 = IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'leveluplife' 
     AND TABLE_NAME = 'tasks' 
     AND COLUMN_NAME = 'difficulty') = 0,
    'ALTER TABLE tasks ADD COLUMN difficulty ENUM(''easy'', ''medium'', ''hard'', ''legendary'') DEFAULT ''medium'' AFTER coin_reward',
    'SELECT "Column difficulty already exists" AS Info'
);
PREPARE stmt4 FROM @query4;
EXECUTE stmt4;
DEALLOCATE PREPARE stmt4;

SET @query5 = IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'leveluplife' 
     AND TABLE_NAME = 'tasks' 
     AND COLUMN_NAME = 'task_type') = 0,
    'ALTER TABLE tasks ADD COLUMN task_type ENUM(''daily'', ''weekly'', ''one_time'') DEFAULT ''daily'' AFTER difficulty',
    'SELECT "Column task_type already exists" AS Info'
);
PREPARE stmt5 FROM @query5;
EXECUTE stmt5;
DEALLOCATE PREPARE stmt5;

SET @query6 = IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'leveluplife' 
     AND TABLE_NAME = 'tasks' 
     AND COLUMN_NAME = 'priority') = 0,
    'ALTER TABLE tasks ADD COLUMN priority INT DEFAULT 0 AFTER task_type',
    'SELECT "Column priority already exists" AS Info'
);
PREPARE stmt6 FROM @query6;
EXECUTE stmt6;
DEALLOCATE PREPARE stmt6;

SET @query7 = IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'leveluplife' 
     AND TABLE_NAME = 'tasks' 
     AND COLUMN_NAME = 'tags') = 0,
    'ALTER TABLE tasks ADD COLUMN tags JSON AFTER priority',
    'SELECT "Column tags already exists" AS Info'
);
PREPARE stmt7 FROM @query7;
EXECUTE stmt7;
DEALLOCATE PREPARE stmt7;

-- ============================================
-- STEP 3: Create Daily Challenges Table
-- ============================================

CREATE TABLE IF NOT EXISTS daily_challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT '🎯',
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    xp_reward INT NOT NULL,
    coin_reward INT NOT NULL,
    bonus_multiplier DECIMAL(3,2) DEFAULT 1.0,
    requirement_type ENUM('complete_tasks', 'earn_xp', 'maintain_streak', 'login') NOT NULL,
    requirement_value INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_difficulty (difficulty),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STEP 4: Create User Daily Challenges Table
-- ============================================

CREATE TABLE IF NOT EXISTS user_daily_challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    challenge_id INT NOT NULL,
    progress INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    challenge_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_challenge_id (challenge_id),
    INDEX idx_challenge_date (challenge_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STEP 5: Create Power-Ups Table
-- ============================================

CREATE TABLE IF NOT EXISTS power_ups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT '⚡',
    type ENUM('xp_boost', 'coin_boost', 'streak_freeze', 'double_rewards') NOT NULL,
    multiplier DECIMAL(3,2) DEFAULT 1.0,
    duration_hours INT DEFAULT 24,
    coin_cost INT NOT NULL,
    level_required INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STEP 6: Create User Power-Ups Table
-- ============================================

CREATE TABLE IF NOT EXISTS user_power_ups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    power_up_id INT NOT NULL,
    activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_user_id (user_id),
    INDEX idx_power_up_id (power_up_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STEP 7: Create Quests Table
-- ============================================

CREATE TABLE IF NOT EXISTS quests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT '🗺️',
    quest_type ENUM('daily', 'weekly', 'special') NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard', 'legendary') DEFAULT 'medium',
    xp_reward INT NOT NULL,
    coin_reward INT NOT NULL,
    bonus_reward TEXT,
    start_date DATE,
    end_date DATE,
    requirements JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_quest_type (quest_type),
    INDEX idx_difficulty (difficulty),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STEP 8: Create User Quests Table
-- ============================================

CREATE TABLE IF NOT EXISTS user_quests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quest_id INT NOT NULL,
    progress JSON,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_quest_id (quest_id),
    INDEX idx_is_completed (is_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STEP 9: Create Leaderboard Table
-- ============================================

CREATE TABLE IF NOT EXISTS leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    period ENUM('daily', 'weekly', 'monthly', 'all_time') NOT NULL,
    xp_earned INT DEFAULT 0,
    tasks_completed INT DEFAULT 0,
    rank_position INT,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_period (period),
    INDEX idx_rank (rank_position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STEP 10: Insert Default Data
-- ============================================

-- Insert Daily Challenges
INSERT IGNORE INTO daily_challenges (id, title, description, icon, difficulty, xp_reward, coin_reward, bonus_multiplier, requirement_type, requirement_value) VALUES
(1, 'Quick Start', 'Complete 3 tasks today', '⚡', 'easy', 30, 15, 1.2, 'complete_tasks', 3),
(2, 'Daily Grind', 'Complete 5 tasks today', '💪', 'medium', 50, 25, 1.5, 'complete_tasks', 5),
(3, 'Overachiever', 'Complete 10 tasks today', '🏆', 'hard', 100, 50, 2.0, 'complete_tasks', 10),
(4, 'XP Hunter', 'Earn 50 XP today', '⭐', 'easy', 25, 10, 1.2, 'earn_xp', 50),
(5, 'XP Master', 'Earn 100 XP today', '🌟', 'medium', 50, 20, 1.5, 'earn_xp', 100),
(6, 'Streak Keeper', 'Maintain your daily streak', '🔥', 'easy', 20, 10, 1.1, 'maintain_streak', 1),
(7, 'Daily Warrior', 'Log in and complete at least 1 task', '⚔️', 'easy', 15, 5, 1.0, 'login', 1);

-- Insert Power-Ups
INSERT IGNORE INTO power_ups (id, name, description, icon, type, multiplier, duration_hours, coin_cost, level_required) VALUES
(1, 'XP Booster', 'Earn 1.5x XP for 24 hours', '⚡', 'xp_boost', 1.5, 24, 50, 1),
(2, 'Mega XP Booster', 'Earn 2x XP for 12 hours', '💫', 'xp_boost', 2.0, 12, 80, 3),
(3, 'Coin Magnet', 'Earn 1.5x coins for 24 hours', '💰', 'coin_boost', 1.5, 24, 50, 1),
(4, 'Double Trouble', 'Earn 2x coins for 12 hours', '💎', 'coin_boost', 2.0, 12, 80, 3),
(5, 'Streak Shield', 'Protect your streak for 24 hours', '🛡️', 'streak_freeze', 1.0, 24, 100, 2),
(6, 'Lucky Charm', 'Double all rewards for 6 hours', '🍀', 'double_rewards', 2.0, 6, 150, 5);

-- Insert Sample Quests
INSERT IGNORE INTO quests (id, title, description, icon, quest_type, difficulty, xp_reward, coin_reward, requirements) VALUES
(1, 'Weekend Warrior', 'Complete 15 tasks this weekend', '⚔️', 'weekly', 'medium', 150, 75, '{"tasks_completed": 15}'),
(2, 'Streak Master', 'Maintain a 7-day streak', '🔥', 'weekly', 'hard', 200, 100, '{"streak_days": 7}'),
(3, 'Category Champion', 'Complete 5 tasks in each category', '🏆', 'weekly', 'hard', 250, 125, '{"categories_completed": 5}'),
(4, 'Morning Routine', 'Complete 3 tasks before 10 AM for 5 days', '🌅', 'weekly', 'medium', 100, 50, '{"morning_tasks": 15}');

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '✅ Gamification features installed successfully!' AS Status;
SELECT 'Run the app and check /tasks, /challenges, and /achievements pages' AS NextStep;
