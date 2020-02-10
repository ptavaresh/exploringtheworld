FROM ubuntu:16.04
MAINTAINER Pedro Tavares

RUN apt-get update

RUN apt-get -y install apache2 
RUN apt-get -y install wget
RUN apt-get -y install unzip


#Front end
RUN wget https://github.com/ptavaresh/exploringtheworld/archive/master.zip
RUN unzip master.zip
RUN rm -rf master.zip
RUN cp -a /exploringtheworld-master/* var/www/html/

EXPOSE 80

CMD /usr/sbin/apache2ctl -D FOREGROUND
