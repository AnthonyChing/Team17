# Week 7 Report
## 練習了哪些當週上課的主題
- Docker
- Django
## 額外找了與當週上課的主題相關的程式技術
- HTTP POST method
## 組員分工情況 (共100%)，並清楚的標示你們是哪一組 (組別)
### Team 17
- 林靖昀（25%）
    - 利用 HTTP POST & GET 更新 Database 與 query database
    - 調整 JSX & CSS
- 金哲安（25%）
    - 利用 Django 建立 Database
    - 利用 HTTP POST 更新 Database
- 林子庭 (25%)
    - 建立docker image 並上傳
- 宋和峻（25%）
    - 將原本的網頁與 Django 進行整合

## docker image 相關資訊
- docker image 連結：https://hub.docker.com/repository/docker/jasonlin778/pomodoro/general
- 執行下列指令(記得先啟動docker)：
```
docker pull jasonlin778/pomodoro:latest
docker run -p 8000:8000 jasonlin778/pomodoro
```
- 瀏覽器輸入`localhost:8000`瀏覽網站
