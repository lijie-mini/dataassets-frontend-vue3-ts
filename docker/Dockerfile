FROM nginx:1.17.5

ARG NAME
ARG VERSION
ARG JAR_FILE
ARG PROJECT_NAME

LABEL name=$NAME \
      version=$VERSION

COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
#COPY home-service /usr/share/nginx/html/home-service
COPY $PROJECT_NAME /usr/share/nginx/html

ADD getParams.sh /usr/share/nginx
RUN tr -d '\r'</usr/share/nginx/getParams.sh> /usr/share/nginx/getParams.unix \
	&& rm -f /usr/share/nginx/getParams.sh \
	&& mv /usr/share/nginx/getParams.unix /usr/share/nginx/getParams.sh \
	&& chmod u+x /usr/share/nginx/getParams.sh

#设置环境变量 
ENV APP_NAME="home-service"
#执行startup.sh并打开日志
ENTRYPOINT /usr/share/nginx/getParams.sh && nginx -g "daemon off;"
# 本App自己的端口
EXPOSE 90
