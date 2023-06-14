from utils import *

class Subtitler:
    def __init__(self, model_name, is_debuging=False, is_save=True, dst_path=None, debug_path=None):
        self.model_name = model_name
        self.model = tensorflow.keras.models.load_model(path_join('./model/morph', model_name + '.h5'))
        self.is_debuging = is_debuging
        self.is_save = is_save
        self.dst_path = dst_path
        self.debug_path = debug_path
        
    def change_path(self, dst_path=None, debug_path=None):
        self.dst_path = dst_path
        self.debug_path = debug_path
    
    def predict_image(self, img):
        data = np.ndarray(shape=(1, 224, 224,3), dtype=np.float32)
        train_img = convert2train_set(img)
        
        image = Image.fromarray(train_img)
        
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)

        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        data[0] = normalized_image_array

        prediction = self.model.predict(data)  # [ [caption], [no_caption] ]
        if np.argmax(prediction) == 0:
            if self.is_debuging:
                save_image(train_img, path_join(self.debug_path, 'caption_gray'))
            return True, prediction  # caption !!
        else:
            if self.is_debuging:
                save_image(train_img, path_join(self.debug_path, 'no_caption_gray'))
            return False, prediction  # no caption !!
    

    def kakao_ocr(self, image, is_classificate=False):  # color image
        c_image = image.copy()
        boxes = np.zeros((720,1280), np.uint8)  # height, width
        headers = {'Authorization': 'KakaoAK {}'.format(KEY)}
        jpeg_image = cv2.imencode(".jpg", image)[1]
        data = jpeg_image.tobytes()
        ocr_json = requests.post(API_URL, headers=headers, files={"image": data})
        
        roi_list = []
        res = ''
        outputs = ocr_json.json()['result']
        
        # draw_rectangle(c_image, (0,0), (1280, 150), BLACK, 3, 0)
        
        for output in outputs:
            padding = 15 # 10
            p1,p2,p3,p4 = output['boxes']  # LU RU RD LD
            
            try:
                if is_classificate:
                    roi = get_roi(image, p1[0], p2[0], p1[1], p4[1], padding)
                    is_subtitle, percent = self.predict_image(roi)
                    percent = round(percent[0][0], 2)
                    roi_list.append(roi)
                    
                    if is_subtitle:  # caption !
                        mid_x, mid_y = (p1[0] + p2[0]) / 2 , (p1[1] + p4[1]) / 2
                        print(mid_y, mid_x)
                        if 0 < mid_y < 150 and 0 < mid_x < 1280:
                            cv2.line(c_image, (int(mid_x), int(mid_y)), (int(mid_x), int(mid_y)), RED, 2)
                            cv2.putText(c_image, str(percent), tuple(p1), cv2.FONT_HERSHEY_SIMPLEX, 1, RED, 2, cv2.LINE_AA)
                            draw_rectangle(c_image, p1, p3, RED, 2, padding)
                            continue
                        if not output['recognition_words'] == '':
                            res += " ".join(output['recognition_words']) + " "
                    
                        draw_rectangle(boxes, p1, p3, WHITE, -1, padding)
                        draw_rectangle(c_image, p1, p3, GREEN, 2, padding)
                        if self.is_debuging:
                            cv2.putText(c_image, str(percent), tuple(p1), cv2.FONT_HERSHEY_SIMPLEX, 1, GREEN, 2, cv2.LINE_AA)
                            save_image(roi, path_join(self.debug_path, 'caption'))
                        
                    else:
                        draw_rectangle(c_image, p1, p3, RED, 2, padding)
                        if self.is_debuging:
                            save_image(roi, path_join(self.debug_path, 'no_caption'))
                            cv2.putText(c_image, str(percent), tuple(p1), cv2.FONT_HERSHEY_SIMPLEX, 1, RED, 2, cv2.LINE_AA)
                            
                else:
                    draw_rectangle(c_image, p1, p3, GREEN, 2, padding)
                    draw_rectangle(boxes, p1, p3, WHITE, -1, padding)
            except Exception as e:
                print("out of image !! ", e)
            
        
        res = res.replace('ø', '').strip().replace(' ', '_')
        return {'str':str_encoder(res), 'img':c_image, 'boxes':boxes, 'roi_list':roi_list}
    
    def get_emotional_score(self, str):
        emotional_score = str
        
        return emotional_score
    
    
    def get_micros(self, video_name):
        image_name_list = []
        subtitle_list = []
        emotional_score_list = []
        self.dst_path = self.dst_path if self.dst_path else './result/{}/{}/img'.format(video_name, self.model_name)
        self.debug_path =  self.debug_path if self.debug_path  else './result/{}/{}/debuging'.format(video_name, self.model_name)
        
        frames = get_frames(video_name, 2, (1280,720))
        for frame in frames:
            ocr_res = self.kakao_ocr(frame, is_classificate=True)
            if self.is_save:
                image_name = save_image(frame, path_join(self.dst_path, 'org'))
                image_name_list.append(image_name)
                
                subtitle_list.append(ocr_res['str'])
                
                emotional_score = 0 # self.get_emotional_score(ocr_res['str'])
                emotional_score_list.append(emotional_score)
                save_image(ocr_res['img'], path_join(self.debug_path, 'zzala'))
        return image_name_list, subtitle_list, emotional_score_list
        
    def zzala_mini(self, video_name, is_save=True):
        print('start in zzala mini new')
        self.dst_path = './result/{}/{}/legacy'.format(video_name, self.model_name)
        frames = get_frames(video_name, 2, (1280,720))
        for frame in frames:
            words = selectWords(frame)
            ocr_res = self.kakao_ocr(words['org'], is_classificate=False)
            if is_save:
                save_image(ocr_res['img'], path_join(self.dst_path, 'kakao'))
                save_images(words['roi_list'], path_join(self.dst_path, 'roi'))
                save_image(words['check'], path_join(self.dst_path, 'check'))
                save_image(words['org'], path_join(self.dst_path, 'org'))
                save_image(words['morph2'], path_join(self.dst_path, 'morph'))
