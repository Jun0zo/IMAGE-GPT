import requests
import re
from pytube import YouTube, Playlist
from os import listdir
import sys
from utils import check_and_mkdir
from urllib.parse import urlparse, parse_qs

class YoutubeDownloader:
    def __init__(self):
        pass
    
    def parse_url(self, url):
        query_params = parse_qs(urlparse(url).query)
        v_param = query_params.get('v')
        return v_param[0] if v_param else ''
        
    def download_video(self, save_path, url_list):
        name_list = []
        for url in url_list:
            yt = YouTube(url)
            video = yt.streams.get_highest_resolution()
            video.download(output_path=save_path)
            name_list.append(video.default_filename)
        return name_list

    def get_video_infos(self, url_list):
        ids_string = ','.join(list(map(self.parse_url, url_list)))
            
        url = "https://www.googleapis.com/youtube/v3/videos"
        params = {
            "key": "AIzaSyBm2qcjXaYN9pUMIFJoIoSBw8IbzXx5OsA",
            "fields": "items(snippet(title,description,tags))",
            "part": "snippet",
            "id": ids_string
        }
        
        with requests.get(url, params=params) as response:
            items = response.json()['items']
            video_info_list = list(map(lambda video_info : video_info['snippet'], items))
            return video_info_list