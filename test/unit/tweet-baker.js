/* global describe, it */
'use strict';

// Dependencies
var assert = require('proclaim');

// Fixtures
var tweets = require('../fixtures/tweets.json');

// Test subject
var tb = require('../../lib/tweet-baker');

// Tests
describe('baker', function () {

    describe('.createEntityBaker()', function () {

        it('should not throw when called with no arguments', function () {
            assert.doesNotThrow(function () {
                tb.createEntityBaker();
            });
        });

        it('should not throw when called with an object first argument', function () {
            assert.doesNotThrow(function () {
                tb.createEntityBaker({});
            });
        });

        it('should throw when called with an unempty, non-object first argument', function () {
            assert.throws(function () {
                tb.createEntityBaker('foo');
            }, /object expected/i);
            assert.throws(function () {
                tb.createEntityBaker([]);
            }, /object expected/i);
        });

        it('should return a function (bake)', function () {
            assert.isFunction(tb.createEntityBaker());
        });

    });

    describe('.bakeEntities()', function () {

        it('should not throw when called with valid arguments', function () {
            assert.doesNotThrow(function () {
                tb.bakeEntities('foo', {});
            });
        });

        it('should throw when called with a non-string first argument', function () {
            assert.throws(function () {
                tb.bakeEntities(null, {});
            });
        });

        it('should throw when called with a non-object second argument', function () {
            assert.throws(function () {
                tb.bakeEntities('foo', null);
            });
        });

        it('should return the expected HTML', function () {
            tweets.forEach(function (tweet) {
                assert.strictEqual(tb.bakeEntities(tweet.text, tweet.entities), tweet.html);
            });
        });

    });

    describe('.bakeEntities() [custom templates]', function () {

        it('should return the expected HTML');

    });

});
