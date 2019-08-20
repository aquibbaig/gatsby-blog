---
title: "[GSoC 2019] Project Report - Extending LibreCores.org in terms of user interactivity and feedback"
date: '2019-08-18T14:12:03.284Z'
tags: [tag:Librecores]
---

> LibreCores.org lists free and open source **“IP Cores”** on the website for the community to view and use. **"LibreCore"** is such an IP core that is created and distributed in the open source spirit. 

### Introduction
- Currently the website extracts the project readme, license and calculates code quality(from issues, commits, trackers, etc. in the repository) and renders them on the project page, along with links to the project homepage and git repository. It also has a classification system for better discoverability of such projects. Also there is an indexed search using Algolia. 

### Abstract
- A user browsing for “IP cores” on LibreCores may be willing to give his/her opinion on a
particular project. Feedback from other users plays a major role in assessing the quality of a
project on LibreCores. This feedback can both be structured in the form of likes or short
questionnaires, or unstructured in the form of plaintext reviews or comments . Also, a notification
system is a critical part of every task management application. The users need to be informed
about events that happen in the system and then the community may want to notify their
audience with relevant information. This can be accomplished via emails or text messages to
notify users of various events and extract useful information.

### Timeline
- In this project, I worked on developing a **Notification system** for LibreCores. In the existing website, there was little scope for conveying information to the audience/users as well as for user interactivity. The community may want to convey some useful information about some event to the users, so I worked on a mechanism to deliver this idea. The plan was to build a system that will generate a notification message after an event has occurred. As a user, I can click on the bell icon on the navbar and view the list of notifications
that I have received and if I’m not logged into the website currently, can receive notifications as
an email from the community. So, my work was divided into the following steps:
    1. Improvement of UI Libraries
    2. Design and implement a notification system for librecores
    3. Improvement of code infrastructure
    4. Design the user feedback system

### Resources
1. The proposal for my project can be found [here](https://docs.google.com/document/d/1RHJmSgOreDmp-kyAUarVN0VT6rKqNjqVRzobd0bXR-U/edit).

2. The entire Project tracking logs can be found [here](https://github.com/librecores/librecores-web/projects/5).

3. The links to all the issues that I have created/worked upon during my GSoC period is 
[here](https://github.com/librecores/librecores-web/issues?utf8=%E2%9C%93&q=is%3Aissue+author%3Aaquibbaig+).

4. The links to all the Pull Requests that I have created during my GSoC period are 
[here](https://github.com/librecores/librecores-web/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Aaquibbaig+).

5. The corresponding project can be found on [GSoC 2019 website](https://summerofcode.withgoogle.com/projects/#5913738987700224).

### Coding Period
1. UI Enhancements
    - During the community bonding period, we found out that the current Assetic bundle was going to be deprecated. So, we had to move on to modern frontend asset management tools such as webpack encore. Migrating legacy
    code to webpack is a very painful task but in the end it's worth it. We had a handful of issues in the frontend such as [cache busting](https://github.com/librecores/librecores-web/issues/260), [deprecated assetic bundle](https://github.com/librecores/librecores-web/issues/292) and by using webpack to handle all our frontend assets, we were able to solve all of them 
    at one go. Also, features such as hot reloading and file watchers came to be very useful.
    The entire Pull Request can be found [here](https://github.com/librecores/librecores-web/pull/353)

2. Notification System
    - This turned out to be the most vital project goal in the whole GSoC timeline. 
    ##### Design of the Notification System
    My mentor Philipp and I had thought of a design beforehand for the notification system but in course of implementation there was
    a major problem to synchronise notifications. We won't want UI lag that would be caused in processing the notification itself. We came up with an architechture enhancement where every notification is processed in the background. 

    ![Notification Architecture](https://user-images.githubusercontent.com/1467123/59163316-43c43c80-8af7-11e9-9cca-d53e5e747f10.png)

    ##### RabbitMQ
    A publish subscribe AMQP based message queue to which we would send 
