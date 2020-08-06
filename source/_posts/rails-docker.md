---
title: Deploying a Rails application to a Docker container
date: 2020-07-25 08:00:00
author: Anuj Middha
category: Rails
tags:
- Ruby
- Rails
---

{% asset_img rails-docker.jpg "Rails and Docker'Rails and Docker'" %}

Docker has gained immense popularity over the past few years as a tool for depploying your applications to production. It allows you to package you application and all of its dependencies in an image, ready to be deployed anywhere.

Deploying a Rails app to Docker can be a bit tricky, so here's a handy step by step guide.

### Steps

- Install Docker
- Create Dockerfile
- Create docker-compose.yml
- Build the image
- Deploy

#### Installing Docker

If you are on Mac or Windows, its best to install [Docker Desktop](https://www.docker.com/products/docker-desktop) which installs all the necessary tools for you.

#### Dockerfile

It all starts with the Dockerfile. This is where you define how your image needs to be built.

TLDR;
```
FROM ruby:2.5.3

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

RUN mkdir /src
WORKDIR /src

ENV BUNDLER_VERSION=2.1.4
RUN gem install bundler -v 2.1.4

COPY Gemfile Gemfile.lock ./
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle install

COPY . ./

#COPY entrypoint.sh /usr/bin/
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 3000
```

You start by choosing the base image with your project Ruby version, and install the required libraries on the next line.

Then you create the source directory for your code and set it as your working directory.

Next, set the bundler version to the one from your Gemfile and install it.

Copy the Gemfile and Gemfile.lock, and install all dependencies.

Once the dependencies are installed, we copy the entire current directory to the image.

Finally, we define an entrypoint for the image. This is a script that will be run when the image is first started. And then we expose the port on which our app will run.

#### docker-compose.yml

With the Dockerfile, we can build our application image. But it depends on other services as well, such as a database or maybe Redis. This is where Docker Compose comes into the picture.

We'll create another file docker-compose.yml
```
version: '3'
services:
  db:
    image: postgres
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/src
    ports:
      - "3000:3000"
    depends_on:
      - db
```

We have two service, one for the database and one for the application. By defining the web service to be dependent on the db service, we tell Compose to start db before the web service.

#### Entrypoint

Finally, we define the entrypoint file that describes the tasks to be run when starting a new image.

entrypoint.sh
```
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /src/tmp/pids/server.pid

# Database migration
RUN bundle exec rails db:migrate

# Then exec the container's main process (what's set as CMD in the Dockerfile).
bundle exec rails s -b 0.0.0.0
```

*One thing to note is that you should not have both the CMD and entrypoint in Dockerfile. Took me a few many hours to figure this out.*

#### Build

To build the container, run the following command,
```
$ docker-compose build
```

#### Deploy

The app can be run locally by
```
docker-compose run web rails new . --force --no-deps --database=postgresql
```

You can upload the image to a registry service such as GCR. First tag the image, then push it to GCR,
```
docker tag <image-name>:latest gcr.io/<organization>/<image-name>:latest
docker push gcr.io/<organization>/<image-name>:latest
```

And you are done. You can now deploy this image to GKE or any other Kubernetes engine.
