# metalsmith-filter [![Build Status](https://travis-ci.org/mrajo/metalsmith-filter.svg)](https://travis-ci.org/mrajo/metalsmith-filter)

> A Metalsmith plugin for filtering source files

I wanted a function that worked the opposite of Metalsmith's ignore() function.
This plugin will filter out files that don't match the supplied glob patterns.
As a side effect of using [multimatch](https://github.com/sindresorhus/multimatch)
instead of [minimatch](https://github.com/isaacs/minimatch), you can use it as a
replacement for `Metalsmith.ignore` for multiple patterns instead of calling
ignore multiple times.

## Install

```
npm install metalsmith-filter
```

## Usage

Simply pass a single pattern or array of patterns, à la [multimatch](https://github.com/sindresorhus/multimatch).
You can optionally pass a second pattern of options as per [minimatch](https://github.com/isaacs/minimatch)
instructions.

### Process only Markdown files.

```javascript
var filter = require('metalsmith-filter');

Metalsmith(__dirname)
    .use(filter('**/*.md'))
    .build();
```

### Process anything but images.

```javascript
var filter = require('metalsmith-filter');

Metalsmith(__dirname)
    .use(filter([ '*', '!**/*.jpg', '!**/*.gif', '!**/*.png', '!**/*.webp' ]))
    .build();
```

### Pass options to minimatch.

```javascript
var filter = require('metalsmith-filter');

Metalsmith(__dirname)
    .use(filter('*.html', { debug: true }))
    .build();
```

## License

MIT © [Anthony Castle](http://github.com/mrajo)