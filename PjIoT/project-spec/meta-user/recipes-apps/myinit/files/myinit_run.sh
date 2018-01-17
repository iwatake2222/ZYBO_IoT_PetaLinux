#!/bin/sh

# create named pipe b/w python and C applicatioin
mkfifo /home/root/pipe_p2c
mkfifo /home/root/pipe_c2p
chmod 666 /home/root/pipe_p2c
chmod 666 /home/root/pipe_c2p

# run iot_project(C application) as background
# this should be another daemon (I'm just lazy)
myip_controller.elf &

# start server daemon
cd /home/root/www/ServerIoT/
python main.py
