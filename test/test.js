'use strict';

var assert = require('assert');
var dir_equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var join = require('path').join;
var filter = require('../src');

function assertDirsEqual(src, done) {
    return function (err) {
        if (err) return done(err);
        dir_equal(join(src, 'expected'), join(src, 'build'));
        done();
    };
}

describe('metalsmith-filter', function () {
    it('should error with invalid arguments', function (done) {
        function runMetalsmith() {
            Metalsmith('test/fixtures/no-subs')
                .use(filter())
                .build();
        }

        assert.throws(runMetalsmith, /Invalid arguments/);
        done();
    });

    it('should filter by a single pattern', function (done) {
        var src = 'test/fixtures/only-md';

        Metalsmith(src)
            .use(filter('*.md'))
            .build(assertDirsEqual(src, done));
    });

    it('should filter by a set of patterns', function (done) {
        var src = 'test/fixtures/only-images';

        Metalsmith(src)
            .use(filter([ '*.png', '*.jpg' ]))
            .build(assertDirsEqual(src, done));
    });

    it('should ignore files if given a negation pattern', function (done) {
        var src = 'test/fixtures/ignore';

        Metalsmith(src)
            .use(filter([ '*', '!*.png' ]))
            .build(assertDirsEqual(src, done));
    });

    it('should pass along minimatch options', function (done) {
        var src = 'test/fixtures/match-options';

        Metalsmith(src)
            .use(filter([ '*.jpg', '*.png' ], { nocase: true }))
            .build(assertDirsEqual(src, done));
    });
});