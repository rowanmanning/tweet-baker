/* global before, describe, it */
'use strict';

var assert = require('proclaim');
var tweetFixtures = require('../fixtures/tweets.json');
var bake = require('../../lib/tweet-baker');

describe('tweet-baker', function () {

    it('should be a function', function () {
        assert.isFunction(bake);
    });

    it('should have a `defaultTemplates` property', function () {
        assert.isObject(bake.defaultTemplates);
    });

    it('should not throw when called with valid arguments', function () {
        assert.doesNotThrow(function () {
            bake({
                entities: {},
                text: 'foo'
            });
        });
    });

    it('should throw when called with a non-object tweet argument', function () {

        assert.throws(function () {
            bake();
        }, /Invalid tweet/i);

        assert.throws(function () {
            bake('foo');
        }, /Invalid tweet/i);

        assert.throws(function () {
            bake([]);
        }, /Invalid tweet/i);

    });

    it('should throw when tweet.entities is a non-object', function () {

        assert.throws(function () {
            bake({
                text: 'foo'
            });
        }, /Invalid tweet\.entities/i);

        assert.throws(function () {
            bake({
                entities: 'foo',
                text: 'foo'
            });
        }, /Invalid tweet\.entities/i);

        assert.throws(function () {
            bake({
                entities: [],
                text: 'foo'
            });
        }, /Invalid tweet\.entities/i);

    });

    it('should throw when tweet.text is a non-string', function () {

        assert.throws(function () {
            bake({
                entities: {}
            });
        }, /Invalid tweet\.text/i);

        assert.throws(function () {
            bake({
                entities: {},
                text: 123
            });
        }, /Invalid tweet\.text/i);

    });

    it('should return the expected HTML', function () {
        for (var i = 0, len = tweetFixtures.length, tweet; i < len; i ++) {
            tweet = tweetFixtures[i];
            assert.strictEqual(bake(tweet), tweet['default-html']);
        }
    });

    describe('.make()', function () {

        it('should be a function', function () {
            assert.isFunction(bake.make);
        });

        it('should not throw when called with an object templates argument', function () {
            assert.doesNotThrow(function () {
                bake.make({});
            });
        });

        it('should throw when called with a non-object templates argument', function () {
            assert.throws(function () { bake.make(); }, /Invalid templates/i);
            assert.throws(function () { bake.make('foo'); }, /Invalid templates/i);
            assert.throws(function () { bake.make([]); }, /Invalid templates/i);
        });

        it('should return a function', function () {
            assert.isFunction(bake.make({}));
        });

        describe('[returned function]', function () {
            var myBake;

            before(function () {
                myBake = bake.make({
                    user_mentions: function (ctx) {
                        return 'MENTION:' + ctx.screen_name;
                    },
                    media: function (ctx) {
                        return 'MEDIA:' + ctx.url;
                    },
                    hashtags: function (ctx) {
                        return 'HASHTAG:' + ctx.text;
                    },
                    urls: function (ctx) {
                        return 'URL:' + ctx.url;
                    }
                });
            });

            it('should not throw when called with valid arguments', function () {
                assert.doesNotThrow(function () {
                    myBake({
                        entities: {},
                        text: 'foo'
                    });
                });
            });

            it('should throw when called with a non-object tweet argument', function () {

                assert.throws(function () {
                    myBake();
                }, /Invalid tweet/i);

                assert.throws(function () {
                    myBake('foo');
                }, /Invalid tweet/i);

                assert.throws(function () {
                    myBake([]);
                }, /Invalid tweet/i);

            });

            it('should throw when tweet.entities is a non-object', function () {

                assert.throws(function () {
                    myBake({
                        text: 'foo'
                    });
                }, /Invalid tweet\.entities/i);

                assert.throws(function () {
                    myBake({
                        entities: 'foo',
                        text: 'foo'
                    });
                }, /Invalid tweet\.entities/i);

                assert.throws(function () {
                    myBake({
                        entities: [],
                        text: 'foo'
                    });
                }, /Invalid tweet\.entities/i);

            });

            it('should throw when tweet.text is a non-string', function () {

                assert.throws(function () {
                    myBake({
                        entities: {}
                    });
                }, /Invalid tweet\.text/i);

                assert.throws(function () {
                    myBake({
                        entities: {},
                        text: 123
                    });
                }, /Invalid tweet\.text/i);

            });

            it('should return the expected HTML', function () {
                for (var i = 0, len = tweetFixtures.length, tweet; i < len; i ++) {
                    tweet = tweetFixtures[i];
                    assert.strictEqual(myBake(tweet), tweet['custom-html']);
                }
            });

        });

    });

});
