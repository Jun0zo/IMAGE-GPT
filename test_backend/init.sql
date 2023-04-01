CREATE TABLE users (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    sex VARCHAR(10)
);

CREATE TABLE downloads (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_id INT NOT NULL,
    downloaded_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    keyword VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(_id),
    FOREIGN KEY (image_id) REFERENCES images(_id)
);

CREATE TABLE searches (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    keyword VARCHAR(50) NOT NULL,
    searched_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(_id)
);

CREATE TABLE images (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    video_id INT NOT NULL,
    subtitle VARCHAR(255),
    emotion_score FLOAT,
    FOREIGN KEY (video_id) REFERENCES videos(_id)
);

CREATE TABLE videos (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL UNIQUE,
    tag VARCHAR(50),
    hash_tag VARCHAR(255),
    emotion_score FLOAT
);

CREATE TABLE likes (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    video_id INT NOT NULL,
    keyword VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(_id),
    FOREIGN KEY (video_id) REFERENCES videos(_id)
);