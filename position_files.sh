#!/bin/bash

sudo rm /var/www/html/index.html

sudo mv /home/ubuntu/www/index.html /var/www/html
sudo mv /home/ubuntu/www/public /var/www/html
sudo mv /home/ubuntu/www/src /var/www/html

sudo nohup busybox httpd -f -p 8080 &
