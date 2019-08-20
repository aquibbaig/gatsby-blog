---
title: "[GSoC 2019] Project Report - Extending LibreCores.org in terms of user interactivity and feedback"
date: '2019-08-18T14:12:03.284Z'
tags: [tag: Librecores]
---
 
> LibreCores.org lists free and open-source*“IP Cores”** on the website for the community to view and use. **"LibreCore"** is such an IP core that is created and distributed in the open-source spirit.
 
### Introduction
- Currently the website extracts the project readme, license and calculates code quality(from issues, commits, trackers, etc. in the repository) and renders them on the project page, along with links to the project homepage and git repository. It also has a classification system for better discoverability of such projects. Also, there is an indexed search using Algolia.
 
### Abstract
- A user browsing for “IP cores” on LibreCores may be willing to be informed
about events that happen in the website and the community may want to notify their
audience with relevant information. Notifications are powerful tools to inform users of project crashes, introduce them to new features & updates, and inform them about new messages. These are system generated
by the app. This can be accomplished via emails or text notifications to notify users about various events.
 
### Timeline
- In this project, I worked on developing a **Notification system** for LibreCores. In the existing website, users could add their projects to LibreCores, add classifications and discover other projects efficiently. There was scope for developing user interactivity on the website in the form of system generated notifications,so I worked on an idea to deliver this. The plan was to build a system that will generate a notification message after an event has occurred. As a user, I can click on the bell icon on the navbar and view the list of notifications that I have received and if I’m not logged into the website currently, can receive notifications as an email too. So, my project was divided into the following phases:
   1. Improvement of UI Libraries
   2. Design and implement a notification system for LibreCores
   3. Improvement of code infrastructure
   4. Write tests for the implementation
 
