# service supervisor restart 
supervisorctl stop gamebbs
git pull
supervisorctl start gamebbs
