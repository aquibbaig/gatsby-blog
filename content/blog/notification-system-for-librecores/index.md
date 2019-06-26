---
title: "[GSoC 2019] Setting up Notification system for Librecores"
date: "2019-06-26T12:11:03.284Z"
---

So, it's been over two weeks since the coding round for Google Summer of Code has begun. This is phase 1  and would deal with all the work needed to be done for the first evaluation. The goals in my proposal for first evaluation were as follows:
- Set up a Notification System in Librecores website

![Live Demo](https://user-images.githubusercontent.com/26324376/59524833-78b70180-8ef2-11e9-82e3-5019f8304602.png)

The basic idea was to generate notifications from the events that a user is associated with and notify the user about that event. A simple example can be when a user creates a project, we can notify him that his project was successfully added to Librecores. I had decided beforehand that there would be two types of notifications: **App/Web** notifications that appear on the user navbar and **Email** notifications that are sent directly to the email-id associated with the user. So, on the users perspective, his actions would generate these notifications. 

### Implementation/Third party vendors
- For email notifications, we used the Symfony **Swift_Mailer** service which uses a transport(smtp, gmail, etc) to send out emails to recipients.
- For web notifications, we used an existing Symfony bundle named **mgilet/notification-bundle** which you can find on [GitHub](https://github.com/maximilienGilet/notification-bundle).
    - This bundle provides three predefined entity classes (NotificableEntity, NotifiableNotification and Notification) which are used to link Notifications with Notifiables(Users in this case). 
    - Also, the bundle provides us with a *Notification Manager* to create and remove notifications seamlessly on the go.

### Problems faced
- Well, they say you can plan anyday but there will always be problems in the actual implementation. The implementation of this task had a small setback that while sending out these notifications, there can be a timelag in the UI due to processing of these notifications in the backend, which is of course not advisable. 
- So, we had to think of a way to publish these notifications in the background in some queue and execute them one by one. This problem made me modify the whole architectural structure of the Notification System.

> RabbitMQ to the rescue.

### So what is RabbitMQ and how did it solve our problem?

![Rabbit MQ](https://cdn-images-1.medium.com/max/1200/1*UnYL-2r54_7AnEwQv0cVxA.png)

- My mentor Philipp Wagner advised me to use RabbitMQ to create a notification and publish them in the RabbitMq queue. 
- RabbitMQ is an open-source message-broker software that originally implemented the Advanced Message Queuing Protocol and has since been extended with a plug-in architecture to support Streaming Text Oriented Messaging Protocol, Message Queuing Telemetry Transport, and other protocols.
The whole architecture of RabbitMQ can be divided into two parts:
- **Producers:**
The work of the producers is to publish messages to the RabbitMQ queue. The configuration is well documented in their website. A producer can be a function, a request or in our case, a Php class.
- **Consumers:**
The consumers are service workers that have the duty of picking up messages from the queue one by one that were added by the producer and these consumers have a specific function to do with each message that it fetches. 

In our case a publisher sent a notification to the queue as a serialized message and a Php class(Consumer) fetches this message and based on the type of the notification(email or app), sends it to the respective sink. The rough architecture that we follow is shown below:

![RabbitMQ architecture](https://user-images.githubusercontent.com/1467123/59163316-43c43c80-8af7-11e9-9cca-d53e5e747f10.png)

So, yeah. It was a wonderful experience of learning and coding. After the first evaluations, we have to prepare for second round of coding and my goals are:
- Introduction of User Feedback mechanism for Librecores

Peace!