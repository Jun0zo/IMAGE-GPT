# import pytesseract
from utils import *
from Subtitler import *
from download import YoutubeDownloader
import mysql.connector
import pymysql

MIN2SEC = 60

special_1000 = 'special_1000'
mixed_8000 = 'mixed_8000'

# connect to the database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="test",
    database="service",
    charset='utf8mb4'
)

# create a cursor object to execute queries
cursor = db.cursor()

if __name__ == '__main__':
    model = 'special_1000'
    video_result_path = './video'
    image_result_path = './zzal'
    image_debug_result_path = './debug-zzal'
    
    zzala = Subtitler(model_name=model, is_debuging=True, dst_path='./result/all', debug_path='./result/debugging', is_save=True)
    
    root_path = './video'
    video_url_list = ['https://www.youtube.com/watch?v=yhnVyaUBuFk', 
                      'https://www.youtube.com/watch?v=t_y_Y-kC3MY',
                      'https://www.youtube.com/watch?v=rfI2-Wkzs74',
                      'https://www.youtube.com/watch?v=3wC22V7g74s',
                      'https://www.youtube.com/watch?v=weogNFa6Uzg']

    ytd = YoutubeDownloader()

    video_name_list = ytd.download_video('./video', video_url_list)
    print(video_name_list)
    video_info_list = ytd.get_video_infos(video_url_list)
    print(video_info_list)
    
    for video_info, video_name, video_url in zip(video_info_list, video_name_list, video_url_list):
        query = "INSERT INTO videos (title, url, description, tags, emotion_score) VALUES (%s, %s, %s, %s, %s)"
        title = video_info['title']
        description = video_info['description'] if video_info.get('description') else ''
        tags = ", ".join(video_info['tags']) if video_info.get('tags') else ''

        print(title)
        print(description)
        print(tags)
        print('=============')

        values = (title, video_url, description, tags, 0)

        video_id = -1
        
        try:
            cursor.execute(query, values)
            db.commit()
            # video_id = cursor.lastrowid
            cursor.execute('SELECT COUNT(id) FROM videos')
            video_id = cursor.fetchone()[0]
            # video_id += 1

            
        except Exception as e:
            print('error', e)
            cursor.execute('SELECT COUNT(id) FROM videos')
            video_id = cursor.fetchone()[0]

        print('new row id', video_id)

        
        video_path = os.path.join(root_path, video_name)
        image_name_list, subtitle_list, emotional_score_list = zzala.get_micros(video_path)
        print(image_name_list[:5])
        print(subtitle_list[:5])
        print(emotional_score_list[:5])

        for image_name, subtitle in zip(image_name_list, subtitle_list):
            if subtitle == '':
                continue
            query = "INSERT INTO images (url, video_id, subtitle, emotion_score) VALUES (%s, %s, %s, %s)"
            values = (image_name, video_id, subtitle, 0)

            try:
                cursor.execute(query, values)
            except Exception as e:
                print('error', e)
        

        db.commit()

    cursor.close()
    db.close()
    