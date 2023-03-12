FROM tiangolo/uvicorn-gunicorn-fastapi

COPY requirements.txt /app
RUN pip install -r /app/requirements.txt

COPY ./app /app/app