-- ============================================
-- DENTAL HEALTH APP — DATABASE SCHEMA
-- Stack: MySQL
-- ============================================

CREATE DATABASE IF NOT EXISTS dental_health_app;
USE dental_health_app;

-- ============================================
-- ADMINS
-- ============================================

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ADMIN ACTIVITY LOGS
-- Tracks every admin action (open game, edit content, etc.)
-- ============================================

CREATE TABLE admin_activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,        -- e.g. 'OPEN_GAME', 'EDIT_VIDEO', 'CREATE_SESSION'
  description TEXT,                    -- extra detail about the action
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- ============================================
-- GAME SESSIONS
-- Each admin creates a session and gets a unique link
-- ============================================

CREATE TABLE game_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  session_name VARCHAR(150) NOT NULL,
  unique_token VARCHAR(64) NOT NULL UNIQUE,  -- used in the join URL
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- ============================================
-- PLAYERS
-- No login — just nickname + session link
-- ============================================

CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  nickname VARCHAR(80) NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

-- ============================================
-- CHECKPOINT ATTEMPTS
-- Records each player's attempts and score per checkpoint
-- ============================================

CREATE TABLE checkpoint_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  session_id INT NOT NULL,
  checkpoint_number TINYINT NOT NULL,   -- 1, 2, or 3
  attempts INT DEFAULT 0,               -- how many times they tried
  completed BOOLEAN DEFAULT FALSE,
  score INT DEFAULT 0,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

-- ============================================
-- PLAYER POSITIONS
-- Saves character x/y position on the map
-- ============================================

CREATE TABLE player_positions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL UNIQUE,        -- one position record per player
  pos_x FLOAT DEFAULT 100,
  pos_y FLOAT DEFAULT 100,
  last_checkpoint TINYINT DEFAULT 0,    -- 0 = not started, 1/2/3 = last completed
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

-- ============================================
-- CHECKPOINT VIDEOS
-- Admin can edit drive URL, title per checkpoint
-- ============================================

CREATE TABLE checkpoint_videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  checkpoint_number TINYINT NOT NULL UNIQUE,  -- 1, 2, or 3
  title VARCHAR(200) NOT NULL,
  drive_url VARCHAR(500) NOT NULL,            -- Google Drive /preview URL
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- QUIZ QUESTIONS
-- Kahoot-style quiz for Checkpoint 1
-- ============================================

CREATE TABLE quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_option CHAR(1) NOT NULL,     -- 'A', 'B', 'C', or 'D'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- CROSSWORD DATA
-- Words and clues for Checkpoint 2 crossword
-- ============================================

CREATE TABLE crossword_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(50) NOT NULL,
  clue TEXT NOT NULL,
  direction ENUM('across', 'down') NOT NULL,
  start_row INT NOT NULL,
  start_col INT NOT NULL
);

-- ============================================
-- LEARNING VIDEOS
-- Module 1 — YouTube videos, admin editable
-- ============================================

CREATE TABLE learning_videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  youtube_url VARCHAR(500) NOT NULL,
  order_num INT DEFAULT 0,             -- controls display order
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- FACTS
-- Did You Know? module — admin posts dental facts
-- ============================================

CREATE TABLE facts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_by INT NOT NULL,             -- which admin posted it
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE CASCADE
);

-- ============================================
-- CHAT MESSAGES
-- Private in-game chat between player and admin
-- ============================================

CREATE TABLE chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  session_id INT NOT NULL,
  sender_type ENUM('player', 'admin') NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

-- ============================================
-- EMAIL REMINDERS
-- Log of admin-to-admin reminder emails
-- ============================================

CREATE TABLE email_reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sent_by INT NOT NULL,                -- admin who sent it
  sent_to INT NOT NULL,                -- admin who received it
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sent_by) REFERENCES admins(id) ON DELETE CASCADE,
  FOREIGN KEY (sent_to) REFERENCES admins(id) ON DELETE CASCADE
);

-- ============================================
-- SEED: DEFAULT CHECKPOINT VIDEOS
-- ============================================

INSERT INTO checkpoint_videos (checkpoint_number, title, drive_url) VALUES
(1, 'Why Oral Health Matters', 'https://drive.google.com/file/d/1SpNTKbqcvIGNDroyRN3IENEfwZSd7G23/preview'),
(2, 'How Cavities Form', 'https://drive.google.com/file/d/10xh-X7aH3kjSewqWq_QtrJ13hOE69_Vp/preview'),
(3, 'How to Brush Properly', 'https://drive.google.com/file/d/1X9DA2aZL3oHsJpXHlNHNBKSJjmfhj7D-/preview');
