# Installation Guide
## Setup Environment
Please run
```bash=
python3 -m venv .venv  # create a virtural environment with name ".venv"
source .venv/bin/activate # activate the virtural environment
pip install --upgrade pip
pip install -r requirement.txt
```
## Run The Server
```bash=
python manage.py runserver <optional: localhost:<desired port>>
```
## About the database
Admin account: anthony  
Password: anthony  
Or create your own superuser

POST url at /add_finished_task/  
expects a json containing  
task (str)  
taskTime = (timedelta)  
breakTime = (timedelta)  