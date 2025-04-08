FROM python:3.11-slim
LABEL maintainer="Aaron, Anthony, Jason, Uruans" \
      description="This is the docker image for HW_7, pomodoro application."
WORKDIR /app
COPY . .
RUN pip install --upgrade pip \
    && pip install -r requirement.txt
EXPOSE 8000 
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
 
