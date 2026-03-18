USE dental_health_app;

-- ============================================
-- CROSSWORD SCORES (mirrors quiz_scores pattern)
-- ============================================

CREATE TABLE IF NOT EXISTS crossword_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT NOT NULL,
  session_id INT NOT NULL,
  score INT DEFAULT 0,
  words_correct INT DEFAULT 0,
  total_words INT DEFAULT 0,
  time_taken INT DEFAULT 0,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

-- ============================================
-- REPLACE CROSSWORD DATA WITH 20 DENTAL WORDS
-- (keeping existing table structure)
-- ============================================

DELETE FROM crossword_data;

INSERT INTO crossword_data (word, clue, direction, start_row, start_col) VALUES
('PLAK', 'Kuman melekat pada gigi yang rasa berlendir', 'across', 0, 0),
('FLUORIDA', 'Bahan dalam ubat gigi untuk kuatkan gigi', 'across', 0, 0),
('PUTIH', 'Warna tompok pada gigi sebelum jadi lubang', 'across', 0, 0),
('DUA', 'Gosok gigi sekurang-kurangnya berapa kali sehari?', 'across', 0, 0),
('KARANG', 'Nama lain bagi tahi gigi', 'across', 0, 0),
('FLOS', 'Tali halus untuk cuci celah gigi', 'across', 0, 0),
('PIS', 'Guna ubat gigi hanya sebesar kacang ___', 'across', 0, 0),
('GULA', 'Makanan manis yang rosakkan gigi', 'across', 0, 0),
('BERLUBANG', 'Gigi akan ___ jika selalu makan coklat tapi tak berus', 'across', 0, 0),
('BERDARAH', 'Gusi yang tak sihat akan mudah ___ semasa berus', 'across', 0, 0),
('SEKALI', 'Periksa gigi di klinik ___ sekali setahun', 'across', 0, 0),
('KOSONG', 'Air yang paling baik untuk kesihatan gigi', 'across', 0, 0),
('SAYUR', 'Buah dan ___ sangat baik untuk gusi yang kuat', 'across', 0, 0),
('PERGIGIAN', 'Doktor yang jaga kesihatan mulut kita', 'across', 0, 0),
('KUMUR', 'Buat ini dengan air selepas makan', 'across', 0, 0),
('NGILU', 'Gigi yang rosak akan rasa ___ bila minum air sejuk', 'across', 0, 0),
('TIDUR', 'Berus gigi waktu pagi dan sebelum ___', 'across', 0, 0),
('LEMBUT', 'Pilih berus gigi yang bulunya ___ supaya tak sakit', 'across', 0, 0),
('GIGIT', 'Jangan ___ batang pensel kerana boleh rosakkan gigi', 'across', 0, 0),
('BERSIH', 'Senyuman yang cantik bermula dari gigi yang ___', 'across', 0, 0);
