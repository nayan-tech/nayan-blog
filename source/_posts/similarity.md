---
title: Similarity Analysis and Clustering Technique
date: 2020-08-17 18:45:42
author: Nandini Bajaj
categories:
- ["AI"]
tags:
- Computer Vision
- [here](https://nayan.co/blog/categories/AI/ "AI")
- Machine learning
- Deep learning
---

# SIMILARITY ANALYSIS AND CLUSTERING TECHNIQUE

![cover](COVER1.jpg)

Have you been working with loads of image data points? \
Are you facing an issue cleaning and verifying the data? 
Are you repeatedly overlooking minor mistakes made at an early stage in the dataset? \
Do you feel there is a bias towards some data points because they are higher in number? 

So would it not be great if you could focus your attention on only unique images from a huge dataset? 
In this blog I am going to share a way that can help you get rid of identical images. 

Data collected from the real world is dynamic and unpredictable. We might be fetching thousands of identical images and just a few unique data points in terms of region of interest, lighting conditions and other factors based on your area of focus, and that is not very favourable for a Machine Learning model.
Also saving identical images or data points increases the cost of the product in ways we might not be keeping track of like time and money spent in storage, maintenance, data management, data cleaning, and data annotation.

To solve this problem I implemented a similarity check model, and clustering using tensorflow 2.0.
Used a VGG16 model with pretrained weights of imagenet dataset, followed by feature extraction of data points using transfer learning.

## SIMILARITY

In order to get the similarity percentage between any 2 images or to find the K nearest neighbours of it, I used Spotify’s ANNOY library.

### _ANNOY - Approximate Nearest Neighbours Oh Yeah !!_


![annoy](annoy.png)

Annoy uses the concept of binary trees and forests to get to approximate nearest neighbours.
Each tree is constructed by picking two points at random and splitting the space into two by their hyperplane, and we keep splitting in the subspaces recursively until the points associated with a node is small enough to have k points in every section. 
The forest is traversed in order to obtain a set of candidate points from which the closest to the query point are returned (with priority queue).
Once we get the candidate points closest to the query point we have the flexibility to further filter our datapoints based on the metric of choice (i.e. cosine, euclidean). 

Using annoy is quite simple and extremely cool. Since it is an Approximate Nearest Neighbour algorithm the results are approximate but can be improved by tweaking the two parameters : number_of_trees and search_k, a higher value of both corresponds to better results. 

![ann](ann.png)

## CLUSTERING

Annoy makes visualisation of nearest neighbours very easy. However, to find a cluster of all similar images without limiting to a single K value DBSCAN is a great choice. 

![cluster](cluster.png)

### _DBSCAN - Density Based Spatial Clustering of Applications with Noise_


![dbscan](dbscan.png)

It is a popular clustering method provided by sklearn library and used in Machine Learning.
It divides the dataset into n dimensions. For each point in the dataset it creates an n dimensional shape around it and then counts the number of datapoints that fall within that shape. Each of these shapes is called a cluster. DBSCAN iteratively expands the cluster/shape by checking each datapoint within the shape and also the ones in the vicinity. 


By specifying the similarity threshold (eps), the similarity metric, and the minimum number of samples for a shape to be marked as a cluster you can customize your results ( specifying min_samples to a value higher than 1 helps you get rid of the noise ).

Once DBSCAN is defined you have to fit the feature vector of the datapoints for DBSCAN to give you the most awaited cluster details. You can get information like number of clusters, number of datapoints in every cluster, and the details of the datapoints belonging to the clusters.

![db](db.png)

Once these vital details are obtained we are free to play with our datapoints and clusters.
I simply maintained a list of labels, and path corresponding to every datapoint. 

_To group similar image:_

Iterating over the list, whenever a new label was encountered I made a new folder corresponding to it and added the image to that very folder, also following images of the same label to it. 

_To delete similar images:_

Iterating over the same list only the first image for every unique label was kept and the rest were deleted.

### Benefit:
After applying these techniques to my dataset, a set of 500 images reduced to 28 which means the cost spent on annotation was reduced to approximately 6% of existing.

## CONCLUSION

We went through some very basic algorithms, libraries and methods to be able to manage data and use similarity models. 

You can read more about ANNOY [here](https://github.com/Houzz/annoy2 "ANNOY") and about DBSCAN [here](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html "DBSCAN").

Find some more exciting AI blogs [here](https://nayan.co/blog/categories/AI/ "here")

_Try it out !!!_





