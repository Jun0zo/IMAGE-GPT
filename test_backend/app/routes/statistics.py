from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
# from config.db import conn
from database.connection import get_db

from sqlalchemy.orm import Session

# from schemas.video import UserCount as UserCountSchema

from typing import List
from sqlalchemy import func, select
from models.user import User
from models.image import Image
from models.video import Video
from models.like import Like
from models.download import Download
from models.search import Search

from schemas.user import User as UserSchema
from schemas.image import Image as ImageSchema
from schemas.video import Video as VideoSchema
from schemas.download import Download as DownloadSchema
from schemas.trend_chart import TrendChartData

statistics = APIRouter()


@statistics.get("/videos", response_model=List[VideoSchema], tags=["statistics"])
def get_videos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    videos = db.query(Video).offset(skip).limit(limit).all()
    print('videos :', videos)
    return videos



# 기간별 검색 추이
@statistics.get("/search-trend-by-period-chart")
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
        print('date_', date_column)
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
    print(date_range)
    date_range = end_date - start_date
    for i in range(0, date_range.days + 1, 0 if period == 'week' else 30):
        date = start_date + timedelta(days=i)
        date_str = date.strftime(date_format)
        search_count = next((r.search_count for r in result if r.period == date_str), 0)
        chart_data.append((date_str, search_count))

        # return {"chart_type": "line", "data": chart_data}
    print(date_range, start_date, end_date)
    return {"data": chart_data}

# 검색 대비 다운로드 비율 
@statistics.get("/search_download_ratio_chart")
def search_download_ratio_chart(db: Session = Depends(get_db)):
    # Query all searches for the age group
    searches = db.query(Search).join(Search.user).all()

    # Query all downloads for the age group
    downloads = db.query(Download).join(Download.user).all()
    print('search :', searches)
    print('downloads :', downloads)

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

# 연령대별 검색 횟수
@statistics.get("/search_count_by_age_group_chart",  tags=["statistics"])
def get_search_count_by_age_group_chart(db: Session = Depends(get_db)):
    age_groups = [(18, 24), (25, 34), (35, 44), (45, 54), (55, 64), (65, 100)]
    chart_data = []
    for age_group in age_groups:
        age_group_count = db.query(User)\
            .filter(User.age >= age_group[0], User.age <= age_group[1])\
            .join(User.searches)\
            .count()
        chart_data.append({"age_group": f"{age_group[0]}-{age_group[1]}", "count": age_group_count})
    return chart_data