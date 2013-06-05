'use strict';

// Dependencies
var hogan = require('hogan.js');


// Utilities
// ---------

// Assert that a value is a plain object
function assertIsObject (val) {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
        throw new Error('Invalid argument, object expected');
    }
}

// Assert that a value is a string
function assertIsString (val) {
    if (typeof val !== 'string') {
        throw new Error('Invalid argument, string expected');
    }
}

// Shallow-extend multiple objects
function extend () {
    var objects = Array.prototype.slice.call(arguments);
    var i, len = objects.length, k, result = {};
    for (i = 0; i < len; i += 1) {
        for (k in objects[i]) {
            if (objects[i].hasOwnProperty(k)) {
                result[k] = objects[i][k];
            }
        }
    }
    return result;
}


// Templates
// ---------

// Default templates
var defaultTemplateStrings = {
    foo: 'bar',
    bar: 'baz'
};

// Provide defaults for missing templates
function defaultTemplates (templates) {
    return extend({}, defaultTemplateStrings, templates);
}

// Compile a set of template strings
function compileTemplates (templates) {
    var prop, compiledTemplates = {};
    for (prop in templates) {
        if (templates.hasOwnProperty(prop)) {
            compiledTemplates[prop] = hogan.compile(templates[prop]);
        }
    }
    return compiledTemplates;
}


// Baking
// ------

// Create an entity baker
function createEntityBaker (templates) {

    // Guarding/sanitizing
    if (templates) {
        assertIsObject(templates);
        templates = defaultTemplates(templates);
    } else {
        templates = defaultTemplateStrings;
    }

    // Compile templates
    templates = compileTemplates(templates);

    // Curry an entity baker
    return function (text, entities) {

        // Guarding
        assertIsString(text);
        assertIsObject(entities);

        var indices = {};

        var i, type, html;
        for (type in entities) {
            if (entities.hasOwnProperty(type) && templates[type]) {
                for (i = 0; i < entities[type].length; i += 1) {
                    html = templates[type].render(entities[type][i]);
                    indices[entities[type][i].indices[0]] = {end: entities[type][i].indices[1], html: html};
                }
            }
        }

        console.log(indices);
        return '';

    };

}


// Exports
exports.createEntityBaker = createEntityBaker;
exports.bakeEntities = createEntityBaker();
