'use strict';

function config(params) {
    var patterns = false;
    if ('string' == typeof params || 'object' == typeof params) patterns = params;
    if ('function' == typeof params) patterns = params();
    if (!patterns) throw new Error('Invalid arguments');
    return patterns;
}

module.exports = config;