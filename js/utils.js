"use strict";

var class2type = {};
var core_toString = class2type.toString

// Populate the class2type map
var class2typeTmp = "Boolean Number String Function Array Date RegExp Object Error".split(" ")
for(var i = 0; i < class2typeTmp.length; i++){

    class2type[ "[object " + class2typeTmp[i] + "]" ] = class2typeTmp[i].toLowerCase();
}

this.isFunction = function( obj ) {
    return type(obj) === "function";
}

this.isArray = Array.isArray || function( obj ) {
    return type(obj) === "array";
}

this.isNumeric = function( obj ) {
    return !isNaN( parseFloat(obj) ) && isFinite( obj );
}

this.type = function( obj ) {
    if ( obj == null ) {
        return String( obj );
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ core_toString.call(obj) ] || "object" :
        typeof obj;
}

this.isPlainObject = function( obj ) {
    var key;

    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || type(obj) !== "object" || obj.nodeType ) {
        return false;
    }

    try {
        // Not own constructor property must be Object
        if ( obj.constructor &&
            !core_hasOwn.call(obj, "constructor") &&
            !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
            return false;
        }
    } catch ( e ) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    for ( key in obj ) {}

    return key === undefined || core_hasOwn.call( obj, key );
}

this.isEmptyObject = function( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}

this.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !isFunction(target) ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {
        target = this;
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && isArray(src) ? src : [];

                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};


this.inherit = function(base, constructor, prototype){
    var F = function() { };
    F.prototype = base.prototype;
    constructor.prototype = new F();
    constructor.prototype.constructor = constructor;
    
    extend(constructor.prototype, prototype);
    
    return constructor;
}

var log = this.console.log;
this.console.log = function(message){
    log.apply(this, arguments)
    document.getElementById("log").innerHTML += message + "<br/>";

}
