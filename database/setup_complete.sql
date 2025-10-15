-- ============================================
-- COMPLETE DATABASE SETUP FOR LEVELUPLIFE
-- ============================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS leveluplife CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE leveluplife;

-- ============================================
-- CORE TABLES
-- ============================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    photo_url TEXT,
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    coins INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    combo_count INT DEFAULT 0,
    combo_multiplier DECIMAL(3,2) DEFAULT 1.0,
    total_tasks_completed INT DEFAULT 0,
    daily_xp_earned INT DEFAULT 0,
    daily_xp_limit INT DEFAULT 100,
    last_login_date DATE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_firebase_uid (firebase_uid),
    INDEX idx_email (email),
    INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    xp_reward INT DEFAULT 10,
    coin_reward INT DEFAULT 5,
    difficulty ENUM('easy', 'medium', 'hard', 'legendary') DEFAULT 'medium',
    task_type ENUM('daily', 'weekly', 'one_time') DEFAULT 'daily',
    priority INT DEFAULT 0,
    tags JSON,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_category (category),
    INDEX idx_is_completed (is_completed),
    INDEX idx_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Rewards Table
CREATE TABLE IF NOT EXISTS rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT '🎁',
    type ENUM('badge', 'avatar', 'theme', 'power_up', 'special') DEFAULT 'badge',
    coin_cost INT NOT NULL,
    xp_requirement INT DEFAULT 0,
    level_requirement INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Rewards Table
CREATE TABLE IF NOT EXISTS user_rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reward_id INT NOT NULL,
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_equipped BOOLEAN DEFAULT FALSE,
    INDEX idx_user_id (user_id),
    INDEX idx_reward_id (reward_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT '🏆',
    requirement_type ENUM('xp', 'level', 'streak', 'tasks_completed') NOT NULL,
    requirement_value INT NOT NULL,
    reward_coins INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_requirement_type (requirement_type),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    achievement_id INT NOT NULL,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_achievement_id (achievement_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Motivational Quotes Table
CREATE TABLE IF NOT EXISTS motivational_quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Daily Challenges Table
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

-- User Daily Challenges Table
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

-- Power-Ups Table
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

-- User Power-Ups Table
CREATE TABLE IF NOT EXISTS user_power_ups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    power_up_id INT NOT NULL,
    activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_user_id (user_id),
    INDEX idx_power_up_id (power_up_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quests Table
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

-- User Quests Table
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

-- Leaderboard Table
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
-- INSERT DEFAULT DATA
-- ============================================

-- Insert Motivational Quotes
INSERT IGNORE INTO motivational_quotes (id, quote, author) VALUES
(1, 'The secret of getting ahead is getting started.', 'Mark Twain'),
(2, 'Success is the sum of small efforts repeated day in and day out.', 'Robert Collier'),
(3, 'Don\'t watch the clock; do what it does. Keep going.', 'Sam Levenson'),
(4, 'The future depends on what you do today.', 'Mahatma Gandhi'),
(5, 'Believe you can and you\'re halfway there.', 'Theodore Roosevelt'),
(6, 'The only way to do great work is to love what you do.', 'Steve Jobs'),
(7, 'Your limitation—it\'s only your imagination.', 'Unknown'),
(8, 'Push yourself, because no one else is going to do it for you.', 'Unknown'),
(9, 'Great things never come from comfort zones.', 'Unknown'),
(10, 'Dream it. Wish it. Do it.', 'Unknown');

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

-- Insert Sample Achievements
INSERT IGNORE INTO achievements (id, name, description, icon, requirement_type, requirement_value, reward_coins) VALUES
(1, 'First Steps', 'Reach Level 2', '🌟', 'level', 2, 10),
(2, 'Rising Star', 'Reach Level 5', '⭐', 'level', 5, 25),
(3, 'Champion', 'Reach Level 10', '🏆', 'level', 10, 50),
(4, 'XP Collector', 'Earn 100 XP', '💎', 'xp', 100, 15),
(5, 'XP Master', 'Earn 500 XP', '💫', 'xp', 500, 50),
(6, 'Streak Starter', 'Maintain a 3-day streak', '🔥', 'streak', 3, 20),
(7, 'Streak Legend', 'Maintain a 7-day streak', '🔥🔥', 'streak', 7, 50),
(8, 'Task Beginner', 'Complete 10 tasks', '✅', 'tasks_completed', 10, 15),
(9, 'Task Master', 'Complete 50 tasks', '✅✅', 'tasks_completed', 50, 75),
(10, 'Task Legend', 'Complete 100 tasks', '✅✅✅', 'tasks_completed', 100, 150);

-- Insert Sample Rewards
INSERT IGNORE INTO rewards (id, name, description, icon, type, coin_cost, xp_requirement, level_requirement) VALUES
(1, 'Bronze Badge', 'Your first achievement badge', '🥉', 'badge', 50, 100, 1),
(2, 'Silver Badge', 'A shiny silver badge', '🥈', 'badge', 100, 500, 3),
(3, 'Gold Badge', 'The prestigious gold badge', '🥇', 'badge', 200, 1000, 5),
(4, 'Cool Avatar', 'A stylish avatar frame', '😎', 'avatar', 150, 300, 2),
(5, 'Epic Avatar', 'An epic avatar frame', '🦸', 'avatar', 300, 800, 4),
(6, 'Dark Theme', 'Unlock the dark theme', '🌙', 'theme', 100, 200, 1),
(7, 'Rainbow Theme', 'Colorful rainbow theme', '🌈', 'theme', 250, 600, 3);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '✅ Database and all tables created successfully!' AS Status;
SELECT 'You can now start the application!' AS NextStep;
