const TypedProps = require('typed-props');

class Types extends TypedProps {}

// Helper method to skip undefined values
function skip(fn) {
    return function(value, ...args) {
        if (value === undefined) {
            return;
        }

        return fn(value, ...args);
    };
}

Types.addMethod('lengthOf', skip(function(value, length) {
    if (value.length !== length) {
        return {
            path: [],
            rule: 'lengthOf',
            details: {
                expect: length,
                is: value.length,
            },
        };
    }
}));

Types.addMethod('minLength', skip(function(value, length) {
    if (value.length < length) {
        return {
            path: [],
            rule: 'minLength',
            details: {
                expect: length,
                is: value.length,
            },
        };
    }
}));

Types.addMethod('maxLength', skip(function(value, length) {
    if (value.length > length) {
        return {
            path: [],
            rule: 'maxLength',
            details: {
                expect: length,
                is: value.length,
            },
        };
    }
}));

Types.addMethod('min', skip(function(value, min) {
    if (value < min) {
        return {
            path: [],
            rule: 'min',
            details: {
                expect: min,
                is: value,
            },
        };
    }
}));

Types.addMethod('max', skip(function(value, max) {
    if (value > max) {
        return {
            path: [],
            rule: 'max',
            details: {
                expect: max,
                is: value,
            },
        };
    }
}));

Types.addMethod('format', skip(function(value, format, desc = null) {
    if (! format.test(value)) {
        return {
            path: [],
            rule: 'format',
            details: {
                expect: desc || format,
                is: value,
            },
        };
    }
}));

module.exports = Types;
