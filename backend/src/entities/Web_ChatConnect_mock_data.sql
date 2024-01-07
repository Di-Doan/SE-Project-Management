-- Insert mock data script
use Web_ChatConnect;

INSERT INTO Chat (chat_description, last_updated) VALUES
    ('Announcement Chat 1 for COURSE_ID0001', NOW()),  ('Announcement Chat 2 for COURSE_ID0002', NOW()),  ('Announcement Chat 3 for COURSE_ID0003', NOW()),
    ('Reference Chat 1 for COURSE_ID0001', NOW()),     ('Reference Chat 2 for COURSE_ID0002', NOW()),     ('Reference Chat 3 for COURSE_ID0003', NOW()),
    ('Tutorial Chat 1 for COURSE_ID0001', NOW()),      ('Tutorial Chat 2 for COURSE_ID0001', NOW()),
    ('Tutorial Chat 1 for COURSE_ID0002', NOW()),      ('Tutorial Chat 2 for COURSE_ID0002', NOW()),
    ('Tutorial Chat 1 for COURSE_ID0003', NOW()),      ('Tutorial Chat 2 for COURSE_ID0003', NOW()),
    ('Team Chat 1 for COURSE_ID0001', NOW()),          ('Team Chat 1 for COURSE_ID0002', NOW()),          ('Team Chat 1 for COURSE_ID0003', NOW());

-- Insert mock data into Semester table
INSERT INTO Semester (semester_name, start_date, end_date, status) VALUES
    ('Semester 1', '2023-01-01', '2023-06-30', 0),
    ('Semester 2', '2023-07-01', '2023-12-31', 0),
    ('Semester 3', '2023-12-15', '2024-01-15', 1);

-- Insert mock data into Course table
INSERT INTO Course (course_code, course_name, semester_id, announcement_chat_id, reference_chat_id, status) VALUES
    ('COURSE_ID0001', 'Introduction to Computer Science'    , 3, 1, 4, 1),
    ('COURSE_ID0002', 'Data Structures and Algorithms'      , 3, 2, 5, 1),
    ('COURSE_ID0003', 'Algebra 1'                           , 3, 3, 6, 1);

-- Insert mock data into Tutorial table
INSERT INTO Tutorial (tutorial_name, course_id, tut_chat_id) VALUES
    ('Tut 1 for COURSE_ID0001', 1, 7),  ('Tut 2 for COURSE_ID0001', 1, 8),
    ('Tut 1 for COURSE_ID0002', 2, 9),  ('Tut 2 for COURSE_ID0002', 1, 10),
    ('Tut 1 for COURSE_ID0003', 2, 11), ('Tut 2 for COURSE_ID0003', 1, 12);

-- Insert mock data into Team table
INSERT INTO Team (team_name, course_id, team_chat_id) VALUES
    ('Team 1 for COURSE_ID0001', 1, 13),
    ('Team 1 for COURSE_ID0002', 2, 14),
    ('Team 1 for COURSE_ID0003', 3, 15);

-- Insert mock data into Student table
INSERT INTO Student (avatar, rmit_sid, password, fullname, description, email, mobile, gpa, showGpa, status) VALUES
    ('default', 's1234567', 'password', 'John Doe', 'description', 's1234567@example.rmit.edu.vn', '1234567890', 3.5, 1, 1),
    ('default', 's2345678', 'password', 'Jane Smith', 'description', 's2345678@example.rmit.edu.vn', '9876543210', 3.8, 1, 1),
    ('default', 's345678', 'password', 'Bob Johnson', 'description', 's345678@example.rmit.edu.vn', '5551112233', 3.2, 1, 1);

-- Insert mock data into Student_Course table
INSERT INTO Student_Course (student_id, course_id, availability) VALUES
    (1, 1, 1),
    (2, 1, 1),
    (3, 1, 1),
    (1, 2, 1),
    (2, 2, 1),
    (3, 2, 1),
    (1, 3, 1),
    (2, 3, 1),
    (3, 3, 1);

-- Insert mock data into Student_Tutorial table
INSERT INTO Student_Tutorial (student_id, tutorial_id) VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (1, 3),
    (2, 4),
    (3, 4),
    (1, 5),
    (2, 5),
    (3, 5);

-- Insert mock data into Student_Team table
INSERT INTO Student_Team (student_id, team_id) VALUES
    (1, 1), (2, 1), (3, 1),     -- team c1: s1, s2, s3
    (1, 2), (2, 2),             -- team c2: s1, s2
    (2, 3), (3, 3);             -- team c3: s1, s3

-- Insert mock data into Message table
INSERT INTO Message (message_text, message_sender, created_at, chat_id) VALUES
    ('test announcement_chat_id [1] sended by student_id [1]', 1, NOW(), 1),
    ('s1234567 to tut chat 1', 1, NOW(), 7),
    ('s2345678 to tut chat 1', 2, NOW(), 7),
    ('s3456789 to tut chat 2', 3, NOW(), 9),
    ('s1234567 to tut chat 3', 1, NOW(), 11);

--   ('Any questions about the tutorial?', '2023-01-05', 2),
--   ('Team 1, let''s discuss the project.', '2023-01-10', 3);

-- Insert mock data into DirectChat table
-- INSERT INTO DirectChat (first_std_id, second_std_id, chat_id) VALUES
--   (1, 2, 1),
--   (1, 3, 1),
--   (2, 3, 1);
