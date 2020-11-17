---
title: A simple way to monitor and restart services using Monit
date: 2020-11-13 12:47:37
author: Saksham Goyal
category: AI
tags:
- NAYAN
- Machine Learning
- Deep Learning
- NAYANINDIA
- Road Safety
- Traffic Violation
---
{%asset_img Monit.png "Monit"%}
![Monit](/blog/AI/To-monitor-and-restart-services-using-Monit/Monit.png)

# A simple way to monitor and restart services using Monit

Many times we might have services that are essential to be up and running in the background. But they shutdown/ stop working due to the server/ OS being patched or rebooted.
> [**Monit](https://mmonit.com/monit/) **is a small Open Source utility for managing and monitoring Unix systems. Monit conducts automatic maintenance and repair and can execute meaningful causal actions in error situations.

Lets start by installing monit, which is very simple…..

    sudo apt-get install monit

Now we can edit the configuration file, which on the linux machine can be located at /etc/monit/monitrc

We can change the timings (in seconds) for how often the daemon is going to check for the status of the service (whether the service is running or not).

    set daemon 60            # check services at 1-minute intervals
      with start delay 240    # delay the first check by 4-minutes 

By default Monit check immediately after Monit start… You can simply comment or remove the 2nd line(with start delay 240)

Monit also comes with its own simple web interface and can be made available on the local network (since it’s all behind a firewall and not public anyway, if your not on a trusted network or to just want to be more secure you might want it listening on https and also protected by a login since the web interface allows you to start/stop jobs/commands). So incase we want to enable the Monit HTTP Interface, we can edit the following lines accordingly

    set httpd port 2812 and
      use address 0.0.0.0  # only accept connection from localhost 
      allow 0.0.0.0/0.0.0.0 # allow localhost to connect to the server 
         allow admin:monit # require user 'admin' with password 'monit'

That’s it for the configuration file, though you might want to read through it and adjust other options for your environment or setup. We can then use monit with the -t flag to verify the syntax of the configuration file is correct:

    $ sudo monit -t
    Control file syntax OK

Now, If we want Monit to also start at boot so I need to edit the service configuration file at /etc/default/monit and ensure “START” is set to “yes”.

    # Set START to yes to start the monit
    START=yes

Below are some example configurations:

**Nginx**

Now to create a check for Ngix we have to drop in the process definition file into the config-directiory of Monit. So we can create the file /etc/monit/conf.d/ngix and the contents are:

    check process nginx with pidfile /run/nginx.pid
        start program = "systemctl start nginx" 
        stop program  = "systemctl stop nginx"

**Python**

We can also start a python script. Just to try it out, I created a small Flask API to deploy any Machine Learning/ Deep Learning (AI) model and wanted to restart it everytime the system restarts. So for it I created the file /etc/monit/conf.d/flask_api and the contents are:

    check process flask_api with pidfile /var/run/flask_api.pid
       start = "/bin/su - user -c 'cd path; /usr/bin/python3/app.py'"
       stop = "/usr/bin/killall python3"

    # path: the full dir_path Ex- /home/user/Desktop/Flask_API

And that’s it. It will automatically restart any service or script. Moreover it is very simple to setup. Monit is quite extensible and can be easily customized or expanded for monitoring all kinds of services for small and large networks.

Find some more exciting AI blogs [here](https://nayan.co/blog/categories/AI/ "AI blogs")
The author of this blog currently works at [NAYAN](https://nayan.co)

