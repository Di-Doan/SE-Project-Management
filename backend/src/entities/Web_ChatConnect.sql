DROP DATABASE IF EXISTS Web_ChatConnect;
CREATE DATABASE Web_ChatConnect;
USE Web_ChatConnect;

-- create tables
CREATE TABLE Chat (
    chat_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_description VARCHAR(255)
);

CREATE TABLE Semester (
    semester_id INT PRIMARY KEY AUTO_INCREMENT,
    semester_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE Course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(255) NOT NULL,
    course_code VARCHAR(255) NOT NULL,
    semester_id INT NOT NULL,
    announcement_chat_id INT,
    reference_chat_id INT,
    status INT NOT NULL,
    FOREIGN KEY (semester_id) REFERENCES Semester (semester_id) ON DELETE CASCADE,
    FOREIGN KEY (announcement_chat_id) REFERENCES Chat (chat_id) ON DELETE SET NULL,
    FOREIGN KEY (reference_chat_id) REFERENCES Chat (chat_id) ON DELETE SET NULL,
    FULLTEXT (course_name, course_code)
);

CREATE TABLE Tutorial (
    tutorial_id INT PRIMARY KEY AUTO_INCREMENT,
    tutorial_name VARCHAR(255) NOT NULL,
    course_id INT NOT NULL,
    tut_chat_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE,
    FOREIGN KEY (tut_chat_id) REFERENCES Chat (chat_id) ON DELETE CASCADE
);

CREATE TABLE Team (
    team_id INT PRIMARY KEY AUTO_INCREMENT,
    team_name VARCHAR(255) NOT NULL,
    course_id INT NOT NULL,
    team_chat_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE,
    FOREIGN KEY (team_chat_id) REFERENCES Chat (chat_id) ON DELETE CASCADE
);

CREATE TABLE Student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    rmit_sid VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    email VARCHAR(255),
    mobile VARCHAR(255),
    messenger VARCHAR(255),
    gpa DECIMAL(3, 2),
    status INT NOT NULL,
    FULLTEXT (rmit_sid, fullname, email, mobile, messenger)
);

CREATE TABLE Student_Course (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student (student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, course_id)
);

CREATE TABLE Student_Tutorial (
    student_id INT NOT NULL,
    tutorial_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student (student_id) ON DELETE CASCADE,
    FOREIGN KEY (tutorial_id) REFERENCES Tutorial (tutorial_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, tutorial_id)
);

CREATE TABLE Student_Team (
    student_id INT NOT NULL,
    team_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student (student_id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES Team (team_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, team_id)
);

CREATE TABLE Message (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    message_text TEXT NOT NULL,
    created_at DATE NOT NULL,
    chat_id INT NOT NULL,
    FOREIGN KEY (chat_id) REFERENCES Chat (chat_id) ON DELETE CASCADE
);

CREATE TABLE DirectChat (
    first_std_id INT NOT NULL,
    sencond_std_id INT NOT NULL,
    chat_id INT NOT NULL,
    FOREIGN KEY (first_std_id) REFERENCES Student (student_id) ON DELETE CASCADE,
    FOREIGN KEY (sencond_std_id) REFERENCES Student (student_id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES Chat (chat_id) ON DELETE CASCADE,
    PRIMARY KEY (first_std_id, sencond_std_id)
);