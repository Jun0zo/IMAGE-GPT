from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timedelta
# from config.db import conn
import random
from database.connection import get_db

from sqlalchemy.orm import Session

# from schemas.video import UserCount as UserCountSchema

from typing import List
from sqlalchemy import func, select, desc
from models.user import User
from models.image import Image
from models.like import Like
from models.video import Video

from models.download import Download
from models.search import Search

from schemas.responses.SimilarKeywords import SimilarKeywordsResponse
from schemas.responses.RelatedVideos import RelatedVideosResponse
from schemas.responses.Satisfaction import SatisfactionResponse
from schemas.responses.Age import AgeResponse
from schemas.responses.Trend import TrendResponse
from schemas.responses.Gender import GenderResponse
from schemas.responses.Download import DownloadResponse

statistics = APIRouter()

# 일주일간 검색추이 (기간별)
# 성별별 검색수
# 검색 결과 만족도 
# 기간별 검색 추이
# 유사 키워드
# 비디오 정보
# 연령대별 검색 횟수 
# 검색 대비 다운로드 비율



# 유사 키워드
@statistics.get("/statistics/similar_keywords", tags=["statistics"], response_model=SimilarKeywordsResponse)
def get_similar_keywords(keyword: str, db: Session = Depends(get_db)):
    if keyword == '':
        raise HTTPException(status_code=404, detail="Item not found by kms")
    keywords = (
        db.query(Image.subtitle, func.levenshtein(Image.subtitle, keyword).label("distance"))
            .filter(Image.subtitle.ilike(f"%{keyword}%"))
            .order_by("distance")
            .limit(10)
            .all()
    )
    
    return {'result' : [{'subtitle': kw[0], 'distance': str(kw[1]), 'similarity': str(kw[1])} for kw in keywords]}

# 비디오 정보
@statistics.get("/statistics/related_videos", tags=["statistics"], response_model=RelatedVideosResponse)
def get_videos_by_keyword(keyword: str, db: Session = Depends(get_db)):
    images = db.query(Image).filter(Image.subtitle.like(f'%{keyword}%')).all()
    video_ids = set([image.video_id for image in images])
    videos = db.query(Video).filter(Video.id.in_(video_ids)).all()
    print(videos[0])
    return {'result' : [{'id': video.id, 'title': video.title, 'url': video.url} for video in videos]}


# 검색 결과 만족도
@statistics.get("/statistics/satisfaction", tags=["statistics"], response_model=SatisfactionResponse)
def get_search_satisfaction(keyword: str, is_random: bool = False, db: Session = Depends(get_db)):
    # Get the number of likes for the keyword
    # SELECT user_id, keyword FROM likes WHERE keyword LIKE '%<keyword>%';

    if is_random:
        likes_count = random.randint(1, 100)
        searches_count = random.randint(likes_count, likes_count * 10)
    else:
        likes = db.query(Like).filter(Like.keyword == keyword).all()
        likes_count = len(likes)

        # Get the number of searches for the keyword 
        # SELECT user_id, keyword FROM searches WHERE keyword LIKE '%<keyword>%';
        searches = db.query(Search).filter(Search.keyword == keyword).all()
        searches_count = len(searches)

    if searches_count == 0:
        ratio = 0
    else:
        ratio = int(likes_count / searches_count * 100)

    return {"result": {"likes_count": likes_count, "searches_count":searches_count, "ratio": ratio}}
    
# 연령대별 검색 횟수
@statistics.get("/statistics/age", tags=["statistics"], response_model=AgeResponse)
def get_search_count_by_age_group_chart(keyword: str, is_random: bool = False, db: Session = Depends(get_db)):
    age_groups = [(18, 24), (25, 34), (35, 44), (45, 54), (55, 64), (65, 100)]
    genders = ["male", "female", "other"]  # Add more genders as necessary
    chart_data = []
    for age_group in age_groups:
        age_group_counts = {}
        for gender in genders:
            if is_random:
                count = random.randint(0, 100)  # Generate a random count between 0 and 100
            else:
                count = db.query(User) \
                    .filter(User.age >= age_group[0], User.age <= age_group[1]) \
                    .join(User.searches) \
                    .filter(Search.keyword == keyword, User.sex == gender) \
                    .count()
            age_group_counts[gender.lower()] = count
        chart_data.append({
            "age_group": f"{age_group[0]}-{age_group[1]}",
            **age_group_counts
        })
    print(chart_data)
    return {"result": chart_data}

