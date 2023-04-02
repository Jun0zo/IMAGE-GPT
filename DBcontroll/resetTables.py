import random
import mysql.connector

# connect to the database
db = mysql.connector.connect(
    host="0.0.0.0",
    user="root",
    password="test",
    database="service"
)

# create a cursor object to execute queries
cursor = db.cursor()

print('[*] connected succesfully')

# Reset All Tables
cursor.execute("DROP TABLE IF EXISTS likes")
cursor.execute("DROP TABLE IF EXISTS downloads")
cursor.execute("DROP TABLE IF EXISTS searches")
cursor.execute("DROP TABLE IF EXISTS images")
cursor.execute("DROP TABLE IF EXISTS videos")
cursor.execute("DROP TABLE IF EXISTS users")

print('[*] All Delete Well')

cursor.execute("""
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    sex VARCHAR(10)
)
""")

print('[+] User table added succesfully')

cursor.execute("""
CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL UNIQUE,
    tag VARCHAR(50),
    hash_tag VARCHAR(255),
    emotion_score FLOAT
)
""")

print('[+] Video table added succesfully')

# create the images table
cursor.execute("""
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    video_id INT NOT NULL,
    subtitle VARCHAR(255),
    emotion_score FLOAT,
    FOREIGN KEY (video_id) REFERENCES videos(id)
)
""")

print('[+] Image table added succesfully')

# create the downloads table
cursor.execute("""
CREATE TABLE downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_id INT NOT NULL,
    downloaded_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    keyword VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (image_id) REFERENCES images(id)
)
""")

print('[+] Download table added succesfully')

# create the searches table
cursor.execute("""
CREATE TABLE searches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    keyword VARCHAR(50) NOT NULL,
    searched_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
""")

print('[+] Search table added succesfully')

# create the likes table
cursor.execute("""
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    keyword VARCHAR(50) NOT NULL
)
""")

print('[+] Like table added succesfully')
print('[*] All Works Well')

# commit the changes to the database
db.commit()

print('[-] Reset succesfully')

# close the cursor and the database connection
cursor.close()
cursor.close()
print('[*] close Cursor')

db.close()

print('[*] close DB')