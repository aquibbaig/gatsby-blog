---
title: "[GSoC 2019] Setting up Notification system for Librecores"
date: "2019-06-26T12:11:03.284Z"
---

The goals in my proposal for first evaluation were as follows:
- Set up a Notification System in Librecores website

![Live Demo](https://user-images.githubusercontent.com/26324376/60994874-014c8480-a36f-11e9-93ad-d35e7e5318e1.png)

The basic idea was to generate notifications from the events that a user is associated with and notify the user about that event. A simple example can be when a user creates a project, we can notify him that his project was successfully added to Librecores. I had decided beforehand that there would be two types of notifications: **App/Web** notifications that appear on the user navbar and **Email** notifications that are sent directly to the email-id associated with the user. So, on the users perspective, his actions would generate these notifications. 

### Implementation/Third party vendors
- For email notifications, we used the Symfony **Swift_Mailer** service which uses a transport(smtp, gmail, etc) to send out emails to recipients.
- For web notifications, we used a Symfony bundle named **mgilet/notification-bundle** which you can find on [GitHub](https://github.com/maximilienGilet/notification-bundle).
    - This bundle provides three predefined entity classes (NotificableEntity, NotifiableNotification and Notification) which are used to link Notifications with Notifiables(Users in this case). 
    - Also, the bundle provides us with a *Notification Manager* to create and remove notifications seamlessly on the go.

### About RabbitMQ and how did it solve the problem of UNPREDICTABLE PROCESSING TIME?

While sending out these notifications, there can be a timelag in the UI due to processing of these notifications in the backend, which is of course not advisable. 

> RabbitMQ to the rescue.

![Rabbit MQ](https://cdn-images-1.medium.com/max/1200/1*UnYL-2r54_7AnEwQv0cVxA.png)

- RabbitMQ is an open-source message-broker software that originally implemented the Advanced Message Queuing Protocol and has since been extended with a plug-in architecture to support Streaming Text Oriented Messaging Protocol, Message Queuing Telemetry Transport, and other protocols.
The whole architecture of RabbitMQ can be divided into two parts:
- **Producers:**
The work of the producers is to publish messages to the RabbitMQ queue. The configuration is well documented in their website. A producer can be a function, a request or in our case, a Php class.
- **Consumers:**
The consumers are service workers that have the duty of picking up messages from the queue one by one that were added by the producer and these consumers have a specific function to do with each message that it fetches. 

In our case a publisher sent a notification to the queue as a serialized message and a Php class(Consumer) fetches this message and based on the type of the notification(email or app), sends it to the respective sink. The rough architecture that we follow is shown below:

![RabbitMQ architecture](https://user-images.githubusercontent.com/1467123/59163316-43c43c80-8af7-11e9-9cca-d53e5e747f10.png)

### How to run them consumers

So, currently we have two consumers. One is the web-notification consumer responsible for sending out notifications to the UI and the other is the email-notification consumer responsible for sending out emails. However we have wrapped the logic of both consumers into one single facility(notification), thanks to the multiple-consumer options provided by RabbitMQ. So, we have one multiple consumer which fans out messages to two consumers mentioned above.
You can go into the `site/` folder of the VM and just command

> `.bin/console rabbitmq:multiple-consumer notification` 

and boom! That's it! Both the consumers are active as a single daemon waiting for your notifications on the queue to execute them.

### Create notifications with a single command

This is a new feature that we have added this year. Now, you can test notification consumers out there by sending out notifications directly
from your cli inside the VM. The command 

> `.bin/console librecores:send-notification` 

takes in four arguments. 
- Notification Subject
- Notification Message
- Notification Type
- Username/Recipient

Be careful of the Notification Type as the consumers are programmed only to execute a certain type of notifications only. They return false 
in all other cases.

### Notification Inbox

So, you see unseen notifications on the dropdown, what if you clicked it *mark as seen* by accident? Coming to that well, what if I told you that you dont need to worry cause we got your back here. There is a **notification inbox** in the website aptly tailored to keep a list of all your(user's) important notifications, even those which you have marked as seen also. You can remove notifications from here if you want your inbox to be well organised with fresh notifications only.

![Notification Inbox](https://user-images.githubusercontent.com/26324376/62121082-87117f00-b2e0-11e9-92ac-b1d19a786de1.png)

### Notification Settings

Now you can edit your notification settings in your user profile settings if you want to opt out of some kind of notification. We have added this new feature to make user personalisation even more important as this project of mine is mostly aimed at user interactivity and experience. Notification settings are placed in `/user/settings/` and all the details are mentioned on the page itself.

![Notification Settings](https://user-images.githubusercontent.com/26324376/62184494-04d69880-b37c-11e9-85ab-7dab9f16f409.png)

### Finally

So, yeah. It was a wonderful experience of learning and coding. After the first evaluations, we have to prepare for second round of coding and my goals are:
- Introduction of User Feedback mechanism for Librecores

Peace!