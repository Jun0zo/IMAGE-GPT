import random
import mysql.connector
from faker import Faker
from faker.providers import lorem

fake = Faker('ko_KR')
fake.add_provider(lorem)

IMAGE_CNT = 330
DOWNLOAD_CNT = 3000
USER_CNT = 10
VIDEO_CNT = 100

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

# insert dummy data for the users table
for i in range(USER_CNT):
    name = fake.name()
    email = fake.email()
    password = fake.password()
    age = random.randint(18, 60)
    sex = random.choice(['남성', '여성'])
    query = "INSERT INTO users (name, email, password, age, sex) VALUES (%s, %s, %s, %s, %s)"
    values = (name, email, password, age, sex)
    cursor.execute(query, values)
    
print('[+] User table added succesfully')

# insert dummy data for the videos table
for i in range(VIDEO_CNT):
    title = fake.sentence()
    url = fake.url() + f'/{i}'
    tag = fake.word()
    hash_tag = '#' + fake.word() + ' #' + fake.word()
    emotion_score = round(random.uniform(0.0, 1.0), 2)
    query = "INSERT INTO videos (title, url, tag, hash_tag, emotion_score) VALUES (%s, %s, %s, %s, %s)"
    values = (title, url, tag, hash_tag, emotion_score)
    cursor.execute(query, values)
    
print('[+] Video table added succesfully')

# insert dummy data for the images table
for i in range(IMAGE_CNT):
    url = f'{i}.jpg'
    video_id = random.randint(1, VIDEO_CNT)
    subtitle = fake.sentence()
    emotion_score = round(random.uniform(0.0, 1.0), 2)
    query = "INSERT INTO images (url, video_id, subtitle, emotion_score) VALUES (%s, %s, %s, %s)"
    values = (url, video_id, subtitle, emotion_score)
    cursor.execute(query, values)
    


# insert dummy data for the downloads table
for i in range(DOWNLOAD_CNT):
    user_id = random.randint(1, USER_CNT)
    image_id = random.randint(1, IMAGE_CNT)
    keyword = fake.word()
    downloaded_time = fake.date_time_between(start_date="-1y", end_date="now")
    query = "INSERT INTO downloads (user_id, image_id, keyword, downloaded_time) VALUES (%s, %s, %s, %s)"
    values = (user_id, image_id, keyword, downloaded_time)
    cursor.execute(query, values)
    
print('[+] Download table added succesfully')

# insert dummy data for the searches table
for i in range(8000):
    user_id = random.randint(1, USER_CNT)
    keyword = fake.word()
    query = "INSERT INTO searches (user_id, keyword) VALUES (%s, %s)"
    values = (user_id, keyword)
    cursor.execute(query, values)
    
print('[+] Search table added succesfully')

# insert dummy data for the likes table
for i in range(VIDEO_CNT):
    user_id = random.randint(1, USER_CNT)
    keyword = fake.word()
    query = "INSERT INTO likes (user_id, keyword) VALUES (%s, %s)"
    values = (user_id, keyword)
    cursor.execute(query, values)

db.commit()

print('[+] Like table added succesfully')
print('[*] All Works Well')

# close the database connection
cursor.close()
print('[*] close Cursor')

db.close()
print('[*] close DB')
