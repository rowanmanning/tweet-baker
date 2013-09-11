/* global describe, it */
'use strict';

describe('tweet-baker', function () {

    it('should be a function');
    it('should not throw when called with valid arguments');
    it('should throw when called with a non-object tweet argument');
    it('should throw when tweet.text is a non-string');
    it('should throw when tweet.entities is a non-object');
    it('should return the expected HTML');

    describe('.make()', function () {

        it('should be a function');
        it('should not throw when called with no arguments');
        it('should not throw when called with an object templates argument');
        it('should throw when called with an unempty, non-object templates argument');
        it('should return a function');

        describe('[returned function]', function () {

            it('should not throw when called with valid arguments');
            it('should throw when called with a non-object tweet argument');
            it('should throw when tweet.text is a non-string');
            it('should throw when tweet.entities is a non-object');
            it('should return the expected HTML');

        });

    });

});
