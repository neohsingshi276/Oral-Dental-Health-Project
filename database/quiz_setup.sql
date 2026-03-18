USE dental_health_app;

-- Quiz scores table
CREATE TABLE IF NOT EXISTS quiz_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  session_id INT NOT NULL,
  score INT DEFAULT 0,
  correct_answers INT DEFAULT 0,
  total_questions INT DEFAULT 0,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

-- Sample quiz questions (dental health themed)
INSERT INTO quiz_questions (question, option_a, option_b, option_c, option_d, correct_option) VALUES
('How many times should you brush your teeth per day?', 'Once', 'Twice', 'Three times', 'Four times', 'B'),
('How long should you brush your teeth each time?', '30 seconds', '1 minute', '2 minutes', '5 minutes', 'C'),
('What causes cavities?', 'Drinking water', 'Sugar and bacteria', 'Eating vegetables', 'Sleeping late', 'B'),
('How often should you replace your toothbrush?', 'Every month', 'Every 3 months', 'Every 6 months', 'Every year', 'B'),
('What does fluoride do for your teeth?', 'Makes them yellow', 'Weakens them', 'Strengthens enamel', 'Causes cavities', 'C'),
('Which food is GOOD for your teeth?', 'Candy', 'Soda', 'Cheese', 'Chips', 'C'),
('How often should you visit the dentist?', 'Once a year', 'Every 6 months', 'Every month', 'Only when it hurts', 'B'),
('What is the hard outer layer of teeth called?', 'Dentin', 'Pulp', 'Enamel', 'Gum', 'C'),
('What should you use to clean between your teeth?', 'Toothpick', 'Dental floss', 'Cotton', 'Finger', 'B'),
('Which drink is WORST for your teeth?', 'Water', 'Milk', 'Sugary soda', 'Green tea', 'C');
