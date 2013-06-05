/* global describe, it */
'use strict';

describe('baker', function () {

    describe('.createEntityBaker()', function () {

        it('should not throw when called with no arguments');

        it('should not throw when called with an object first argument');

        it('should throw when called with an unempty, non-object first argument');

        it('should return a function (bake)');

    });

    describe('.bakeEntities()', function () {

        it('should not throw when called with valid arguments');

        it('should throw when called with a non-string first argument');

        it('should throw when called with a non-object second argument');

        it('should return the expected HTML');

    });

    describe('.bakeEntities() [custom templates]', function () {

        it('should return the expected HTML');

    });

});
