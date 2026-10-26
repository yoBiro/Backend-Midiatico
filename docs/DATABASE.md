CREATE DATABASE ranking
USE ranking

CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    school VARCHAR(150) NOT NULL,
    total_points INT DEFAULT 0
);

DROP TABLE teams;

CREATE TABLE competition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM(
        'NOT_STARTED',
        'IN_PROGRESS',
        'COMPLETED'
    ) NOT NULL DEFAULT 'NOT_STARTED'
);

	INSERT INTO competition (id, status)
	VALUES (1, 'NOT_STARTED');