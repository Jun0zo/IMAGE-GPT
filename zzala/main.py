# import pytesseract
from utils import *
from Subtitler import *
from download import YoutubeDownloader
import mysql.connector
import pymysql

MIN2SEC = 60

special_1000 = 'special_1000'

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
    
    zzala = Subtitler(model_name=model, is_debuging=True, is_save=True)
    
    root_path = './video'
    # video_url_list = ['https://www.youtube.com/watch?v=8S8FPbAFtlQ', 'https://www.youtube.com/watch?v=UTQeUz-KHso']
    video_url_list = [ 'https://www.youtube.com/watch?v=oC3cD-S_HGA', ' https://www.youtube.com/watch?v=VSHWnPfSOWg', 'https://www.youtube.com/watch?v=988TcAz618c', 'https://www.youtube.com/watch?v=qCvWTGJVRnI', 'https://www.youtube.com/watch?v=MgOiA92c534']
    ytd = YoutubeDownloader()
    video_name_list = ytd.download_video('./video', video_url_list)
    print(video_name_list)
    video_info_list = ytd.get_video_infos(video_url_list)
    print(video_info_list)
    
    for video_info, video_name, video_url in zip(video_info_list, video_name_list, video_url_list):
        query = "INSERT INTO videos (title, url, description, tags, emotion_score) VALUES (%s, %s, %s, %s, %s)"
        title = video_info['title']
        description = video_info['description'] if video_info.get('title') else ''
        tags = ", ".join(video_info['tags']) if video_info.get('title') else []

        print(title)
        print(description)
        print(tags)
        print('=============')

        values = (title, video_url, description, tags, 0)
        cursor.execute(query, values)

        
        # video_path = os.path.join(root_path, video_name)
        # image_name_list = zzala.get_micros(video_path)

    db.commit()

    cursor.close()
    db.close()
    