#!/bin/bash

if [ $1 = "start" ]
then
  sudo nginx -c `pwd`/nginx.conf
  echo nginx start
fi


if [ $1 = "stop" ]; then
  count=`ps -ef | grep nginx | grep -v "grep" | wc -l`
  if [ $count != 0 ]
  then
    sudo nginx -s stop
    echo nginx stop
  fi
fi
