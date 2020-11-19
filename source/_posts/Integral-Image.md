---
title: How to calculate Integral Image or Summed Area Table
date: 2020-11-19 16:31:19
author: Anubhav Rohatgi
category: AI
tags: 
- computer vision
- machine learning
- ml
- nayan
- anubhav rohatgi
- algorithm
---
![Featured](https://computersciencesource.files.wordpress.com/2010/09/adding_1.png)

# Integral Image or Summed Area Table

An Integral image is where each pixel represents the cumulative sum of a corresponding input pixel with all pixels above and left of the input pixel. It enables rapid calculation of summations over image sub-regions. Any rectangular subset of such sub-region can be evaluated in constant time.

This concept was introduced by Viola & Jones and is also known as *Summed Area Table*. allow fast computation of rectangular image features since they enable the summation of image values over any rectangle image region in constant time i.e. computational complexity of O(1) instead of O(n).

An Integral Image is defined as

![Equation for calculating integral at pixel (x,y)](https://cdn-images-1.medium.com/max/2000/1*HuWIaHKKvoDeW8nb7Tv_bA.png)*Equation for calculating integral at pixel (x,y)*

The SAT method has

* Space Complexity: O(M*N)

* Time Complexity for Range Sum Query: O(1)

* Time Complexity to Update a Value in Matrix: O(M*N)

* Efficiently computes the statistics like mean, standard deviation, etc in any rectangular window

**Integral Image Calculation**

![Calculation technique](https://cdn-images-1.medium.com/max/2000/1*_7Njr9cFmFHPenoRp6h-zg.gif)*Calculation technique*

**Fast Area Calculation**

![Area calculation for rectangular sub region of image](https://cdn-images-1.medium.com/max/2000/1*PJej9r3CaOhyYIEImjaEBQ.gif)*Area calculation for rectangular sub region of image*

Sum = Bottom right + top left — top right — bottom left

### **Uses**

* region based statistical measures e.g. area sums, covariance, co-occurrence matrix

* Texture mapping

* detection of feature — HAAR

* adaptive threshold

* stereo correspondence

* The concept of integral images can be easily extended to continuous domain (using limits) and multidimensional images.

* O(1) Bilateral with Constant Spatial Filters


```cpp
    class NumMatrix {
    public:
        vector<vector<int>> sat;
        bool empty=true;
        
        NumMatrix(vector<vector<int>> &img) {
            int row = img.size();
            if(row == 0) return;
            int col = img[0].size();
            if(col == 0) return;
            empty = false;
            
            sat = vector<vector<int>>(row + 1, vector<int>(col + 1));
            
            for(int i = 1; i <= row; i++)
                for(int j = 1; j <= col; j++)
                    sat[i][j] = sat[i-1][j] + sat[i][j-1] - sat[i-1][j-1] + img[i-1][j-1];
        }
        
        int sumRegion(int row1, int col1, int row2, int col2) {
            return empty? 0 : sat[row2+1][col2+1] - (sat[row2+1][col1] + sat[row1][col2+1] - sat[row1][col1]);
        }
    };
```
**References**

1. [http://apurvsaxena.blogspot.com/2012/06/integral-image.html](http://apurvsaxena.blogspot.com/2012/06/integral-image.html)

1. Speed-up Template Matching through Integral Image based Weak Classifiers by Wu.Tiriui et al. [[Link](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.730.9011&rep=rep1&type=pdf)]

1. Integral Images for Block Matching, Limare et. al. [[Link](https://www.ipol.im/pub/art/2014/57/article_lr.pdf)]

1. [https://datasciencechalktalk.com/2019/07/16/haar-cascade-integral-image](https://datasciencechalktalk.com/2019/07/16/haar-cascade-integral-image/)

1. Constant Time O(1) Bilateral Filtering by Porikli Fatih [[Link](https://inc.ucsd.edu/mplab/wordpress/wp-content/uploads/CVPR2008/Conference/data/papers/503.pdf)]

1. [https://www.slideshare.net/egorodet/cpu-is-in-focus-again-implementing-dof-on-cpu](https://www.slideshare.net/egorodet/cpu-is-in-focus-again-implementing-dof-on-cpu)

1. [https://arxiv.org/pdf/1907.06154.pdf](https://arxiv.org/pdf/1907.06154.pdf)
