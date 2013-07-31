/*
 * grunt-pandoc
 * https://github.com/sakunyo/grunt-pandoc
 *
 * Copyright (c) 2013 sakuya sugo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var childproc = require("child_process"),
      util      = require("./util"),
      PandocRun = require("./PandocRun"),
      path      = require("path");


  grunt.registerMultiTask('pandoc', 'running pandoc process.', function() {
    var exec = [],
        done = this.async(),
        outputFilename,
        pandoc,
        i, iz,
        success = [];

    outputFilename = (this.data["options"] && this.data["options"].output) || this.target;
    
    grunt.file.mkdir(path.dirname(outputFilename));

    pandoc = new PandocRun(
      outputFilename,
      this.data["configs"], // Configs
      this.data["files"]    // Convert File Paths.
    );

    exec = pandoc.getEXEC(); // Return Execute Command String in Array.

    // Execute Async Child Process.
    for (i = 0, iz = exec.length; i < iz; i++) {
      exec[i] = util.applyFilter(exec[i], this.data["configs"]);

      // Execute Command Logging.
      grunt.log.writeln("EXEC: " + exec[i]);

      childproc.exec(exec[i], function (error, stdout, stderr) {
        if (error || stderr) {
          grunt.log.writeln(error || stderr);
          grunt.fail.fatal("Pandoc Convert Error.");
        } else {
          grunt.log.writeln(stdout);

          // TODO Checking Class
          success.push(true);
          util.checkChildTasks(done, success.length, exec.length);
        }
      });
    }

    // done(true);

  });

};
