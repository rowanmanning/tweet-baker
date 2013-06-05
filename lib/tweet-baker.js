'use strict';


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


// Baking
// ------

// Create an entity baker
function createEntityBaker (templates) {
    if (templates) {
        assertIsObject(templates);
    }
    return function (text, entities) {
        assertIsString(text);
        assertIsObject(entities);
    };
}


// Exports
exports.createEntityBaker = createEntityBaker;
exports.bakeEntities = createEntityBaker();
