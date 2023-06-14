import mysql.connector
import pymysql

# connect to the database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="test",
    database="service",
    charset='utf8mb4'
)

cursor = db.cursor()

for i in range(63, 48-1, -1):
    query = f'UPDATE images SET video_id = video_id + 1 WHERE video_id = {i};'
    cursor.execute(query)
db.commit()