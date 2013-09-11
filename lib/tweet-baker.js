/* global define */
(function (root) {
    'use strict';

    // Default entity templates
    var defaultTemplates = {

        user_mentions: function (ctx) {
            return [
                '<a href="https://twitter.com/' + ctx.screen_name + '" title="' + ctx.name + '">',
                    '@' + ctx.screen_name,
                '</a>'
            ].join('');
        },

        media: function (ctx) {
            return [
                '<a href="' + ctx.url + '">',
                    ctx.display_url,
                '</a>'
            ].join('');
        },

        hashtags: function (ctx) {
            return [
                '<a href="https://twitter.com/search?q=%23' + ctx.text + '">',
                    '#' + ctx.text,
                '</a>'
            ].join('');
        },

        urls: function (ctx) {
            return [
                '<a href="' + ctx.url + '">',
                    ctx.display_url,
                '</a>'
            ].join('');
        }

    };

    // Create default baker
    var bake = make(defaultTemplates);
    bake.make = make;
    bake.defaultTemplates = defaultTemplates;

    // Make a baker
    function make (templates) {
        assertIsObject(templates, 'Invalid templates argument, object expected');
        return function (tweet) {
            assertIsObject(tweet, 'Invalid tweet, object expected');
            assertIsObject(tweet.entities, 'Invalid tweet.entities, object expected');
            assertIsString(tweet.text, 'Invalid tweet.text, string expected');
            return bakeEntities(tweet, templates);
        };
    }

    // Bake tweet entities using a set of templates
    function bakeEntities (tweet, templates) {
        var entityReplacements = renderEntities(tweet.entities, templates);
        return replaceBetweenMultipleIndices(tweet.text, entityReplacements);
    }

    // Render entities based on a set of templates
    function renderEntities (entities, templates) {
        var rendered = [], type, len, i;
        for (type in entities) {
            if (entities.hasOwnProperty(type) && templates[type]) {
                len = entities[type].length;
                for (i = 0; i < len; i += 1) {
                    rendered.push([
                        templates[type](entities[type][i]),
                        entities[type][i].indices[0],
                        entities[type][i].indices[1]
                    ]);
                }
            }
        }
        return rendered;
    }

    // Replace characters in a string between multiple pairs of indices
    function replaceBetweenMultipleIndices (str, replacements) {
        replacements = cloneArray(replacements);
        replacements.sort(function (a, b) {
            return a[1] < b[1];
        });
        for (var i = 0, len = str.length, replacement; i < len; i ++) {
            replacement = replacements[i];
            if (replacement) {
                str = replaceBetweenIndices(str, replacement[0], replacement[1], replacement[2]);
            }
        }
        return str;
    }

    // Replace characters in a string between two indices
    function replaceBetweenIndices (str, replace, start, end) {
        return str.substr(0, start) + replace + str.substr(end);
    }

    // Assert that a value is an object
    function assertIsObject (val, errMsg) {
        if (val === null || isArray(val) || typeof val !== 'object') {
            throw new Error(errMsg);
        }
    }

    // Assert that a value is a string
    function assertIsString (val, errMsg) {
        if (typeof val !== 'string') {
            throw new Error(errMsg);
        }
    }

    // Cross-browser isArray
    function isArray (val) {
        return (Object.prototype.toString.call(val) === '[object Array]');
    }

    // Clone an array
    function cloneArray (arr) {
        return Array.prototype.slice.call(arr);
    }

    // Export: AMD
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return bake;
        });
    }

    // Export: CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = bake;
    }

    // Export: Script tag
    else {
        root.bake = bake;
    }

} (this));