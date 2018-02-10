FROM node:boron

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Dependencies
RUN apt-get update

RUN apt-get install python-pip python-dev build-essential -y

RUN pip install awscli

WORKDIR /usr/src/app

ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn && \
    mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/


# Bundle app source
ADD . /usr/src/app

RUN ./node_modules/.bin/gulp webpack

ENV AWS_ACCESS_KEY_ID AKIAIDKCIEURWJ3IIM6Q
ENV AWS_SECRET_ACCESS_KEY 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

RUN aws s3 sync dist s3://assets.limetray.com/assets/oo-manager/assets --acl public-read --region ap-southeast-1 --cache-control max-age=1296000

#RUN chown -R $(whoami) node_modules
# Sync with S3
#/usr/bin/aws s3 sync dist s3://assets.limetray.com/assets/oo-manager/assets --acl public-read --region ap-southeast-1

EXPOSE 3002
CMD [ "npm", "start" ]