# 기간별 검색 추이
@statistics.get("/statistics/trend", tags=["statistics"], response_model=TrendResponse)
def get_search_trend_by_period_chart(keyword: str, period: str = 'month', db: Session = Depends(get_db)):
    # Define the period (daily, weekly, monthly)
    period = "month"
    if period == "week":
        date_format = "%Y-%m-%W"
        # 2023-04-05 13:23:45 -> '2023-14'
        date_column = func.concat(
            func.extract('year', Search.searched_time),
            '-',
            func.lpad(func.extract('week', Search.searched_time), 2, '0')
        )
        group_by = date_column
        date_range = timedelta(weeks=1)
    elif period == "month":
        date_format = "%Y-%m"
        date_column = func.date_format(Search.searched_time, '%Y-%m-01')
        group_by = date_column
        date_range = timedelta(days=30)

    # same as SELECT DATE_FORMAT(searched_time, "%Y-%m-01") AS period, COUNT(id) AS search_count  FROM searches GROUP BY DATE_FORMAT(searched_time, "%Y-%m-01");
    result = db.query(
        func.date_format(Search.searched_time, '%Y-%m-01').label('period'),
        func.count(Search.id).label('search_count')
    ).filter(Search.keyword == keyword).group_by(group_by).all()
    

    # Format the result into a chart data format
    chart_data = []
    start_date = datetime.today() - date_range * 30 if period == 'week' else datetime.today() - date_range * 12
    end_date = datetime.today()
    date_range = end_date - start_date
    for i in range(0, date_range.days + 1, 0 if period == 'week' else 30):
        date = start_date + timedelta(days=i)
        date_str = date.strftime(date_format)
        search_count = next((r.search_count for r in result if r.period == date_str), 0)
        chart_data.append({'date':date_str, 'count':search_count})

        # return {"chart_type": "line", "data": chart_data}
    return {"result": chart_data}



# 성별별 검색수
@statistics.get("/statistics/gender", tags=["statistics"], response_model=GenderResponse)
def search_by_gender(keyword: str = None, is_random: bool = False, db: Session = Depends(get_db)):
    # SELECT users.sex, COUNT(*) FROM searches JOIN users ON searches.user_id = users.id WHERE searches.keyword = '<keyword>'GROUP BY users.sex;
    if is_random:
        male_cnt = random.randint(1,100)
        female_cnt = random.randint(1,100)
        others_cnt = random.randint(1,100)
        all_cnt = male_cnt + female_cnt + others_cnt

        age_dict = {'male': {'count':male_cnt, 'ratio': int(male_cnt / all_cnt * 100)},
                    'female':{'count':female_cnt, 'ratio': int(female_cnt / all_cnt * 100)}, 
                    'others':{'count':others_cnt, 'ratio':int(others_cnt / all_cnt * 100)}}
    else:
        result = db.query(User.sex, func.count('*')).\
            join(Search, User.id == Search.user_id).\
            filter(Search.keyword == keyword).\
            group_by(User.sex).\
            all()

        age_dict = {r[0]: r[1] for r in result}
        age_dict['male'] = {'count':0, 'ratio':0} if not age_dict.get('male') else {'count':age_dict['male'], 'ratio': int(age_dict['male'] / len(age_dict) * 100)}
        age_dict['female'] = {'count':0, 'ratio':0} if not age_dict.get('female') else {'count':age_dict['female'], 'ratio':int(age_dict['female'] / len(age_dict) * 100)}
        age_dict['others'] = {'count':0, 'ratio':0} if not age_dict.get('others') else {'count':age_dict['others'], 'ratio':int(age_dict['others'] / len(age_dict) * 100)}
    
    return {'result': age_dict}

# 검색 대비 다운로드 비율 
@statistics.get("/statistics/download", tags=["statistics"], response_model=DownloadResponse)
def search_download_ratio_chart(db: Session = Depends(get_db)):
    # Query all searches for the age group
    searches = db.query(Search).join(Search.user).all()

    # Query all downloads for the age group
    downloads = db.query(Download).join(Download.user).all()

    # Calculate the count of each keyword in searches and downloads
    search_counts = {}
    download_counts = {}
    for search in searches:
        if search.keyword in search_counts:
            search_counts[search.keyword] += 1
        else:
            search_counts[search.keyword] = 1
    for download in downloads:
        if download.keyword in download_counts:
            download_counts[download.keyword] += 1
        else:
            download_counts[download.keyword] = 1

    # Calculate the search/download ratio for each keyword
    ratios = []
    for keyword in search_counts.keys():
        if keyword in download_counts:
            ratio = search_counts[keyword] / download_counts[keyword]
            ratios.append({'keyword': keyword, 'ratio': ratio})

    return {'result':ratios}
