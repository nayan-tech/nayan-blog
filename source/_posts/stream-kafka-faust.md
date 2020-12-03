
# Basic stream processing using Kafka and Faust
#NAYAN
#Building tech to improve India

---
title: Basic stream processing using Kafka and Faust
author: Abhishek Bose
categories:
- ["Python"]
tags:
- Python
- NAYAN
- TECH FOR INDIA
- Stream Processing
- Kafka
- Faust
---


As the number of digital data transactions are increasing, it is becoming extremely important to get some insights out of this ever increasing data pile and organizations are looking towards to creating analytics of this data in a real-time manner.

Many analytics engines and systems use batch processing to perform operations on this data. But a drawback of batch processing is the delay which comes with it. Streams are continuous data chunks which flow from one node of operation to another using a channel. Streams help us generate results and predictions on data points at every point of time for which is appeared in the system. For example if you the want to analyze the data of number of users browsing a website and going over certain items , you would want to do it in real-time and that’s exactly where stream processing is helpful

In this blog, I will show you how to use Kafka ( a very popular distributed messaging queue) and Faust ( a python based distributed stream processing library) to create a simple stream processing application. For more information about Kafka , please visit [https://kafka.apache.org/](https://kafka.apache.org/)

Let’s start by setting up our Kafka and Zookeeper broker. We will be using docker to setup it up.

We create docker-compose file which will spin up our Kafka and Zookeeper containers.

<iframe src="https://medium.com/media/143f9b4503c623d4a1ddad364cf2f9ef" frameborder=0></iframe>

In order to start our Kafka and Zookeeper containers just the type the commands given below

    docker-compose -f docker-compose-kafka-zookeeper.yml up -d

This would start our Kafka and Zookeeper containers and will also create a topic called hit_count using the ***kafka-create-topics*** service.

In order to verify if our Kafka and Zookeeper containers running , execute the following command in the terminal

    docker ps

You will the Kafka and Zookeeper containers running as shown in Fig 1 given below

![Fig 1: Kafka and Zookeeper running in docker containers](https://cdn-images-1.medium.com/max/2850/1*uZP14-3EJoFfr-EeG2lOqQ.png)*Fig 1: Kafka and Zookeeper running in docker containers*

In order to send messages to a Kafka topic we will have to make a producer application which will send desired messages into a Kafka topic. The producer app we will be using is given below. We are using the ***confluent-kafka*** python library for using Kafka with python.

The producer app is fairly straightforward. The ***generate_random_time_series_data*** function creates dictionary with random value for key named as hit and along with that we have a userId. This dictionary is sent as a json message to the ***“hit_count” ***kafka topic in the ***kafka_producer ***function. The code snippet is given below.

<iframe src="https://medium.com/media/34224f090ecf5e65b0f7cb79a158b208" frameborder=0></iframe>

Now let’s build our Faust based streaming consumer. Faust is a stream processing library built using the python programming language by ***Robinhood.** *Faust uses the concepts of concurrent programming with heavy implementation of concurrent code using python’s ***asyncio*** library. It is highly performant and work on distributed systems and can be used to build real-time data pipelines easily. The best thing about Faust is the fact that it is written entirely on python. As a result, a programmer can use all other python libraries such as ***numpy,scikit-learn, tensorflow*** etc along with ***faust***.

<iframe src="https://medium.com/media/b486cc217e63ca9bf7743d016971010d" frameborder=0></iframe>

In the program written above we have defined a ***faust*** app on line 4. We mention the topic name which is “hit_counter” and also specify the ***kafka*** broker endpoint.

This program will essentially get a message from the ***kafka*** topic and filter out all messages where the value of hits is greater than 20. These values are then sent to an internal topic which is called the count_topic (line 13). The ***faust*** application reads the message from this topic and increments the value of the hit in a table.

Faust uses **RocksDB** (a c++ based in-memory database) for all it’s DB related operations. Every function in **faust** is an agent essentially. The “@app_agent” decorator is used to turn a function into a **faust** agent. The argument to this decorator is the topic from which data is read.

On line 6 we have defined a class named hitCount of the type *faust.Record. *This class is used to abstract the data type that is being expected from the *hit_count* topic and is the same data type which will be pushed into the internal count topic.

On line 16 we have defined a **RocksDb** table which will store the hit count per user. The table actually takes a key-value pair dictionary type approach and is very easy to maintain.

Now’s let start our **Kafka** producer and see data being processed as a stream by our **faust** worker.

In order to start the faust worker. Type the command given below. This will start a worker for faust app with the name hit_counter.

    faust -A hit_counter worker -l info

The output for this command is given in Fig: 2 below

![Fig 2: Faust worker ready to read from topic and process data](https://cdn-images-1.medium.com/max/2018/1*-5L-jCpVSwYBDKppWJARmg.png)*Fig 2: Faust worker ready to read from topic and process data*

To run the **Kafka** producer hit the following command

    python kafka_producer.py

Once this producer pushes all messages to the hit_counter topic, it will be picked up by the faust app and further processing would be done on it by the agents.

![Fig 3: Data recieved by the faust app in the hit_counter topic.](https://cdn-images-1.medium.com/max/2134/1*1nHoKivUdjHEjfabw7BgEQ.png)*Fig 3: Data recieved by the faust app in the hit_counter topic.*

In Fig 3 you can see that the the **json** message has been received which was sent by the Kafka producer. The message contains the userId and the hit count value as well. This data is now filtered by the other agent and saved in **RocksDB**. The processing by the second agent is show below in Fig 4.

![Fig 4: Faust agent is incrementing the database in real-time for the incoming messages.](https://cdn-images-1.medium.com/max/2318/1*z017jbMZI2SyeGeP9g09lw.png)*Fig 4: Faust agent is incrementing the database in real-time for the incoming messages.*

As seen in Fig 4, all the incoming messages are sorted based on the hit count and the number of times such a value is seen is incremented for the corresponding userId in our database.

This was a simple implementation of **Faust** with python. Stream analytics has lots of scope keeping data science and machine learning in mind. Since **Faust** is entirely python, the possibilities are endless.
