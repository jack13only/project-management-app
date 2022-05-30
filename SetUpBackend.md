# Setup backend locally

1. Go to https://github.com/vitaly-sazonov/kanban-rest
2. Clone this repo to your pc
3. Install git and NodeJS, if you don't have them
4. Install Docker Desktop for Windows (or another OS), than reboot
https://docs.docker.com/desktop/windows/install/
5. Open Docker and install WSL 2 based engine, than reboot
6. Open Docker and wait few seconds for the daemon to start. (you always need to run docker daemon for backend)
7. Write in gitbash\console in kanban-rest directory "docker-compose up" to start backend

# Deploy backend
1. Open cmd\gitbash:
git clone https://github.com/vitaly-sazonov/kanban-rest
git switch source
heroku create --region eu
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set LOG_CONSOLE=false
heroku config:set LOG_ERR_LEVEL=warn
heroku config:set LOG_INFO_LEVEL=info
heroku config:set JWT_SECRET_KEY=secret-key
heroku config:set SALT_SIZE=10
heroku config:set USE_FASTIFY=true
heroku git:remote -a bublikbackend
git push heroku source:master

# Deployed backend url
https://bublikbackend.herokuapp.com/
