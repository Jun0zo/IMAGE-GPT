docker-compose build or docker-compose build --no-chache

# (Python -> docker mysql)python script에서 안될때

docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' image-gpt-db-1 로 ip받고

db = mysql.connector.connect(
host="{이곳에 ip를 씀}",
user="root",
password="test",
database="service"
)

or

command: ["--bind-address=0.0.0.0"] 를 docker-compose 파일에 추가

or

db = mysql.connector.connect(
host="0.0.0.0",
user="root",
password="test",
database="service"
)
이걸로 해결

# mysql docker terminal에서 접속

docker exec -it image-gpt-db-1 mysql -u root -ptest

# mysql docker terminal에서 접속

docker exec -it image-gpt-db-1 mysql -u root -ptest
