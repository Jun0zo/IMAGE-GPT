DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS downloads;
DROP TABLE IF EXISTS searches;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    sex VARCHAR(10)
);

CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL UNIQUE,
    tag VARCHAR(50),
    hash_tag VARCHAR(255),
    emotion_score FLOAT
);

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    videoid INT NOT NULL,
    subtitle VARCHAR(255),
    emotion_score FLOAT,
    FOREIGN KEY (videoid) REFERENCES videos(id)
);


CREATE TABLE downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    imageid INT NOT NULL,
    downloaded_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    keyword VARCHAR(50),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (imageid) REFERENCES images(id)
);

CREATE TABLE searches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    keyword VARCHAR(50) NOT NULL,
    searched_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    keyword VARCHAR(50) NOT NULL
);


-- insert

INSERT INTO users (name, email, password, age, sex)
VALUES ('John Doe', 'johndoe@example.com', 'password', 30, 'Male');

INSERT INTO downloads (userid, imageid, keyword)
VALUES (1, 1, 'beach');

INSERT INTO searches (userid, keyword)
VALUES (1, 'sunset');



INSERT INTO videos (title, url, tag, hash_tag, emotion_score)
VALUES ('Sunset at the Beach', 'https://example.com/sunset.mp4', 'beach, sunset', '#beach #sunset', 0.8);

INSERT INTO images (url, videoid, subtitle, emotion_score)
VALUES ('a.jpg', 1, 'A beautiful sunset at the beach', 0.8);

INSERT INTO likes (userid, keyword)
VALUES (1, 'sunset');
