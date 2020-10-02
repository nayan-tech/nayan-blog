
# Getting started with FastAPI
#NAYAN
#Building tech to improve India

---
title: Getting started with FastAPI
author: Abhishek Bose
category: Python
tags:
- Python
- NAYAN
- TECH FOR INDIA
- RestAPIs
---

Rest APIs are beautiful pieces of software that enable applications to communicate with a database or with other software very effectively.

The kind of operations which you can perform are as follows are **GET, POST, PUT, DELETE, TRACE**, etc. The **GET** method is generally used for fetching some information from the backend. For example, if an app (web/phone) wants to fetch some information from the database, it will use the **GET** method. **POST** is used for creating new information. **PUT** is used for updating already existing records. **DELETE**, as the name suggests is used for the deletion of records in a database. The **TRACE** method is used for debugging purposes and used for checking what is received on the other end when a request is invoked.

Since ages **FLASK** has been the most famous python framework for creating REST services. It is easy to use and deploy and can be used effectively for creating production-grade microservices.

**FLASK** has its own set of disadvantages though. It is not suitable for large applications. No ***admin ***site support. Does not provide any ***authentication*** mechanism. Lacks the powerful ***ORM*** tool which allows CRUD operations with any database.

![Ref: [https://github.com/tiangolo/fastapi](https://github.com/tiangolo/fastapi)](https://cdn-images-1.medium.com/max/2046/1*du7p50wS_fIsaC_lR18qsg.png)*Ref: [https://github.com/tiangolo/fastapi](https://github.com/tiangolo/fastapi)*

Recently, some extremely good men out there have come up with brand new framework for Python to mitigate the issues mentioned above, called FastAPI
> [https://github.com/tiangolo/fastapi](https://github.com/tiangolo/fastapi) (repo link)

The makers and users of this framework claim that the APIs created from FastAPI are literally very fast. As fast as Node and Go based Rest APIs.

The official FastAPI website has multiple testimonials from developers working in major tech firms proving the effectiveness of this framework.

Without much ado let’s go ahead and write a few APIs using this brand new framework and see it in action.

Use pip to install **fastapi **and **uvicorn **as shown in fig 1 below. **Uvicorn** is **ASGI** server which we will be using for production.

![](https://cdn-images-1.medium.com/max/2712/1*EvRPkWbW2XGxRIvkawDoVw.png)

![Fig1: Installing fastapi and uvicorn using pip](https://cdn-images-1.medium.com/max/2712/1*_kh9XYxGQZ1eIqhG1-ccIw.png)

We will go ahead and write a simple GET API and check the response from our browser. We will also explore the admin panel for FastAPI.

![Fig 2: GET api which returns a string](https://cdn-images-1.medium.com/max/2000/1*XEdqPWS1RU8_BbLoSi3l1Q.png)

As shown in Fig 2, we have defined a route called “/” which returns a static response.

Start the uvicorn server using the command shown in Fig 3 and you should see the info showing that the server is up and running

![Fig 3: Uvicorn server started](https://cdn-images-1.medium.com/max/2000/1*COURon_BP6Q7gldGAnWsbQ.png)

Hitting the address [***http://127.0.0.1:8000](http://127.0.0.1:8000) ***in our browser window returns the expected response as shown in Fig 4.

![Fig 4: Default GET response](https://cdn-images-1.medium.com/max/2000/1*Vx96QyMCjfPOB0v9GKROiQ.png)

One of the most coolest features of FastAPI is the internal automatic API documentation.Visiting [***http://server_IP:Port/docs#/](http://127.0.0.1:8000/docs#/) ***opens up this cool dashboard which can be used to view and test out the APIs created (Fig 5). When running on a local machine the URL would be [***http://127.0.0.1:8000/docs#/](http://127.0.0.1:8000/docs#/)***

![Fig 5: Dashboard to list and debug APIs](https://cdn-images-1.medium.com/max/3362/1*HIViwgVu7Vf6VOl6HW-ZDg.png)

Now we will create a POST api which let’s us upload a CSV file and convert it to json. That json is then returned in the API reponse

First we will go head and write the functions needed to convert bytes to string and then convert that to json using pandas Dataframe. Fig 6 shows the two functions which will be needed for this task. Inside ***convertBytesToString , ***we call ***parse_csv ***which converts our pandas dataframe to a json file.

![Fig 6: Parsing our CSV and converting it to json](https://cdn-images-1.medium.com/max/2000/1*lkVr-MyjwvAhg2lkkTbRJQ.png)

Next, we will put down our POST method to upload the CSV file from the client-end and receive a json from the server.

Fig 7 demonstrates the process of creating this API.

On the top we import the ***UploadFile*** and ***File*** class from fastapi. ***UploadFile ***is a very powerful class and actually presents the file in a spooledfile format. Spooled files are actually temporary files stored in memory until the file size exceeds the max size specified. As result spooled files are extremely fast to work on and reduce the I/O needed for files on disc.

Next we import the ***convertBytesToString ***function from our ***parse_csv*** file.

![Fig 7: parsecsv post api to convert csv to json](https://cdn-images-1.medium.com/max/2252/1*KBUXJzZATZNoEqqZqs4Bow.png)

We declare a **POST **method called “***/csv/***” which has the ***parsecsv*** method defined to parse our csv file. The parameter is a file of type ***UploadFile.***

As you can see that we have used the async and await keyword to asure concurrency in our API methods. We will talk more about the usage of these types in later posts.

The variable to ***json_string ***receives the parsed csv file which is returned in the API response.

Now let’s go ahead and test out our newly created API.

Navigate to the FastAPI api debugging link mentioned top. You should see your newly created API listed (Fig 8) , along with the API which was previously created (***getName***)

![Fig 8: Post API on our API debugging dashboard](https://cdn-images-1.medium.com/max/3246/1*sdT_gPMXWixoOCqhX9duaA.png)

In order to test the API out we will have to create a dummy csv file. I have created a csv called grades.csv (Fig 9) .This will be used for our testing.

![Fig 9: Dummy csv for testing](https://cdn-images-1.medium.com/max/2000/1*rsL9A5iL-RJf9M4-la6hwg.png)

Let’s upload our csv file and check the response on the dashboard. By clicking on our newly created API, you should a browse button, which prompts the user to upload a file. The Execute button below that hits the API with the the correct params (Fig 10).

![Fig 10: Upload the file using the browse button. Hit execute to test out your new API](https://cdn-images-1.medium.com/max/2930/1*kS3AAjZj1gaKhNGgau9Hgg.png)

Fig 11 shows the result on hitting the ***Execute ***button. The Response body shows the json created from the csv file. I agree the json could be formatted in a much better way 😄, but the goal to parse the csv successfully using FastAPI was achieved.

Fast API is a great framework which can also be used to build APIs for Machine Learning tasks as well. Artifical Intelligence is on the rise these days and FastAPI can help in building services which can be easily deployed on production.

![](https://cdn-images-1.medium.com/max/2838/1*d19dAtrKXLRXRHmJFScxNQ.png)
> I will be posting more blogs with **FastAPI** as the major tool and will be creating REST services for AI purposes as well.
> Thank for reading. Cheers!!
