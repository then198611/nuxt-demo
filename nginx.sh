#!/bin/bash

if [ $1 = "start" ]
then
  sudo nginx -c `pwd`/nginx.conf
  echo nginx start
fi


if [ $1 = "stop" ]
then
  sudo nginx -c `pwd`/nginx.conf -s stop
  echo nginx stop
fi
