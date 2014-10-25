#!/bin/bash

cd /home/allen/codes/ac_web/web/
cat ./tmp/pids/unicorn.pid | xargs kill -QUIT
sudo /etc/init.d/nginx stop
