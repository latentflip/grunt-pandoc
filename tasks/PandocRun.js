/*
 * grunt-pandoc
 * https://github.com/sakunyo/grunt-pandoc
 *
 * Copyright (c) 2013 sakuya sugo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = (function () {

  var PandocRun;

  /**
   * PandocRun
   *
   * @param target  {string} Grunt Multi Task Target
   * @param configs {object}
   * @param files   {object}
   * @returns {*}
   * @constructor
   */
  PandocRun = function(target, configs, files){
    var key;

    this.configs = {};
    for (key in configs) this.configs[key] = configs[key];
    this.configs.target  = target;

    this.files = files || {};

    return this;
  };

  PandocRun.prototype = {

    /**
     * getEXEC
     * Choice Publish Format
     * @param type
     * @returns {string}
     */
    getEXEC: function (type) {
      var exec = [];

      switch (type || this.configs["publish"]) {
        case "EPUB":
          this.publishEPUB(exec);
          break;
        case "HTML":
          this.publishHTML(exec);
        default:
          break;
      }
      return exec;
    },

    /**
     * publishEPUB
     * Setup Pandoc Option (Markdown files to EPUB)
     * @param exec {array} exec strings.
     * @returns {array} Execute Command Strings
     */
    publishEPUB: function (exec) {
      var _exec = ["pandoc"],
          conf = this.configs;

      _exec.push("-S");
      _exec.push("-o " + conf.target + ".epub");
      _exec.push("--epub-metadata="   + conf.metadata);
      _exec.push("--epub-stylesheet=" + conf.stylesheet);
      if (conf['cover-image'])
        _exec.push("--epub-cover-image=" + conf['cover-image']);
      
      (conf["switches"]).forEach(function (sw) {
        _exec.push(sw);
      });

      _exec.push(this.files["chapters"].join(" "));

      exec.push(_exec.join(" "));

      return exec;
    },

    publishHTML: function (exec) {
      var _exec = ["pandoc"],
          conf  = this.configs,
          from = this.files["from"] || [],
          i,
          iz,
          output,
          input;

      _exec.push("-f markdown");
      _exec.push("-t html");

      for (i = 0, iz = from.length; i < iz; i++) {
        output = " -o " + from[i].replace(/\.md$/, ".html");
        input  = " "    + from[i];

        exec.push(_exec.join(" ") + output + input);
      }

      return exec;
    }
  };

  return PandocRun;
})();





