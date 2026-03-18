USE dental_health_app;

-- Drop old quiz questions table and recreate with full support
DROP TABLE IF EXISTS quiz_scores;
DROP TABLE IF EXISTS quiz_questions;

-- New flexible quiz questions table
CREATE TABLE quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  question_type ENUM('multiple_choice', 'true_false', 'multi_select', 'match') NOT NULL DEFAULT 'multiple_choice',
  image_url VARCHAR(500) NULL,
  timer_seconds INT DEFAULT 15,
  options JSON NULL,
  -- For multiple_choice/true_false: options = ["Option A", "Option B", ...]
  -- For multi_select: options = ["Option A", "Option B", ...]
  -- For match: options = [{"left": "Question 1", "right": "Answer 1"}, ...]
  correct_answer JSON NULL,
  -- For multiple_choice/true_false: correct_answer = [0] (index)
  -- For multi_select: correct_answer = [0, 2] (indexes)
  -- For match: correct_answer = [[0,0],[1,1],[2,2]] (left index to right index)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz scores table
CREATE TABLE quiz_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  session_id INT NOT NULL,
  score INT DEFAULT 0,
  correct_answers INT DEFAULT 0,
  total_questions INT DEFAULT 0,
  time_taken INT DEFAULT 0,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

-- Quiz settings per session
CREATE TABLE IF NOT EXISTS quiz_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL UNIQUE,
  timer_seconds INT DEFAULT 15,
  question_order ENUM('fixed', 'shuffle') DEFAULT 'shuffle',
  question_count INT DEFAULT 10,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

-- Sample questions in Bahasa Malaysia
INSERT INTO quiz_questions (question, question_type, options, correct_answer, timer_seconds) VALUES

-- Q1: True/False
('Tabiat merokok tidak baik untuk kesihatan mulut.',
 'true_false',
 '["Tidak", "Ya"]',
 '[1]',
 15),

-- Q2: Multiple choice
('Seseorang digalakkan berjumpa doktor gigi untuk pemeriksaan gigi ___________.',
 'multiple_choice',
 '["Lima tahun sekali", "Hanya apabila gusi bengkak", "Hanya apabila gigi sakit", "Sekurang-kurangnya sekali setahun"]',
 '[3]',
 15),

-- Q3: Multiple choice
('Berikut adalah kepentingan gigi kecuali ___________.',
 'multiple_choice',
 '["Pemakanan", "Pertuturan", "Penampilan dan keyakinan diri", "Pernafasan"]',
 '[3]',
 15),

-- Q4: Multiple choice
('Penyakit gusi boleh menyebabkan ___________.',
 'multiple_choice',
 '["Gigi menjadi putih", "Nafas menjadi segar", "Gigi menjadi longgar", "Peningkatan selera makan"]',
 '[2]',
 15),

-- Q5: Multiple choice
('Seseorang boleh mengurangkan risiko gigi reput dengan ___________.',
 'multiple_choice',
 '["Mendapatkan pemeriksaan pergigian hanya apabila gigi sakit", "Merokok", "Menggunakan ubat gigi tanpa fluorida", "Mengurangkan makanan bergula setiap hari"]',
 '[3]',
 15),

-- Q6: Multiple choice
('Makan makanan bergula dengan banyak boleh menyebabkan ___________.',
 'multiple_choice',
 '["Gigi menjadi lebih kuat", "Nafas menjadi lebih segar", "Gusi menjadi lebih sihat", "Gigi menjadi reput"]',
 '[3]',
 15),

-- Q7: Multiple choice
('Berikut adalah amalan penjagaan kesihatan pergigian yang baik kecuali ___________.',
 'multiple_choice',
 '["Berkumur dengan air selepas makan", "Memberus gigi sekurang-kurangnya dua kali", "Menggunakan benang flos sekurang-kurangnya sekali sehari", "Makan snek bergula di antara waktu makan"]',
 '[3]',
 15),

-- Q8: Multiple choice (from image)
('Plak gigi boleh menyebabkan ___________.',
 'multiple_choice',
 '["Batuk", "Penyakit gusi", "Selsema", "Cirit birit"]',
 '[1]',
 15),

-- Q9: Multiple choice (from image)
('Seseorang perlu memberus gigi dengan ubat gigi berfluorida sekurang-kurangnya ___________.',
 'multiple_choice',
 '["Dua kali sehari", "Sekali sehari", "Sekali seminggu", "Dua kali seminggu"]',
 '[0]',
 15),

-- Q10: Multiple choice (from image)
('Seseorang yang tidak menjaga kebersihan mulut akan ___________.',
 'multiple_choice',
 '["Mempunyai nafas yang lebih segar", "Disukai oleh rakan-rakan", "Disukai oleh doktor gigi", "Berisiko mendapat penyakit pergigian seperti karies gigi dan penyakit gusi"]',
 '[3]',
 15);
