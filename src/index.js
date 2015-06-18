'use strict';

var config = require('./config.js');
var each = require('async').each;
var match = require('multimatch');
var is = require('is');

function plugin(params, mm_options) {
    var patterns = config(params);

    return function (files, metalsmith, done) {
        each(
            Object.keys(files),
            function (file, done) {
                if (is.array.empty(match(file, patterns, mm_options))) {
                    delete files[file];
                }
                done();
            },
            done
        );
    };
}

module.exports = plugin;