### Resources
1. The proposal for my project can be found [here](https://docs.google.com/document/d/1RHJmSgOreDmp-kyAUarVN0VT6rKqNjqVRzobd0bXR-U/).
 
2. The entire Project tracking logs can be found [here](https://github.com/librecores/librecores-web/projects/5).
 
3. The links to all the issues that I have created/worked upon during my GSoC period is
[here](https://github.com/librecores/librecores-web/issues?utf8=%E2%9C%93&q=is%3Aissue+author%3Aaquibbaig+).
 
4. The links to all the Pull Requests that I have created during my GSoC period are
[here](https://github.com/librecores/librecores-web/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Aaquibbaig+).
 
5. The corresponding project can be found on [GSoC 2019 website](https://summerofcode.withgoogle.com/projects/#5913738987700224).
 
# Coding Period
##Improvement of UI Libraries
- During the community bonding period, we found out that the current Assetic bundle was going to be deprecated. So, we had to move on to modern frontend asset management tools such as webpack encore. Migrating legacy
   code to webpack is a very painful task but in the end it's worth it. We had a handful of issues in the frontend such as [cache busting](https://github.com/librecores/librecores-web/issues/260), [deprecated assetic bundle](https://github.com/librecores/librecores-web/issues/292) and by using webpack to handle all our frontend assets, we were able to solve all of them
   at one go. Also, features such as hot reloading and file watchers came to be very useful.
   The Pull Requests I made in this period are:
    1. Migrate to webpack - [#353](https://github.com/librecores/librecores-web/pull/353)
 
##Design and implement a notification system for LibreCores
- This turned out to be the most vital project goal in my GSoC timeline.
   ### Design of the Notification System
   My mentor Philipp Wagner and I had thought of a design beforehand for the notification system but in course of implementation there was
   a major problem to synchronise notifications. We won't want UI lag that would be caused in processing the notification itself. It would cause a significant performance drop when the personalized messages need to be built on the spot when a user triggers the notification. An alternative is to generate the message when a user visits the page. However, this would decrease the performance slightly for many users and each notification, and it would be difficult to send the notification to any other destination, like email or with web notifications.
   
   Therefore, the best option is to process the messages in a background process where the heavy lifting of generating the messages do not affect the performance of users. We came up with an architechture enhancement where every notification is processed in the background.
 
   ![Notification Architecture](https://user-images.githubusercontent.com/1467123/59163316-43c43c80-8af7-11e9-9cca-d53e5e747f10.png)  
 
   We used **RabbitMQ** for our use case publish subscribe AMQP based message queue to which we would send notifications to a queue and we created consumers which would pick them up directly from the queue and execute them parallely. It is a message broker that helps to manage the real-time message exchange on web server.
 
   In this phase, I made the following PR's:
   1. [GSoC 2019] RabbitMQ architecture for notification system - [#382](https://github.com/librecores/librecores-web/pull/382)
   2. [GSoC 2019]Notification System: Mgilet/notification-bundle - [#383](https://github.com/librecores/librecores-web/pull/383)
 
   ## Notification Consumers
   ### Rendering notifications to the UI using WebNotification consumer
   **WebNotificationConsumer** will fetch notifications from the queue and process it to render them on the navbar of a specific user on the LibreCores site. The notifications that we intended to share
   through this are repocrawler failures for your projects, if your project was added to LibreCores, etc. Apart from notification dropdown which contains unseen notifications, also created a **Notification inbox** which will contain all of the notifications for a specific user, both seen and unseen.
 
   The PR's I made during this phase are:
   1. [GSoC 2019] Configure Web Notification Consumer - [#384](https://github.com/librecores/librecores-web/pull/384)
   2. Rendering web notifications to the UI and Notification Inbox - [#385](https://github.com/librecores/librecores-web/pull/385)
 
   ![Notification List](https://user-images.githubusercontent.com/26324376/63615515-2e918100-c603-11e9-87f2-a77e84c9efdc.jpg)

   ![Notification Inbox](https://user-images.githubusercontent.com/26324376/63606385-94730e00-c5ed-11e9-8376-e1cf50fb652d.jpg)
 
   ### Command to create notifications
   Since notifications are completely dependent on user interactions with the website, they are difficult to debug in development. So, created a Symfony console command to create notifications from cli.
   >`php bin/console librecores:send-notification <subject> <message> <type> <recipient>`
 
   The Pull Request corresponding to this are:
   1. Command to create Notification - [#389](https://github.com/librecores/librecores-web/pull/389)
 
   ### Notification settings
   A user can always allow/disallow if he wants to recieve notifications from LibreCores. The option to configure notification settings lies in the user profile.
 
   The Pull Request corresponding to this are:
   1. [GSoC 2019] allow users to configure notification settings - [#391](https://github.com/librecores/librecores-web/pull/391)
 
   ![Notification Settings](https://user-images.githubusercontent.com/26324376/63613997-9f369e80-c5ff-11e9-910f-0e54f621bda2.jpg)
 
   ### Sending notifications as emails via Email Consumer
   Important community information like details about events and new provisions can be sent directly
   over the email to the users. **EmailNotification Consumer** processes notifications and sends them to
   associated users.
 
   The PR's I made during this phase are:
   1. Implement Email Notification Consumer - [#395](https://github.com/librecores/librecores-web/pull/395)

##Writing tests for the implementation
The goal of unit testing is to segregate each part of the program and test that the individual parts are working correctly. It isolates the smallest piece of testable software from the remainder of the code and determines whether it behaves exactly as you expect. I wrote tests for the consumers during this period and 
   the PR's I made during this phase are:
   
   1. tests for web notification consumer - [#404](https://github.com/librecores/librecores-web/pull/404)

## Additional Contributions
Apart from the main deliverables above, I also contributed on a few other issues, such as:
1. Annotations for routing configuration - [#301](https://github.com/librecores/librecores-web/pull/301) 
2. Custom ranking configuration for projects in algolia - [#302](https://github.com/librecores/librecores-web/pull/302)
3. Create a notification service - [#401](https://github.com/librecores/librecores-web/pull/401)
4. UI fixes - [#304](https://github.com/librecores/librecores-web/pull/304) [#403](https://github.com/librecores/librecores-web/pull/403) [#414](https://github.com/librecores/librecores-web/pull/414) [#418](https://github.com/librecores/librecores-web/pull/418)

**What tasks were accomplished during this time**

| Tasks                                                 	| Planned 	| Completed 	|
|-------------------------------------------------------	|---------	|-----------	|
| Migrate to webpack                                    	| Yes     	| Yes       	|
| RabbitMQ architecture for notification system         	| Yes     	| Yes       	|
| Implement Web Notification Consumer                   	| Yes     	| Yes       	|
| Rendering notifications to the UI                     	| Yes     	| Yes       	|
| Implement Email Notification Consumer                 	| Yes     	| Yes       	|
| Test out the notification system                      	| Yes     	| Yes       	|
| User Feedback Mechanism                               	| Yes     	| No        	|
| Include user feedbacks in search UI and projects page 	| Yes     	| No        	|

##My GSoC experience
Overall, GSoC was a really wonderful experience for me. I came to know about a lot of things in Open source development such as: 
- Importance of small actionable pull requests
- Agile workflow
- Managing large codebases
- Relational database relationships
- Message queue systems like RabbitMQ
- Object Oriented Concepts and clean code

I would specially like to thank my mentor [Philipp Wagner](https://www.philipp-wagner.com/) for being extremely patient and helpful towards my mistakes and contributions.

## Future scope
This is what I did in my GSoC period but there is plenty of scope for future work. We need to store
user generated feedbacks for projects listed in LibreCores and integrate the data to the search UI. 

Thank You!!!
