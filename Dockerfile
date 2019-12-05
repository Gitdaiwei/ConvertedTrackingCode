FROM registry.cn-shenzhen.aliyuncs.com/dankal/nodejs

ENV VIRTUAL_HOST www.trubrush.com
ENV LETSENCRYPT_HOST www.trubrush.com
ENV LETSENCRYPT_EMAIL ivancai@dankal.cn

COPY . /app

