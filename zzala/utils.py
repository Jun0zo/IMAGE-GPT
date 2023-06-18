import cv2, os, requests, time, tensorflow.keras
import natsort as natsort
import numpy as np
from PIL import Image, ImageOps
import shutil
import functools
import datetime

API_URL = 'https://dapi.kakao.com/v2/vision/text/ocr'
KEY = '5b60f7aeb82db9bf02f3eea5a94a69c0' # 
# KEY = '2b5225795b0e6bba37b57d3450dfc2e5' # j1
# KEY = 'a23a0eab4f677978b873971e638c0971' #o1

BLACK = (0,0,0)
RED = (0,0,255)
GREEN = (0,255,0)
BLUE = (255,0,0)
WHITE = (255,255,255)

MIN2SEC = 60

def draw_rect_with_contours(img, contours, color=RED, thickness=1, padding=0):
    roi_list = []
    for cnt in contours:
        try:
            x, y, w, h = cv2.boundingRect(cnt)
            p1 = (x,y)
            p3 = (x+w, y+h)
            if (30 < w and 30 < h and (h/w) < 3) and not (w >= 200 and h >= 200):
                roi = img[y - padding:y+h + padding, x - padding:x+w + padding]
                draw_rectangle(img, p1, p3, color, thickness, padding)
                roi_list.append(roi)
        except Exception as e:
            print('error : ' ,e)
    return img, roi_list

def selectWords(img):
    img = cv2.resize(img, (1280, 720), interpolation=cv2.INTER_AREA)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # ================  1 gray scale로 변환
    morph = cv2.morphologyEx(gray, cv2.MORPH_GRADIENT, get_kernel(5,4))  # 2 ================ 경계선 찾기
    thr = cv2.adaptiveThreshold(morph, 255, cv2.ADAPTIVE_THRESH_MEAN_C,  cv2.THRESH_BINARY_INV, 3, 30)  # 3 ================ 임계처리  # 3, 30
    morph2 = cv2.morphologyEx(thr, cv2.MORPH_CLOSE, get_kernel(10, 55))  # 4 ================ 뭉게기
    contours, _ = cv2.findContours(morph2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # 5 ================ 특징점 찾기
    check = img.copy()
    check = roi_list = draw_rect_with_contours(check, contours, padding=0)

    return {'org':img, 'roi_list':roi_list, 'gray':gray, 'morph':morph, 'morph2':morph2, 'thr':thr, 'check':check}

def path_join(*args):
    return os.path.join(*args)

def get_kernel(h,w):
    return np.ones((w, h), np.uint8)

def imwrite_han(filename, img):
    try:
        ext = os.path.splitext(filename)[1]
        result, n = cv2.imencode(ext, img)
        if result:
            with open(filename, mode='w+b') as f:
                n.tofile(f)
            return True
        else:
            return False
    except Exception as e:
        # print(e)
        return False
    

def str_encoder(str):
    str = str.replace('\\', "#'W'#").replace('/', "#'R'#").replace(':', "#'C'#").replace('*', "#'S'#").replace('?', "#'Q'#").replace('"', "#'d'#")
    str = str.replace('<', "#'L'#").replace('>', "#'G'#").replace('/', "#'O'#").replace('.', "#'E'#")
    return str


def str_decoder(str):
    str = str.replace("#'W'#", '\\').replace("#'R'#", '/').replace("#'C'#", ':').replace("#'S'#", '*').replace("#'Q'#", '?').replace("#'D'#", '"')
    str = str.replace("#'L'#", '<').replace("#'G'#", '>').replace("#'O'#", '/').replace("#'E'#", '.')
    return str


def get_roi(image, x1, x2, y1, y2, padding):
    return image[y1-padding : y2+padding, x1-padding : x2+padding]


def draw_rectangle(image, p1, p3, color, border, padding):
    pp1 = (p1[0]-padding, p1[1]-padding)
    pp2 = (p3[0]+padding, p3[1]+padding)
    cv2.rectangle(image, pp1, pp2, color, border)


def last_index_in_file(file_dir):
    files = os.listdir(file_dir)
    files = natsort.natsorted(files)
    if len(files) == 0:
        return 0
    last_index = files[-1].split('.')[0].split('_')[-1]
    return int(last_index) + 1


def check_and_mkdir(path):
    try:
        file_n = len(os.listdir(path))
    except FileNotFoundError as e:
        file_n = 0
        os.makedirs(path)


def get_timeline(video_cap):
    time_all = video_cap.get(cv2.CAP_PROP_FRAME_COUNT) / video_cap.get(cv2.CAP_PROP_FPS)
    time_now = video_cap.get(cv2.CAP_PROP_POS_FRAMES) / video_cap.get(cv2.CAP_PROP_FPS)
    return time_all, time_now


def save_image(img, base_path, base_img_name = ''):
    check_and_mkdir(base_path)
    cur_index = str( last_index_in_file(base_path) )
    new_name = f'{base_img_name}_{cur_index}.jpg'
    imwrite_han(os.path.join(base_path, new_name), img)
    return new_name
    

def save_images(image_list, base_path):
    for img in image_list:
        save_image(img, base_path)
        
        
def set_cap(cap, dest_time):        
    cap.set(cv2.CAP_PROP_POS_FRAMES, dest_time)
    ret, frame = cap.read()
    return frame
        
        
def get_frames(file_name, term, size):
    cap = cv2.VideoCapture(file_name)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    time_list = list(filter(lambda frame: (frame % MIN2SEC*term == 0), range(total_frames)))
    frames = list(map(lambda dest_time : cv2.resize(set_cap(cap, dest_time), size, interpolation=cv2.INTER_AREA) , time_list))
    return frames


def move_file(src_path, dst_path):
    shutil.move(src_path, dst_path)
    
    
def copy_file(src_path, dst_path):
    shutil.copy(src_path, dst_path)

    
def combine_folders(folders, dst_folder, mode='move', sig=''):  # mode : move or copy
    '''
    example : combine_folders(['./model/morph/no_cap_mong', './model/morph/no_cap_1000'], './model/morph/no_cap_all(sp+mong)', mode='copy')
    '''
    check_and_mkdir(dst_folder)
    index = 0
    for folder in folders:
        files = get_filelist(folder)
        for file_path in files:
            dst_path = path_join(dst_folder, '{}.jpg'.format(index))
            if mode == 'move':
                move_file(file_path, dst_path)
            elif mode == 'copy':
                copy_file(file_path, dst_path)
            print('{}.jpg combined!'.format(index))
            index+=1

    
def get_filelist(folder, is_sort=False):
    files = os.listdir(folder)
    if is_sort == True:
        files = natsort.natsorted(files)
    files = natsort.natsorted(files)
    file_list = list(map(lambda file : path_join(folder, file), files))
    return file_list

def convert2train_set(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    morph = cv2.morphologyEx(gray, cv2.MORPH_GRADIENT, get_kernel(3,5))
    morph = cv2.cvtColor(morph, cv2.COLOR_GRAY2BGR)
    return morph
