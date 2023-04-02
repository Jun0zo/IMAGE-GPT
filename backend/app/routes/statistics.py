from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
# from config.db import conn
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

from schemas.user import User as UserSchema
from schemas.image import Image as ImageSchema
from schemas.video import Video as VideoSchema
from schemas.download import Download as DownloadSchema
from schemas.trend_chart import TrendChartData

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
@statistics.get("/statistics/similar_keywords", tags=["statistics"], response_model=List[str])
def get_similar_keywords(keyword: str, db: Session = Depends(get_db)):
    keywords = (
        db.query(Image.subtitle, func.levenshtein(Image.subtitle, keyword).label("distance"))
            .filter(Image.subtitle.ilike(f"%{keyword}%"))
            .order_by("distance")
            .limit(10)
            .all()
    )
    return [kw[0] for kw in keywords]

# 비디오 정보
@statistics.get("/statistics/videoInfo", tags=["statistics"])
def get_videos_by_keyword(keyword: str, db: Session = Depends(get_db)):
    images = db.query(Image).filter(Image.subtitle.like(f'%{keyword}%')).all()
    video_ids = set([image.video_id for image in images])
    videos = db.query(Video).filter(Video.id.in_(video_ids)).all()
    return videos


# 검색 결과 만족도
@statistics.get("/statistics/satisfaction", tags=["statistics"])
def get_search_satisfaction(keyword: str, db: Session = Depends(get_db)):
    # Get the number of likes for the keyword
    # SELECT user_id, keyword FROM likes WHERE keyword LIKE '%<keyword>%';
    likes = likes = db.query(Like).filter(Like.keyword == keyword).all()
    likes_count = likes.count()

    # Get the number of searches for the keyword 
    # SELECT user_id, keyword FROM searches WHERE keyword LIKE '%<keyword>%';
    searches = db.query(Search).filter(Search.keyword == keyword).all()
    searches_count = searches.count()

    # Calculate the SearchSatisfaction score
    if searches_count == 0:
        return {"SearchSatisfaction": 0}
    else:
        return {"SearchSatisfaction": likes_count / searches_count}
    
# 연령대별 검색 횟수
@statistics.get("/statistics/age", tags=["statistics"])
def get_search_count_by_age_group_chart(keyword: str, db: Session = Depends(get_db)):
    age_groups = [(18, 24), (25, 34), (35, 44), (45, 54), (55, 64), (65, 100)]
    chart_data = []
    for age_group in age_groups:
        age_group_count = db.query(User)\
            .filter(User.age >= age_group[0], User.age <= age_group[1])\
            .join(User.searches)\
            .filter(Search.keyword == keyword)\
            .count()
        chart_data.append({"age_group": f"{age_group[0]}-{age_group[1]}", "count": age_group_count})
    return chart_data


# 기간별 검색 추이
@statistics.get("/statistics/trend", tags=["statistics"])
def get_search_trend_by_period_chart(db: Session = Depends(get_db)) -> TrendChartData:
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
    ).group_by(group_by).all()
    

    # Format the result into a chart data format
    chart_data = []
    start_date = datetime.today() - date_range * 30 if period == 'week' else datetime.today() - date_range * 12
    end_date = datetime.today()
    date_range = end_date - start_date
    for i in range(0, date_range.days + 1, 0 if period == 'week' else 30):
        date = start_date + timedelta(days=i)
        date_str = date.strftime(date_format)
        search_count = next((r.search_count for r in result if r.period == date_str), 0)
        chart_data.append((date_str, search_count))

        # return {"chart_type": "line", "data": chart_data}
    return {"data": chart_data}



# 성별별 검색수
@statistics.get("/statistics/gender", tags=["statistics"])
def search_by_gender(sex: str, keyword: str = None, db: Session = Depends(get_db)):
    # SELECT COUNT(*) FROM (SELECT user_id, sex FROM downloads WHERE keyword = 'keyword') AS users WHERE sex = 'sex';
    
    result = db.query(func.count('*')).select_from(
        db.query(Download.user_id, User.sex).
        join(User, Download.user_id == User.id).
        filter(Download.keyword == keyword).
        subquery()
    ).filter_by(sex=sex).scalar()
    
    return result

# 검색 대비 다운로드 비율 
@statistics.get("/statistics/download", tags=["statistics"])
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

    return ratios
