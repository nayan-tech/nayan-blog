---
title: How to recognize Emotions using deep learning?
date: 2020-08-06 14:16:00
author: Sagar Gupta
category: AI
tags:
- Emotion Recognition
- AI
- HCI
---
![Emotions](https://neurohive.io/wp-content/uploads/2018/12/labeled-images.57bd-e1547550772626.jpg)

Emotion Recognition is used for categorizing the emotions into one of the 6 emotions through the images of face. Intially viola jones or other face detection algorithm is used for detecting the faces. Preprocessing is also used for standardizing the images into same sizes.

Facial Feature extraction is used in a number of applications including emotion detection. In the following approach various popular feature descriptors, including Gabor features, HOG, DWT were computed. We have fused features using Multiview Distance Metric Learning (MDML) which
 utilizes complementary features of the images to extract every known detail while eliminating the redundant   features.   Moreover   MDML  maps   the   features   extracted   from   the   dataset   to   higher discriminative space. The features belonging to the same class are brought closer and those that are from different classes are forced away by the MDML thereby increasing the accuracy of the classifier employed. CK+ Dataset has been used to conduct the experiments. Experimental results
represent the efficacy of the method is 93.5% displaying the potential of the recommended manner.

The human facial expressions contain clues to the emotional state of a person. Computation of emotion   of  a  human  through   facial  expression  has  been   a  central  topic  of  Human   Computer Interaction (HCI) research and a concern for researchers. The machines can utilize an emotion detection tool to understand the human emotions better and respond accordingly. Facial Expressions have been analyzed and put to use by various researchers such as in [6] the pain level can be recognized by detecting the facial expression. It can be used in case of patients who are mute or are not able to speak because of a disorder. [4] judges the concentration level of a viewer watching an advertisement. It has been employed for detecting various mental disorders such as depression and anxiety in [6].

As Paul Ekman showed in [1], the emotions are universally expressed in the same way regardless of the culture, nationality etc. Subtlety, variance of facial expression and complex nature of emotion further complicate the process. Six emotions have been defined by [1] in his paper. They are happy, Anger, Sad, Surprise, disgust and fear. Emotion detection is accomplished in three basic steps.

Firstly, the images are preprocessed and a high quality facial image is extracted from the original image from the dataset.

Secondly, feature descriptors are applied to the image for feature extraction. After the dimension reduction by a dimension reduction algorithm such as PCA, LDA, etc a classifier is used for classifying the image into one of emotion.

Since the Extended Cohn Kanade Dataset used is free from illumination variance, occlusion and head pose are some of the major concerns in many other datasets results shown are superior than most of the previous methods.

The  proposed  approach  is  novel  in detecting  and computing  the  emotions  through  Multiview Distance Metric Learning (MDML) introduced in [8]. The similar looking data from different classes are often misclassified. MDML helps to reduce this misclassification and fuses the results of various feature descriptors and extracts complementary features from them.

Moreover MDML maps the features extracted from the dataset to higher discriminative space. The features having affinity to the same emotion are brought closer while those having affinity to different emotion classes are moved as far as possible. The classifier is trained using this data.

- A. Emotion recognition 

The primary step in emotion detection is the localization of the face. CK+ dataset has been recorded in a controlled having illumination invariance and free from any occlusions. Hence, the facial image is always present in the image and priorly the face’s global position is known. Since wide variations are present in the scale and yaw, pitch, roll of the face, accurately localizing the face in different images is a very challenging task. The various obstructions and hindrances such as glasses and facial hair further complicates the task [1].

Viola-Jones [2] found an efficient answer for localizing the face. This method is based on AdaBoost learning and Haar-like features. Earlier it was developed for finding and detecting objects in an image [3]. It granted fast object detection for the task of real time usage. Keeping in mind the accuracy of the method, it is used for face localization.

- B. Feature Descriptor

Feature extraction indicates deriving pertinent data from the preprocessed, gray scaled images from dataset, that will be employed for the intent of emotion detection. It is a defying task due to the above mentioned reasons. A comprehensive method is to derive descriptors from images is to use Log-Gabor filters as done in [2] by nominating the random bandwidth for making the Log-Gabor filter. Another attainable answer is to use model based method for the facial expression recognition   [5]. The  authors  in   [5]  constructed   a  light  source  and   subject  independent   global representation of expressions by discovering of the set of 322 image sequences in CK+ database. [7] utilizes LBP features and finds the emotion.

- C. Multiview Distance Metric Learning

Motivated   by  the   discriminative   mapping   and   better   results   of   MDML  we  are   using   MDML proposed by [8] which attracts the features of the same class together and pushes away that belong to the different class. The data is then mapped to higher discriminative space and complementary features are extracted from the dataset. This ensures all the details of the image are taken into account. MDML pulls the similar data together and pushes away the different data away. In [8] the
authors used MDML for Pain intensity classification.

- D. Facial Expression Classification

Finally, after being mapped to higher discriminative space features are enforced into the classifier for identification of the six emotions. The most sought after classifiers include template matching, rule based classifier, neural networks and support vector machines (SVM). In SVM, a hyperplane is constructed with ample distance among the different emotion classes during the training phase.

While during test phase, the trained SVM model classifies the test image to one of the emotion classes. In [7] the authors utilize SVM with linear kernel for expression classification. There are six basic emotion classes which are Anger, Disgust, Happy, Sad, Surprise and Fear for analysis of proposed algorithm.

The author of this blog is working currently with <a href="https://www.nayan.co" >Nayan</a>

- Bibliography

- [1] Ekman, P., & Friesen, W. V. (1971). Constants across cultures in the face and emotion. Journal of personality and social psychology, 17(2), 124.

- [2]   L.   S.   Chen.   Joint   processing   of   audio-visual   information   for   the   recognition   of   emotional expressions in human-computer interaction. PhD thesis, University of Illinois at Urbana
Champaign, Dept. of Electrical Engineering, 2000.

- [3] Viola, Paul, and Michael Jones. "Rapid object detection using a boosted cascade of simple features." Computer Vision and Pattern Recognition, 2001. CVPR 2001. Proceedings of the 2001 IEEE Computer Society Conference on. Vol. 1. IEEE, 2001.

- [4] S. Lajevardi and M. Lech, “Facial expression recognition from imagesequences using optimized feature selection,” Image and Vision Computing New Zealand, 2008. IVCNZ 2008. 23rd International Conference.pp. 1–6, 2008. J. T. Cacioppo and L.G. Tassinary. Inferring psychological significance from physiological signals. American Psychologist, 45:16–28, January 1990.

- [5] Kaltwang, S., Rudovic, O., & Pantic, M. (2012). Continuous pain intensity estimation from facial expressions. Advances in visual computing, 368-377

- [6] Rathee, N., Vaish, A., & Gupta, S. (2016, April).  Adaptive  system to learn and  recognize emotional   state   of   mind.   In   Computing,   Communication   and   Automation   (ICCCA),   2016 International Conference on (pp. 32-36). IEEE.

- [7]   Rathee,   N.,   &   Ganotra,   D.   (2016).   Multiview   Distance   Metric   Learning   on   facial   feature descriptors for automatic pain intensity detection. Computer Vision and Image Understanding, 147, 77-86.

- [8] Dalal, N., & Triggs, B. (2005, June). Histograms of oriented gradients for human detection. In Computer Vision and Pattern Recognition, 2005. CVPR 2005. IEEE Computer Society Conference on (Vol. 1, pp. 886-893). IEEE.

