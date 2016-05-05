Sasspool
========

A mixin and function library for Sass.

## About Sasspool

Sasspool is an all-in-one Sass framework to help you get started on projects quickly and remain organized as you progress.

## Requirements

These items must be installed on your computer:

* [Node.js](http://nodejs.org)
* [Sass](http://sass-lang.com)
* [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli)
* [scss-lint](https://github.com/brigade/scss-lint)

Though not a requirement, to take advantage of LiveReload, you'll want to install the [browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

## Getting Started

When you first download the repo, you will want to open the project directory in terminal and run `npm install`. This will download all the packages you need to run grunt, sass and autoprefixer on this project.

Running `grunt` will start the task that watches for changes to your files.

### Using Sasspool in other projects

When you start a project that you want to use Sasspool with you can always just download the files and move them over to your project, but there is an easy way to import just the Sasspool Sass files. Open your project directory in terminal and run `svn export https://github.com/guerillalabs/Sasspool/trunk/sass --force`. This will bring over the "sass" folder from the Sasspool repository (without any versioning history, as you will want to modify the files to suit your project).

If you use this technique, you will be responsible for setting up your Sass watch task and making sure Autoprefixer is configured to compile the Sasspool files properly. The [Air-Drop](https://github.com/guerillalabs/air-drop) Jekyll framework is already structured to do this, so you may want to consider it as a base for your site.

## Including Sasspool in your HTML

Sasspool utilizes some helper functions to make compatibility with older versions of Internet Explorer easier. To serve the correct stylesheet to the proper brower the following code is recommended for use in the `<head>` element of your pages (be sure to check the absolute vs. relative path to the stylesheet depending on your environment's needs):

``` html
<!-- CSS -->
<!-- For old IE -->
<!--[if (lte IE 8)&!(IEMobile)]>
    <link rel='stylesheet' href='/css/lte-ie8.css'>
<![endif]-->

<!-- For all other browsers -->
<!--[if gt IE 8]><!-->
    <link rel='stylesheet' href='/css/screen.css'>
<!--<![endif]-->
```

## URLs in Sass

We start with relative URLs for local development, then change to absolute URLs for production.

Each URL is prepended with `$baseurl` variable. Since URLs in CSS are part of stings, you'll want to use the Sass [interpolation syntax](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_). A asset link will look like `@include font-face('BLOKKRegular', '#{$baseurl}type/BLOKKRegular/webfonts/BLOKKRegular');`.

The `$baseurl` variable is set in the `sass/_1_foundations/_vars.scss` file. When you're ready to go to production, the variable can be set to `/` to change over to absolute URLs everywhere.

## Naming Conventions

How CSS classes are named have become a matter of debate over recent years. For consistency, we're documenting our naming convention here.

We use the BEM (block, element, modifier) naming convention as honed by [Harry Roberts at CSS Wizardry](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

### Block

This is a "module" of the page. Let's go with "nav".

``` html
<ul class="nav">
    ...
</ul>
```

### Element

A distinct element within the block. We try to not rely on HTML elements for this. HTML elements are best for hierarchy, while classes are for styling. A heading in a sidebar may need to change from an h2 to h3 on different pages to keep the document outline in tact, but they class can stay the same to keep the styling correct in each situation.

Two underscores indicate the element portion of the class.

Let's add some links to our navigation.

``` html
<ul class="nav">
    <li class="nav__item"><a href="#">Nav Item</a></li>
    <li class="nav__item"><a href="#">Nav Item</a></li>
</ul>
```

### Modifier

A modifier changes a block or element that has already been defined. Really popular modifiers are for buttons, where you'll end up with classes like `.btn--large`, `btn--small`, `btn--disabled`, and others.

Two hyphens indicate the modifier portion of the class.

Let's add a modifier to our navigation.

``` html
<ul class="nav nav--inline">
    <li class="nav__item"><a href="#">Nav Item</a></li>
    <li class="nav__item"><a href="#">Nav Item</a></li>
</ul>
```

Note that the new class is added in addition to the base "block" class.

## Relative Sizing Units

Because Air-Drop still supports IE8, we need a good way to deal with rem units in CSS. There are helper functions to calculate rems, ems and percentages. You can find them all in `sass/_1_foundations/_mixins/_units.scss`.

The philosophy behind our use of ems and rems follows closely with the thoughts of [Jeremy Church](http://j.eremy.net/confused-about-rem-and-em/). tl;dr – use ems to size text, and most other things; use rems when you need to ensure horizontal spacing (like gutters) stays consistent across contexts.

The rem() function should be used exclusively when using rem units, so those values may be converted to pixels for old IE stylesheets. The em() function is available for your convenience to avoid having to do calculations, but it isn't required.

To make an old IE stylesheet, set `$rems: false;` at the top of the file.

**Important note:** if you use ems for media queries (and you should), make sure that they are always based off of the default browser text size and not the `$base-font-size`. So, something like `@media (min-width: em(480, 16)) {` should always be used.

## Media Queries

A media query mixin – `sass/_1_foundations/_mixins/_media-queries.scss` – is provided to ease working with older versions of IE. Use of the mixin is provided at the top of the file, but in brief, here's how they work:

``` sass
.test {
    background: #fff;
    @include media('screen and (min-width: 400px) and (max-width: 600px)') {
        color: #000;
    }
}
```

The entire query part of the media query is passed as an argument. You can use variables for your dimensions by using interpolation – like #{$bp-small}

You can specify when styles in media queries shouldn't be sent to "fallback" browsers.

``` sass
.test {
    background: #fff;
    @include media('screen and (min-width: 400px) and (max-width: 600px)', false) {
        color: #000;
    }
}
```

## Variables, Spacing and Typography

The `sass/_1_foundations/_vars.scss` is very important for each project. This is where font sizes, dimensions, grid gutters and colors are all set.

As much as possible, these variables should be used throughout your project to aid in maintenance and making changes.

### Typography

Some silent classes are provided for use in setting font-sizes throughout the site. Note that each silent class includes media queries, so that while we are using these with `@extends`, the media queries will still apply and fonts will resize responsively without extra markup.

### Spacing

Typically, we use multiples of the `$vertical-unit` variable for vertical spacing with text, and we use one of the REM based `$spacing` variables for horizontal spacing. This is to keep horizontal spacing (like for grid gutters) consistent across contexts where EMs would vary.

### Colors

Many color variables are provided by default, but there is also a `_shades.scss` mixin that allows you to quickly, and consistently, lighten and darken the colors throughout your site.

## Grids

Air-Drop includes the excellent csswizardry-grids by Harry Roberts. Head over to [the github repo](https://github.com/csswizardry/csswizardry-grids/) for full instructions on usage.

All of the variables that control the grid are in `sass/_1_foundations/_vars.scss`.

Be sure to comment out the white space between the individual grid items. Like so:

``` html
...
</div><!--

--><div class="grid__item" ...
```