---
title: Two months of code with Madlabs
date: '2019-06-02T17:00:03.284Z'
---

![GirlScript Summer of Code 2019](https://cdn-images-1.medium.com/max/1600/1*CKaCnG11p5i0KiQyaoyBvg.png)

### Introduction
Two months back, I recieved a mail from GirlScript foundation regarding this event named *GirlSript Summer Of Code* which is a 
two months long event where students can work under real world projects/applications backed by Open Source organisations.
I was meekly interested because I was busy contributing to my organisation for [Google Summer Of Code](../gsoc-2019), but I gave it a shot anyways. The major reason why I decided to contribute here was because whilst looking up for organisations list of the event, I came
across an project **Mevn-CLI** and I always had wanted to contribute to an npm package and this was it.

### Breaking myths
> GirlScript summer of Code is an event not only meant for girls. This is however an event to bring out major participation 
in them. 

### About my Project and Organisation
Madlabs Inc. goes by the tagline `Bridging Dream and Reality`. Mevn-Cli is a project under **Madlabs Inc.**. It is a CLI tool for getting started with the MEVN stack. It offers a super simple boilerplate template and additional utilities for building a MEVN stack based webapp. It takes away the hassle of setting up the local development environment which may become a nightmare especially for beginners who are just starting out.
Currently, the templates that we provide are
- Basic
- Pwa
- GraphQL
- Nuxt.js

> Mevn CLI got featured within the list of scaffolding generators on the [bestofjs.org](https://bestofjs.org/) platform on 26th May, 2019.
You can check it out [here](https://bestofjs.org/projects/mevn-cli) 

### About my work
The repository for the project can be found [on GitHub](https://github.com/madlabsinc/mevn-cli). Before the start of the event, there were a few issues opened in the repository which I checked out. 
 - A few starting issues on which I worked upon at first were simple such as checking if *Docker* and *git* are installed in your system and if not, walk the user through the complete process of installing them. This was done using JS libraries such as *execa*, *chalk*, *commander* but mostly it was all Javascript all over the vicious cycle of writing code and handling promises(xD).
 - Other things which I worked upon was to modify the existing documentation of our application to separate each part of it into independent files. This task made me learn and get going with *Vuepress* in a day!
 - The major issue that I worked upon was to configure pwa support for the Nuxt.js template that we had, which took me over a month because writing manual configuration into specific files is a pain.

 ### Conclusion
 **Aaaaand it's a wrap!** I really had a wonderful experience in this event. I came to know about a lot of things which I can apply to further applications as well. The challenges were many as refactoring code for an application which has over 5000/month downloads is not an easy thing. You need to look into every tinsy-binsy bit of detail as you can and test every possible case of your conditionals. So, yeah! That's all, thanks! Extend your support and drop a **star** on the repository [on GitHub](https://github.com/madlabsinc/mevn-cli).

 Peace!!