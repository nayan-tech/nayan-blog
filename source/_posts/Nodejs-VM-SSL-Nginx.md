---
title: Deploying Node.js application on VM with SSL and Nginx
date: 2020-08-23 18:44:46
author: Ishaan Ohri
category: Node.js
tags:
- Node.js
- SSL
- Nginx
- Deployment
- Nayan.co
- GCP
- pm2
---

{% asset_img nodejs.png  "Node.js application on VM" %}

Node.js since its inception in 2009 as a server side language has gained immense popularity due its quick response time and its scalable network architecture. Although it’s quite easy to use, deploying it along with the other essential tools can sometimes be tricky. 

### Prerequisites
* A Node.js application
* A running VM with Ubuntu on any online service (like GCP, AWS, Digital Ocean)

### Overview
* Installing Node.js
* Installing and Configuring Nginx 
* Configuring SSL certificate
* Starting application with pm2

### Installing Nods.js
Installing Node.js and npm onto the machine will be the initial steps. SSH into the VM.
Run the following commands:

```
$ sudo apt-get -y update
$ sudo apt-get install -y curl
$ sudo apt-get install -y make
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Just to check everything is installed correctly, type in the following commands to check the version of node and npm.

```
$ node -v
$ npm -v
```

You should expect an output as below:
![Node.js and npm version](output.png "Node.js and npm version")

### Cloning the repository from GitHub
Here I’ll be using a basic Node.js template written in TypeScript for demonstration purpose.

```
$ git clone https://github.com/IshaanOhri/Bulletproof-NodeJS-Template.git
$ cd Bulletproof-NodeJS-Template
$ npm install
$ npm run-script build
```

The last command will build the TypeScript project into JavaScript and place it in the `bin` folder in the same directory.

### Installing and Configuring Nginx 
We’ll be using Nginx as the reverse proxy. Initially the application will be accessible via port 80, but later we’ll configure SSL and we’ll use port 443 instead of port 80.

Run the following command to install Nginx:

```
$ sudo apt-get install -y nginx
```

Just to check whether Nginx is correctly installed, run the following command:

```
$ curl localhost
```

You should be able to see some html text, which is the home page of Nginx.
Now we’ll configure Nginx according to our requirement. Navigate to the sites-available folder by running the following command:

```
$ cd /etc/nginx/sites-available
```

Open the default file:

```
$ sudo vim default
```

Clear the entire file. Place the following code in the file. The `server_name` can be either the IP address of the machine or the domain name. In `proxy_pass`, the port is the port on which the application is running.

```
server {
  listen 80;
  server_name bulletproof-nodejs.ml www.bulletproof-nodejs.ml;

  location / {
        proxy_pass "http://127.0.0.1:3000";
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

Now restart Nginx to check that everything is correct:

```
$ sudo service nginx restart
```

### Configure SSL
To configure SSL certificate you will require a domain name. We’ll be using Let’s Encrypt SSL certificate and Certbot to install the certificate.

```
$ sudo apt update
$ sudo apt install -y snapd
$ sudo snap install hello-world
hello-world 6.4 from Canonical✓ installed
$ hello-world
Hello World!
$ sudo snap install --classic certbot
$ sudo certbot certonly --nginx
```

Copy the path to the certificate and key file.
Now change the content of the `default` file in `/etc/nginx/sites-available`

```
server{
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name bulletproof-nodejs.ml www.bulletproof-nodejs.ml;

        return 301 https://$host$request_uri;
    }

server{
    listen 443 ssl http2;
    server_name bulletproof-nodejs.ml www.bulletproof-nodejs.ml;

    ssl_certificate /etc/letsencrypt/live/bulletproof-nodejs.ml/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bulletproof-nodejs.ml/privkey.pem;

    ssl_protocols TLSv1.3;

    add_header Strict-Transport-Security "max-age=31536000" always;

    location / {
        proxy_pass "http://127.0.0.1:3000";
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Starting application with pm2
Now although the application can be starter by the basic `npm start` command, we want our application to restart in-case of any crash or reboot. For this we’ll be using pm2, which is a process manager.

Install pm2 as a global package:

```
$ sudo npm install -g pm2
```

Navigate back to your project:

```
$ cd ~/Bulletproof-NodeJS-Template
```

Generate pm2 process file:

```
$ pm2 ecosystem
```

This will generate `ecosystem.config.js`
Open the file:

```
$ vim ecosystem.config.js
```

Clear the file and place the following code in the file:

```
module.exports = {
    apps: [
        {
            name: 'bulletproof-nodejs-template',
            script: './bin/index.js',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                HOST: '127.0.0.1'
            }
        }
    ]
};
```

Here `name` is name of your process (it can be anything unique on the machine), `script` is the path to your starting script, `env` is the list of environment variables.

To start the application:

```
$ pm2 start ./ecosystem.config.js
```

Now pm2 will restart your application is case of any crash but to enable it to restart in case of reboot run the following commands:


```
$ sudo pm2 startup
$ pm2 save
```

### Conclusion

Now the Node.js application is setup on our VM and is available via port 443 where Nginx is acting like reverse proxy and pm2 restarts the application in case of crash or reboot. Now to test, navigate to your IP via any browser and you should see the application running.