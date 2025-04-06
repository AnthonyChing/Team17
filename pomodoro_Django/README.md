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