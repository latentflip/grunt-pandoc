# grunt-pandoc

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pandoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pandoc');
```

## The "pandoc" task

### Overview
In your project's Gruntfile, add a section named `pandoc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  default_options: { // OUTPUT file name
    configs: {
      "publish"   : 'EPUB',                 // Publish File Format.
      "title"     : "Pandoc EPUB Title",    // EPUB Title
      "metadata"  : "include/metadata.xml", // EPUB include META data File Path.
      "stylesheet": "include/style.css"     // EPUB include StyleSheet File Path.
    },
    files: {
      "chapters": [
        "chapters/header.md", // Require Header File.
        "chapters/content.md" // Chapter Files.
        ...
      ]
    }
  }
})
```

## Release History
_(Nothing yet)_
