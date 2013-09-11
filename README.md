
Tweet Baker
===========

Bake [tweet entities][twitter-entities] into your tweets; turning text plus entities into beautiful, customisable HTML. Useful when you're interacting with the Twitter API.

**Current Version:** *1.0.0*  
**Build Status:** [![Build Status][travis-img]][travis]  
**Node Support:** *0.6*, *0.8*, *0.10*  
**Browser Support:** *Android Browser 2.2–4.2*, *Firefox 3.6*, *Firefox 4–22*, *Google Chrome 14–28*, *Internet Explorer 6–10*, *Mobile Safari iOS 3–6*, *Safari 4–6*

```js
bake({
    text: "The toilet of fail… with @perryharlock http://t.co/XN0xYhnSPR",
    entities: {
        user_mentions: [ ... ],
        media: [ ... ]
    }
});

//> The toilet of fail… with
//> <a href="https://twitter.com/perryharlock" title="Perry Harlock">@perryharlock</a>
//> <a href="http://t.co/XN0xYhnSPR">pic.twitter.com/XN0xYhnSPR</a>
```


Installing
----------

You can install the latest version of Tweet Baker on [Node.js][node], with [Bower][bower], or with [Component][component]:

```sh
$ npm install tweet-baker
$ bower install tweet-baker
$ component install rowanmanning/tweet-baker
```

Alternatively, you can download `lib/tweet-baker.js` and include it in your page with a script.

Tweet Baker can be required with CommonJS and AMD, or found on `window.bake` if you're including with a script.


How To Use
----------

Tweet Baker provides sensible default templates, meaning that you can use it simply by calling bake with your [tweet object][twitter-tweet] as an argument.

```js
var bake = require('tweet-baker');
var tweetHtml = bake(tweetObjectFromApi);
```

If you wish to customise the HTML which is output by Tweet Baker, you can do so by creating your own baker. Call `bake.make` with an object containing your template functions. These are simple functions which recieve an entity construct and return HTML:

```js
var bake = require('tweet-baker');
var myBake = bake.make({

    user_mentions: function (ctx) {
        // use `ctx` to return HTML for a user mention
    },

    media: function (ctx) {
        // use `ctx` to return HTML for media URLs
    },

    hashtags: function (ctx) {
        // use `ctx` to return HTML for hashtags
    },

    urls: function (ctx) {
        // use `ctx` to return HTML for URLs
    }

});
var customTweetHtml = myBake(tweetObjectFromApi);
```

Note that each property in your template object matches the name of an entity type returned by the Twitter API. For an example of how to build custom templates, look for `defaultTemplates` in [the library JavaScript](lib/tweet-baker.js).

Because Tweet Baker templates are just functions, you can use almost any template engine; just pass your compiled templates into `bake.make`.


Development
-----------

If you wish to contribute to Tweet Baker, fork this repository locally and install dependencies with `npm install`. Now you can run the following commands to lint and test the code.

```sh
$ make lint  # Run JSHint on the code
$ make test  # Run unit tests
```

Please ensure there are no lint errors or failing tests before opening a pull request.


License
-------

Tweet Baker is licensed under the [MIT][mit] license.



[bower]: http://bower.io/
[component]: https://github.com/component/component
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://travis-ci.org/rowanmanning/tweet-baker
[travis-img]: https://travis-ci.org/rowanmanning/tweet-baker.png?branch=master
[twitter-entities]: https://dev.twitter.com/docs/platform-objects/entities
[twitter-tweet]: https://dev.twitter.com/docs/platform-objects/tweets
