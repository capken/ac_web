#!/bin/bash

cd /home/allen/codes/ac_web/web/
unicorn -c deploy/unicorn.rb -D
sudo cp deploy/nginx.conf /etc/nginx/nginx.conf
sudo /etc/init.d/nginx start
