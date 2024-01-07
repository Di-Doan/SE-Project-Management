-- Insert mock data script
use Web_ChatConnect;

INSERT INTO Chat (chat_description, last_updated) VALUES
    ('Announcement Chat for COSC0003', '2024-01-07 09:44:16'), ('Reference Chat for COSC0003', '2024-01-07 09:44:16'),
    ('Tutorial 1 Chat for COSC0003', '2024-01-07 09:44:16'), ('Tutorial 2 Chat for COSC0003', '2024-01-07 09:44:16'), ('Team Chat 1 for COSC0003', '2024-01-07 09:44:16'), 
    ('Announcement Chat for COSC0004', '2024-01-07 09:44:16'), ('Reference Chat for COSC0004', '2024-01-07 09:44:16'),
    ('Tutorial 1 Chat for COSC0004', '2024-01-07 09:44:16'), ('Tutorial 2 Chat for COSC0004', '2024-01-07 09:44:16'), ('Team Chat 1 for COSC0004', '2024-01-07 09:44:16'),  
    ('Announcement Chat for COMM0002', '2024-01-07 09:44:16'), ('Reference Chat for COMM0002', '2024-01-07 09:44:16'),
    ('Tutorial 1 Chat for COMM0002', '2024-01-07 09:44:16'), ('Tutorial 2 Chat for COMM0002', '2024-01-07 09:44:16'), ('Team Chat 1 for COMM0002', '2024-01-07 09:44:16'),
    ('This is direct message between Nam and Di', '2024-01-07 09:44:16'), ('This is direct message between Nam and Phuong', '2024-01-07 09:44:16'), ('This is direct message between Di and Phuong', '2024-01-07 09:44:16');

-- Insert mock data into Semester table
INSERT INTO Semester (semester_name, start_date, end_date, status) VALUES
    ('Semester 1, 2023', '2023-01-01', '2023-06-30', 0),
    ('Semester 2, 2023', '2023-07-01', '2023-12-31', 0),
    ('Semester 3, 2023', '2023-12-15', '2024-01-15', 1);

-- Insert mock data into Course table
INSERT INTO Course (course_code, course_name, semester_id, announcement_chat_id, reference_chat_id, status) VALUES
    ('ISYS0001', 'Introduction to Information System',                1, NULL, NULL, 1),
    ('COSC0001', 'Introduction to Computer Science',                  1, NULL, NULL, 1),
    ('COMM0001', 'Introduction to Programming',                       1, NULL, NULL, 1),
    ('MATH0002', 'Algebra 1',                                         1, NULL, NULL, 1),
    ('ISYS0002', 'Database Systems',                                  1, NULL, NULL, 1),
    ('COSC0002', 'Web Programming',                                   2, NULL, NULL, 1),
    ('ISYS0003', 'Practical Database Concepts',                       2, NULL, NULL, 1),
    ('COSC0003', 'Security in Computing and Information Technology',  3, 1, 2, 1),
    ('COSC0004', 'Building IT Systems',                               3, 6, 7, 1),
    ('COMM0002', 'Software Engineering Project Management',           3, 11, 12, 1);

-- Insert mock data into Tutorial table
INSERT INTO Tutorial (tutorial_name, course_id, tut_chat_id) VALUES
    ('Tutorial group 1 for COSC0003', 8, 3),   ('Tutorial group 2 for COSC0003', 8, 4),
    ('Tutorial group 1 for COSC0004', 9, 8),   ('Tutorial group 2 for COSC0004', 9, 9),
    ('Tutorial group 1 for COMM0002', 10, 13), ('Tutorial group 2 for COMM0002', 10, 14);

-- Insert mock data into Team table
INSERT INTO Team (team_name, course_id, team_chat_id) VALUES
  ('Team 1 for COSC0003', 8, 5),
  ('Team 1 for COSC0004', 9, 10),
  ('Team 1 for COMM0002', 10, 15);

-- Insert mock data into Student table
INSERT INTO Student (rmit_sid, password, fullname, description, email, mobile, gpa, showGpa, status) VALUES
  ('s3980297', '$2b$10$LgCFJ92WJ1VXoYw9QX/JgeBphi2o.8mVGB4eo.wC5OzvfMniEmE7m', 'Nam Nguyen', 'description', 's3980297@example.rmit.edu.vn', '1234567890', 3.5, 1, 1),
  ('s3926977', '$2b$10$LgCFJ92WJ1VXoYw9QX/JgeBphi2o.8mVGB4eo.wC5OzvfMniEmE7m', 'Di Doan', 'description', 's3926977@example.rmit.edu.vn', '9876543210', 3.8, 1, 1),
  ('s3885751', '$2b$10$LgCFJ92WJ1VXoYw9QX/JgeBphi2o.8mVGB4eo.wC5OzvfMniEmE7m', 'Phuong Hoang', 'description', 's3885751@example.rmit.edu.vn', '5551112233', 3.2, 1, 1),
  ('s3758273', '$2b$10$LgCFJ92WJ1VXoYw9QX/JgeBphi2o.8mVGB4eo.wC5OzvfMniEmE7m', 'Long Loi', 'description', 's3758273@example.rmit.edu.vn', '5551112233', 3.3, 1, 1);

-- Insert mock data into Student_Course table
INSERT INTO Student_Course (student_id, course_id, availability) VALUES
  (1, 1, 1), (1, 5, 1), (1, 7, 1), (1, 8, 1), (1, 9, 1), (1, 10, 1),
  (2, 2, 1), (2, 5, 1), (2, 7, 1), (2, 8, 1), (2, 9, 1), (2, 10, 1),
  (3, 3, 1), (3, 6, 1), (3, 7, 1), (3, 8, 1), (3, 9, 1), (3, 10, 1),
  (4, 4, 1), (4, 6, 1), (4, 7, 1), (4, 8, 1), (4, 9, 1), (4, 10, 1);

-- Insert mock data into Student_Tutorial table
INSERT INTO Student_Tutorial (student_id, tutorial_id, course_id) VALUES
  (1, 1, 8), (1, 3, 9), (1, 5, 10),
  (2, 1, 8), (2, 4, 9), (2, 6, 10),
  (3, 2, 8), (3, 3, 9), (3, 6, 10),
  (4, 2, 8), (4, 4, 9), (4, 5, 10);

-- Insert mock data into Student_Team table
INSERT INTO Student_Team (student_id, team_id) VALUES
  (1, 1), (1, 2), (1, 3),
  (2, 1), (2, 2), (2, 3),
  (3, 1), (3, 2), (3, 3),
  (4, 1), (4, 2), (4, 3);

-- Insert mock data into Message table
-- INSERT INTO Message (message_text, created_at, chat_id) VALUES
--   ('Hello, welcome to the general chat!', '2023-01-01', 1),
--   ('Any questions about the tutorial?', '2023-01-05', 2),
--   ('Team 1, let''s discuss the project.', '2023-01-10', 3);

-- Insert mock data into DirectChat table
INSERT INTO DirectChat (first_std_id, second_std_id, chat_id, status) VALUES
  (1, 2, 16, 1),
  (1, 3, 17, 0),
  (2, 3, 18, 1);
