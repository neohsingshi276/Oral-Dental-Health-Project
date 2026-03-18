-- Run this in MySQL Workbench to add sample learning videos
USE dental_health_app;

INSERT INTO learning_videos (title, description, youtube_url, order_num) VALUES
(
  'Why Oral Health Matters',
  'Learn why taking care of your teeth and gums is so important for your overall health and wellbeing.',
  'https://youtu.be/9Qa2K1CC3Hw?si=KEU0Zjm_dNk0VnJ2',
  1
),
(
  'How to Brush Your Teeth Properly',
  'Master the correct technique for brushing your teeth to keep cavities away and maintain a healthy smile.',
  'https://youtu.be/vcNAhUqH9U0?si=VHXu6Q5YpbKOqmPt',
  2
),
(
  'Make Brush Teet Interesting!',
  'Brush Your teeth in 2 Minutes Only!',
  'https://youtu.be/O4wDITXrvrc?si=lnPJjyMVYDEoiKGV',
  3
),
(
  'What Are Cavities and How Do They Form?',
  'Discover what causes cavities, how sugar and bacteria damage your teeth, and how to prevent them.',
  'https://youtu.be/zGoBFU1q4g0?si=kgCnBnx2M11w-Gha',
  4
),
(
  'Healthy Snacks for Strong Teeth',
  'Find out which foods are good for your teeth and which ones to avoid to keep your smile healthy.',
  'https://youtube.com/shorts/mZmKdi9PP08?si=vDLW8Qs8msGrvpMO',
  5
);
