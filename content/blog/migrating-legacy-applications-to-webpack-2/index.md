---
title: "Migrating legacy applications to webpack (Part 2)"
date: "2019-06-07T12:12:03.284Z"
---

![webpack](https://cdn-images-1.medium.com/max/2600/1*dQA3VhfjIQc1DYua6KoLFQ.png)

### Going further
Till this point, we have learnt how to create webpack.config.js and add CSS/JS files to the configuration. Also we have learnt how to render these entries inside our twig templates. Next comes the advanced Webpack configuration before production/deployment.
# Adding custom loaders
Webpack Encore provides some prerequired methods such as `addRule()` and `addLoader()` to add custom loaders to parse specific files included in your project. For example: In my project, I used a file called `classifications.yml` which can't be normally parsed through webpack. So, I had to use a npm package called `js-yaml-loader` and added a custom rule as follows:
```
.addRule({
    test: /\.ya?ml$/,
    use: 'js-yaml-loader'
})
```

# Final steps
Before building webpack for production, you need to take care of a few things first
- Source map the development and production builds to enable webpack to read from `entrypoints.json`
- For the files that are being used commonly for multiple files, use `createSharedEntry()` to minimise file sizes.
- Run the development and Production builds to check if everything is working file and the website doesn't break.

# Common problems and their fixes
This section contains some major issues I faced during my project and how I fixed them through lot of searches.
1. Problems with webpack commands:
    - `yarn encore dev` to start webpack in the development server. This command compiles every entry you added in your config and the corresponding dependencies to create build inside your `public/build/` or `web/build/` (#whatever you have specified in your webpack config file).
    - `yarn encore dev --watch` to start webpack in dev server with a configuration that watches over your files for changes and recompiles. For VM's you may need to set up [polling](https://symfony.com/doc/current/frontend/encore/advanced-config.html#configuring-watching-options-and-polling) options inside **webpack.config.js** (#only if this command doesn't work).
    - `yarn encore production` to create a production build, for which we may or may need to set up **source maps** if your website breaks at this command. This may happen if your website did not use *Symfony Flex* and you hadn't used twig helpers to render entries. This happens because your production builds are hashed and have different name than your dev builds. So, you may need to link [manifest.json](https://symfony.com/blog/new-in-symfony-3-3-manifest-based-asset-versioning) in your Symfony project (#only if your website breaks).
    
2. Sometimes JQuery and Bootstrap plugins don't work properly. Don't you worry because this is happening only because we are trying to eliminate all the global variables from our website. JQuery provides a global `$ variable` and Boostrap expects this variable to be global so that it can add functions to it. A well defined import includes installing them through yarn and then,
```
import $ from 'jquery';
import 'bootstrap';
```
~inside your external js entry file.


If you want to even set up global jQuery variable, use `global.jQuery = jQuery` or use `autoProvideJQuery()` function inside **webpack.config.js**

# Valuable Tutorials
I found these two resources really helpful while my work. I hope they would be of help to you as well.
- [SymfonyCasts](https://symfonycasts.com/screencast/webpack-encore)
- [Symfony Official Documentation](https://symfony.com/doc/current/frontend.html)

# A short note on my Project
- I migrated from existing Assetic configuration for my project [Librecores](https://www.librecores.org/) of Fossi Foundation in the first week of coding of [Google Summer of Code 2019](../gsoc-2019). It was a long and hefty task because a lot of stuff was not clear for me online and had to do a lot of research to get stuff up and running. 
- This was the approach which I used and I guess this will be for most people out there. The Pull Request is yet to be reviewed and can be found [here](https://github.com/librecores/librecores-web/pull/353/).
- At the end, tutorials and everything will always be there but it comes down to personal preferences and project requirements that majorly directs your approaches. Also, for anything that you have faced problems with, it's 99% probability that someone else in this world has faced it too and solved it. You just need maybe 10 minutes to find that on the Web, a big great thing. However that comes down to your Googling skills. Don't arrest me for that.

Thank You, Peace!

*Image source: `Medium`*