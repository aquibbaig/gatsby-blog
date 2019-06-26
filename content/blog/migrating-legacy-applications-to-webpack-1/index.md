---
title: "[GSoC 2019] Migrating legacy applications to webpack (Part 1)"
date: "2019-06-07T12:06:03.284Z"
---

![webpack](https://cdn-images-1.medium.com/max/2600/1*dQA3VhfjIQc1DYua6KoLFQ.png)

 - At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles. Webpack is an open-source JavaScript module bundler. It is a module bundler primarily for JavaScript, but it can transform front-end assets like HTML, CSS, and images if the corresponding plugins are included. 
 - Webpack takes modules with dependencies and generates static assets representing those modules. If you go to the offical site of [Webpack](https://webpack.js.org/), you will be greeted by a big complicated image, which I had the time and space to display down below.

![bundle-your-assets](https://cdn-images-1.medium.com/max/1600/1*EGKixnuLcRXJrz_XcmPaqg.png)

- Well what's so special about it? This image is a visual representation of what *Webpack* can do for you. All you assets on the left are bundled/compiled into minified versions of four major asset files on the right in the end. (js, css, jpg and png). It can take in entries of all your assets files and generates minified final assets which have all your dependencies at one place. 
- There are two ways to run JavaScript in a browser. First, include a script for each functionality; this solution is hard to scale because loading too many scripts can cause a network bottleneck. The second option is to use a big *.js* file containing all your project code, but this leads to problems in scope, size, readability and maintainability.
That's where webpack comes into picture.
For more information on webpack core concepts, hop over to [Webpack core concepts](https://webpack.js.org/concepts).
- Webpack allows you to **require** and **import** stuff inside javascript files. Webpack can compile those two methods for you. Every third party dependency you want to require is installed through yarn (such as Bootstrap, JQuery, livestamp, etc). Through Webpack, we tend to achieve a system which is free of global variables. While migrating legacy applications, this may be a pain but once you do that, you will find that all of your javascript code is completely organised properly into modules.

### Webpack Encore
*source: `Symfony Docs`*

Webpack Encore is a simpler way to integrate Webpack into your application. It wraps Webpack, giving you a clean & powerful API for bundling JavaScript modules, pre-processing CSS & JS and compiling and minifying assets. 

> Encore basically wraps webpack and all of it's functionalities at one place. Encore gives you professional asset system that's a delight to use.

For migrating my Symfony3 application from Assetic configuration, I have used Webpack Encore. This task was under my **strech goals** for Google Summer of Code 2019 under [Fossi Foundation](../gsoc-2019).

### Setup your Webpack environment
#### Installing Encore
For Symnfony Flex users, there is an inbuilt receipe, So you can use that to get started. This receipe comes with some premade configuration which creates an `assets/` directory and installs and enables `WebpackEncoreBundle` from Symfony.
```
composer require symfony/webpack-encore-bundle
yarn install
```
If you haven't upgraded to *Symfony Flex* yet, don't worry! It means that you will have to configure all the things manually but it's not a pain, trust me! Once you get used to it. Use one of the following commands depending upon what package manager you use.
```
yarn add @symfony/webpack-encore --dev
npm install -S @symfony/webpack-encore
```

#### Creating webpack.config.js
Webpack includes a configuration file `webpack.config.js` to get you started over the development process using webpack. When you start webpack, it first goes inside this file is used to configure our webpack tool and returns that config. This file can be used to add custom loaders, entry modules to your webpack, production options, etc. For now, you can create an empty `webpack.config.js` and copy the contents of the [sample webpack configuration file](https://symfony.com/doc/current/frontend/encore/installation.html#creating-the-webpack-config-js-file) and the function of each line is defined here only.

#### Background
Till now, we have created a **webpack.config.js** and added a minimal configuration to get us started with migrating to webpack. The next step is to actually add entries in your config using `addEntry()` method provided by default. You need to achieve the following things here,
Bundle together an array of files on which the page depends upon 
Move all the explict javascript declared inside your templates' script tags to an independent javascript file
Install all installable nodejs dependencies such as Bootstrap, JQuery, livestamp, etc. through yarn and import them inside your javascript file. This will deal with removing all the CDN's and external declarations. Everything will now be an entry in webpack config file.

#### Adding Entries
After adding your entries in **webpack.config.js** as explained above, you can compile your assets using `yarn encore dev` to check if you have any unmet dependencies or some compile errors in your application. Errors are general as you may easily have left out import statements for methods that require a specific module at the first place. Add your style entries with `addStyleEntry()` and add your javascripts using the normal `addEntry()`. 

#### Rendering entries
If you are using *Symfony Flex*, then most of the stuff comes preconfigured. If the entry you have added was of the name `app`, then you just need to write one twig helper and it will include all the js/css for you in this tile 
```
{{ encore_entry_script_tags(app) }}
```

But, if your project doesn't use *Symfony Flex*, like me you have to include your bundles using `asset()` function like this:
```
<script src="{{ asset(build/app.js) }}"></script>
```    

The further part of the blogPost/tutorial is in the [following post](/migrating-legacy-applications-to-webpack-2/).

*Image source: `Medium`*