
/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

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

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map

/**
* bootstrap-formhelpers.js v2.3.0 by @vincentlamanna
* Copyright 2013 Vincent Lamanna
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap Form Helpers requires jQuery"); }

/* ==========================================================
 * bootstrap-formhelpers-countries.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHCountriesList = {
  'AF': 'Afghanistan',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa',
  'AD': 'Andorra',
  'AO': 'Angola',
  'AI': 'Anguilla',
  'AQ': 'Antarctica',
  'AG': 'Antigua and Barbuda',
  'AR': 'Argentina',
  'AM': 'Armenia',
  'AW': 'Aruba',
  'AU': 'Australia',
  'AT': 'Austria',
  'AZ': 'Azerbaijan',
  'BH': 'Bahrain',
  'BD': 'Bangladesh',
  'BB': 'Barbados',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BZ': 'Belize',
  'BJ': 'Benin',
  'BM': 'Bermuda',
  'BT': 'Bhutan',
  'BO': 'Bolivia',
  'BA': 'Bosnia and Herzegovina',
  'BW': 'Botswana',
  'BV': 'Bouvet Island',
  'BR': 'Brazil',
  'IO': 'British Indian Ocean Territory',
  'VG': 'British Virgin Islands',
  'BN': 'Brunei',
  'BG': 'Bulgaria',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'CI': 'Côte d\'Ivoire',
  'KH': 'Cambodia',
  'CM': 'Cameroon',
  'CA': 'Canada',
  'CV': 'Cape Verde',
  'KY': 'Cayman Islands',
  'CF': 'Central African Republic',
  'TD': 'Chad',
  'CL': 'Chile',
  'CN': 'China',
  'CX': 'Christmas Island',
  'CC': 'Cocos (Keeling) Islands',
  'CO': 'Colombia',
  'KM': 'Comoros',
  'CG': 'Congo',
  'CK': 'Cook Islands',
  'CR': 'Costa Rica',
  'HR': 'Croatia',
  'CU': 'Cuba',
  'CY': 'Cyprus',
  'CZ': 'Czech Republic',
  'CD': 'Democratic Republic of the Congo',
  'DK': 'Denmark',
  'DJ': 'Djibouti',
  'DM': 'Dominica',
  'DO': 'Dominican Republic',
  'TP': 'East Timor',
  'EC': 'Ecuador',
  'EG': 'Egypt',
  'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea',
  'ER': 'Eritrea',
  'EE': 'Estonia',
  'ET': 'Ethiopia',
  'FO': 'Faeroe Islands',
  'FK': 'Falkland Islands',
  'FJ': 'Fiji',
  'FI': 'Finland',
  'MK': 'Former Yugoslav Republic of Macedonia',
  'FR': 'France',
  'FX': 'France, Metropolitan',
  'GF': 'French Guiana',
  'PF': 'French Polynesia',
  'TF': 'French Southern Territories',
  'GA': 'Gabon',
  'GE': 'Georgia',
  'DE': 'Germany',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GR': 'Greece',
  'GL': 'Greenland',
  'GD': 'Grenada',
  'GP': 'Guadeloupe',
  'GU': 'Guam',
  'GT': 'Guatemala',
  'GN': 'Guinea',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HT': 'Haiti',
  'HM': 'Heard and Mc Donald Islands',
  'HN': 'Honduras',
  'HK': 'Hong Kong',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IN': 'India',
  'ID': 'Indonesia',
  'IR': 'Iran',
  'IQ': 'Iraq',
  'IE': 'Ireland',
  'IL': 'Israel',
  'IT': 'Italy',
  'JM': 'Jamaica',
  'JP': 'Japan',
  'JO': 'Jordan',
  'KZ': 'Kazakhstan',
  'KE': 'Kenya',
  'KI': 'Kiribati',
  'KW': 'Kuwait',
  'KG': 'Kyrgyzstan',
  'LA': 'Laos',
  'LV': 'Latvia',
  'LB': 'Lebanon',
  'LS': 'Lesotho',
  'LR': 'Liberia',
  'LY': 'Libya',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MO': 'Macau',
  'MG': 'Madagascar',
  'MW': 'Malawi',
  'MY': 'Malaysia',
  'MV': 'Maldives',
  'ML': 'Mali',
  'MT': 'Malta',
  'MH': 'Marshall Islands',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MU': 'Mauritius',
  'YT': 'Mayotte',
  'MX': 'Mexico',
  'FM': 'Micronesia',
  'MD': 'Moldova',
  'MC': 'Monaco',
  'MN': 'Mongolia',
  'ME': 'Montenegro',
  'MS': 'Montserrat',
  'MA': 'Morocco',
  'MZ': 'Mozambique',
  'MM': 'Myanmar',
  'NA': 'Namibia',
  'NR': 'Nauru',
  'NP': 'Nepal',
  'NL': 'Netherlands',
  'AN': 'Netherlands Antilles',
  'NC': 'New Caledonia',
  'NZ': 'New Zealand',
  'NI': 'Nicaragua',
  'NE': 'Niger',
  'NG': 'Nigeria',
  'NU': 'Niue',
  'NF': 'Norfolk Island',
  'KP': 'North Korea',
  'MP': 'Northern Marianas',
  'NO': 'Norway',
  'OM': 'Oman',
  'PK': 'Pakistan',
  'PW': 'Palau',
  'PS': 'Palestine',
  'PA': 'Panama',
  'PG': 'Papua New Guinea',
  'PY': 'Paraguay',
  'PE': 'Peru',
  'PH': 'Philippines',
  'PN': 'Pitcairn Islands',
  'PL': 'Poland',
  'PT': 'Portugal',
  'PR': 'Puerto Rico',
  'QA': 'Qatar',
  'RE': 'Reunion',
  'RO': 'Romania',
  'RU': 'Russia',
  'RW': 'Rwanda',
  'ST': 'São Tomé and Príncipe',
  'SH': 'Saint Helena',
  'PM': 'St. Pierre and Miquelon',
  'KN': 'Saint Kitts and Nevis',
  'LC': 'Saint Lucia',
  'VC': 'Saint Vincent and the Grenadines',
  'WS': 'Samoa',
  'SM': 'San Marino',
  'SA': 'Saudi Arabia',
  'SN': 'Senegal',
  'RS': 'Serbia',
  'SC': 'Seychelles',
  'SL': 'Sierra Leone',
  'SG': 'Singapore',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'SB': 'Solomon Islands',
  'SO': 'Somalia',
  'ZA': 'South Africa',
  'GS': 'South Georgia and the South Sandwich Islands',
  'KR': 'South Korea',
  'ES': 'Spain',
  'LK': 'Sri Lanka',
  'SD': 'Sudan',
  'SR': 'Suriname',
  'SJ': 'Svalbard and Jan Mayen Islands',
  'SZ': 'Swaziland',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'SY': 'Syria',
  'TW': 'Taiwan',
  'TJ': 'Tajikistan',
  'TZ': 'Tanzania',
  'TH': 'Thailand',
  'BS': 'The Bahamas',
  'GM': 'The Gambia',
  'TG': 'Togo',
  'TK': 'Tokelau',
  'TO': 'Tonga',
  'TT': 'Trinidad and Tobago',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TM': 'Turkmenistan',
  'TC': 'Turks and Caicos Islands',
  'TV': 'Tuvalu',
  'VI': 'US Virgin Islands',
  'UG': 'Uganda',
  'UA': 'Ukraine',
  'AE': 'United Arab Emirates',
  'GB': 'United Kingdom',
  'US': 'United States',
  'UM': 'United States Minor Outlying Islands',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VU': 'Vanuatu',
  'VA': 'Vatican City',
  'VE': 'Venezuela',
  'VN': 'Vietnam',
  'WF': 'Wallis and Futuna Islands',
  'EH': 'Western Sahara',
  'YE': 'Yemen',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
};

 /* ==========================================================
 * bootstrap-formhelpers-currencies.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2013 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHCurrenciesList = {
  'AED':{'label':'United Arab Emirates dirham','currencyflag':'','symbol':'د.إ'},
  'AFN':{'label':'Afghan afghani','currencyflag':'','symbol':'؋'},
  'ALL':{'label':'Albanian lek','currencyflag':'','symbol':'L'},
  'AMD':{'label':'Armenian dram','currencyflag':'','symbol':'դր'},
  'AOA':{'label':'Angolan kwanza','currencyflag':'','symbol':'Kz'},
  'ARS':{'label':'Argentine peso','currencyflag':'','symbol':'$'},
  'AUD':{'label':'Australian dollar','currencyflag':'AUD','symbol':'$'},
  'AWG':{'label':'Aruban florin','currencyflag':'','symbol':'ƒ'},
  'AZN':{'label':'Azerbaijani manat','currencyflag':'','symbol':''},
  'BAM':{'label':'Bosnia and Herzegovina convertible mark','currencyflag':'','symbol':'KM'},
  'BBD':{'label':'Barbadian dollar','currencyflag':'','symbol':'$'},
  'BDT':{'label':'Bangladeshi taka','currencyflag':'','symbol':'৳'},
  'BGN':{'label':'Bulgarian lev','currencyflag':'','symbol':'лв'},
  'BHD':{'label':'Bahraini dinar','currencyflag':'','symbol':'.د.ب'},
  'BIF':{'label':'Burundian franc','currencyflag':'','symbol':'Fr'},
  'BMD':{'label':'Bermudian dollar','currencyflag':'','symbol':'$'},
  'BND':{'label':'Brunei dollar','currencyflag':'','symbol':'$'},
  'BOB':{'label':'Bolivian boliviano','currencyflag':'','symbol':'Bs'},
  'BRL':{'label':'Brazilian real','currencyflag':'','symbol':'R$'},
  'BSD':{'label':'Bahamian dollar','currencyflag':'','symbol':'$'},
  'BTN':{'label':'Bhutanese ngultrum','currencyflag':'','symbol':'Nu'},
  'BWP':{'label':'Botswana pula','currencyflag':'','symbol':'P'},
  'BYR':{'label':'Belarusian ruble','currencyflag':'','symbol':'Br'},
  'BZD':{'label':'Belize dollar','currencyflag':'','symbol':'$'},
  'CAD':{'label':'Canadian dollar','currencyflag':'','symbol':'$'},
  'CDF':{'label':'Congolese franc','currencyflag':'','symbol':'Fr'},
  'CHF':{'label':'Swiss franc','currencyflag':'CHF','symbol':'Fr'},
  'CLP':{'label':'Chilean peso','currencyflag':'','symbol':'$'},
  'CNY':{'label':'Chinese yuan','currencyflag':'','symbol':'¥'},
  'COP':{'label':'Colombian peso','currencyflag':'','symbol':'$'},
  'CRC':{'label':'Costa Rican colón','currencyflag':'','symbol':'₡'},
  'CUP':{'label':'Cuban convertible peso','currencyflag':'','symbol':'$'},
  'CVE':{'label':'Cape Verdean escudo','currencyflag':'','symbol':'$'},
  'CZK':{'label':'Czech koruna','currencyflag':'','symbol':'Kč'},
  'DJF':{'label':'Djiboutian franc','currencyflag':'','symbol':'Fr'},
  'DKK':{'label':'Danish krone','currencyflag':'DKK','symbol':'kr'},
  'DOP':{'label':'Dominican peso','currencyflag':'','symbol':'$'},
  'DZD':{'label':'Algerian dinar','currencyflag':'','symbol':'د.ج'},
  'EGP':{'label':'Egyptian pound','currencyflag':'','symbol':'ج.م'},
  'ERN':{'label':'Eritrean nakfa','currencyflag':'','symbol':'Nfk'},
  'ETB':{'label':'Ethiopian birr','currencyflag':'','symbol':'Br'},
  'EUR':{'label':'Euro','currencyflag':'EUR','symbol':'€'},
  'FJD':{'label':'Fijian dollar','currencyflag':'','symbol':'$'},
  'FKP':{'label':'Falkland Islands pound','currencyflag':'','symbol':'£'},
  'GBP':{'label':'British pound','currencyflag':'','symbol':'£'},
  'GEL':{'label':'Georgian lari','currencyflag':'','symbol':'ლ'},
  'GHS':{'label':'Ghana cedi','currencyflag':'','symbol':'₵'},
  'GMD':{'label':'Gambian dalasi','currencyflag':'','symbol':'D'},
  'GNF':{'label':'Guinean franc','currencyflag':'','symbol':'Fr'},
  'GTQ':{'label':'Guatemalan quetzal','currencyflag':'','symbol':'Q'},
  'GYD':{'label':'Guyanese dollar','currencyflag':'','symbol':'$'},
  'HKD':{'label':'Hong Kong dollar','currencyflag':'','symbol':'$'},
  'HNL':{'label':'Honduran lempira','currencyflag':'','symbol':'L'},
  'HRK':{'label':'Croatian kuna','currencyflag':'','symbol':'kn'},
  'HTG':{'label':'Haitian gourde','currencyflag':'','symbol':'G'},
  'HUF':{'label':'Hungarian forint','currencyflag':'','symbol':'Ft'},
  'IDR':{'label':'Indonesian rupiah','currencyflag':'','symbol':'Rp'},
  'ILS':{'label':'Israeli new shekel','currencyflag':'','symbol':'₪'},
  'IMP':{'label':'Manx pound','currencyflag':'','symbol':'£'},
  'INR':{'label':'Indian rupee','currencyflag':'','symbol':''},
  'IQD':{'label':'Iraqi dinar','currencyflag':'','symbol':'ع.د'},
  'IRR':{'label':'Iranian rial','currencyflag':'','symbol':'﷼'},
  'ISK':{'label':'Icelandic króna','currencyflag':'','symbol':'kr'},
  'JEP':{'label':'Jersey pound','currencyflag':'','symbol':'£'},
  'JMD':{'label':'Jamaican dollar','currencyflag':'','symbol':'$'},
  'JOD':{'label':'Jordanian dinar','currencyflag':'','symbol':'د.ا'},
  'JPY':{'label':'Japanese yen','currencyflag':'','symbol':'¥'},
  'KES':{'label':'Kenyan shilling','currencyflag':'','symbol':'Sh'},
  'KGS':{'label':'Kyrgyzstani som','currencyflag':'','symbol':'лв'},
  'KHR':{'label':'Cambodian riel','currencyflag':'','symbol':'៛'},
  'KMF':{'label':'Comorian franc','currencyflag':'','symbol':'Fr'},
  'KPW':{'label':'North Korean won','currencyflag':'','symbol':'₩'},
  'KRW':{'label':'South Korean won','currencyflag':'','symbol':'₩'},
  'KWD':{'label':'Kuwaiti dinar','currencyflag':'','symbol':'د.ك'},
  'KYD':{'label':'Cayman Islands dollar','currencyflag':'','symbol':'$'},
  'KZT':{'label':'Kazakhstani tenge','currencyflag':'','symbol':'₸'},
  'LAK':{'label':'Lao kip','currencyflag':'','symbol':'₭'},
  'LBP':{'label':'Lebanese pound','currencyflag':'','symbol':'ل.ل'},
  'LKR':{'label':'Sri Lankan rupee','currencyflag':'','symbol':'Rs'},
  'LRD':{'label':'Liberian dollar','currencyflag':'','symbol':'$'},
  'LSL':{'label':'Lesotho loti','currencyflag':'','symbol':'L'},
  'LTL':{'label':'Lithuanian litas','currencyflag':'','symbol':'Lt'},
  'LVL':{'label':'Latvian lats','currencyflag':'','symbol':'Ls'},
  'LYD':{'label':'Libyan dinar','currencyflag':'','symbol':'ل.د'},
  'MAD':{'label':'Moroccan dirham','currencyflag':'','symbol':'د.م.'},
  'MDL':{'label':'Moldovan leu','currencyflag':'','symbol':'L'},
  'MGA':{'label':'Malagasy ariary','currencyflag':'','symbol':'Ar'},
  'MKD':{'label':'Macedonian denar','currencyflag':'','symbol':'ден'},
  'MMK':{'label':'Burmese kyat','currencyflag':'','symbol':'Ks'},
  'MNT':{'label':'Mongolian tögrög','currencyflag':'','symbol':'₮'},
  'MOP':{'label':'Macanese pataca','currencyflag':'','symbol':'P'},
  'MRO':{'label':'Mauritanian ouguiya','currencyflag':'','symbol':'UM'},
  'MUR':{'label':'Mauritian rupee','currencyflag':'','symbol':'Rs'},
  'MVR':{'label':'Maldivian rufiyaa','currencyflag':'','symbol':'.ރ'},
  'MWK':{'label':'Malawian kwacha','currencyflag':'','symbol':'MK'},
  'MXN':{'label':'Mexican peso','currencyflag':'','symbol':'$'},
  'MYR':{'label':'Malaysian ringgit','currencyflag':'','symbol':'MR'},
  'MZN':{'label':'Mozambican metical','currencyflag':'','symbol':'MT'},
  'NAD':{'label':'Namibian dollar','currencyflag':'','symbol':'$'},
  'NGN':{'label':'Nigerian naira','currencyflag':'','symbol':'₦'},
  'NIO':{'label':'Nicaraguan córdoba','currencyflag':'','symbol':'C$'},
  'NOK':{'label':'Norwegian krone','currencyflag':'','symbol':'kr'},
  'NPR':{'label':'Nepalese rupee','currencyflag':'','symbol':'Rs'},
  'NZD':{'label':'New Zealand dollar','currencyflag':'','symbol':'$'},
  'OMR':{'label':'Omani rial','currencyflag':'','symbol':'ر.ع.'},
  'PAB':{'label':'Panamanian balboa','currencyflag':'','symbol':'B/.'},
  'PEN':{'label':'Peruvian nuevo sol','currencyflag':'','symbol':'S/.'},
  'PGK':{'label':'Papua New Guinean kina','currencyflag':'','symbol':'K'},
  'PHP':{'label':'Philippine peso','currencyflag':'','symbol':'₱'},
  'PKR':{'label':'Pakistani rupee','currencyflag':'','symbol':'Rs'},
  'PLN':{'label':'Polish złoty','currencyflag':'','symbol':'zł'},
  'PRB':{'label':'Transnistrian ruble','currencyflag':'','symbol':'р.'},
  'PYG':{'label':'Paraguayan guaraní','currencyflag':'','symbol':'₲'},
  'QAR':{'label':'Qatari riyal','currencyflag':'','symbol':'ر.ق'},
  'RON':{'label':'Romanian leu','currencyflag':'','symbol':'L'},
  'RSD':{'label':'Serbian dinar','currencyflag':'','symbol':'дин'},
  'RUB':{'label':'Russian ruble','currencyflag':'','symbol':'руб.'},
  'RWF':{'label':'Rwandan franc','currencyflag':'','symbol':'Fr'},
  'SAR':{'label':'Saudi riyal','currencyflag':'','symbol':'ر.س'},
  'SBD':{'label':'Solomon Islands dollar','currencyflag':'','symbol':'$'},
  'SCR':{'label':'Seychellois rupee','currencyflag':'','symbol':'Rs'},
  'SDG':{'label':'Singapore dollar','currencyflag':'','symbol':'$'},
  'SEK':{'label':'Swedish krona','currencyflag':'','symbol':'kr'},
  'SGD':{'label':'Singapore dollar','currencyflag':'','symbol':'$'},
  'SHP':{'label':'Saint Helena pound','currencyflag':'','symbol':'£'},
  'SLL':{'label':'Sierra Leonean leone','currencyflag':'','symbol':'Le'},
  'SOS':{'label':'Somali shilling','currencyflag':'','symbol':'Sh'},
  'SRD':{'label':'Surinamese dollar','currencyflag':'','symbol':'$'},
  'SSP':{'label':'South Sudanese pound','currencyflag':'','symbol':'£'},
  'STD':{'label':'São Tomé and Príncipe dobra','currencyflag':'','symbol':'Db'},
  'SVC':{'label':'Salvadoran colón','currencyflag':'','symbol':'₡'},
  'SYP':{'label':'Syrian pound','currencyflag':'','symbol':'£'},
  'SZL':{'label':'Swazi lilangeni','currencyflag':'','symbol':'L'},
  'THB':{'label':'Thai baht','currencyflag':'','symbol':'฿'},
  'TJS':{'label':'Tajikistani somoni','currencyflag':'','symbol':'SM'},
  'TMT':{'label':'Turkmenistan manat','currencyflag':'','symbol':'m'},
  'TND':{'label':'Tunisian dinar','currencyflag':'','symbol':'د.ت'},
  'TOP':{'label':'Tongan paʻanga','currencyflag':'','symbol':'T$'},
  'TRY':{'label':'Turkish lira','currencyflag':'','symbol':'&#8378;'},
  'TTD':{'label':'Trinidad and Tobago dollar','currencyflag':'','symbol':'$'},
  'TWD':{'label':'New Taiwan dollar','currencyflag':'','symbol':'$'},
  'TZS':{'label':'Tanzanian shilling','currencyflag':'','symbol':'Sh'},
  'UAH':{'label':'Ukrainian hryvnia','currencyflag':'','symbol':'₴'},
  'UGX':{'label':'Ugandan shilling','currencyflag':'','symbol':'Sh'},
  'USD':{'label':'United States dollar','currencyflag':'','symbol':'$'},
  'UYU':{'label':'Uruguayan peso','currencyflag':'','symbol':'$'},
  'UZS':{'label':'Uzbekistani som','currencyflag':'','symbol':'лв'},
  'VEF':{'label':'Venezuelan bolívar','currencyflag':'','symbol':'Bs F'},
  'VND':{'label':'Vietnamese đồng','currencyflag':'','symbol':'₫'},
  'VUV':{'label':'Vanuatu vatu','currencyflag':'','symbol':'Vt'},
  'WST':{'label':'Samoan tālā','currencyflag':'','symbol':'T'},
  'XAF':{'label':'Central African CFA franc','currencyflag':'XAF','symbol':'Fr'},
  'XCD':{'label':'East Caribbean dollar','currencyflag':'XCD','symbol':'$'},
  'XOF':{'label':'West African CFA franc','currencyflag':'XOF','symbol':'Fr'},
  'XPF':{'label':'CFP franc','currencyflag':'XPF','symbol':'Fr'},
  'YER':{'label':'Yemeni rial','currencyflag':'','symbol':'﷼'},
  'ZAR':{'label':'South African rand','currencyflag':'ZAR','symbol':'R'},
  'ZMW':{'label':'Zambian kwacha','currencyflag':'','symbol':'ZK'},
  'ZWL':{'label':'Zimbabwean dollar','currencyflag':'','symbol':'$'}
};

/* ==========================================================
 * bootstrap-formhelpers-datepicker.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHMonthsList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
 
var BFHDaysList = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT'
];
 
var BFHDayOfWeekStart = 0;

/* ==========================================================
 * bootstrap-formhelpers-fonts.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHFontsList = {
  'Andale Mono': '"Andale Mono", AndaleMono, monospace',
  'Arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  'Arial Black': '"Arial Black", "Arial Bold", Gadget, sans-serif',
  'Arial Narrow': '"Arial Narrow", Arial, sans-serif',
  'Arial Rounded MT Bold': '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif',
  'Avant Garde': '"Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif',
  'Baskerville': 'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif',
  'Big Caslon': '"Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif',
  'Bodoni MT': '"Bodoni MT", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
  'Book Antiqua': '"Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif',
  'Brush Script MT': '"Brush Script MT", cursive',
  'Calibri': 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
  'Calisto MT': '"Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter", Georgia, serif',
  'Cambrio': 'Cambria, Georgia, serif',
  'Candara': 'Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif',
  'Century Gothic': '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
  'Consolas': 'Consolas, monaco, monospace',
  'Copperplate': 'Copperplate, "Copperplate Gothic Light", fantasy',
  'Courier New': '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
  'Didot': 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
  'Franklin Gothic Medium': '"Franklin Gothic Medium", "Franklin Gothic", "ITC Franklin Gothic", Arial, sans-serif',
  'Futura': 'Futura, "Trebuchet MS", Arial, sans-serif',
  'Garamond': 'Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif',
  'Geneva': 'Geneva, Tahoma, Verdana, sans-serif',
  'Georgia': 'Georgia, Times, "Times New Roman", serif',
  'Gill Sans': '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
  'Goudy Old Style': '"Goudy Old Style", Garamond, "Big Caslon", "Times New Roman", serif',
  'Helvetica': '"Helvetica Neue", Helvetica, Arial, sans-serif',
  'Hoefler Text': '"Hoefler Text", "Baskerville old face", Garamond, "Times New Roman", serif',
  'Impact': 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans serif',
  'Lucida Bright': '"Lucida Bright", Georgia, serif',
  'Lucida Console': '"Lucida Console", "Lucida Sans Typewriter", Monaco, "Bitstream Vera Sans Mono", monospace',
  'Lucida Sans Typewriter': '"Lucida Sans Typewriter", "Lucida Console", Monaco, "Bitstream Vera Sans Mono", monospace',
  'Lucida Grande': '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
  'Monaco': 'Monaco, Consolas, "Lucida Console", monospace',
  'Optima': 'Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif',
  'Palatino': 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  'Papyrus': 'Papyrus, fantasy',
  'Perpetua': 'Perpetua, Baskerville, "Big Caslon", "Palatino Linotype", Palatino, "URW Palladio L", "Nimbus Roman No9 L", serif',
  'Rockwell': 'Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif',
  'Rockwell Extra Bold': '"Rockwell Extra Bold", "Rockwell Bold", monospace',
  'Segoe UI': '"Segoe UI", Frutiger, "Frutiger Linotype',
  'Tahoma': 'Tahoma, Verdana, Segoe, sans-serif',
  'Times New Roman': 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',
  'Trebuchet MS': '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif',
  'Verdana': 'Verdana, Geneva, sans-serif'
};

/* ==========================================================
 * bootstrap-formhelpers-fontsizes.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHFontSizesList = {
  '8': '8px',
  '9': '9px',
  '10': '10px',
  '11': '11px',
  '12': '12px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '36': '36px',
  '48': '48px'
};

/* ==========================================================
 * bootstrap-formhelpers-googlefonts.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

var BFHGoogleFontsList = {
  'kind': 'webfonts#webfontList',
  'items': [
    {
      'kind': 'webfonts#webfont',
      'family': 'ABeeZee',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Abel',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Abril Fatface',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aclonica',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Acme',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Actor',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Adamina',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Advent Pro',
      'variants': [
        '100',
        '200',
        '300',
        'regular',
        '500',
        '600',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aguafina Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Akronim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aladin',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aldrich',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alegreya',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alegreya SC',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alex Brush',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alfa Slab One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alice',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alike',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Alike Angular',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allan',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allerta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allerta Stencil',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Allura',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Almendra',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Almendra Display',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Almendra SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amarante',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amaranth',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amatic SC',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Amethysta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Anaheim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Andada',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Andika',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Angkor',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Annie Use Your Telescope',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Anonymous Pro',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Antic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Antic Didone',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Antic Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Anton',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arapey',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arbutus',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arbutus Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Architects Daughter',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Archivo Black',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Archivo Narrow',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arimo',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arizonia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Armata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Artifika',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Arvo',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Asap',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Asset',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Astloch',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Asul',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Atomic Age',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Aubrey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Audiowide',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Autour One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Average',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Average Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Gruesa Libre',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Libre',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Sans Libre',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Averia Serif Libre',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bad Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Balthazar',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bangers',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Basic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Battambang',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Baumans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bayon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Belgrano',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Belleza',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'BenchNine',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bentham',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Berkshire Swash',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bevan',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bigelow Rules',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bigshot One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bilbo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bilbo Swash Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bitter',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Black Ops One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bokor',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bonbon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Boogaloo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bowlby One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bowlby One SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Brawler',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bree Serif',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bubblegum Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Bubbler One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Buda',
      'variants': [
        '300'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Buenard',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Butcherman',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Butterfly Kids',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cabin',
      'variants': [
        'regular',
        'italic',
        '500',
        '500italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cabin Condensed',
      'variants': [
        'regular',
        '500',
        '600',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cabin Sketch',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Caesar Dressing',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cagliostro',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Calligraffitti',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cambo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Candal',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cantarell',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cantata One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cantora One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Capriola',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cardo',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'greek-ext',
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carme',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carrois Gothic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carrois Gothic SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Carter One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Caudex',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'greek-ext',
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cedarville Cursive',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ceviche One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Changa One',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chango',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chau Philomene One',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chela One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chelsea Market',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chenla',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cherry Cream Soda',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cherry Swash',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chewy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chicle',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Chivo',
      'variants': [
        'regular',
        'italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cinzel',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cinzel Decorative',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Clicker Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coda',
      'variants': [
        'regular',
        '800'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coda Caption',
      'variants': [
        '800'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Codystar',
      'variants': [
        '300',
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Combo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Comfortaa',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coming Soon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Concert One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Condiment',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Content',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Contrail One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Convergence',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cookie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Copse',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Corben',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Courgette',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cousine',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Coustard',
      'variants': [
        'regular',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Covered By Your Grace',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crafty Girls',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Creepster',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crete Round',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crimson Text',
      'variants': [
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Croissant One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Crushed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cuprum',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cutive',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Cutive Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Damion',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dancing Script',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dangrek',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dawning of a New Day',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Days One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Delius',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Delius Swash Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Delius Unicase',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Della Respira',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Devonshire',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Didact Gothic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Diplomata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Diplomata SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Doppio One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dorsa',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dosis',
      'variants': [
        '200',
        '300',
        'regular',
        '500',
        '600',
        '700',
        '800'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dr Sugiyama',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Droid Sans',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Droid Sans Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Droid Serif',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Duru Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Dynalight',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'EB Garamond',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'vietnamese',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Eagle Lake',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Eater',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Economica',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Electrolize',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Emblema One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Emilys Candy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Engagement',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Englebert',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Enriqueta',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Erica One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Esteban',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Euphoria Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ewert',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Exo',
      'variants': [
        '100',
        '100italic',
        '200',
        '200italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '500',
        '500italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '800',
        '800italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Expletus Sans',
      'variants': [
        'regular',
        'italic',
        '500',
        '500italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fanwood Text',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fascinate',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fascinate Inline',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Faster One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fasthand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Federant',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Federo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Felipa',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fenix',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Finger Paint',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fjord One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Flamenco',
      'variants': [
        '300',
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Flavors',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fondamento',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fontdiner Swanky',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Forum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Francois One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Freckle Face',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fredericka the Great',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fredoka One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Freehand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fresca',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Frijole',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Fugaz One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'GFS Didot',
      'variants': [
        'regular'
      ],
      'subsets': [
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'GFS Neohellenic',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gafata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Galdeano',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Galindo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gentium Basic',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gentium Book Basic',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Geo',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Geostar',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Geostar Fill',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Germania One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gilda Display',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Give You Glory',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Glass Antiqua',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Glegoo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gloria Hallelujah',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Goblin One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gochi Hand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gorditas',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Goudy Bookletter 1911',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Graduate',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gravitas One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Great Vibes',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Griffy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gruppo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Gudea',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Habibi',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hammersmith One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hanalei',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hanalei Fill',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Handlee',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Hanuman',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Happy Monkey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Headland One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Henny Penny',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Herr Von Muellerhoff',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Holtwood One SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Homemade Apple',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Homenaje',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell DW Pica',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell DW Pica SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Double Pica',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Double Pica SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell English',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell English SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell French Canon',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell French Canon SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Great Primer',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'IM Fell Great Primer SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Iceberg',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Iceland',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Imprima',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Inconsolata',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Inder',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Indie Flower',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Inika',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Irish Grover',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Istok Web',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Italiana',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Italianno',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jacques Francois',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jacques Francois Shadow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jim Nightshade',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jockey One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jolly Lodger',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Josefin Sans',
      'variants': [
        '100',
        '100italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Josefin Slab',
      'variants': [
        '100',
        '100italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Joti One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Judson',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Julee',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Julius Sans One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Junge',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Jura',
      'variants': [
        '300',
        'regular',
        '500',
        '600'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Just Another Hand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Just Me Again Down Here',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kameron',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Karla',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kaushan Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Keania One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kelly Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kenia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Khmer',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kite One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Knewave',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kotta One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Koulen',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kranky',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kreon',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Kristi',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Krona One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'La Belle Aurore',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lancelot',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lato',
      'variants': [
        '100',
        '100italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'League Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Leckerli One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ledger',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lekton',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lemon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Life Savers',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lilita One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Limelight',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Linden Hill',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lobster',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lobster Two',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Outline',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Shadow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Sketch',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Londrina Solid',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lora',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Love Ya Like A Sister',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Loved by the King',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lovers Quarrel',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Luckiest Guy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lusitana',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Lustria',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Macondo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Macondo Swash Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Magra',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Maiden Orange',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mako',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marcellus',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marcellus SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marck Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Margarine',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marko One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marmelad',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Marvel',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mate',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mate SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Maven Pro',
      'variants': [
        'regular',
        '500',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'McLaren',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Meddon',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'MedievalSharp',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Medula One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Megrim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Meie Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Merienda',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Merienda One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Merriweather',
      'variants': [
        '300',
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metal',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metal Mania',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metamorphous',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Metrophobic',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Michroma',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miltonian',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miltonian Tattoo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miniver',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Miss Fajardose',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Modern Antiqua',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Molengo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Molle',
      'variants': [
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Monofett',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Monoton',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Monsieur La Doulaise',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montaga',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montez',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montserrat',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montserrat Alternates',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Montserrat Subrayada',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Moul',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Moulpali',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mountains of Christmas',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mouse Memoirs',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mr Bedfort',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mr Dafoe',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mr De Haviland',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mrs Saint Delafield',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mrs Sheppards',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Muli',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Mystery Quest',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Neucha',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Neuton',
      'variants': [
        '200',
        '300',
        'regular',
        'italic',
        '700',
        '800'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'News Cycle',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Niconne',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nixie One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nobile',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nokora',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Norican',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nosifer',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nothing You Could Do',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Noticia Text',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin',
        'vietnamese'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Cut',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Flat',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Oval',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Round',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Slim',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nova Square',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Numans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Nunito',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Odor Mean Chey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Offside',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Old Standard TT',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oldenburg',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oleo Script',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oleo Script Swash Caps',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Open Sans',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '800',
        '800italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'vietnamese',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Open Sans Condensed',
      'variants': [
        '300',
        '300italic',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'vietnamese',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oranienbaum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Orbitron',
      'variants': [
        'regular',
        '500',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oregano',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Orienta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Original Surfer',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oswald',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Over the Rainbow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Overlock',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Overlock SC',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ovo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oxygen',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Oxygen Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Sans',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Sans Caption',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Sans Narrow',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Serif',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'PT Serif Caption',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pacifico',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Paprika',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Parisienne',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Passero One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Passion One',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Patrick Hand',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Patua One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Paytone One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Peralta',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Permanent Marker',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Petit Formal Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Petrona',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Philosopher',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Piedra',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pinyon Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pirata One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Plaster',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Play',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Playball',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Playfair Display',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Playfair Display SC',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Podkova',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Poiret One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Poller One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Poly',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pompiere',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Pontano Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Port Lligat Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Port Lligat Slab',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Prata',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Preahvihear',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Press Start 2P',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'greek'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Princess Sofia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Prociono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Prosto One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Puritan',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Purple Purse',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quando',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quantico',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quattrocento',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quattrocento Sans',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Questrial',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quicksand',
      'variants': [
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Quintessential',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Qwigley',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Racing Sans One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Radley',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Raleway',
      'variants': [
        '100',
        '200',
        '300',
        'regular',
        '500',
        '600',
        '700',
        '800',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Raleway Dots',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rambla',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rammetto One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ranchers',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rancho',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rationale',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Redressed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Reenie Beanie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Revalia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ribeye',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ribeye Marrow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Righteous',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Risque',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rochester',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rock Salt',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rokkitt',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Romanesco',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ropa Sans',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rosario',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rosarivo',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rouge Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruda',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rufina',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruge Boogie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruluko',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rum Raisin',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruslan Display',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Russo One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ruthie',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Rye',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sacramento',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sail',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Salsa',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sanchez',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sancreek',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sansita One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sarina',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Satisfy',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Scada',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Schoolbell',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Seaweed Script',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sevillana',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Seymour One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shadows Into Light',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shadows Into Light Two',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shanti',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Share',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Share Tech',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Share Tech Mono',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Shojumaru',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Short Stack',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Siemreap',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sigmar One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Signika',
      'variants': [
        '300',
        'regular',
        '600',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Signika Negative',
      'variants': [
        '300',
        'regular',
        '600',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Simonetta',
      'variants': [
        'regular',
        'italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sirin Stencil',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Six Caps',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Skranji',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Slackey',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Smokum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Smythe',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sniglet',
      'variants': [
        '800'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Snippet',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Snowburst One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sofadi One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sofia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sonsie One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sorts Mill Goudy',
      'variants': [
        'regular',
        'italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Source Code Pro',
      'variants': [
        '200',
        '300',
        'regular',
        '600',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Source Sans Pro',
      'variants': [
        '200',
        '200italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '900',
        '900italic'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Special Elite',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Spicy Rice',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Spinnaker',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Spirax',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Squada One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stalemate',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stalinist One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stardos Stencil',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stint Ultra Condensed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stint Ultra Expanded',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Stoke',
      'variants': [
        '300',
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Strait',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sue Ellen Francisco',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Sunshiney',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Supermercado One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Suwannaphum',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Swanky and Moo Moo',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Syncopate',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tangerine',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Taprom',
      'variants': [
        'regular'
      ],
      'subsets': [
        'khmer'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Telex',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tenor Sans',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Text Me One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'The Girl Next Door',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tienne',
      'variants': [
        'regular',
        '700',
        '900'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tinos',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Titan One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Titillium Web',
      'variants': [
        '200',
        '200italic',
        '300',
        '300italic',
        'regular',
        'italic',
        '600',
        '600italic',
        '700',
        '700italic',
        '900'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trade Winds',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trocchi',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trochut',
      'variants': [
        'regular',
        'italic',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Trykker',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Tulpen One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ubuntu',
      'variants': [
        '300',
        '300italic',
        'regular',
        'italic',
        '500',
        '500italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ubuntu Condensed',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ubuntu Mono',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'cyrillic',
        'greek-ext',
        'latin-ext',
        'latin',
        'greek',
        'cyrillic-ext'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Ultra',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Uncial Antiqua',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Underdog',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unica One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'UnifrakturCook',
      'variants': [
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'UnifrakturMaguntia',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unkempt',
      'variants': [
        'regular',
        '700'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unlock',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Unna',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'VT323',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vampiro One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Varela',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Varela Round',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vast Shadow',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vibur',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vidaloka',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Viga',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Voces',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Volkhov',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Vollkorn',
      'variants': [
        'regular',
        'italic',
        '700',
        '700italic'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Voltaire',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Waiting for the Sunrise',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Wallpoet',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Walter Turncoat',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Warnes',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Wellfleet',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Wire One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yanone Kaffeesatz',
      'variants': [
        '200',
        '300',
        'regular',
        '700'
      ],
      'subsets': [
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yellowtail',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yeseva One',
      'variants': [
        'regular'
      ],
      'subsets': [
        'cyrillic',
        'latin-ext',
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Yesteryear',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    },
    {
      'kind': 'webfonts#webfont',
      'family': 'Zeyada',
      'variants': [
        'regular'
      ],
      'subsets': [
        'latin'
      ]
    }
  ]
};

/* ==========================================================
 * bootstrap-formhelpers-languages.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHLanguagesList = {
  'om': 'Afaan Oromoo',
  'aa': 'Afaraf',
  'af': 'Afrikaans',
  'ak': 'Akan',
  'an': 'aragonés',
  'ig': 'Asụsụ Igbo',
  'gn': 'Avañe\'ẽ',
  'ae': 'avesta',
  'ay': 'aymar aru',
  'az': 'azərbaycan dili',
  'id': 'Bahasa Indonesia',
  'ms': 'bahasa Melayu',
  'bm': 'bamanankan',
  'jv': 'basa Jawa',
  'su': 'Basa Sunda',
  'bi': 'Bislama',
  'bs': 'bosanski jezik',
  'br': 'brezhoneg',
  'ca': 'català',
  'ch': 'Chamoru',
  'ny': 'chiCheŵa',
  'sn': 'chiShona',
  'co': 'corsu',
  'cy': 'Cymraeg',
  'da': 'dansk',
  'se': 'Davvisámegiella',
  'de': 'Deutsch',
  'nv': 'Diné bizaad',
  'et': 'eesti',
  'na': 'Ekakairũ Naoero',
  'en': 'English',
  'es': 'español',
  'eo': 'Esperanto',
  'eu': 'euskara',
  'ee': 'Eʋegbe',
  'to': 'faka Tonga',
  'mg': 'fiteny malagasy',
  'fr': 'français',
  'fy': 'Frysk',
  'ff': 'Fulfulde',
  'fo': 'føroyskt',
  'ga': 'Gaeilge',
  'gv': 'Gaelg',
  'sm': 'gagana fa\'a Samoa',
  'gl': 'galego',
  'sq': 'gjuha shqipe',
  'gd': 'Gàidhlig',
  'ki': 'Gĩkũyũ',
  'ha': 'Hausa',
  'ho': 'Hiri Motu',
  'hr': 'hrvatski jezik',
  'io': 'Ido',
  'rw': 'Ikinyarwanda',
  'rn': 'Ikirundi',
  'ia': 'Interlingua',
  'nd': 'isiNdebele',
  'nr': 'isiNdebele',
  'xh': 'isiXhosa',
  'zu': 'isiZulu',
  'it': 'italiano',
  'ik': 'Iñupiaq',
  'pl': 'polski',
  'mh': 'Kajin M̧ajeļ',
  'kl': 'kalaallisut',
  'kr': 'Kanuri',
  'kw': 'Kernewek',
  'kg': 'KiKongo',
  'sw': 'Kiswahili',
  'ht': 'Kreyòl ayisyen',
  'kj': 'Kuanyama',
  'ku': 'Kurdî',
  'la': 'latine',
  'lv': 'latviešu valoda',
  'lt': 'lietuvių kalba',
  'ro': 'limba română',
  'li': 'Limburgs',
  'ln': 'Lingála',
  'lg': 'Luganda',
  'lb': 'Lëtzebuergesch',
  'hu': 'magyar',
  'mt': 'Malti',
  'nl': 'Nederlands',
  'no': 'Norsk',
  'nb': 'Norsk bokmål',
  'nn': 'Norsk nynorsk',
  'uz': 'O\'zbek',
  'oc': 'occitan',
  'ie': 'Interlingue',
  'hz': 'Otjiherero',
  'ng': 'Owambo',
  'pt': 'português',
  'ty': 'Reo Tahiti',
  'rm': 'rumantsch grischun',
  'qu': 'Runa Simi',
  'sc': 'sardu',
  'za': 'Saɯ cueŋƅ',
  'st': 'Sesotho',
  'tn': 'Setswana',
  'ss': 'SiSwati',
  'sl': 'slovenski jezik',
  'sk': 'slovenčina',
  'so': 'Soomaaliga',
  'fi': 'suomi',
  'sv': 'Svenska',
  'mi': 'te reo Māori',
  'vi': 'Tiếng Việt',
  'lu': 'Tshiluba',
  've': 'Tshivenḓa',
  'tw': 'Twi',
  'tk': 'Türkmen',
  'tr': 'Türkçe',
  'ug': 'Uyƣurqə',
  'vo': 'Volapük',
  'fj': 'vosa Vakaviti',
  'wa': 'walon',
  'tl': 'Wikang Tagalog',
  'wo': 'Wollof',
  'ts': 'Xitsonga',
  'yo': 'Yorùbá',
  'sg': 'yângâ tî sängö',
  'is': 'Íslenska',
  'cs': 'čeština',
  'el': 'ελληνικά',
  'av': 'авар мацӀ',
  'ab': 'аҧсуа бызшәа',
  'ba': 'башҡорт теле',
  'be': 'беларуская мова',
  'bg': 'български език',
  'os': 'ирон æвзаг',
  'kv': 'коми кыв',
  'ky': 'Кыргызча',
  'mk': 'македонски јазик',
  'mn': 'монгол',
  'ce': 'нохчийн мотт',
  'ru': 'русский язык',
  'sr': 'српски језик',
  'tt': 'татар теле',
  'tg': 'тоҷикӣ',
  'uk': 'українська мова',
  'cv': 'чӑваш чӗлхи',
  'cu': 'ѩзыкъ словѣньскъ',
  'kk': 'қазақ тілі',
  'hy': 'Հայերեն',
  'yi': 'ייִדיש',
  'he': 'עברית',
  'ur': 'اردو',
  'ar': 'العربية',
  'fa': 'فارسی',
  'ps': 'پښتو',
  'ks': 'कश्मीरी',
  'ne': 'नेपाली',
  'pi': 'पाऴि',
  'bh': 'भोजपुरी',
  'mr': 'मराठी',
  'sa': 'संस्कृतम्',
  'sd': 'सिन्धी',
  'hi': 'हिन्दी',
  'as': 'অসমীয়া',
  'bn': 'বাংলা',
  'pa': 'ਪੰਜਾਬੀ',
  'gu': 'ગુજરાતી',
  'or': 'ଓଡ଼ିଆ',
  'ta': 'தமிழ்',
  'te': 'తెలుగు',
  'kn': 'ಕನ್ನಡ',
  'ml': 'മലയാളം',
  'si': 'සිංහල',
  'th': 'ไทย',
  'lo': 'ພາສາລາວ',
  'bo': 'བོད་ཡིག',
  'dz': 'རྫོང་ཁ',
  'my': 'ဗမာစာ',
  'ka': 'ქართული',
  'ti': 'ትግርኛ',
  'am': 'አማርኛ',
  'iu': 'ᐃᓄᒃᑎᑐᑦ',
  'oj': 'ᐊᓂᔑᓈᐯᒧᐎᓐ',
  'cr': 'ᓀᐦᐃᔭᐍᐏᐣ',
  'km': 'ខ្មែរ',
  'zh': '中文 (Zhōngwén)',
  'ja': '日本語 (にほんご)',
  'ii': 'ꆈꌠ꒿ Nuosuhxop',
  'ko': '한국어 (韓國語)'
};

/* ==========================================================
 * bootstrap-formhelpers-phone.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file edcept in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either edpress or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHPhoneFormatList = {
  'AF': '+93 0dd ddd dddd',
  'AL': '+355 0dd ddd ddd',
  'DZ': '+213 0ddd dd dd dd',
  'AS': '+1 (ddd) ddd-dddd',
  'AD': '+376 ddddddddd',
  'AO': '+244 ddd ddd ddd',
  'AI': '+1 (ddd) ddd-dddd',
  'AQ': '+672 ddddddddd',
  'AG': '+1 (ddd) ddd-dddd',
  'AR': '+54 ddddddddd',
  'AM': '+374 0dd dddddd',
  'AW': '+297 ddd dddd',
  'AU': '+61 ddd ddd ddd',
  'AT': '+43 0dddd ddddddddd',
  'AZ': '+994 ddddddddd',
  'BH': '+973 ddddddddd',
  'BD': '+880 ddddddddd',
  'BB': '+1 ddddddddd',
  'BY': '+375 ddddddddd',
  'BE': '+32 ddddddddd',
  'BZ': '+501 ddddddddd',
  'BJ': '+229 ddddddddd',
  'BM': '+1 (ddd) ddd-dddd',
  'BT': '+975 ddddddddd',
  'BO': '+591 ddddddddd',
  'BA': '+387 ddddddddd',
  'BW': '+267 ddddddddd',
  'BV': '+0 ddddddddd',
  'BR': '+55 ddddddddd',
  'IO': '+0 ddddddddd',
  'VG': '+1 (ddd) ddd-dddd',
  'BN': '+673 ddddddddd',
  'BG': '+359 ddddddddd',
  'BF': '+226 ddddddddd',
  'BI': '+257 ddddddddd',
  'CI': '+225 ddddddddd',
  'KH': '+855 ddddddddd',
  'CM': '+237 ddddddddd',
  'CA': '+1 (ddd) ddd-dddd',
  'CV': '+238 ddddddddd',
  'KY': '+1 (ddd) ddd-dddd',
  'CF': '+236 ddddddddd',
  'TD': '+235 ddddddddd',
  'CL': '+56 ddddddddd',
  'CN': '+86 ddddddddd',
  'CX': '+61 ddddddddd',
  'CC': '+61 ddddddddd',
  'CO': '+57 ddddddddd',
  'KM': '+269 ddddddddd',
  'CG': '+242 ddddddddd',
  'CK': '+682 ddddddddd',
  'CR': '+506 ddddddddd',
  'HR': '+385 ddddddddd',
  'CU': '+53 ddddddddd',
  'CY': '+357 ddddddddd',
  'CZ': '+420 ddddddddd',
  'CD': '+243 ddddddddd',
  'DK': '+45 ddddddddd',
  'DJ': '+253 ddddddddd',
  'DM': '+1 (ddd) ddd-dddd',
  'DO': '+1 (ddd) ddd-dddd',
  'TL': '+670 ddddddddd',
  'EC': '+593 ddddddddd',
  'EG': '+20 ddddddddd',
  'SV': '+503 ddddddddd',
  'GQ': '+240 ddddddddd',
  'ER': '+291 ddddddddd',
  'EE': '+372 ddddddddd',
  'ET': '+251 ddddddddd',
  'FO': '+298 ddddddddd',
  'FK': '+500 ddddddddd',
  'FJ': '+679 ddddddddd',
  'FI': '+358 ddddddddd',
  'MK': '+389 ddddddddd',
  'FR': '+33 d dd dd dd dd',
  'GF': '+594 ddddddddd',
  'PF': '+689 ddddddddd',
  'TF': '+262 ddddddddd',
  'GA': '+241 ddddddddd',
  'GE': '+995 ddddddddd',
  'DE': '+49 ddddddddd',
  'GH': '+233 ddddddddd',
  'GI': '+350 ddddddddd',
  'GR': '+30 ddddddddd',
  'GL': '+299 ddddddddd',
  'GD': '+1 (ddd) ddd-dddd',
  'GP': '+590 ddddddddd',
  'GU': '+1 (ddd) ddd-dddd',
  'GT': '+502 ddddddddd',
  'GN': '+224 ddddddddd',
  'GW': '+245 ddddddddd',
  'GY': '+592 ddddddddd',
  'HT': '+509 ddddddddd',
  'HM': '+0 ddddddddd',
  'HN': '+504 ddddddddd',
  'HK': '+852 ddddddddd',
  'HU': '+36 ddddddddd',
  'IS': '+354 ddddddddd',
  'IN': '+91 ddddddddd',
  'ID': '+62 ddddddddd',
  'IR': '+98 ddddddddd',
  'IQ': '+964 ddddddddd',
  'IE': '+353 ddddddddd',
  'IL': '+972 ddddddddd',
  'IT': '+39 ddddddddd',
  'JM': '+1 (ddd) ddd-dddd',
  'JP': '+81 ddddddddd',
  'JO': '+962 ddddddddd',
  'KZ': '+7 ddddddddd',
  'KE': '+254 ddddddddd',
  'KI': '+686 ddddddddd',
  'KW': '+965 ddddddddd',
  'KG': '+996 ddddddddd',
  'LA': '+856 ddddddddd',
  'LV': '+371 ddddddddd',
  'LB': '+961 ddddddddd',
  'LS': '+266 ddddddddd',
  'LR': '+231 ddddddddd',
  'LY': '+218 ddddddddd',
  'LI': '+423 ddddddddd',
  'LT': '+370 ddddddddd',
  'LU': '+352 ddddddddd',
  'MO': '+853 ddddddddd',
  'MG': '+261 ddddddddd',
  'MW': '+265 ddddddddd',
  'MY': '+60 ddddddddd',
  'MV': '+960 ddddddddd',
  'ML': '+223 ddddddddd',
  'MT': '+356 ddddddddd',
  'MH': '+692 ddddddddd',
  'MQ': '+596 ddddddddd',
  'MR': '+222 ddddddddd',
  'MU': '+230 ddddddddd',
  'YT': '+262 ddddddddd',
  'MX': '+52 ddddddddd',
  'FM': '+691 ddddddddd',
  'MD': '+373 ddddddddd',
  'MC': '+377 ddddddddd',
  'MN': '+976 ddddddddd',
  'MS': '+1 (ddd) ddd-dddd',
  'MA': '+212 ddddddddd',
  'MZ': '+258 ddddddddd',
  'MM': '+95 ddddddddd',
  'NA': '+264 ddddddddd',
  'NR': '+674 ddddddddd',
  'NP': '+977 ddddddddd',
  'NL': '+31 ddddddddd',
  'AN': '+599 ddddddddd',
  'NC': '+687 ddddddddd',
  'NZ': '+64 ddddddddd',
  'NI': '+505 ddddddddd',
  'NE': '+227 ddddddddd',
  'NG': '+234 ddddddddd',
  'NU': '+683 ddddddddd',
  'NF': '+672 ddddddddd',
  'KP': '+850 ddddddddd',
  'MP': '+1 (ddd) ddd-dddd',
  'NO': '+47 ddddddddd',
  'OM': '+968 ddddddddd',
  'PK': '+92 ddddddddd',
  'PW': '+680 ddddddddd',
  'PA': '+507 ddddddddd',
  'PG': '+675 ddddddddd',
  'PY': '+595 ddddddddd',
  'PE': '+51 ddddddddd',
  'PH': '+63 ddddddddd',
  'PN': '+870 ddddddddd',
  'PL': '+48 ddddddddd',
  'PT': '+351 ddddddddd',
  'PR': '+1 (ddd) ddd-dddd',
  'QA': '+974 ddddddddd',
  'RE': '+262 ddddddddd',
  'RO': '+40 ddddddddd',
  'RU': '+7 ddddddddd',
  'RW': '+250 ddddddddd',
  'ST': '+239 ddddddddd',
  'SH': '+290 ddddddddd',
  'KN': '+1 (ddd) ddd-dddd',
  'LC': '+1 (ddd) ddd-dddd',
  'PM': '+508 ddddddddd',
  'VC': '+1 (ddd) ddd-dddd',
  'WS': '+685 ddddddddd',
  'SM': '+378 ddddddddd',
  'SA': '+966 ddddddddd',
  'SN': '+221 ddddddddd',
  'SC': '+248 ddddddddd',
  'SL': '+232 ddddddddd',
  'SG': '+65 ddddddddd',
  'SK': '+421 ddddddddd',
  'SI': '+386 ddddddddd',
  'SB': '+677 ddddddddd',
  'SO': '+252 ddddddddd',
  'ZA': '+27 ddddddddd',
  'GS': '+0 ddddddddd',
  'KR': '+82 ddddddddd',
  'ES': '+34 ddddddddd',
  'LK': '+94 ddddddddd',
  'SD': '+249 ddddddddd',
  'SR': '+597 ddddddddd',
  'SJ': '+0 ddddddddd',
  'SZ': '+268 ddddddddd',
  'SE': '+46 ddddddddd',
  'CH': '+41 ddddddddd',
  'SY': '+963 ddddddddd',
  'TW': '+886 ddddddddd',
  'TJ': '+992 ddddddddd',
  'TZ': '+255 ddddddddd',
  'TH': '+66 ddddddddd',
  'BS': '+1 (ddd) ddd-dddd',
  'GM': '+220 ddddddddd',
  'TG': '+228 ddddddddd',
  'TK': '+690 ddddddddd',
  'TO': '+676 ddddddddd',
  'TT': '+1 (ddd) ddd-dddd',
  'TN': '+216 ddddddddd',
  'TR': '+90 ddddddddd',
  'TM': '+993 ddddddddd',
  'TC': '+1 (ddd) ddd-dddd',
  'TV': '+688 ddddddddd',
  'VI': '+1 (ddd) ddd-dddd',
  'UG': '+256 ddddddddd',
  'UA': '+380 ddddddddd',
  'AE': '+971 ddddddddd',
  'GB': '+44 (ddd) dddd dddd',
  'US': '+1 (ddd) ddd-dddd',
  'UM': '+0 ddddddddd',
  'UY': '+598 ddddddddd',
  'UZ': '+998 ddddddddd',
  'VU': '+678 ddddddddd',
  'VA': '+39 ddddddddd',
  'VE': '+58 ddddddddd',
  'VN': '+84 ddddddddd',
  'WF': '+681 ddddddddd',
  'EH': '+0 ddddddddd',
  'YE': '+967 ddddddddd',
  'YU': '+0 ddddddddd',
  'ZM': '+260 ddddddddd',
  'ZW': '+263 ddddddddd'
};

/* ==========================================================
 * bootstrap-formhelpers-states.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

var BFHStatesList = {
  'AF':{
    '1' : {'code':'BAL','name':'Balkh'},
    '2' : {'code':'BAM','name':'Bamian'},
    '3' : {'code':'BDG','name':'Badghis'},
    '4' : {'code':'BDS','name':'Badakhshan'},
    '5' : {'code':'BGL','name':'Baghlan'},
    '6' : {'code':'FRA','name':'Farah'},
    '7' : {'code':'FYB','name':'Faryab'},
    '8' : {'code':'GHA','name':'Ghazni'},
    '9' : {'code':'GHO','name':'Ghowr'},
    '10' : {'code':'HEL','name':'Helmand'},
    '11' : {'code':'HER','name':'Herat'},
    '12' : {'code':'JOW','name':'Jowzjan'},
    '13' : {'code':'KAB','name':'Kabul'},
    '14' : {'code':'KAN','name':'Kandahar'},
    '15' : {'code':'KAP','name':'Kapisa'},
    '16' : {'code':'KDZ','name':'Kondoz'},
    '17' : {'code':'KHO','name':'Khost'},
    '18' : {'code':'KNR','name':'Konar'},
    '19' : {'code':'LAG','name':'Laghman'},
    '20' : {'code':'LOW','name':'Lowgar'},
    '21' : {'code':'NAN','name':'Nangrahar'},
    '22' : {'code':'NIM','name':'Nimruz'},
    '23' : {'code':'NUR','name':'Nurestan'},
    '24' : {'code':'ORU','name':'Oruzgan'},
    '25' : {'code':'PAR','name':'Parwan'},
    '26' : {'code':'PIA','name':'Paktia'},
    '27' : {'code':'PKA','name':'Paktika'},
    '28' : {'code':'SAM','name':'Samangan'},
    '29' : {'code':'SAR','name':'Sar-e Pol'},
    '30' : {'code':'TAK','name':'Takhar'},
    '31' : {'code':'WAR','name':'Wardak'},
    '32' : {'code':'ZAB','name':'Zabol'}
  },
  'AL':{
    '1' : {'code':'BR','name':'Berat'},
    '2' : {'code':'BU','name':'Bulqize'},
    '3' : {'code':'DI','name':'Diber'},
    '4' : {'code':'DL','name':'Delvine'},
    '5' : {'code':'DR','name':'Durres'},
    '6' : {'code':'DV','name':'Devoll'},
    '7' : {'code':'EL','name':'Elbasan'},
    '8' : {'code':'ER','name':'Kolonje'},
    '9' : {'code':'FR','name':'Fier'},
    '10' : {'code':'GJ','name':'Gjirokaster'},
    '11' : {'code':'GR','name':'Gramsh'},
    '12' : {'code':'HA','name':'Has'},
    '13' : {'code':'KA','name':'Kavaje'},
    '14' : {'code':'KB','name':'Kurbin'},
    '15' : {'code':'KC','name':'Kucove'},
    '16' : {'code':'KO','name':'Korce'},
    '17' : {'code':'KR','name':'Kruje'},
    '18' : {'code':'KU','name':'Kukes'},
    '19' : {'code':'LB','name':'Librazhd'},
    '20' : {'code':'LE','name':'Lezhe'},
    '21' : {'code':'LU','name':'Lushnje'},
    '22' : {'code':'MK','name':'Mallakaster'},
    '23' : {'code':'MM','name':'Malesi e Madhe'},
    '24' : {'code':'MR','name':'Mirdite'},
    '25' : {'code':'MT','name':'Mat'},
    '26' : {'code':'PG','name':'Pogradec'},
    '27' : {'code':'PQ','name':'Peqin'},
    '28' : {'code':'PR','name':'Permet'},
    '29' : {'code':'PU','name':'Puke'},
    '30' : {'code':'SH','name':'Shkoder'},
    '31' : {'code':'SK','name':'Skrapar'},
    '32' : {'code':'SR','name':'Sarande'},
    '33' : {'code':'TE','name':'Tepelene'},
    '34' : {'code':'TP','name':'Tropoje'},
    '35' : {'code':'TR','name':'Tirane'},
    '36' : {'code':'VL','name':'Vlore'}
  },
  'DZ':{
    '1' : {'code':'ADE','name':'Ain Defla'},
    '2' : {'code':'ADR','name':'Adrar'},
    '3' : {'code':'ALG','name':'Alger'},
    '4' : {'code':'ANN','name':'Annaba'},
    '5' : {'code':'ATE','name':'Ain Temouchent'},
    '6' : {'code':'BAT','name':'Batna'},
    '7' : {'code':'BBA','name':'Bordj Bou Arreridj'},
    '8' : {'code':'BEC','name':'Bechar'},
    '9' : {'code':'BEJ','name':'Bejaia'},
    '10' : {'code':'BIS','name':'Biskra'},
    '11' : {'code':'BLI','name':'Blida'},
    '12' : {'code':'BMD','name':'Boumerdes'},
    '13' : {'code':'BOA','name':'Bouira'},
    '14' : {'code':'CHL','name':'Chlef'},
    '15' : {'code':'CON','name':'Constantine'},
    '16' : {'code':'DJE','name':'Djelfa'},
    '17' : {'code':'EBA','name':'El Bayadh'},
    '18' : {'code':'EOU','name':'El Oued'},
    '19' : {'code':'ETA','name':'El Tarf'},
    '20' : {'code':'GHA','name':'Ghardaia'},
    '21' : {'code':'GUE','name':'Guelma'},
    '22' : {'code':'ILL','name':'Illizi'},
    '23' : {'code':'JIJ','name':'Jijel'},
    '24' : {'code':'KHE','name':'Khenchela'},
    '25' : {'code':'LAG','name':'Laghouat'},
    '26' : {'code':'MED','name':'Medea'},
    '27' : {'code':'MIL','name':'Mila'},
    '28' : {'code':'MOS','name':'Mostaganem'},
    '29' : {'code':'MSI','name':'M\'Sila'},
    '30' : {'code':'MUA','name':'Muaskar'},
    '31' : {'code':'NAA','name':'Naama'},
    '32' : {'code':'OEB','name':'Oum el-Bouaghi'},
    '33' : {'code':'ORA','name':'Oran'},
    '34' : {'code':'OUA','name':'Ouargla'},
    '35' : {'code':'REL','name':'Relizane'},
    '36' : {'code':'SAH','name':'Souk Ahras'},
    '37' : {'code':'SAI','name':'Saida'},
    '38' : {'code':'SBA','name':'Sidi Bel Abbes'},
    '39' : {'code':'SET','name':'Setif'},
    '40' : {'code':'SKI','name':'Skikda'},
    '41' : {'code':'TAM','name':'Tamanghasset'},
    '42' : {'code':'TEB','name':'Tebessa'},
    '43' : {'code':'TIA','name':'Tiaret'},
    '44' : {'code':'TIN','name':'Tindouf'},
    '45' : {'code':'TIP','name':'Tipaza'},
    '46' : {'code':'TIS','name':'Tissemsilt'},
    '47' : {'code':'TLE','name':'Tlemcen'},
    '48' : {'code':'TOU','name':'Tizi Ouzou'}
  },
  'AS':{
    '1' : {'code':'E','name':'Eastern'},
    '2' : {'code':'M','name':'Manu\'a'},
    '3' : {'code':'R','name':'Rose Island'},
    '4' : {'code':'S','name':'Swains Island'},
    '5' : {'code':'W','name':'Western'}
  },
  'AD':{
    '1' : {'code':'ALV','name':'Andorra la Vella'},
    '2' : {'code':'CAN','name':'Canillo'},
    '3' : {'code':'ENC','name':'Encamp'},
    '4' : {'code':'ESE','name':'Escaldes-Engordany'},
    '5' : {'code':'LMA','name':'La Massana'},
    '6' : {'code':'ORD','name':'Ordino'},
    '7' : {'code':'SJL','name':'Sant Julià de Lòria'}
  },
  'AO':{
    '1' : {'code':'BGO','name':'Bengo'},
    '2' : {'code':'BGU','name':'Benguela'},
    '3' : {'code':'BIE','name':'Bie'},
    '4' : {'code':'CAB','name':'Cabinda'},
    '5' : {'code':'CCU','name':'Cuando-Cubango'},
    '6' : {'code':'CNO','name':'Cuanza Norte'},
    '7' : {'code':'CUS','name':'Cuanza Sul'},
    '8' : {'code':'CNN','name':'Cunene'},
    '9' : {'code':'HUA','name':'Huambo'},
    '10' : {'code':'HUI','name':'Huila'},
    '11' : {'code':'LUA','name':'Luanda'},
    '12' : {'code':'LNO','name':'Lunda Norte'},
    '13' : {'code':'LSU','name':'Lunda Sul'},
    '14' : {'code':'MAL','name':'Malange'},
    '15' : {'code':'MOX','name':'Moxico'},
    '16' : {'code':'NAM','name':'Namibe'},
    '17' : {'code':'UIG','name':'Uige'},
    '18' : {'code':'ZAI','name':'Zaire'}
  },
  'AI':{
    '1' : {'code':'ANG','name':'Anguillita'},
    '2' : {'code':'ANG','name':'Anguila'},
    '3' : {'code':'DOG','name':'Dog'},
    '4' : {'code':'LIT','name':'Little Scrub'},
    '5' : {'code':'PRI','name':'Prickly Pear'},
    '6' : {'code':'SAN','name':'Sandy'},
    '7' : {'code':'SCR','name':'Scrub'},
    '8' : {'code':'SEA','name':'Seal'},
    '9' : {'code':'SOM','name':'Sombrero'}
  },
  'AQ':{
    '1' : {'code':'ASG','name':'Saint George'},
    '2' : {'code':'ASH','name':'Saint Philip'},
    '3' : {'code':'ASJ','name':'Saint John'},
    '4' : {'code':'ASL','name':'Saint Paul'},
    '5' : {'code':'ASM','name':'Saint Mary'},
    '6' : {'code':'ASR','name':'Saint Peter'},
    '7' : {'code':'BAR','name':'Barbuda'},
    '8' : {'code':'RED','name':'Redonda'}
  },
  'AR':{
    '1' : {'code':'AN','name':'Antartida e Islas del Atlantico'},
    '2' : {'code':'BA','name':'Buenos Aires'},
    '3' : {'code':'CA','name':'Catamarca'},
    '4' : {'code':'CH','name':'Chaco'},
    '5' : {'code':'CU','name':'Chubut'},
    '6' : {'code':'CO','name':'Cordoba'},
    '7' : {'code':'CR','name':'Corrientes'},
    '8' : {'code':'CF','name':'Capital Federal'},
    '9' : {'code':'ER','name':'Entre Rios'},
    '10' : {'code':'FO','name':'Formosa'},
    '11' : {'code':'JU','name':'Jujuy'},
    '12' : {'code':'LP','name':'La Pampa'},
    '13' : {'code':'LR','name':'La Rioja'},
    '14' : {'code':'ME','name':'Mendoza'},
    '15' : {'code':'MI','name':'Misiones'},
    '16' : {'code':'NE','name':'Neuquen'},
    '17' : {'code':'RN','name':'Rio Negro'},
    '18' : {'code':'SA','name':'Salta'},
    '19' : {'code':'SJ','name':'San Juan'},
    '20' : {'code':'SL','name':'San Luis'},
    '21' : {'code':'SC','name':'Santa Cruz'},
    '22' : {'code':'SF','name':'Santa Fe'},
    '23' : {'code':'SD','name':'Santiago del Estero'},
    '24' : {'code':'TF','name':'Tierra del Fuego'},
    '25' : {'code':'TU','name':'Tucuman'}
  },
  'AM':{
    '1' : {'code':'AGT','name':'Aragatsotn'},
    '2' : {'code':'ARR','name':'Ararat'},
    '3' : {'code':'ARM','name':'Armavir'},
    '4' : {'code':'GEG','name':'Geghark \'unik\''},
    '5' : {'code':'KOT','name':'Kotayk\''},
    '6' : {'code':'LOR','name':'Lorri'},
    '7' : {'code':'SHI','name':'Shirak'},
    '8' : {'code':'SYU','name':'Syunik\''},
    '9' : {'code':'TAV','name':'Tavush'},
    '10' : {'code':'VAY','name':'Vayots\' Dzor'},
    '11' : {'code':'YER','name':'Yerevan'}
  },
  'AW':{
    '1' : {'code':'ARU','name':'Aruba'},
    '2' : {'code':'DRU','name':'Druif Beach'},
    '3' : {'code':'MAN','name':'Manchebo Beach'},
    '4' : {'code':'NOO','name':'Noord'},
    '5' : {'code':'ORA','name':'Oranjestad'},
    '6' : {'code':'PAL','name':'Palm Beach'},
    '7' : {'code':'ROO','name':'Rooi Thomas'},
    '8' : {'code':'SIN','name':'Sint Nicolaas'},
    '9' : {'code':'SIN','name':'Sint Nicolas'},
    '10' : {'code':'WAY','name':'Wayaca'}
  },
  'AU':{
    '1' : {'code':'ACT','name':'Australian Capital Territory'},
    '2' : {'code':'NSW','name':'New South Wales'},
    '3' : {'code':'NT','name':'Northern Territory'},
    '4' : {'code':'QLD','name':'Queensland'},
    '5' : {'code':'SA','name':'South Australia'},
    '6' : {'code':'TAS','name':'Tasmania'},
    '7' : {'code':'VIC','name':'Victoria'},
    '8' : {'code':'WA','name':'Western Australia'}
  },
  'AT':{
    '1' : {'code':'BUR','name':'Burgenland'},
    '2' : {'code':'KAR','name':'Krnten'},
    '3' : {'code':'NOS','name':'Niederöesterreich'},
    '4' : {'code':'OOS','name':'Oberöesterreich'},
    '5' : {'code':'SAL','name':'Salzburg'},
    '6' : {'code':'STE','name':'Steiermark'},
    '7' : {'code':'TIR','name':'Tirol'},
    '8' : {'code':'VOR','name':'Vorarlberg'},
    '9' : {'code':'WIE','name':'Wien'}
  },
  'AZ':{
    '1' : {'code':'AB','name':'Ali Bayramli'},
    '2' : {'code':'ABS','name':'Abseron'},
    '3' : {'code':'AGC','name':'AgcabAdi'},
    '4' : {'code':'AGM','name':'Agdam'},
    '5' : {'code':'AGS','name':'Agdas'},
    '6' : {'code':'AGA','name':'Agstafa'},
    '7' : {'code':'AGU','name':'Agsu'},
    '8' : {'code':'AST','name':'Astara'},
    '9' : {'code':'BA','name':'Baki'},
    '10' : {'code':'BAB','name':'BabAk'},
    '11' : {'code':'BAL','name':'BalakAn'},
    '12' : {'code':'BAR','name':'BArdA'},
    '13' : {'code':'BEY','name':'Beylaqan'},
    '14' : {'code':'BIL','name':'Bilasuvar'},
    '15' : {'code':'CAB','name':'Cabrayil'},
    '16' : {'code':'CAL','name':'Calilabab'},
    '17' : {'code':'CUL','name':'Culfa'},
    '18' : {'code':'DAS','name':'Daskasan'},
    '19' : {'code':'DAV','name':'Davaci'},
    '20' : {'code':'FUZ','name':'Fuzuli'},
    '21' : {'code':'GA','name':'Ganca'},
    '22' : {'code':'GAD','name':'Gadabay'},
    '23' : {'code':'GOR','name':'Goranboy'},
    '24' : {'code':'GOY','name':'Goycay'},
    '25' : {'code':'HAC','name':'Haciqabul'},
    '26' : {'code':'IMI','name':'Imisli'},
    '27' : {'code':'ISM','name':'Ismayilli'},
    '28' : {'code':'KAL','name':'Kalbacar'},
    '29' : {'code':'KUR','name':'Kurdamir'},
    '30' : {'code':'LA','name':'Lankaran'},
    '31' : {'code':'LAC','name':'Lacin'},
    '32' : {'code':'LAN','name':'Lankaran'},
    '33' : {'code':'LER','name':'Lerik'},
    '34' : {'code':'MAS','name':'Masalli'},
    '35' : {'code':'MI','name':'Mingacevir'},
    '36' : {'code':'NA','name':'Naftalan'},
    '37' : {'code':'NX','name':'Naxcivan'},
    '38' : {'code':'NEF','name':'Neftcala'},
    '39' : {'code':'OGU','name':'Oguz'},
    '40' : {'code':'ORD','name':'Ordubad'},
    '41' : {'code':'QAB','name':'Qabala'},
    '42' : {'code':'QAX','name':'Qax'},
    '43' : {'code':'QAZ','name':'Qazax'},
    '44' : {'code':'QOB','name':'Qobustan'},
    '45' : {'code':'QBA','name':'Quba'},
    '46' : {'code':'QBI','name':'Qubadli'},
    '47' : {'code':'QUS','name':'Qusar'},
    '48' : {'code':'SA','name':'Saki'},
    '49' : {'code':'SAT','name':'Saatli'},
    '50' : {'code':'SAB','name':'Sabirabad'},
    '51' : {'code':'SAD','name':'Sadarak'},
    '52' : {'code':'SAH','name':'Sahbuz'},
    '53' : {'code':'SAK','name':'Saki'},
    '54' : {'code':'SAL','name':'Salyan'},
    '55' : {'code':'SM','name':'Sumqayit'},
    '56' : {'code':'SMI','name':'Samaxi'},
    '57' : {'code':'SKR','name':'Samkir'},
    '58' : {'code':'SMX','name':'Samux'},
    '59' : {'code':'SAR','name':'Sarur'},
    '60' : {'code':'SIY','name':'Siyazan'},
    '61' : {'code':'SS','name':'Susa'},
    '62' : {'code':'SUS','name':'Susa'},
    '63' : {'code':'TAR','name':'Tartar'},
    '64' : {'code':'TOV','name':'Tovuz'},
    '65' : {'code':'UCA','name':'Ucar'},
    '66' : {'code':'XA','name':'Xankandi'},
    '67' : {'code':'XAC','name':'Xacmaz'},
    '68' : {'code':'XAN','name':'Xanlar'},
    '69' : {'code':'XIZ','name':'Xizi'},
    '70' : {'code':'XCI','name':'Xocali'},
    '71' : {'code':'XVD','name':'Xocavand'},
    '72' : {'code':'YAR','name':'Yardimli'},
    '73' : {'code':'YEV','name':'Yevlax'},
    '74' : {'code':'ZAN','name':'Zangilan'},
    '75' : {'code':'ZAQ','name':'Zaqatala'},
    '76' : {'code':'ZAR','name':'Zardab'}
  },
  'BS':{
    '1' : {'code':'ACK','name':'Acklins'},
    '2' : {'code':'BER','name':'Berry Islands'},
    '3' : {'code':'BIM','name':'Bimini'},
    '4' : {'code':'BLK','name':'Black Point'},
    '5' : {'code':'CAT','name':'Cat Island'},
    '6' : {'code':'CAB','name':'Central Abaco'},
    '7' : {'code':'CAN','name':'Central Andros'},
    '8' : {'code':'CEL','name':'Central Eleuthera'},
    '9' : {'code':'FRE','name':'City of Freeport'},
    '10' : {'code':'CRO','name':'Crooked Island'},
    '11' : {'code':'EGB','name':'East Grand Bahama'},
    '12' : {'code':'EXU','name':'Exuma'},
    '13' : {'code':'GRD','name':'Grand Cay'},
    '14' : {'code':'HAR','name':'Harbour Island'},
    '15' : {'code':'HOP','name':'Hope Town'},
    '16' : {'code':'INA','name':'Inagua'},
    '17' : {'code':'LNG','name':'Long Island'},
    '18' : {'code':'MAN','name':'Mangrove Cay'},
    '19' : {'code':'MAY','name':'Mayaguana'},
    '20' : {'code':'MOO','name':'Moore\'s Island'},
    '21' : {'code':'NAB','name':'North Abaco'},
    '22' : {'code':'NAN','name':'North Andros'},
    '23' : {'code':'NEL','name':'North Eleuthera'},
    '24' : {'code':'RAG','name':'Ragged Island'},
    '25' : {'code':'RUM','name':'Rum Cay'},
    '26' : {'code':'SAL','name':'San Salvador'},
    '27' : {'code':'SAB','name':'South Abaco'},
    '28' : {'code':'SAN','name':'South Andros'},
    '29' : {'code':'SEL','name':'South Eleuthera'},
    '30' : {'code':'SWE','name':'Spanish Wells'},
    '31' : {'code':'WGB','name':'West Grand Bahama'}
  },
  'BH':{
    '1' : {'code':'CAP','name':'Capital'},
    '2' : {'code':'CEN','name':'Central'},
    '3' : {'code':'MUH','name':'Muharraq'},
    '4' : {'code':'NOR','name':'Northern'},
    '5' : {'code':'SOU','name':'Southern'}
  },
  'BD':{
    '1' : {'code':'BAR','name':'Barisal'},
    '2' : {'code':'CHI','name':'Chittagong'},
    '3' : {'code':'DHA','name':'Dhaka'},
    '4' : {'code':'KHU','name':'Khulna'},
    '5' : {'code':'RAJ','name':'Rajshahi'},
    '6' : {'code':'SYL','name':'Sylhet'}
  },
  'BB':{
    '1' : {'code':'CC','name':'Christ Church'},
    '2' : {'code':'AND','name':'Saint Andrew'},
    '3' : {'code':'GEO','name':'Saint George'},
    '4' : {'code':'JAM','name':'Saint James'},
    '5' : {'code':'JOH','name':'Saint John'},
    '6' : {'code':'JOS','name':'Saint Joseph'},
    '7' : {'code':'LUC','name':'Saint Lucy'},
    '8' : {'code':'MIC','name':'Saint Michael'},
    '9' : {'code':'PET','name':'Saint Peter'},
    '10' : {'code':'PHI','name':'Saint Philip'},
    '11' : {'code':'THO','name':'Saint Thomas'}
  },
  'BY':{
    '1' : {'code':'BR','name':'Brestskaya (Brest)'},
    '2' : {'code':'HO','name':'Homyel\'skaya (Homyel\')'},
    '3' : {'code':'HM','name':'Horad Minsk'},
    '4' : {'code':'HR','name':'Hrodzyenskaya (Hrodna)'},
    '5' : {'code':'MA','name':'Mahilyowskaya (Mahilyow)'},
    '6' : {'code':'MI','name':'Minskaya'},
    '7' : {'code':'VI','name':'Vitsyebskaya (Vitsyebsk)'}
  },
  'BE':{
    '1' : {'code':'VAN','name':'Antwerpen'},
    '2' : {'code':'WBR','name':'Brabant Wallon'},
    '3' : {'code':'WHT','name':'Hainaut'},
    '4' : {'code':'WLG','name':'Liege'},
    '5' : {'code':'VLI','name':'Limburg'},
    '6' : {'code':'WLX','name':'Luxembourg'},
    '7' : {'code':'WNA','name':'Namur'},
    '8' : {'code':'VOV','name':'Oost-Vlaanderen'},
    '9' : {'code':'VBR','name':'Vlaams Brabant'},
    '10' : {'code':'VWV','name':'West-Vlaanderen'}
  },
  'BZ':{
    '1' : {'code':'BZ','name':'Belize'},
    '2' : {'code':'CY','name':'Cayo'},
    '3' : {'code':'CR','name':'Corozal'},
    '4' : {'code':'OW','name':'Orange Walk'},
    '5' : {'code':'SC','name':'Stann Creek'},
    '6' : {'code':'TO','name':'Toledo'}
  },
  'BJ':{
    '1' : {'code':'AL','name':'Alibori'},
    '2' : {'code':'AK','name':'Atakora'},
    '3' : {'code':'AQ','name':'Atlantique'},
    '4' : {'code':'BO','name':'Borgou'},
    '5' : {'code':'CO','name':'Collines'},
    '6' : {'code':'DO','name':'Donga'},
    '7' : {'code':'KO','name':'Kouffo'},
    '8' : {'code':'LI','name':'Littoral'},
    '9' : {'code':'MO','name':'Mono'},
    '10' : {'code':'OU','name':'Oueme'},
    '11' : {'code':'PL','name':'Plateau'},
    '12' : {'code':'ZO','name':'Zou'}
  },
  'BM':{
    '1' : {'code':'DS','name':'Devonshire'},
    '2' : {'code':'HC','name':'Hamilton City'},
    '3' : {'code':'HA','name':'Hamilton'},
    '4' : {'code':'PG','name':'Paget'},
    '5' : {'code':'PB','name':'Pembroke'},
    '6' : {'code':'GC','name':'Saint George City'},
    '7' : {'code':'SG','name':'Saint George\'s'},
    '8' : {'code':'SA','name':'Sandys'},
    '9' : {'code':'SM','name':'Smith\'s'},
    '10' : {'code':'SH','name':'Southampton'},
    '11' : {'code':'WA','name':'Warwick'}
  },
  'BT':{
    '1' : {'code':'BUM','name':'Bumthang'},
    '2' : {'code':'CHU','name':'Chukha'},
    '3' : {'code':'DAG','name':'Dagana'},
    '4' : {'code':'GAS','name':'Gasa'},
    '5' : {'code':'HAA','name':'Haa'},
    '6' : {'code':'LHU','name':'Lhuntse'},
    '7' : {'code':'MON','name':'Mongar'},
    '8' : {'code':'PAR','name':'Paro'},
    '9' : {'code':'PEM','name':'Pemagatshel'},
    '10' : {'code':'PUN','name':'Punakha'},
    '11' : {'code':'SJO','name':'Samdrup Jongkhar'},
    '12' : {'code':'SAT','name':'Samtse'},
    '13' : {'code':'SAR','name':'Sarpang'},
    '14' : {'code':'THI','name':'Thimphu'},
    '15' : {'code':'TRG','name':'Trashigang'},
    '16' : {'code':'TRY','name':'Trashiyangste'},
    '17' : {'code':'TRO','name':'Trongsa'},
    '18' : {'code':'TSI','name':'Tsirang'},
    '19' : {'code':'WPH','name':'Wangdue Phodrang'},
    '20' : {'code':'ZHE','name':'Zhemgang'}
  },
  'BO':{
    '1' : {'code':'BEN','name':'Beni'},
    '2' : {'code':'CHU','name':'Chuquisaca'},
    '3' : {'code':'COC','name':'Cochabamba'},
    '4' : {'code':'LPZ','name':'La Paz'},
    '5' : {'code':'ORU','name':'Oruro'},
    '6' : {'code':'PAN','name':'Pando'},
    '7' : {'code':'POT','name':'Potosi'},
    '8' : {'code':'SCZ','name':'Santa Cruz'},
    '9' : {'code':'TAR','name':'Tarija'}
  },
  'BA':{
    '1' : {'code':'BRO','name':'Brcko district'},
    '2' : {'code':'FBP','name':'Bosanskopodrinjski Kanton'},
    '3' : {'code':'FHN','name':'Hercegovacko-neretvanski Kanton'},
    '4' : {'code':'FPO','name':'Posavski Kanton'},
    '5' : {'code':'FSA','name':'Kanton Sarajevo'},
    '6' : {'code':'FSB','name':'Srednjebosanski Kanton'},
    '7' : {'code':'FTU','name':'Tuzlanski Kanton'},
    '8' : {'code':'FUS','name':'Unsko-Sanski Kanton'},
    '9' : {'code':'FZA','name':'Zapadnobosanska'},
    '10' : {'code':'FZE','name':'Zenicko-Dobojski Kanton'},
    '11' : {'code':'FZH','name':'Zapadnohercegovacka Zupanija'},
    '12' : {'code':'SBI','name':'Bijeljina'},
    '13' : {'code':'SBL','name':'Banja Luka'},
    '14' : {'code':'SDO','name':'Doboj'},
    '15' : {'code':'SFO','name':'Foca'},
    '16' : {'code':'SSR','name':'Sarajevo-Romanija or Sokolac'},
    '17' : {'code':'STR','name':'Trebinje'},
    '18' : {'code':'SVL','name':'Vlasenica'}
  },
  'BW':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'GH','name':'Ghanzi'},
    '3' : {'code':'KD','name':'Kgalagadi'},
    '4' : {'code':'KT','name':'Kgatleng'},
    '5' : {'code':'KW','name':'Kweneng'},
    '6' : {'code':'NG','name':'Ngamiland'},
    '7' : {'code':'NE','name':'North East'},
    '8' : {'code':'NW','name':'North West'},
    '9' : {'code':'SE','name':'South East'},
    '10' : {'code':'SO','name':'Southern'}
  },
  'BR':{
    '1' : {'code':'AC','name':'Acre'},
    '2' : {'code':'AL','name':'Alagoas'},
    '3' : {'code':'AP','name':'Amapa'},
    '4' : {'code':'AM','name':'Amazonas'},
    '5' : {'code':'BA','name':'Bahia'},
    '6' : {'code':'CE','name':'Ceara'},
    '7' : {'code':'DF','name':'Distrito Federal'},
    '8' : {'code':'ES','name':'Espirito Santo'},
    '9' : {'code':'GO','name':'Goias'},
    '10' : {'code':'MA','name':'Maranhao'},
    '11' : {'code':'MT','name':'Mato Grosso'},
    '12' : {'code':'MS','name':'Mato Grosso do Sul'},
    '13' : {'code':'MG','name':'Minas Gerais'},
    '14' : {'code':'PA','name':'Para'},
    '15' : {'code':'PB','name':'Paraiba'},
    '16' : {'code':'PR','name':'Parana'},
    '17' : {'code':'PE','name':'Pernambuco'},
    '18' : {'code':'PI','name':'Piaui'},
    '19' : {'code':'RJ','name':'Rio de Janeiro'},
    '20' : {'code':'RN','name':'Rio Grande do Norte'},
    '21' : {'code':'RS','name':'Rio Grande do Sul'},
    '22' : {'code':'RO','name':'Rondonia'},
    '23' : {'code':'RR','name':'Roraima'},
    '24' : {'code':'SC','name':'Santa Catarina'},
    '25' : {'code':'SP','name':'Sao Paulo'},
    '26' : {'code':'SE','name':'Sergipe'},
    '27' : {'code':'TO','name':'Tocantins'}
  },
  'IO':{
    '1' : {'code':'DG','name':'Diego Garcia'},
    '2' : {'code':'DI','name':'Danger Island'},
    '3' : {'code':'EA','name':'Eagle Islands'},
    '4' : {'code':'EG','name':'Egmont Islands'},
    '5' : {'code':'NI','name':'Nelsons Island'},
    '6' : {'code':'PB','name':'Peros Banhos'},
    '7' : {'code':'SI','name':'Salomon Islands'},
    '8' : {'code':'TB','name':'Three Brothers'}
  },
  'BN':{
    '1' : {'code':'BEL','name':'Belait'},
    '2' : {'code':'BRM','name':'Brunei and Muara'},
    '3' : {'code':'TEM','name':'Temburong'},
    '4' : {'code':'TUT','name':'Tutong'}
  },
  'BG':{
    '1' : {'code':'BG-01','name':'Blagoevgrad'},
    '2' : {'code':'BG-02','name':'Burgas'},
    '3' : {'code':'BG-03','name':'Dobrich'},
    '4' : {'code':'BG-04','name':'Gabrovo'},
    '5' : {'code':'BG-05','name':'Haskovo'},
    '6' : {'code':'BG-06','name':'Kardjali'},
    '7' : {'code':'BG-07','name':'Kyustendil'},
    '8' : {'code':'BG-08','name':'Lovech'},
    '9' : {'code':'BG-09','name':'Montana'},
    '10' : {'code':'BG-10','name':'Pazardjik'},
    '11' : {'code':'BG-11','name':'Pernik'},
    '12' : {'code':'BG-12','name':'Pleven'},
    '13' : {'code':'BG-13','name':'Plovdiv'},
    '14' : {'code':'BG-14','name':'Razgrad'},
    '15' : {'code':'BG-15','name':'Shumen'},
    '16' : {'code':'BG-16','name':'Silistra'},
    '17' : {'code':'BG-17','name':'Sliven'},
    '18' : {'code':'BG-18','name':'Smolyan'},
    '19' : {'code':'BG-19','name':'Sofia'},
    '20' : {'code':'BG-20','name':'Sofia - town'},
    '21' : {'code':'BG-21','name':'Stara Zagora'},
    '22' : {'code':'BG-22','name':'Targovishte'},
    '23' : {'code':'BG-23','name':'Varna'},
    '24' : {'code':'BG-24','name':'Veliko Tarnovo'},
    '25' : {'code':'BG-25','name':'Vidin'},
    '26' : {'code':'BG-26','name':'Vratza'},
    '27' : {'code':'BG-27','name':'Yambol'}
  },
  'BF':{
    '1' : {'code':'BAL','name':'Bale'},
    '2' : {'code':'BAM','name':'Bam'},
    '3' : {'code':'BAN','name':'Banwa'},
    '4' : {'code':'BAZ','name':'Bazega'},
    '5' : {'code':'BOR','name':'Bougouriba'},
    '6' : {'code':'BLG','name':'Boulgou'},
    '7' : {'code':'BOK','name':'Boulkiemde'},
    '8' : {'code':'COM','name':'Comoe'},
    '9' : {'code':'GAN','name':'Ganzourgou'},
    '10' : {'code':'GNA','name':'Gnagna'},
    '11' : {'code':'GOU','name':'Gourma'},
    '12' : {'code':'HOU','name':'Houet'},
    '13' : {'code':'IOA','name':'Ioba'},
    '14' : {'code':'KAD','name':'Kadiogo'},
    '15' : {'code':'KEN','name':'Kenedougou'},
    '16' : {'code':'KOD','name':'Komondjari'},
    '17' : {'code':'KOP','name':'Kompienga'},
    '18' : {'code':'KOS','name':'Kossi'},
    '19' : {'code':'KOL','name':'Koulpelogo'},
    '20' : {'code':'KOT','name':'Kouritenga'},
    '21' : {'code':'KOW','name':'Kourweogo'},
    '22' : {'code':'LER','name':'Leraba'},
    '23' : {'code':'LOR','name':'Loroum'},
    '24' : {'code':'MOU','name':'Mouhoun'},
    '25' : {'code':'NAH','name':'Nahouri'},
    '26' : {'code':'NAM','name':'Namentenga'},
    '27' : {'code':'NAY','name':'Nayala'},
    '28' : {'code':'NOU','name':'Noumbiel'},
    '29' : {'code':'OUB','name':'Oubritenga'},
    '30' : {'code':'OUD','name':'Oudalan'},
    '31' : {'code':'PAS','name':'Passore'},
    '32' : {'code':'PON','name':'Poni'},
    '33' : {'code':'SAG','name':'Sanguie'},
    '34' : {'code':'SAM','name':'Sanmatenga'},
    '35' : {'code':'SEN','name':'Seno'},
    '36' : {'code':'SIS','name':'Sissili'},
    '37' : {'code':'SOM','name':'Soum'},
    '38' : {'code':'SOR','name':'Sourou'},
    '39' : {'code':'TAP','name':'Tapoa'},
    '40' : {'code':'TUY','name':'Tuy'},
    '41' : {'code':'YAG','name':'Yagha'},
    '42' : {'code':'YAT','name':'Yatenga'},
    '43' : {'code':'ZIR','name':'Ziro'},
    '44' : {'code':'ZOD','name':'Zondoma'},
    '45' : {'code':'ZOW','name':'Zoundweogo'}
  },
  'BI':{
    '1' : {'code':'BB','name':'Bubanza'},
    '2' : {'code':'BJ','name':'Bujumbura'},
    '3' : {'code':'BR','name':'Bururi'},
    '4' : {'code':'CA','name':'Cankuzo'},
    '5' : {'code':'CI','name':'Cibitoke'},
    '6' : {'code':'GI','name':'Gitega'},
    '7' : {'code':'KR','name':'Karuzi'},
    '8' : {'code':'KY','name':'Kayanza'},
    '9' : {'code':'KI','name':'Kirundo'},
    '10' : {'code':'MA','name':'Makamba'},
    '11' : {'code':'MU','name':'Muramvya'},
    '12' : {'code':'MY','name':'Muyinga'},
    '13' : {'code':'MW','name':'Mwaro'},
    '14' : {'code':'NG','name':'Ngozi'},
    '15' : {'code':'RT','name':'Rutana'},
    '16' : {'code':'RY','name':'Ruyigi'}
  },
  'KH':{
    '1' : {'code':'BA','name':'Battambang'},
    '2' : {'code':'BM','name':'Banteay Meanchey'},
    '3' : {'code':'KB','name':'Keb'},
    '4' : {'code':'KK','name':'Kaoh Kong'},
    '5' : {'code':'KL','name':'Kandal'},
    '6' : {'code':'KM','name':'Kampong Cham'},
    '7' : {'code':'KN','name':'Kampong Chhnang'},
    '8' : {'code':'KO','name':'Kampong Som'},
    '9' : {'code':'KP','name':'Kampot'},
    '10' : {'code':'KR','name':'Kratie'},
    '11' : {'code':'KT','name':'Kampong Thom'},
    '12' : {'code':'KU','name':'Kampong Speu'},
    '13' : {'code':'MK','name':'Mondul Kiri'},
    '14' : {'code':'OM','name':'Oddar Meancheay'},
    '15' : {'code':'PA','name':'Pailin'},
    '16' : {'code':'PG','name':'Prey Veng'},
    '17' : {'code':'PP','name':'Phnom Penh'},
    '18' : {'code':'PR','name':'Preah Vihear'},
    '19' : {'code':'PS','name':'Preah Seihanu (Kompong Som or Si)'},
    '20' : {'code':'PU','name':'Pursat'},
    '21' : {'code':'RK','name':'Ratanak Kiri'},
    '22' : {'code':'SI','name':'Siemreap'},
    '23' : {'code':'SR','name':'Svay Rieng'},
    '24' : {'code':'ST','name':'Stung Treng'},
    '25' : {'code':'TK','name':'Takeo'}
  },
  'CM':{
    '1' : {'code':'ADA','name':'Adamawa (Adamaoua)'},
    '2' : {'code':'CEN','name':'Centre'},
    '3' : {'code':'EST','name':'East (Est)'},
    '4' : {'code':'EXN','name':'Extrême-Nord'},
    '5' : {'code':'LIT','name':'Littoral'},
    '6' : {'code':'NOR','name':'North (Nord)'},
    '7' : {'code':'NOT','name':'Northwest (Nord-Ouest)'},
    '8' : {'code':'OUE','name':'West (Ouest)'},
    '9' : {'code':'SUD','name':'South (Sud)'},
    '10' : {'code':'SOU','name':'Southwest (Sud-Ouest)'}
  },
  'CA':{
    '1' : {'code':'AB','name':'Alberta'},
    '2' : {'code':'BC','name':'British Columbia'},
    '3' : {'code':'MB','name':'Manitoba'},
    '4' : {'code':'NB','name':'New Brunswick'},
    '5' : {'code':'NL','name':'Newfoundland and Labrador'},
    '6' : {'code':'NT','name':'Northwest Territories'},
    '7' : {'code':'NS','name':'Nova Scotia'},
    '8' : {'code':'NU','name':'Nunavut'},
    '9' : {'code':'ON','name':'Ontario'},
    '10' : {'code':'PE','name':'Prince Edward Island'},
    '11' : {'code':'QC','name':'Québec'},
    '12' : {'code':'SK','name':'Saskatchewan'},
    '13' : {'code':'YT','name':'Yukon Territory'}
  },
  'CV':{
    '1' : {'code':'BV','name':'Boa Vista'},
    '2' : {'code':'BR','name':'Brava'},
    '3' : {'code':'CS','name':'Calheta de Sao Miguel'},
    '4' : {'code':'MA','name':'Maio'},
    '5' : {'code':'MO','name':'Mosteiros'},
    '6' : {'code':'PA','name':'Paul'},
    '7' : {'code':'PN','name':'Porto Novo'},
    '8' : {'code':'PR','name':'Praia'},
    '9' : {'code':'RG','name':'Ribeira Grande'},
    '10' : {'code':'SL','name':'Sal'},
    '11' : {'code':'CA','name':'Santa Catarina'},
    '12' : {'code':'CR','name':'Santa Cruz'},
    '13' : {'code':'SD','name':'Sao Domingos'},
    '14' : {'code':'SF','name':'Sao Filipe'},
    '15' : {'code':'SN','name':'Sao Nicolau'},
    '16' : {'code':'SV','name':'Sao Vicente'},
    '17' : {'code':'TA','name':'Tarrafal'}
  },
  'KY':{
    '1' : {'code':'CR','name':'Creek'},
    '2' : {'code':'EA','name':'Eastern'},
    '3' : {'code':'ML','name':'Midland'},
    '4' : {'code':'ST','name':'South Town'},
    '5' : {'code':'SP','name':'Spot Bay'},
    '6' : {'code':'SK','name':'Stake Bay'},
    '7' : {'code':'WD','name':'West End'},
    '8' : {'code':'WN','name':'Western'}
  },
  'CF':{
    '1' : {'code':'BAN','name':'Bangui'},
    '2' : {'code':'BBA','name':'Bamingui-Bangoran'},
    '3' : {'code':'BKO','name':'Basse-Kotto'},
    '4' : {'code':'HKO','name':'Haute-Kotto'},
    '5' : {'code':'HMB','name':'Haut-Mbomou'},
    '6' : {'code':'KEM','name':'Kemo'},
    '7' : {'code':'LOB','name':'Lobaye'},
    '8' : {'code':'MBO','name':'Mbomou'},
    '9' : {'code':'MKD','name':'Mambéré-Kadéï'},
    '10' : {'code':'NGR','name':'Nana-Grebizi'},
    '11' : {'code':'NMM','name':'Nana-Mambere'},
    '12' : {'code':'OMP','name':'Ombella-M\'Poko'},
    '13' : {'code':'OPE','name':'Ouham-Pende'},
    '14' : {'code':'OUH','name':'Ouham'},
    '15' : {'code':'OUK','name':'Ouaka'},
    '16' : {'code':'SMB','name':'Sangha-Mbaere'},
    '17' : {'code':'VAK','name':'Vakaga'}
  },
  'TD':{
    '1' : {'code':'BA','name':'Batha'},
    '2' : {'code':'BI','name':'Biltine'},
    '3' : {'code':'BE','name':'Borkou-Ennedi-Tibesti'},
    '4' : {'code':'CB','name':'Chari-Baguirmi'},
    '5' : {'code':'GU','name':'Guera'},
    '6' : {'code':'KA','name':'Kanem'},
    '7' : {'code':'LA','name':'Lac'},
    '8' : {'code':'LC','name':'Logone Occidental'},
    '9' : {'code':'LR','name':'Logone Oriental'},
    '10' : {'code':'MK','name':'Mayo-Kebbi'},
    '11' : {'code':'MC','name':'Moyen-Chari'},
    '12' : {'code':'OU','name':'Ouaddai'},
    '13' : {'code':'SA','name':'Salamat'},
    '14' : {'code':'TA','name':'Tandjile'}
  },
  'CL':{
    '1' : {'code':'AI','name':'Aisen del General Carlos Ibanez'},
    '2' : {'code':'AN','name':'Antofagasta'},
    '3' : {'code':'AR','name':'Araucania'},
    '4' : {'code':'AT','name':'Atacama'},
    '5' : {'code':'BI','name':'Bio-Bio'},
    '6' : {'code':'CO','name':'Coquimbo'},
    '7' : {'code':'LI','name':'Libertador General Bernardo O\'Hi'},
    '8' : {'code':'LL','name':'Los Lagos'},
    '9' : {'code':'MA','name':'Magallanes y de la Antartica Chi'},
    '10' : {'code':'ML','name':'Maule'},
    '11' : {'code':'RM','name':'Region Metropolitana'},
    '12' : {'code':'TA','name':'Tarapaca'},
    '13' : {'code':'VS','name':'Valparaiso'}
  },
  'CN':{
    '1' : {'code':'AN','name':'Anhui'},
    '2' : {'code':'BE','name':'Beijing'},
    '3' : {'code':'CH','name':'Chongqing'},
    '4' : {'code':'FU','name':'Fujian'},
    '5' : {'code':'GA','name':'Gansu'},
    '6' : {'code':'GU','name':'Guangdong'},
    '7' : {'code':'GX','name':'Guangxi'},
    '8' : {'code':'GZ','name':'Guizhou'},
    '9' : {'code':'HA','name':'Hainan'},
    '10' : {'code':'HB','name':'Hebei'},
    '11' : {'code':'HL','name':'Heilongjiang'},
    '12' : {'code':'HE','name':'Henan'},
    '13' : {'code':'HK','name':'Hong Kong'},
    '14' : {'code':'HU','name':'Hubei'},
    '15' : {'code':'HN','name':'Hunan'},
    '16' : {'code':'IM','name':'Inner Mongolia'},
    '17' : {'code':'JI','name':'Jiangsu'},
    '18' : {'code':'JX','name':'Jiangxi'},
    '19' : {'code':'JL','name':'Jilin'},
    '20' : {'code':'LI','name':'Liaoning'},
    '21' : {'code':'MA','name':'Macau'},
    '22' : {'code':'NI','name':'Ningxia'},
    '23' : {'code':'SH','name':'Shaanxi'},
    '24' : {'code':'SA','name':'Shandong'},
    '25' : {'code':'SG','name':'Shanghai'},
    '26' : {'code':'SX','name':'Shanxi'},
    '27' : {'code':'SI','name':'Sichuan'},
    '28' : {'code':'TI','name':'Tianjin'},
    '29' : {'code':'XI','name':'Xinjiang'},
    '30' : {'code':'YU','name':'Yunnan'},
    '31' : {'code':'ZH','name':'Zhejiang'}
  },
  'CC':{
    '1' : {'code':'D','name':'Direction Island'},
    '2' : {'code':'H','name':'Home Island'},
    '3' : {'code':'O','name':'Horsburgh Island'},
    '4' : {'code':'S','name':'South Island'},
    '5' : {'code':'W','name':'West Island'}
  },
  'CO':{
    '1' : {'code':'AMZ','name':'Amazonas'},
    '2' : {'code':'ANT','name':'Antioquia'},
    '3' : {'code':'ARA','name':'Arauca'},
    '4' : {'code':'ATL','name':'Atlantico'},
    '5' : {'code':'BDC','name':'Bogota D.C.'},
    '6' : {'code':'BOL','name':'Bolivar'},
    '7' : {'code':'BOY','name':'Boyaca'},
    '8' : {'code':'CAL','name':'Caldas'},
    '9' : {'code':'CAQ','name':'Caqueta'},
    '10' : {'code':'CAS','name':'Casanare'},
    '11' : {'code':'CAU','name':'Cauca'},
    '12' : {'code':'CES','name':'Cesar'},
    '13' : {'code':'CHO','name':'Choco'},
    '14' : {'code':'COR','name':'Cordoba'},
    '15' : {'code':'CAM','name':'Cundinamarca'},
    '16' : {'code':'GNA','name':'Guainia'},
    '17' : {'code':'GJR','name':'Guajira'},
    '18' : {'code':'GVR','name':'Guaviare'},
    '19' : {'code':'HUI','name':'Huila'},
    '20' : {'code':'MAG','name':'Magdalena'},
    '21' : {'code':'MET','name':'Meta'},
    '22' : {'code':'NAR','name':'Narino'},
    '23' : {'code':'NDS','name':'Norte de Santander'},
    '24' : {'code':'PUT','name':'Putumayo'},
    '25' : {'code':'QUI','name':'Quindio'},
    '26' : {'code':'RIS','name':'Risaralda'},
    '27' : {'code':'SAP','name':'San Andres y Providencia'},
    '28' : {'code':'SAN','name':'Santander'},
    '29' : {'code':'SUC','name':'Sucre'},
    '30' : {'code':'TOL','name':'Tolima'},
    '31' : {'code':'VDC','name':'Valle del Cauca'},
    '32' : {'code':'VAU','name':'Vaupes'},
    '33' : {'code':'VIC','name':'Vichada'}
  },
  'KM':{
    '1' : {'code':'G','name':'Grande Comore'},
    '2' : {'code':'A','name':'Anjouan'},
    '3' : {'code':'M','name':'Moheli'}
  },
  'CG':{
    '1' : {'code':'BO','name':'Bouenza'},
    '2' : {'code':'BR','name':'Brazzaville'},
    '3' : {'code':'CU','name':'Cuvette'},
    '4' : {'code':'CO','name':'Cuvette-Ouest'},
    '5' : {'code':'KO','name':'Kouilou'},
    '6' : {'code':'LE','name':'Lekoumou'},
    '7' : {'code':'LI','name':'Likouala'},
    '8' : {'code':'NI','name':'Niari'},
    '9' : {'code':'PL','name':'Plateaux'},
    '10' : {'code':'PO','name':'Pool'},
    '11' : {'code':'SA','name':'Sangha'}
  },
  'CK':{
    '1' : {'code':'AI','name':'Aitutaki'},
    '2' : {'code':'AT','name':'Atiu'},
    '3' : {'code':'MA','name':'Manuae'},
    '4' : {'code':'MG','name':'Mangaia'},
    '5' : {'code':'MK','name':'Manihiki'},
    '6' : {'code':'MT','name':'Mitiaro'},
    '7' : {'code':'MU','name':'Mauke'},
    '8' : {'code':'NI','name':'Nassau Island'},
    '9' : {'code':'PA','name':'Palmerston'},
    '10' : {'code':'PE','name':'Penrhyn'},
    '11' : {'code':'PU','name':'Pukapuka'},
    '12' : {'code':'RK','name':'Rakahanga'},
    '13' : {'code':'RR','name':'Rarotonga'},
    '14' : {'code':'SU','name':'Surwarrow'},
    '15' : {'code':'TA','name':'Takutea'}
  },
  'CR':{
    '1' : {'code':'AL','name':'Alajuela'},
    '2' : {'code':'CA','name':'Cartago'},
    '3' : {'code':'GU','name':'Guanacaste'},
    '4' : {'code':'HE','name':'Heredia'},
    '5' : {'code':'LI','name':'Limon'},
    '6' : {'code':'PU','name':'Puntarenas'},
    '7' : {'code':'SJ','name':'San Jose'}
  },
  'CI':{
    '1' : {'code':'ABE','name':'Abengourou'},
    '2' : {'code':'ABI','name':'Abidjan'},
    '3' : {'code':'ABO','name':'Aboisso'},
    '4' : {'code':'ADI','name':'Adiake'},
    '5' : {'code':'ADZ','name':'Adzope'},
    '6' : {'code':'AGB','name':'Agboville'},
    '7' : {'code':'AGN','name':'Agnibilekrou'},
    '8' : {'code':'ALE','name':'Alepe'},
    '9' : {'code':'BOC','name':'Bocanda'},
    '10' : {'code':'BAN','name':'Bangolo'},
    '11' : {'code':'BEO','name':'Beoumi'},
    '12' : {'code':'BIA','name':'Biankouma'},
    '13' : {'code':'BDK','name':'Bondoukou'},
    '14' : {'code':'BGN','name':'Bongouanou'},
    '15' : {'code':'BFL','name':'Bouafle'},
    '16' : {'code':'BKE','name':'Bouake'},
    '17' : {'code':'BNA','name':'Bouna'},
    '18' : {'code':'BDL','name':'Boundiali'},
    '19' : {'code':'DKL','name':'Dabakala'},
    '20' : {'code':'DBU','name':'Dabou'},
    '21' : {'code':'DAL','name':'Daloa'},
    '22' : {'code':'DAN','name':'Danane'},
    '23' : {'code':'DAO','name':'Daoukro'},
    '24' : {'code':'DIM','name':'Dimbokro'},
    '25' : {'code':'DIV','name':'Divo'},
    '26' : {'code':'DUE','name':'Duekoue'},
    '27' : {'code':'FER','name':'Ferkessedougou'},
    '28' : {'code':'GAG','name':'Gagnoa'},
    '29' : {'code':'GBA','name':'Grand-Bassam'},
    '30' : {'code':'GLA','name':'Grand-Lahou'},
    '31' : {'code':'GUI','name':'Guiglo'},
    '32' : {'code':'ISS','name':'Issia'},
    '33' : {'code':'JAC','name':'Jacqueville'},
    '34' : {'code':'KAT','name':'Katiola'},
    '35' : {'code':'KOR','name':'Korhogo'},
    '36' : {'code':'LAK','name':'Lakota'},
    '37' : {'code':'MAN','name':'Man'},
    '38' : {'code':'MKN','name':'Mankono'},
    '39' : {'code':'MBA','name':'Mbahiakro'},
    '40' : {'code':'ODI','name':'Odienne'},
    '41' : {'code':'OUM','name':'Oume'},
    '42' : {'code':'SAK','name':'Sakassou'},
    '43' : {'code':'SPE','name':'San-Pedro'},
    '44' : {'code':'SAS','name':'Sassandra'},
    '45' : {'code':'SEG','name':'Seguela'},
    '46' : {'code':'SIN','name':'Sinfra'},
    '47' : {'code':'SOU','name':'Soubre'},
    '48' : {'code':'TAB','name':'Tabou'},
    '49' : {'code':'TAN','name':'Tanda'},
    '50' : {'code':'TIE','name':'Tiebissou'},
    '51' : {'code':'TIN','name':'Tingrela'},
    '52' : {'code':'TIA','name':'Tiassale'},
    '53' : {'code':'TBA','name':'Touba'},
    '54' : {'code':'TLP','name':'Toulepleu'},
    '55' : {'code':'TMD','name':'Toumodi'},
    '56' : {'code':'VAV','name':'Vavoua'},
    '57' : {'code':'YAM','name':'Yamoussoukro'},
    '58' : {'code':'ZUE','name':'Zuenoula'}
  },
  'HR':{
    '1' : {'code':'BB','name':'Bjelovar-Bilogora'},
    '2' : {'code':'CZ','name':'City of Zagreb'},
    '3' : {'code':'DN','name':'Dubrovnik-Neretva'},
    '4' : {'code':'IS','name':'Istra'},
    '5' : {'code':'KA','name':'Karlovac'},
    '6' : {'code':'KK','name':'Koprivnica-Krizevci'},
    '7' : {'code':'KZ','name':'Krapina-Zagorje'},
    '8' : {'code':'LS','name':'Lika-Senj'},
    '9' : {'code':'ME','name':'Medimurje'},
    '10' : {'code':'OB','name':'Osijek-Baranja'},
    '11' : {'code':'PS','name':'Pozega-Slavonia'},
    '12' : {'code':'PG','name':'Primorje-Gorski Kotar'},
    '13' : {'code':'SI','name':'Sibenik'},
    '14' : {'code':'SM','name':'Sisak-Moslavina'},
    '15' : {'code':'SB','name':'Slavonski Brod-Posavina'},
    '16' : {'code':'SD','name':'Split-Dalmatia'},
    '17' : {'code':'VA','name':'Varazdin'},
    '18' : {'code':'VP','name':'Virovitica-Podravina'},
    '19' : {'code':'VS','name':'Vukovar-Srijem'},
    '20' : {'code':'ZK','name':'Zadar-Knin'},
    '21' : {'code':'ZA','name':'Zagreb'}
  },
  'CU':{
    '1' : {'code':'CA','name':'Camaguey'},
    '2' : {'code':'CD','name':'Ciego de Avila'},
    '3' : {'code':'CI','name':'Cienfuegos'},
    '4' : {'code':'CH','name':'Ciudad de La Habana'},
    '5' : {'code':'GR','name':'Granma'},
    '6' : {'code':'GU','name':'Guantanamo'},
    '7' : {'code':'HO','name':'Holguin'},
    '8' : {'code':'IJ','name':'Isla de la Juventud'},
    '9' : {'code':'LH','name':'La Habana'},
    '10' : {'code':'LT','name':'Las Tunas'},
    '11' : {'code':'MA','name':'Matanzas'},
    '12' : {'code':'PR','name':'Pinar del Rio'},
    '13' : {'code':'SS','name':'Sancti Spiritus'},
    '14' : {'code':'SC','name':'Santiago de Cuba'},
    '15' : {'code':'VC','name':'Villa Clara'}
  },
  'CY':{
    '1' : {'code':'F','name':'Famagusta'},
    '2' : {'code':'K','name':'Kyrenia'},
    '3' : {'code':'A','name':'Larnaca'},
    '4' : {'code':'I','name':'Limassol'},
    '5' : {'code':'N','name':'Nicosia'},
    '6' : {'code':'P','name':'Paphos'}
  },
  'CZ':{
    '1' : {'code':'A','name':'Hlavní město Praha'},
    '2' : {'code':'B','name':'Jihomoravský'},
    '3' : {'code':'C','name':'Jihočeský'},
    '4' : {'code':'E','name':'Pardubický'},
    '5' : {'code':'H','name':'Královéhradecký'},
    '6' : {'code':'J','name':'Vysočina'},
    '7' : {'code':'K','name':'Karlovarský'},
    '8' : {'code':'L','name':'Liberecký'},
    '9' : {'code':'M','name':'Olomoucký'},
    '10' : {'code':'P','name':'Plzeňský'},
    '11' : {'code':'S','name':'Středočeský'},
    '12' : {'code':'T','name':'Moravskoslezský'},
    '13' : {'code':'U','name':'Ústecký'},
    '14' : {'code':'Z','name':'Zlínský'}
  },
  'DK':{
    '1' : {'code':'AR','name':'Arhus'},
    '2' : {'code':'BH','name':'Bornholm'},
    '3' : {'code':'CO','name':'Copenhagen'},
    '4' : {'code':'FO','name':'Faroe Islands'},
    '5' : {'code':'FR','name':'Frederiksborg'},
    '6' : {'code':'FY','name':'Fyn'},
    '7' : {'code':'KO','name':'Kobenhavn'},
    '8' : {'code':'NO','name':'Nordjylland'},
    '9' : {'code':'RI','name':'Ribe'},
    '10' : {'code':'RK','name':'Ringkobing'},
    '11' : {'code':'RO','name':'Roskilde'},
    '12' : {'code':'SO','name':'Sonderjylland'},
    '13' : {'code':'ST','name':'Storstrom'},
    '14' : {'code':'VK','name':'Vejle'},
    '15' : {'code':'VJ','name':'Vestjælland'},
    '16' : {'code':'VB','name':'Viborg'}
  },
  'DJ':{
    '1' : {'code':'S','name':'\'Ali Sabih'},
    '2' : {'code':'K','name':'Dikhil'},
    '3' : {'code':'J','name':'Djibouti'},
    '4' : {'code':'O','name':'Obock'},
    '5' : {'code':'T','name':'Tadjoura'}
  },
  'DM':{
    '1' : {'code':'AND','name':'Saint Andrew Parish'},
    '2' : {'code':'DAV','name':'Saint David Parish'},
    '3' : {'code':'GEO','name':'Saint George Parish'},
    '4' : {'code':'JOH','name':'Saint John Parish'},
    '5' : {'code':'JOS','name':'Saint Joseph Parish'},
    '6' : {'code':'LUK','name':'Saint Luke Parish'},
    '7' : {'code':'MAR','name':'Saint Mark Parish'},
    '8' : {'code':'PAT','name':'Saint Patrick Parish'},
    '9' : {'code':'PAU','name':'Saint Paul Parish'},
    '10' : {'code':'PET','name':'Saint Peter Parish'}
  },
  'DO':{
    '1' : {'code':'DN','name':'Distrito Nacional'},
    '2' : {'code':'AZ','name':'Azua'},
    '3' : {'code':'BC','name':'Baoruco'},
    '4' : {'code':'BH','name':'Barahona'},
    '5' : {'code':'DJ','name':'Dajabon'},
    '6' : {'code':'DU','name':'Duarte'},
    '7' : {'code':'EL','name':'Elias Pina'},
    '8' : {'code':'SY','name':'El Seybo'},
    '9' : {'code':'ET','name':'Espaillat'},
    '10' : {'code':'HM','name':'Hato Mayor'},
    '11' : {'code':'IN','name':'Independencia'},
    '12' : {'code':'AL','name':'La Altagracia'},
    '13' : {'code':'RO','name':'La Romana'},
    '14' : {'code':'VE','name':'La Vega'},
    '15' : {'code':'MT','name':'Maria Trinidad Sanchez'},
    '16' : {'code':'MN','name':'Monsenor Nouel'},
    '17' : {'code':'MC','name':'Monte Cristi'},
    '18' : {'code':'MP','name':'Monte Plata'},
    '19' : {'code':'PD','name':'Pedernales'},
    '20' : {'code':'PR','name':'Peravia (Bani)'},
    '21' : {'code':'PP','name':'Puerto Plata'},
    '22' : {'code':'SL','name':'Salcedo'},
    '23' : {'code':'SM','name':'Samana'},
    '24' : {'code':'SH','name':'Sanchez Ramirez'},
    '25' : {'code':'SC','name':'San Cristobal'},
    '26' : {'code':'JO','name':'San Jose de Ocoa'},
    '27' : {'code':'SJ','name':'San Juan'},
    '28' : {'code':'PM','name':'San Pedro de Macoris'},
    '29' : {'code':'SA','name':'Santiago'},
    '30' : {'code':'ST','name':'Santiago Rodriguez'},
    '31' : {'code':'SD','name':'Santo Domingo'},
    '32' : {'code':'VA','name':'Valverde'}
  },
  'TP':{
    '1' : {'code':'AL','name':'Aileu'},
    '2' : {'code':'AN','name':'Ainaro'},
    '3' : {'code':'BA','name':'Baucau'},
    '4' : {'code':'BO','name':'Bobonaro'},
    '5' : {'code':'CO','name':'Cova Lima'},
    '6' : {'code':'DI','name':'Dili'},
    '7' : {'code':'ER','name':'Ermera'},
    '8' : {'code':'LA','name':'Lautem'},
    '9' : {'code':'LI','name':'Liquica'},
    '10' : {'code':'MT','name':'Manatuto'},
    '11' : {'code':'MF','name':'Manufahi'},
    '12' : {'code':'OE','name':'Oecussi'},
    '13' : {'code':'VI','name':'Viqueque'}
  },
  'EC':{
    '1' : {'code':'AZU','name':'Azuay'},
    '2' : {'code':'BOL','name':'Bolivar'},
    '3' : {'code':'CAN','name':'Cañar'},
    '4' : {'code':'CAR','name':'Carchi'},
    '5' : {'code':'CHI','name':'Chimborazo'},
    '6' : {'code':'COT','name':'Cotopaxi'},
    '7' : {'code':'EOR','name':'El Oro'},
    '8' : {'code':'ESM','name':'Esmeraldas'},
    '9' : {'code':'GPS','name':'Galápagos'},
    '10' : {'code':'GUA','name':'Guayas'},
    '11' : {'code':'IMB','name':'Imbabura'},
    '12' : {'code':'LOJ','name':'Loja'},
    '13' : {'code':'LRO','name':'Los Ríos'},
    '14' : {'code':'MAN','name':'Manabí'},
    '15' : {'code':'MSA','name':'Morona Santiago'},
    '16' : {'code':'NAP','name':'Napo'},
    '17' : {'code':'ORE','name':'Orellana'},
    '18' : {'code':'PAS','name':'Pastaza'},
    '19' : {'code':'PIC','name':'Pichincha'},
    '20' : {'code':'SUC','name':'Sucumbíos'},
    '21' : {'code':'TUN','name':'Tungurahua'},
    '22' : {'code':'ZCH','name':'Zamora Chinchipe'}
  },
  'EG':{
    '1' : {'code':'DHY','name':'Ad Daqahliyah'},
    '2' : {'code':'BAM','name':'Al Bahr al Ahmar'},
    '3' : {'code':'BHY','name':'Al Buhayrah'},
    '4' : {'code':'FYM','name':'Al Fayyum'},
    '5' : {'code':'GBY','name':'Al Gharbiyah'},
    '6' : {'code':'IDR','name':'Al Iskandariyah'},
    '7' : {'code':'IML','name':'Al Isma \'iliyah'},
    '8' : {'code':'JZH','name':'Al Jizah'},
    '9' : {'code':'MFY','name':'Al Minufiyah'},
    '10' : {'code':'MNY','name':'Al Minya'},
    '11' : {'code':'QHR','name':'Al Qahirah'},
    '12' : {'code':'QLY','name':'Al Qalyubiyah'},
    '13' : {'code':'WJD','name':'Al Wadi al Jadid'},
    '14' : {'code':'SHQ','name':'Ash Sharqiyah'},
    '15' : {'code':'SWY','name':'As Suways'},
    '16' : {'code':'ASW','name':'Aswan'},
    '17' : {'code':'ASY','name':'Asyut'},
    '18' : {'code':'BSW','name':'Bani Suwayf'},
    '19' : {'code':'BSD','name':'Bur Sa\'id'},
    '20' : {'code':'DMY','name':'Dumyat'},
    '21' : {'code':'JNS','name':'Janub Sina\''},
    '22' : {'code':'KSH','name':'Kafr ash Shaykh'},
    '23' : {'code':'MAT','name':'Matruh'},
    '24' : {'code':'QIN','name':'Qina'},
    '25' : {'code':'SHS','name':'Shamal Sina\''},
    '26' : {'code':'SUH','name':'Suhaj'}
  },
  'SV':{
    '1' : {'code':'AH','name':'Ahuachapan'},
    '2' : {'code':'CA','name':'Cabanas'},
    '3' : {'code':'CH','name':'Chalatenango'},
    '4' : {'code':'CU','name':'Cuscatlan'},
    '5' : {'code':'LB','name':'La Libertad'},
    '6' : {'code':'PZ','name':'La Paz'},
    '7' : {'code':'UN','name':'La Union'},
    '8' : {'code':'MO','name':'Morazan'},
    '9' : {'code':'SM','name':'San Miguel'},
    '10' : {'code':'SS','name':'San Salvador'},
    '11' : {'code':'SV','name':'San Vicente'},
    '12' : {'code':'SA','name':'Santa Ana'},
    '13' : {'code':'SO','name':'Sonsonate'},
    '14' : {'code':'US','name':'Usulutan'}
  },
  'GQ':{
    '1' : {'code':'AN','name':'Provincia Annobon'},
    '2' : {'code':'BN','name':'Provincia Bioko Norte'},
    '3' : {'code':'BS','name':'Provincia Bioko Sur'},
    '4' : {'code':'CS','name':'Provincia Centro Sur'},
    '5' : {'code':'KN','name':'Provincia Kie-Ntem'},
    '6' : {'code':'LI','name':'Provincia Litoral'},
    '7' : {'code':'WN','name':'Provincia Wele-Nzas'}
  },
  'ER':{
    '1' : {'code':'MA','name':'Central (Maekel)'},
    '2' : {'code':'KE','name':'Anseba (Keren)'},
    '3' : {'code':'DK','name':'Southern Red Sea (Debub-Keih-Bah)'},
    '4' : {'code':'SK','name':'Northern Red Sea (Semien-Keih-Ba)'},
    '5' : {'code':'DE','name':'Southern (Debub)'},
    '6' : {'code':'BR','name':'Gash-Barka (Barentu)'}
  },
  'EE':{
    '1' : {'code':'HA','name':'Harjumaa (Tallinn)'},
    '2' : {'code':'HI','name':'Hiiumaa (Kardla)'},
    '3' : {'code':'IV','name':'Ida-Virumaa (Johvi)'},
    '4' : {'code':'JA','name':'Jarvamaa (Paide)'},
    '5' : {'code':'JO','name':'Jogevamaa (Jogeva)'},
    '6' : {'code':'LV','name':'Laane-Virumaa (Rakvere)'},
    '7' : {'code':'LA','name':'Laanemaa (Haapsalu)'},
    '8' : {'code':'PA','name':'Parnumaa (Parnu)'},
    '9' : {'code':'PO','name':'Polvamaa (Polva)'},
    '10' : {'code':'RA','name':'Raplamaa (Rapla)'},
    '11' : {'code':'SA','name':'Saaremaa (Kuessaare)'},
    '12' : {'code':'TA','name':'Tartumaa (Tartu)'},
    '13' : {'code':'VA','name':'Valgamaa (Valga)'},
    '14' : {'code':'VI','name':'Viljandimaa (Viljandi)'},
    '15' : {'code':'VO','name':'Vorumaa (Voru)'}
  },
  'ET':{
    '1' : {'code':'AF','name':'Afar'},
    '2' : {'code':'AH','name':'Amhara'},
    '3' : {'code':'BG','name':'Benishangul-Gumaz'},
    '4' : {'code':'GB','name':'Gambela'},
    '5' : {'code':'HR','name':'Hariai'},
    '6' : {'code':'OR','name':'Oromia'},
    '7' : {'code':'SM','name':'Somali'},
    '8' : {'code':'SN','name':'Southern Nations - Nationalities'},
    '9' : {'code':'TG','name':'Tigray'},
    '10' : {'code':'AA','name':'Addis Ababa'},
    '11' : {'code':'DD','name':'Dire Dawa'}
  },
  'FO':{
    '1' : {'code':'TÛR','name':'Tûrshavnar Kommuna'},
    '2' : {'code':'KLA','name':'Klaksvík'},
    '3' : {'code':'RUN','name':'Runavík'},
    '4' : {'code':'TVØ','name':'Tvøroyri'},
    '5' : {'code':'FUG','name':'Fuglafjørður'},
    '6' : {'code':'SUN','name':'Sunda Kommuna'},
    '7' : {'code':'VáG','name':'Vágur'},
    '8' : {'code':'NES','name':'Nes'},
    '9' : {'code':'VES','name':'Vestmanna'},
    '10' : {'code':'MIð','name':'Miðvágur'},
    '11' : {'code':'SØR','name':'Sørvágur'},
    '12' : {'code':'GØT','name':'Gøtu Kommuna'},
    '13' : {'code':'SJû','name':'Sjûvar Kommuna'},
    '14' : {'code':'LEI','name':'Leirvík'},
    '15' : {'code':'SAN','name':'Sandavágur'},
    '16' : {'code':'HVA','name':'Hvalba'},
    '17' : {'code':'EIð','name':'Eiði'},
    '18' : {'code':'KVí','name':'Kvívík'},
    '19' : {'code':'SAN','name':'Sandur'},
    '20' : {'code':'SKO','name':'Skopun'},
    '21' : {'code':'HVA','name':'Hvannasund'},
    '22' : {'code':'SUM','name':'Sumba'},
    '23' : {'code':'VIð','name':'Viðareiði'},
    '24' : {'code':'POR','name':'Porkeri'},
    '25' : {'code':'SKá','name':'Skálavík'},
    '26' : {'code':'KUN','name':'Kunoy'},
    '27' : {'code':'HÚS','name':'HÚsavík'},
    '28' : {'code':'HOV','name':'Hov'},
    '29' : {'code':'FáM','name':'Fámjin'},
    '30' : {'code':'FUN','name':'Funningur'},
    '31' : {'code':'HÚS','name':'HÚsar'},
    '32' : {'code':'SKÚ','name':'SkÚvoy'},
    '33' : {'code':'SVí','name':'Svínoy'},
    '34' : {'code':'FUG','name':'Fugloy'}
  },
  'FJ':{
    '1' : {'code':'C','name':'Central Division'},
    '2' : {'code':'E','name':'Eastern Division'},
    '3' : {'code':'N','name':'Northern Division'},
    '4' : {'code':'R','name':'Rotuma'},
    '5' : {'code':'W','name':'Western Division'}
  },
  'FI':{
    '1' : {'code':'AL','name':'Ahvenanmaan Laani'},
    '2' : {'code':'ES','name':'Etela-Suomen Laani'},
    '3' : {'code':'IS','name':'Ita-Suomen Laani'},
    '4' : {'code':'LS','name':'Lansi-Suomen Laani'},
    '5' : {'code':'LA','name':'Lapin Lanani'},
    '6' : {'code':'OU','name':'Oulun Laani'}
  },
  'FR':{
    '1' : {'code':'AL','name':'Alsace'},
    '2' : {'code':'AQ','name':'Aquitaine'},
    '3' : {'code':'AU','name':'Auvergne'},
    '4' : {'code':'BR','name':'Brittany'},
    '5' : {'code':'BU','name':'Burgundy'},
    '6' : {'code':'CE','name':'Center Loire Valley'},
    '7' : {'code':'CH','name':'Champagne'},
    '8' : {'code':'CO','name':'Corse'},
    '9' : {'code':'FR','name':'France Comte'},
    '10' : {'code':'LA','name':'Languedoc Roussillon'},
    '11' : {'code':'LI','name':'Limousin'},
    '12' : {'code':'LO','name':'Lorraine'},
    '13' : {'code':'MI','name':'Midi Pyrenees'},
    '14' : {'code':'NO','name':'Nord Pas de Calais'},
    '15' : {'code':'NR','name':'Normandy'},
    '16' : {'code':'PA','name':'Paris / Ile de France'},
    '17' : {'code':'PI','name':'Picardie'},
    '18' : {'code':'PO','name':'Poitou Charente'},
    '19' : {'code':'PR','name':'Provence'},
    '20' : {'code':'RH','name':'Rhone Alps'},
    '21' : {'code':'RI','name':'Riviera'},
    '22' : {'code':'WE','name':'Western Loire Valley'}
  },
  'FX':{
    '1' : {'code':'Et','name':'Etranger'},
    '2' : {'code':'01','name':'Ain'},
    '3' : {'code':'02','name':'Aisne'},
    '4' : {'code':'03','name':'Allier'},
    '5' : {'code':'04','name':'Alpes de Haute Provence'},
    '6' : {'code':'05','name':'Hautes-Alpes'},
    '7' : {'code':'06','name':'Alpes Maritimes'},
    '8' : {'code':'07','name':'Ardèche'},
    '9' : {'code':'08','name':'Ardennes'},
    '10' : {'code':'09','name':'Ariège'},
    '11' : {'code':'10','name':'Aube'},
    '12' : {'code':'11','name':'Aude'},
    '13' : {'code':'12','name':'Aveyron'},
    '14' : {'code':'13','name':'Bouches du Rhône'},
    '15' : {'code':'14','name':'Calvados'},
    '16' : {'code':'15','name':'Cantal'},
    '17' : {'code':'16','name':'Charente'},
    '18' : {'code':'17','name':'Charente Maritime'},
    '19' : {'code':'18','name':'Cher'},
    '20' : {'code':'19','name':'Corrèze'},
    '21' : {'code':'2A','name':'Corse du Sud'},
    '22' : {'code':'2B','name':'Haute Corse'},
    '23' : {'code':'21','name':'Côte d\'or'},
    '24' : {'code':'22','name':'Côtes d\'Armor'},
    '25' : {'code':'23','name':'Creuse'},
    '26' : {'code':'24','name':'Dordogne'},
    '27' : {'code':'25','name':'Doubs'},
    '28' : {'code':'26','name':'Drôme'},
    '29' : {'code':'27','name':'Eure'},
    '30' : {'code':'28','name':'Eure et Loir'},
    '31' : {'code':'29','name':'Finistère'},
    '32' : {'code':'30','name':'Gard'},
    '33' : {'code':'31','name':'Haute Garonne'},
    '34' : {'code':'32','name':'Gers'},
    '35' : {'code':'33','name':'Gironde'},
    '36' : {'code':'34','name':'Hérault'},
    '37' : {'code':'35','name':'Ille et Vilaine'},
    '38' : {'code':'36','name':'Indre'},
    '39' : {'code':'37','name':'Indre et Loire'},
    '40' : {'code':'38','name':'Isére'},
    '41' : {'code':'39','name':'Jura'},
    '42' : {'code':'40','name':'Landes'},
    '43' : {'code':'41','name':'Loir et Cher'},
    '44' : {'code':'42','name':'Loire'},
    '45' : {'code':'43','name':'Haute Loire'},
    '46' : {'code':'44','name':'Loire Atlantique'},
    '47' : {'code':'45','name':'Loiret'},
    '48' : {'code':'46','name':'Lot'},
    '49' : {'code':'47','name':'Lot et Garonne'},
    '50' : {'code':'48','name':'Lozère'},
    '51' : {'code':'49','name':'Maine et Loire'},
    '52' : {'code':'50','name':'Manche'},
    '53' : {'code':'51','name':'Marne'},
    '54' : {'code':'52','name':'Haute Marne'},
    '55' : {'code':'53','name':'Mayenne'},
    '56' : {'code':'54','name':'Meurthe et Moselle'},
    '57' : {'code':'55','name':'Meuse'},
    '58' : {'code':'56','name':'Morbihan'},
    '59' : {'code':'57','name':'Moselle'},
    '60' : {'code':'58','name':'Nièvre'},
    '61' : {'code':'59','name':'Nord'},
    '62' : {'code':'60','name':'Oise'},
    '63' : {'code':'61','name':'Orne'},
    '64' : {'code':'62','name':'Pas de Calais'},
    '65' : {'code':'63','name':'Puy de Dôme'},
    '66' : {'code':'64','name':'Pyrenees Atlantique'},
    '67' : {'code':'65','name':'Hautes Pyrenees'},
    '68' : {'code':'66','name':'Pyrenees Orientale'},
    '69' : {'code':'67','name':'Bas Rhin'},
    '70' : {'code':'68','name':'Haut Rhin'},
    '71' : {'code':'69','name':'Rhône'},
    '72' : {'code':'70','name':'Haute Saône'},
    '73' : {'code':'71','name':'Saône et Loire'},
    '74' : {'code':'72','name':'Sarthe'},
    '75' : {'code':'73','name':'Savoie'},
    '76' : {'code':'74','name':'Haute Savoie'},
    '77' : {'code':'75','name':'Paris'},
    '78' : {'code':'76','name':'Seine Martitime'},
    '79' : {'code':'77','name':'Seine et Marne'},
    '80' : {'code':'78','name':'Yvelines'},
    '81' : {'code':'79','name':'Deux Sèvres'},
    '82' : {'code':'80','name':'Somme'},
    '83' : {'code':'81','name':'Tarn'},
    '84' : {'code':'82','name':'Tarn et Garonne'},
    '85' : {'code':'83','name':'Var'},
    '86' : {'code':'84','name':'Vaucluse'},
    '87' : {'code':'85','name':'Vendée'},
    '88' : {'code':'86','name':'Vienne'},
    '89' : {'code':'87','name':'Haute Vienne'},
    '90' : {'code':'88','name':'Vosges'},
    '91' : {'code':'89','name':'Yonne'},
    '92' : {'code':'90','name':'Territoire de Belfort'},
    '93' : {'code':'91','name':'Essonne'},
    '94' : {'code':'92','name':'Hauts de Seine'},
    '95' : {'code':'93','name':'Seine St-Denis'},
    '96' : {'code':'94','name':'Val de Marne'},
    '97' : {'code':'95','name':'Val d\'oise'}
  },
  'GF':{
    '1' : {'code':'AWA','name':'Awala-Yalimapo'},
    '2' : {'code':'MAN','name':'Mana'},
    '3' : {'code':'SAI','name':'Saint-Laurent-Du-Maroni'},
    '4' : {'code':'APA','name':'Apatou'},
    '5' : {'code':'GRA','name':'Grand-Santi'},
    '6' : {'code':'PAP','name':'Papaïchton'},
    '7' : {'code':'SAÜ','name':'SaÜl'},
    '8' : {'code':'MAR','name':'Maripasoula'},
    '9' : {'code':'CAM','name':'Camopi'},
    '10' : {'code':'SAI','name':'Saint-Georges'},
    '11' : {'code':'OUA','name':'Ouanary'},
    '12' : {'code':'RéG','name':'Régina'},
    '13' : {'code':'ROU','name':'Roura'},
    '14' : {'code':'SAI','name':'Saint-élie'},
    '15' : {'code':'IRA','name':'Iracoubo'},
    '16' : {'code':'SIN','name':'Sinnamary'},
    '17' : {'code':'KOU','name':'Kourou'},
    '18' : {'code':'MAC','name':'Macouria'},
    '19' : {'code':'MON','name':'Montsinéry-Tonnegrande'},
    '20' : {'code':'MAT','name':'Matoury'},
    '21' : {'code':'CAY','name':'Cayenne'},
    '22' : {'code':'REM','name':'Remire-Montjoly'}
  },
  'PF':{
    '1' : {'code':'M','name':'Archipel des Marquises'},
    '2' : {'code':'T','name':'Archipel des Tuamotu'},
    '3' : {'code':'I','name':'Archipel des Tubuai'},
    '4' : {'code':'V','name':'Iles du Vent'},
    '5' : {'code':'S','name':'Iles Sous-le-Vent'}
  },
  'TF':{
    '1' : {'code':'C','name':'Iles Crozet'},
    '2' : {'code':'K','name':'Iles Kerguelen'},
    '3' : {'code':'A','name':'Ile Amsterdam'},
    '4' : {'code':'P','name':'Ile Saint-Paul'},
    '5' : {'code':'D','name':'Adelie Land'}
  },
  'GA':{
    '1' : {'code':'ES','name':'Estuaire'},
    '2' : {'code':'HO','name':'Haut-Ogooue'},
    '3' : {'code':'MO','name':'Moyen-Ogooue'},
    '4' : {'code':'NG','name':'Ngounie'},
    '5' : {'code':'NY','name':'Nyanga'},
    '6' : {'code':'OI','name':'Ogooue-Ivindo'},
    '7' : {'code':'OL','name':'Ogooue-Lolo'},
    '8' : {'code':'OM','name':'Ogooue-Maritime'},
    '9' : {'code':'WN','name':'Woleu-Ntem'}
  },
  'GM':{
    '1' : {'code':'BJ','name':'Banjul'},
    '2' : {'code':'BS','name':'Basse'},
    '3' : {'code':'BR','name':'Brikama'},
    '4' : {'code':'JA','name':'Janjangbure'},
    '5' : {'code':'KA','name':'Kanifeng'},
    '6' : {'code':'KE','name':'Kerewan'},
    '7' : {'code':'KU','name':'Kuntaur'},
    '8' : {'code':'MA','name':'Mansakonko'},
    '9' : {'code':'LR','name':'Lower River'},
    '10' : {'code':'CR','name':'Central River'},
    '11' : {'code':'NB','name':'North Bank'},
    '12' : {'code':'UR','name':'Upper River'},
    '13' : {'code':'WE','name':'Western'}
  },
  'GE':{
    '1' : {'code':'AB','name':'Abkhazia'},
    '2' : {'code':'AJ','name':'Ajaria'},
    '3' : {'code':'GU','name':'Guria'},
    '4' : {'code':'IM','name':'Imereti'},
    '5' : {'code':'KA','name':'Kakheti'},
    '6' : {'code':'KK','name':'Kvemo Kartli'},
    '7' : {'code':'MM','name':'Mtskheta-Mtianeti'},
    '8' : {'code':'RL','name':'Racha Lechkhumi and Kvemo Svanet'},
    '9' : {'code':'SJ','name':'Samtskhe-Javakheti'},
    '10' : {'code':'SK','name':'Shida Kartli'},
    '11' : {'code':'SZ','name':'Samegrelo-Zemo Svaneti'},
    '12' : {'code':'TB','name':'Tbilisi'}
  },
  'DE':{
    '1' : {'code':'BAW','name':'Baden-Württemberg'},
    '2' : {'code':'BAY','name':'Bayern'},
    '3' : {'code':'BER','name':'Berlin'},
    '4' : {'code':'BRG','name':'Brandenburg'},
    '5' : {'code':'BRE','name':'Bremen'},
    '6' : {'code':'HAM','name':'Hamburg'},
    '7' : {'code':'HES','name':'Hessen'},
    '8' : {'code':'MEC','name':'Mecklenburg-Vorpommern'},
    '9' : {'code':'NDS','name':'Niedersachsen'},
    '10' : {'code':'NRW','name':'Nordrhein-Westfalen'},
    '11' : {'code':'RHE','name':'Rheinland-Pfalz'},
    '12' : {'code':'SAR','name':'Saarland'},
    '13' : {'code':'SAS','name':'Sachsen'},
    '14' : {'code':'SAC','name':'Sachsen-Anhalt'},
    '15' : {'code':'SCN','name':'Schleswig-Holstein'},
    '16' : {'code':'THE','name':'Thüringen'}
  },
  'GH':{
    '1' : {'code':'AS','name':'Ashanti Region'},
    '2' : {'code':'BA','name':'Brong-Ahafo Region'},
    '3' : {'code':'CE','name':'Central Region'},
    '4' : {'code':'EA','name':'Eastern Region'},
    '5' : {'code':'GA','name':'Greater Accra Region'},
    '6' : {'code':'NO','name':'Northern Region'},
    '7' : {'code':'UE','name':'Upper East Region'},
    '8' : {'code':'UW','name':'Upper West Region'},
    '9' : {'code':'VO','name':'Volta Region'},
    '10' : {'code':'WE','name':'Western Region'}
  },
  'GI':{
    '1' : {'code':'EAS','name':'East Side'},
    '2' : {'code':'NOR','name':'North District'},
    '3' : {'code':'REC','name':'Reclamation Areas'},
    '4' : {'code':'SAN','name':'Sandpits Area'},
    '5' : {'code':'SOU','name':'South District'},
    '6' : {'code':'TOW','name':'Town Area'},
    '7' : {'code':'UPP','name':'Upper Town'},
    '8' : {'code':'OTH','name':'Other'}
  },
  'GR':{
    '1' : {'code':'AT','name':'Attica'},
    '2' : {'code':'CN','name':'Central Greece'},
    '3' : {'code':'CM','name':'Central Macedonia'},
    '4' : {'code':'CR','name':'Crete'},
    '5' : {'code':'EM','name':'East Macedonia and Thrace'},
    '6' : {'code':'EP','name':'Epirus'},
    '7' : {'code':'II','name':'Ionian Islands'},
    '8' : {'code':'NA','name':'North Aegean'},
    '9' : {'code':'PP','name':'Peloponnesos'},
    '10' : {'code':'SA','name':'South Aegean'},
    '11' : {'code':'TH','name':'Thessaly'},
    '12' : {'code':'WG','name':'West Greece'},
    '13' : {'code':'WM','name':'West Macedonia'}
  },
  'GL':{
    '1' : {'code':'A','name':'Avannaa'},
    '2' : {'code':'T','name':'Tunu'},
    '3' : {'code':'K','name':'Kitaa'}
  },
  '86':{
    '1' : {'code':'A','name':'Saint Andrew'},
    '2' : {'code':'D','name':'Saint David'},
    '3' : {'code':'G','name':'Saint George'},
    '4' : {'code':'J','name':'Saint John'},
    '5' : {'code':'M','name':'Saint Mark'},
    '6' : {'code':'P','name':'Saint Patrick'},
    '7' : {'code':'C','name':'Carriacou'},
    '8' : {'code':'Q','name':'Petit Martinique'}
  },
  'GP':{
    '1' : {'code':'ARR','name':'Arrondissements Of The Guadeloup'},
    '2' : {'code':'CAN','name':'Cantons Of The Guadeloup Depart'},
    '3' : {'code':'COM','name':'Communes Of The Guadeloup Depart'}
  },
  'GU':{
    '1' : {'code':'AGA','name':'Agana Heights'},
    '2' : {'code':'AGA','name':'Agat'},
    '3' : {'code':'ASA','name':'Asan Maina'},
    '4' : {'code':'BAR','name':'Barrigada'},
    '5' : {'code':'CHA','name':'Chalan Pago Ordot'},
    '6' : {'code':'DED','name':'Dededo'},
    '7' : {'code':'HAG','name':'HagÅtña'},
    '8' : {'code':'INA','name':'Inarajan'},
    '9' : {'code':'MAN','name':'Mangilao'},
    '10' : {'code':'MER','name':'Merizo'},
    '11' : {'code':'MON','name':'Mongmong Toto Maite'},
    '12' : {'code':'PIT','name':'Piti'},
    '13' : {'code':'SAN','name':'Santa Rita'},
    '14' : {'code':'SIN','name':'Sinajana'},
    '15' : {'code':'TAL','name':'Talofofo'},
    '16' : {'code':'TAM','name':'Tamuning'},
    '17' : {'code':'UMA','name':'Umatac'},
    '18' : {'code':'YIG','name':'Yigo'},
    '19' : {'code':'YON','name':'Yona'}
  },
  'GT':{
    '1' : {'code':'AV','name':'Alta Verapaz'},
    '2' : {'code':'BV','name':'Baja Verapaz'},
    '3' : {'code':'CM','name':'Chimaltenango'},
    '4' : {'code':'CQ','name':'Chiquimula'},
    '5' : {'code':'PE','name':'El Peten'},
    '6' : {'code':'PR','name':'El Progreso'},
    '7' : {'code':'QC','name':'El Quiche'},
    '8' : {'code':'ES','name':'Escuintla'},
    '9' : {'code':'GU','name':'Guatemala'},
    '10' : {'code':'HU','name':'Huehuetenango'},
    '11' : {'code':'IZ','name':'Izabal'},
    '12' : {'code':'JA','name':'Jalapa'},
    '13' : {'code':'JU','name':'Jutiapa'},
    '14' : {'code':'QZ','name':'Quetzaltenango'},
    '15' : {'code':'RE','name':'Retalhuleu'},
    '16' : {'code':'ST','name':'Sacatepequez'},
    '17' : {'code':'SM','name':'San Marcos'},
    '18' : {'code':'SR','name':'Santa Rosa'},
    '19' : {'code':'SO','name':'Solola'},
    '20' : {'code':'SU','name':'Suchitepequez'},
    '21' : {'code':'TO','name':'Totonicapan'},
    '22' : {'code':'ZA','name':'Zacapa'}
  },
  'GN':{
    '1' : {'code':'CNK','name':'Conakry'},
    '2' : {'code':'BYL','name':'Beyla'},
    '3' : {'code':'BFA','name':'Boffa'},
    '4' : {'code':'BOK','name':'Boke'},
    '5' : {'code':'COY','name':'Coyah'},
    '6' : {'code':'DBL','name':'Dabola'},
    '7' : {'code':'DLB','name':'Dalaba'},
    '8' : {'code':'DGR','name':'Dinguiraye'},
    '9' : {'code':'DBR','name':'Dubreka'},
    '10' : {'code':'FRN','name':'Faranah'},
    '11' : {'code':'FRC','name':'Forecariah'},
    '12' : {'code':'FRI','name':'Fria'},
    '13' : {'code':'GAO','name':'Gaoual'},
    '14' : {'code':'GCD','name':'Gueckedou'},
    '15' : {'code':'KNK','name':'Kankan'},
    '16' : {'code':'KRN','name':'Kerouane'},
    '17' : {'code':'KND','name':'Kindia'},
    '18' : {'code':'KSD','name':'Kissidougou'},
    '19' : {'code':'KBA','name':'Koubia'},
    '20' : {'code':'KDA','name':'Koundara'},
    '21' : {'code':'KRA','name':'Kouroussa'},
    '22' : {'code':'LAB','name':'Labe'},
    '23' : {'code':'LLM','name':'Lelouma'},
    '24' : {'code':'LOL','name':'Lola'},
    '25' : {'code':'MCT','name':'Macenta'},
    '26' : {'code':'MAL','name':'Mali'},
    '27' : {'code':'MAM','name':'Mamou'},
    '28' : {'code':'MAN','name':'Mandiana'},
    '29' : {'code':'NZR','name':'Nzerekore'},
    '30' : {'code':'PIT','name':'Pita'},
    '31' : {'code':'SIG','name':'Siguiri'},
    '32' : {'code':'TLM','name':'Telimele'},
    '33' : {'code':'TOG','name':'Tougue'},
    '34' : {'code':'YOM','name':'Yomou'}
  },
  'GW':{
    '1' : {'code':'BF','name':'Bafata Region'},
    '2' : {'code':'BB','name':'Biombo Region'},
    '3' : {'code':'BS','name':'Bissau Region'},
    '4' : {'code':'BL','name':'Bolama Region'},
    '5' : {'code':'CA','name':'Cacheu Region'},
    '6' : {'code':'GA','name':'Gabu Region'},
    '7' : {'code':'OI','name':'Oio Region'},
    '8' : {'code':'QU','name':'Quinara Region'},
    '9' : {'code':'TO','name':'Tombali Region'}
  },
  'GY':{
    '1' : {'code':'BW','name':'Barima-Waini'},
    '2' : {'code':'CM','name':'Cuyuni-Mazaruni'},
    '3' : {'code':'DM','name':'Demerara-Mahaica'},
    '4' : {'code':'EC','name':'East Berbice-Corentyne'},
    '5' : {'code':'EW','name':'Essequibo Islands-West Demerara'},
    '6' : {'code':'MB','name':'Mahaica-Berbice'},
    '7' : {'code':'PM','name':'Pomeroon-Supenaam'},
    '8' : {'code':'PI','name':'Potaro-Siparuni'},
    '9' : {'code':'UD','name':'Upper Demerara-Berbice'},
    '10' : {'code':'UT','name':'Upper Takutu-Upper Essequibo'}
  },
  'HT':{
    '1' : {'code':'AR','name':'Artibonite'},
    '2' : {'code':'CE','name':'Centre'},
    '3' : {'code':'GA','name':'Grand\'Anse'},
    '4' : {'code':'ND','name':'Nord'},
    '5' : {'code':'NE','name':'Nord-Est'},
    '6' : {'code':'NO','name':'Nord-Ouest'},
    '7' : {'code':'OU','name':'Ouest'},
    '8' : {'code':'SD','name':'Sud'},
    '9' : {'code':'SE','name':'Sud-Est'}
  },
  'HM':{
    '1' : {'code':'F','name':'Flat Island'},
    '2' : {'code':'M','name':'McDonald Island'},
    '3' : {'code':'S','name':'Shag Island'},
    '4' : {'code':'H','name':'Heard Island'}
  },
  'HN':{
    '1' : {'code':'AT','name':'Atlantida'},
    '2' : {'code':'CH','name':'Choluteca'},
    '3' : {'code':'CL','name':'Colon'},
    '4' : {'code':'CM','name':'Comayagua'},
    '5' : {'code':'CP','name':'Copan'},
    '6' : {'code':'CR','name':'Cortes'},
    '7' : {'code':'PA','name':'El Paraiso'},
    '8' : {'code':'FM','name':'Francisco Morazan'},
    '9' : {'code':'GD','name':'Gracias a Dios'},
    '10' : {'code':'IN','name':'Intibuca'},
    '11' : {'code':'IB','name':'Islas de la Bahia (Bay Islands)'},
    '12' : {'code':'PZ','name':'La Paz'},
    '13' : {'code':'LE','name':'Lempira'},
    '14' : {'code':'OC','name':'Ocotepeque'},
    '15' : {'code':'OL','name':'Olancho'},
    '16' : {'code':'SB','name':'Santa Barbara'},
    '17' : {'code':'VA','name':'Valle'},
    '18' : {'code':'YO','name':'Yoro'}
  },
  'HK':{
    '1' : {'code':'HCW','name':'Central and Western Hong Kong Is'},
    '2' : {'code':'HEA','name':'Eastern Hong Kong Island'},
    '3' : {'code':'HSO','name':'Southern Hong Kong Island'},
    '4' : {'code':'HWC','name':'Wan Chai Hong Kong Island'},
    '5' : {'code':'KKC','name':'Kowloon City Kowloon'},
    '6' : {'code':'KKT','name':'Kwun Tong Kowloon'},
    '7' : {'code':'KSS','name':'Sham Shui Po Kowloon'},
    '8' : {'code':'KWT','name':'Wong Tai Sin Kowloon'},
    '9' : {'code':'KYT','name':'Yau Tsim Mong Kowloon'},
    '10' : {'code':'NIS','name':'Islands New Territories'},
    '11' : {'code':'NKT','name':'Kwai Tsing New Territories'},
    '12' : {'code':'NNO','name':'North New Territories'},
    '13' : {'code':'NSK','name':'Sai Kung New Territories'},
    '14' : {'code':'NST','name':'Sha Tin New Territories'},
    '15' : {'code':'NTP','name':'Tai Po New Territories'},
    '16' : {'code':'NTW','name':'Tsuen Wan New Territories'},
    '17' : {'code':'NTM','name':'Tuen Mun New Territories'},
    '18' : {'code':'NYL','name':'Yuen Long New Territories'}
  },
  'HU':{
    '1' : {'code':'BK','name':'Bacs-Kiskun'},
    '2' : {'code':'BA','name':'Baranya'},
    '3' : {'code':'BE','name':'Bekes'},
    '4' : {'code':'BS','name':'Bekescsaba'},
    '5' : {'code':'BZ','name':'Borsod-Abauj-Zemplen'},
    '6' : {'code':'BU','name':'Budapest'},
    '7' : {'code':'CS','name':'Csongrad'},
    '8' : {'code':'DE','name':'Debrecen'},
    '9' : {'code':'DU','name':'Dunaujvaros'},
    '10' : {'code':'EG','name':'Eger'},
    '11' : {'code':'FE','name':'Fejer'},
    '12' : {'code':'GY','name':'Gyor'},
    '13' : {'code':'GM','name':'Gyor-Moson-Sopron'},
    '14' : {'code':'HB','name':'Hajdu-Bihar'},
    '15' : {'code':'HE','name':'Heves'},
    '16' : {'code':'HO','name':'Hodmezovasarhely'},
    '17' : {'code':'JN','name':'Jasz-Nagykun-Szolnok'},
    '18' : {'code':'KA','name':'Kaposvar'},
    '19' : {'code':'KE','name':'Kecskemet'},
    '20' : {'code':'KO','name':'Komarom-Esztergom'},
    '21' : {'code':'MI','name':'Miskolc'},
    '22' : {'code':'NA','name':'Nagykanizsa'},
    '23' : {'code':'NO','name':'Nograd'},
    '24' : {'code':'NY','name':'Nyiregyhaza'},
    '25' : {'code':'PE','name':'Pecs'},
    '26' : {'code':'PS','name':'Pest'},
    '27' : {'code':'SO','name':'Somogy'},
    '28' : {'code':'SP','name':'Sopron'},
    '29' : {'code':'SS','name':'Szabolcs-Szatmar-Bereg'},
    '30' : {'code':'SZ','name':'Szeged'},
    '31' : {'code':'SE','name':'Szekesfehervar'},
    '32' : {'code':'SL','name':'Szolnok'},
    '33' : {'code':'SM','name':'Szombathely'},
    '34' : {'code':'TA','name':'Tatabanya'},
    '35' : {'code':'TO','name':'Tolna'},
    '36' : {'code':'VA','name':'Vas'},
    '37' : {'code':'VE','name':'Veszprem'},
    '38' : {'code':'ZA','name':'Zala'},
    '39' : {'code':'ZZ','name':'Zalaegerszeg'}
  },
  'IS':{
    '1' : {'code':'AL','name':'Austurland'},
    '2' : {'code':'HF','name':'Hofuoborgarsvaeoi'},
    '3' : {'code':'NE','name':'Norourland eystra'},
    '4' : {'code':'NV','name':'Norourland vestra'},
    '5' : {'code':'SL','name':'Suourland'},
    '6' : {'code':'SN','name':'Suournes'},
    '7' : {'code':'VF','name':'Vestfiroir'},
    '8' : {'code':'VL','name':'Vesturland'}
  },
  'IN':{
    '1' : {'code':'AN','name':'Andaman and Nicobar Islands'},
    '2' : {'code':'AP','name':'Andhra Pradesh'},
    '3' : {'code':'AR','name':'Arunachal Pradesh'},
    '4' : {'code':'AS','name':'Assam'},
    '5' : {'code':'BI','name':'Bihar'},
    '6' : {'code':'CH','name':'Chandigarh'},
    '7' : {'code':'DA','name':'Dadra and Nagar Haveli'},
    '8' : {'code':'DM','name':'Daman and Diu'},
    '9' : {'code':'DE','name':'Delhi'},
    '10' : {'code':'GO','name':'Goa'},
    '11' : {'code':'GU','name':'Gujarat'},
    '12' : {'code':'HA','name':'Haryana'},
    '13' : {'code':'HP','name':'Himachal Pradesh'},
    '14' : {'code':'JA','name':'Jammu and Kashmir'},
    '15' : {'code':'KA','name':'Karnataka'},
    '16' : {'code':'KE','name':'Kerala'},
    '17' : {'code':'LI','name':'Lakshadweep Islands'},
    '18' : {'code':'MP','name':'Madhya Pradesh'},
    '19' : {'code':'MA','name':'Maharashtra'},
    '20' : {'code':'MN','name':'Manipur'},
    '21' : {'code':'ME','name':'Meghalaya'},
    '22' : {'code':'MI','name':'Mizoram'},
    '23' : {'code':'NA','name':'Nagaland'},
    '24' : {'code':'OR','name':'Orissa'},
    '25' : {'code':'PO','name':'Pondicherry'},
    '26' : {'code':'PU','name':'Punjab'},
    '27' : {'code':'RA','name':'Rajasthan'},
    '28' : {'code':'SI','name':'Sikkim'},
    '29' : {'code':'TN','name':'Tamil Nadu'},
    '30' : {'code':'TR','name':'Tripura'},
    '31' : {'code':'UP','name':'Uttar Pradesh'},
    '32' : {'code':'WB','name':'West Bengal'}
  },
  'ID':{
    '1' : {'code':'DA','name':'Daista Aceh'},
    '2' : {'code':'SU','name':'Sumatera Utara'},
    '3' : {'code':'SB','name':'Sumatera Barat'},
    '4' : {'code':'SI','name':'Riau'},
    '5' : {'code':'JA','name':'Jambi'},
    '6' : {'code':'SS','name':'Sumatera Selatan'},
    '7' : {'code':'BE','name':'Bengkulu'},
    '8' : {'code':'LA','name':'Lampung'},
    '9' : {'code':'JK','name':'Dki Jakarta'},
    '10' : {'code':'JB','name':'Jawa Barat'},
    '11' : {'code':'JT','name':'Jawa Tengah'},
    '12' : {'code':'DY','name':'Daista Yogyakarta'},
    '13' : {'code':'JT','name':'Jawa Timur'},
    '14' : {'code':'KB','name':'Kalimantan Barat'},
    '15' : {'code':'KT','name':'Kalimantan Tengah'},
    '16' : {'code':'KI','name':'Kalimantan Timur'},
    '17' : {'code':'KS','name':'Kalimantan Selatan'},
    '18' : {'code':'BA','name':'Bali'},
    '19' : {'code':'NB','name':'Nusa Tenggara Barat'},
    '20' : {'code':'NT','name':'Nusa Tenggara Timur'},
    '21' : {'code':'SN','name':'Sulawesi Selatan'},
    '22' : {'code':'ST','name':'Sulawesi Tengah'},
    '23' : {'code':'SA','name':'Sulawesi Utara'},
    '24' : {'code':'SG','name':'Sulawesi Tenggara'},
    '25' : {'code':'MA','name':'Maluku'},
    '26' : {'code':'MU','name':'Maluku Utara'},
    '27' : {'code':'IJ','name':'Irian Jaya Timur'},
    '28' : {'code':'IT','name':'Irian Jaya Tengah'},
    '29' : {'code':'IB','name':'Irian Jawa Barat'},
    '30' : {'code':'BT','name':'Banten'},
    '31' : {'code':'BB','name':'Bangka Belitung'},
    '32' : {'code':'GO','name':'Gorontalo'}
  },
  'IR':{
    '1' : {'code':'ARD','name':'Ardabil'},
    '2' : {'code':'BSH','name':'Bushehr'},
    '3' : {'code':'CMB','name':'Chahar Mahaal and Bakhtiari'},
    '4' : {'code':'EAZ','name':'East Azarbaijan'},
    '5' : {'code':'EFH','name':'Esfahan'},
    '6' : {'code':'FAR','name':'Fars'},
    '7' : {'code':'GIL','name':'Gilan'},
    '8' : {'code':'GLS','name':'Golestan'},
    '9' : {'code':'HMD','name':'Hamadan'},
    '10' : {'code':'HRM','name':'Hormozgan'},
    '11' : {'code':'ILM','name':'Ilam'},
    '12' : {'code':'KBA','name':'Kohkiluyeh and Buyer Ahmad'},
    '13' : {'code':'KRB','name':'Kerman'},
    '14' : {'code':'KRD','name':'Kurdistan'},
    '15' : {'code':'KRM','name':'Kermanshah'},
    '16' : {'code':'KZT','name':'Khuzestan'},
    '17' : {'code':'LRS','name':'Lorestan'},
    '18' : {'code':'MKZ','name':'Markazi'},
    '19' : {'code':'MZD','name':'Mazandaran'},
    '20' : {'code':'NKH','name':'North Khorasan'},
    '21' : {'code':'QAZ','name':'Qazvin'},
    '22' : {'code':'QOM','name':'Qom'},
    '23' : {'code':'RKH','name':'Razavi Khorasan'},
    '24' : {'code':'SBL','name':'Sistan and Baluchistan'},
    '25' : {'code':'SKH','name':'South Khorasan'},
    '26' : {'code':'SMN','name':'Semnan'},
    '27' : {'code':'TEH','name':'Tehran'},
    '28' : {'code':'WEZ','name':'West Azarbaijan'},
    '29' : {'code':'YZD','name':'Yazd'},
    '30' : {'code':'ZAN','name':'Zanjan'}
  },
  'IQ':{
    '1' : {'code':'AB','name':'Al Anbar'},
    '2' : {'code':'AL','name':'Arbil'},
    '3' : {'code':'BA','name':'Al Basrah'},
    '4' : {'code':'BB','name':'Babil'},
    '5' : {'code':'BD','name':'Baghdad'},
    '6' : {'code':'DH','name':'Dahuk'},
    '7' : {'code':'DQ','name':'Dhi Qar'},
    '8' : {'code':'DY','name':'Diyala'},
    '9' : {'code':'KB','name':'Al Karbala'},
    '10' : {'code':'MU','name':'Al Muthanna'},
    '11' : {'code':'MY','name':'Maysan'},
    '12' : {'code':'NJ','name':'An Najaf'},
    '13' : {'code':'NN','name':'Ninawa'},
    '14' : {'code':'QA','name':'Al Qadisyah'},
    '15' : {'code':'SD','name':'Salah ad Din'},
    '16' : {'code':'SL','name':'As Sulaymaniyah'},
    '17' : {'code':'TM','name':'At Ta\'mim'},
    '18' : {'code':'WS','name':'Wasit'}
  },
  'IE':{
    '1' : {'code':'CA','name':'Carlow'},
    '2' : {'code':'CV','name':'Cavan'},
    '3' : {'code':'CL','name':'Clare'},
    '4' : {'code':'CO','name':'Cork'},
    '5' : {'code':'DO','name':'Donegal'},
    '6' : {'code':'DU','name':'Dublin'},
    '7' : {'code':'GA','name':'Galway'},
    '8' : {'code':'KE','name':'Kerry'},
    '9' : {'code':'KI','name':'Kildare'},
    '10' : {'code':'KL','name':'Kilkenny'},
    '11' : {'code':'LA','name':'Laois'},
    '12' : {'code':'LE','name':'Leitrim'},
    '13' : {'code':'LI','name':'Limerick'},
    '14' : {'code':'LO','name':'Longford'},
    '15' : {'code':'LU','name':'Louth'},
    '16' : {'code':'MA','name':'Mayo'},
    '17' : {'code':'ME','name':'Meath'},
    '18' : {'code':'MO','name':'Monaghan'},
    '19' : {'code':'OF','name':'Offaly'},
    '20' : {'code':'RO','name':'Roscommon'},
    '21' : {'code':'SL','name':'Sligo'},
    '22' : {'code':'TI','name':'Tipperary'},
    '23' : {'code':'WA','name':'Waterford'},
    '24' : {'code':'WE','name':'Westmeath'},
    '25' : {'code':'WX','name':'Wexford'},
    '26' : {'code':'WI','name':'Wicklow'}
  },
  'IL':{
    '1' : {'code':'BS','name':'Be\'er Sheva'},
    '2' : {'code':'BH','name':'Bika\'at Hayarden'},
    '3' : {'code':'EA','name':'Eilat and Arava'},
    '4' : {'code':'GA','name':'Galil'},
    '5' : {'code':'HA','name':'Haifa'},
    '6' : {'code':'JM','name':'Jehuda Mountains'},
    '7' : {'code':'JE','name':'Jerusalem'},
    '8' : {'code':'NE','name':'Negev'},
    '10' : {'code':'SE','name':'Semaria'},
    '11' : {'code':'SH','name':'Sharon'},
    '12' : {'code':'TA','name':'Tel Aviv (Gosh Dan)'}
  },
  'IT':{
    '1' : {'code':'AG','name':'Agrigento'},
    '2' : {'code':'AL','name':'Alessandria'},
    '3' : {'code':'AN','name':'Ancona'},
    '4' : {'code':'AO','name':'Aosta'},
    '5' : {'code':'AR','name':'Arezzo'},
    '6' : {'code':'AP','name':'Ascoli Piceno'},
    '7' : {'code':'AT','name':'Asti'},
    '8' : {'code':'AV','name':'Avellino'},
    '9' : {'code':'BA','name':'Bari'},
    '10' : {'code':'BL','name':'Belluno'},
    '11' : {'code':'BN','name':'Benevento'},
    '12' : {'code':'BG','name':'Bergamo'},
    '13' : {'code':'BI','name':'Biella'},
    '14' : {'code':'BO','name':'Bologna'},
    '15' : {'code':'BZ','name':'Bolzano'},
    '16' : {'code':'BS','name':'Brescia'},
    '17' : {'code':'BR','name':'Brindisi'},
    '18' : {'code':'CA','name':'Cagliari'},
    '19' : {'code':'CL','name':'Caltanissetta'},
    '20' : {'code':'CB','name':'Campobasso'},
    '21' : {'code':'CE','name':'Caserta'},
    '22' : {'code':'CT','name':'Catania'},
    '23' : {'code':'CZ','name':'Catanzaro'},
    '24' : {'code':'CH','name':'Chieti'},
    '25' : {'code':'CO','name':'Como'},
    '26' : {'code':'CS','name':'Cosenza'},
    '27' : {'code':'CR','name':'Cremona'},
    '28' : {'code':'KR','name':'Crotone'},
    '29' : {'code':'CN','name':'Cuneo'},
    '30' : {'code':'EN','name':'Enna'},
    '31' : {'code':'FE','name':'Ferrara'},
    '32' : {'code':'FI','name':'Firenze'},
    '33' : {'code':'FG','name':'Foggia'},
    '34' : {'code':'FO','name':'Forlì'},
    '35' : {'code':'FR','name':'Frosinone'},
    '36' : {'code':'GE','name':'Genova'},
    '37' : {'code':'GO','name':'Gorizia'},
    '38' : {'code':'GR','name':'Grosseto'},
    '39' : {'code':'IM','name':'Imperia'},
    '40' : {'code':'IS','name':'Isernia'},
    '41' : {'code':'AQ','name':'Aquila'},
    '42' : {'code':'SP','name':'La Spezia'},
    '43' : {'code':'LT','name':'Latina'},
    '44' : {'code':'LE','name':'Lecce'},
    '45' : {'code':'LC','name':'Lecco'},
    '46' : {'code':'LI','name':'Livorno'},
    '47' : {'code':'LO','name':'Lodi'},
    '48' : {'code':'LU','name':'Lucca'},
    '49' : {'code':'MC','name':'Macerata'},
    '50' : {'code':'MN','name':'Mantova'},
    '51' : {'code':'MS','name':'Massa-Carrara'},
    '52' : {'code':'MT','name':'Matera'},
    '53' : {'code':'ME','name':'Messina'},
    '54' : {'code':'MI','name':'Milano'},
    '55' : {'code':'MO','name':'Modena'},
    '56' : {'code':'NA','name':'Napoli'},
    '57' : {'code':'NO','name':'Novara'},
    '58' : {'code':'NU','name':'Nuoro'},
    '59' : {'code':'OR','name':'Oristano'},
    '60' : {'code':'PD','name':'Padova'},
    '61' : {'code':'PA','name':'Palermo'},
    '62' : {'code':'PR','name':'Parma'},
    '63' : {'code':'PG','name':'Perugia'},
    '64' : {'code':'PV','name':'Pavia'},
    '65' : {'code':'PU','name':'Pesaro Urbino'},
    '66' : {'code':'PE','name':'Pescara'},
    '67' : {'code':'PC','name':'Piacenza'},
    '68' : {'code':'PI','name':'Pisa'},
    '69' : {'code':'PT','name':'Pistoia'},
    '70' : {'code':'PN','name':'Pordenone'},
    '71' : {'code':'PZ','name':'Potenza'},
    '72' : {'code':'PO','name':'Prato'},
    '73' : {'code':'RG','name':'Ragusa'},
    '74' : {'code':'RA','name':'Ravenna'},
    '75' : {'code':'RC','name':'Reggio Calabria'},
    '76' : {'code':'RE','name':'Reggio Emilia'},
    '77' : {'code':'RI','name':'Rieti'},
    '78' : {'code':'RN','name':'Rimini'},
    '79' : {'code':'RM','name':'Roma'},
    '80' : {'code':'RO','name':'Rovigo'},
    '81' : {'code':'SA','name':'Salerno'},
    '82' : {'code':'SS','name':'Sassari'},
    '83' : {'code':'SV','name':'Savona'},
    '84' : {'code':'SI','name':'Siena'},
    '85' : {'code':'SR','name':'Siracusa'},
    '86' : {'code':'SO','name':'Sondrio'},
    '87' : {'code':'TA','name':'Taranto'},
    '88' : {'code':'TE','name':'Teramo'},
    '89' : {'code':'TR','name':'Terni'},
    '90' : {'code':'TO','name':'Torino'},
    '91' : {'code':'TP','name':'Trapani'},
    '92' : {'code':'TN','name':'Trento'},
    '93' : {'code':'TV','name':'Treviso'},
    '94' : {'code':'TS','name':'Trieste'},
    '95' : {'code':'UD','name':'Udine'},
    '96' : {'code':'VA','name':'Varese'},
    '97' : {'code':'VE','name':'Venezia'},
    '98' : {'code':'VB','name':'Verbania'},
    '99' : {'code':'VC','name':'Vercelli'},
    '100' : {'code':'VR','name':'Verona'},
    '101' : {'code':'VV','name':'Vibo Valentia'},
    '102' : {'code':'VI','name':'Vicenza'},
    '103' : {'code':'VT','name':'Viterbo'},
    '104' : {'code':'CI','name':'Carbonia-Iglesias'},
    '105' : {'code':'VS','name':'Medio Campidano'},
    '106' : {'code':'OG','name':'Ogliastra'},
    '107' : {'code':'OT','name':'Olbia-Tempio'},
    '108' : {'code':'MB','name':'Monza e Brianza'},
    '109' : {'code':'FM','name':'Fermo'},
    '110' : {'code':'BT','name':'Barletta-Andria-Trani'}
  },
  'JM':{
    '1' : {'code':'CLA','name':'Clarendon Parish'},
    '2' : {'code':'HAN','name':'Hanover Parish'},
    '3' : {'code':'KIN','name':'Kingston Parish'},
    '4' : {'code':'MAN','name':'Manchester Parish'},
    '5' : {'code':'POR','name':'Portland Parish'},
    '6' : {'code':'AND','name':'Saint Andrew Parish'},
    '7' : {'code':'ANN','name':'Saint Ann Parish'},
    '8' : {'code':'CAT','name':'Saint Catherine Parish'},
    '9' : {'code':'ELI','name':'Saint Elizabeth Parish'},
    '10' : {'code':'JAM','name':'Saint James Parish'},
    '11' : {'code':'MAR','name':'Saint Mary Parish'},
    '12' : {'code':'THO','name':'Saint Thomas Parish'},
    '13' : {'code':'TRL','name':'Trelawny Parish'},
    '14' : {'code':'WML','name':'Westmoreland Parish'}
  },
  'JP':{
    '1' : {'code':'AI','name':'Aichi'},
    '2' : {'code':'AK','name':'Akita'},
    '3' : {'code':'AO','name':'Aomori'},
    '4' : {'code':'CH','name':'Chiba'},
    '5' : {'code':'EH','name':'Ehime'},
    '6' : {'code':'FK','name':'Fukui'},
    '7' : {'code':'FU','name':'Fukuoka'},
    '8' : {'code':'FS','name':'Fukushima'},
    '9' : {'code':'GI','name':'Gifu'},
    '10' : {'code':'GU','name':'Gumma'},
    '11' : {'code':'HI','name':'Hiroshima'},
    '12' : {'code':'HO','name':'Hokkaido'},
    '13' : {'code':'HY','name':'Hyogo'},
    '14' : {'code':'IB','name':'Ibaraki'},
    '15' : {'code':'IS','name':'Ishikawa'},
    '16' : {'code':'IW','name':'Iwate'},
    '17' : {'code':'KA','name':'Kagawa'},
    '18' : {'code':'KG','name':'Kagoshima'},
    '19' : {'code':'KN','name':'Kanagawa'},
    '20' : {'code':'KO','name':'Kochi'},
    '21' : {'code':'KU','name':'Kumamoto'},
    '22' : {'code':'KY','name':'Kyoto'},
    '23' : {'code':'MI','name':'Mie'},
    '24' : {'code':'MY','name':'Miyagi'},
    '25' : {'code':'MZ','name':'Miyazaki'},
    '26' : {'code':'NA','name':'Nagano'},
    '27' : {'code':'NG','name':'Nagasaki'},
    '28' : {'code':'NR','name':'Nara'},
    '29' : {'code':'NI','name':'Niigata'},
    '30' : {'code':'OI','name':'Oita'},
    '31' : {'code':'OK','name':'Okayama'},
    '32' : {'code':'ON','name':'Okinawa'},
    '33' : {'code':'OS','name':'Osaka'},
    '34' : {'code':'SA','name':'Saga'},
    '35' : {'code':'SI','name':'Saitama'},
    '36' : {'code':'SH','name':'Shiga'},
    '37' : {'code':'SM','name':'Shimane'},
    '38' : {'code':'SZ','name':'Shizuoka'},
    '39' : {'code':'TO','name':'Tochigi'},
    '40' : {'code':'TS','name':'Tokushima'},
    '41' : {'code':'TK','name':'Tokyo'},
    '42' : {'code':'TT','name':'Tottori'},
    '43' : {'code':'TY','name':'Toyama'},
    '44' : {'code':'WA','name':'Wakayama'},
    '45' : {'code':'YA','name':'Yamagata'},
    '46' : {'code':'YM','name':'Yamaguchi'},
    '47' : {'code':'YN','name':'Yamanashi'}
  },
  'JO':{
    '1' : {'code':'AM','name':'\'Amman'},
    '2' : {'code':'AJ','name':'Ajlun'},
    '3' : {'code':'AA','name':'Al\'Aqabah'},
    '4' : {'code':'AB','name':'Al Balqa\''},
    '5' : {'code':'AK','name':'Al Karak'},
    '6' : {'code':'AL','name':'Al Mafraq'},
    '7' : {'code':'AT','name':'At Tafilah'},
    '8' : {'code':'AZ','name':'Az Zarqa\''},
    '9' : {'code':'IR','name':'Irbid'},
    '10' : {'code':'JA','name':'Jarash'},
    '11' : {'code':'MA','name':'Ma\'an'},
    '12' : {'code':'MD','name':'Madaba'}
  },
  'KZ':{
    '1' : {'code':'AL','name':'Almaty'},
    '2' : {'code':'AC','name':'Almaty City'},
    '3' : {'code':'AM','name':'Aqmola'},
    '4' : {'code':'AQ','name':'Aqtobe'},
    '5' : {'code':'AS','name':'Astana City'},
    '6' : {'code':'AT','name':'Atyrau'},
    '7' : {'code':'BA','name':'Batys Qazaqstan'},
    '8' : {'code':'BY','name':'Bayqongyr City'},
    '9' : {'code':'MA','name':'Mangghystau'},
    '10' : {'code':'ON','name':'Ongtustik Qazaqstan'},
    '11' : {'code':'PA','name':'Pavlodar'},
    '12' : {'code':'QA','name':'Qaraghandy'},
    '13' : {'code':'QO','name':'Qostanay'},
    '14' : {'code':'QY','name':'Qyzylorda'},
    '15' : {'code':'SH','name':'Shyghys Qazaqstan'},
    '16' : {'code':'SO','name':'Soltustik Qazaqstan'},
    '17' : {'code':'ZH','name':'Zhambyl'}
  },
  'KE':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'CO','name':'Coast'},
    '3' : {'code':'EA','name':'Eastern'},
    '4' : {'code':'NA','name':'Nairobi Area'},
    '5' : {'code':'NE','name':'North Eastern'},
    '6' : {'code':'NY','name':'Nyanza'},
    '7' : {'code':'RV','name':'Rift Valley'},
    '8' : {'code':'WE','name':'Western'}
  },
  'KI':{
    '1' : {'code':'AG','name':'Abaiang'},
    '2' : {'code':'AM','name':'Abemama'},
    '3' : {'code':'AK','name':'Aranuka'},
    '4' : {'code':'AO','name':'Arorae'},
    '5' : {'code':'BA','name':'Banaba'},
    '6' : {'code':'BE','name':'Beru'},
    '7' : {'code':'bT','name':'Butaritari'},
    '8' : {'code':'KA','name':'Kanton'},
    '9' : {'code':'KR','name':'Kiritimati'},
    '10' : {'code':'KU','name':'Kuria'},
    '11' : {'code':'MI','name':'Maiana'},
    '12' : {'code':'MN','name':'Makin'},
    '13' : {'code':'ME','name':'Marakei'},
    '14' : {'code':'NI','name':'Nikunau'},
    '15' : {'code':'NO','name':'Nonouti'},
    '16' : {'code':'ON','name':'Onotoa'},
    '17' : {'code':'TT','name':'Tabiteuea'},
    '18' : {'code':'TR','name':'Tabuaeran'},
    '19' : {'code':'TM','name':'Tamana'},
    '20' : {'code':'TW','name':'Tarawa'},
    '21' : {'code':'TE','name':'Teraina'}
  },
  'KP':{
    '1' : {'code':'CHA','name':'Chagang-do'},
    '2' : {'code':'HAB','name':'Hamgyong-bukto'},
    '3' : {'code':'HAN','name':'Hamgyong-namdo'},
    '4' : {'code':'HWB','name':'Hwanghae-bukto'},
    '5' : {'code':'HWN','name':'Hwanghae-namdo'},
    '6' : {'code':'KAN','name':'Kangwon-do'},
    '7' : {'code':'PYB','name':'P\'yongan-bukto'},
    '8' : {'code':'PYN','name':'P\'yongan-namdo'},
    '9' : {'code':'YAN','name':'Ryanggang-do (Yanggang-do)'},
    '10' : {'code':'NAJ','name':'Rason Directly Governed City'},
    '11' : {'code':'PYO','name':'P\'yongyang Special City'}
  },
  'KR':{
    '1' : {'code':'CO','name':'Ch\'ungch\'ong-bukto'},
    '2' : {'code':'CH','name':'Ch\'ungch\'ong-namdo'},
    '3' : {'code':'CD','name':'Cheju-do'},
    '4' : {'code':'CB','name':'Cholla-bukto'},
    '5' : {'code':'CN','name':'Cholla-namdo'},
    '6' : {'code':'IG','name':'Inch\'on-gwangyoksi'},
    '7' : {'code':'KA','name':'Kangwon-do'},
    '8' : {'code':'KG','name':'Kwangju-gwangyoksi'},
    '9' : {'code':'KD','name':'Kyonggi-do'},
    '10' : {'code':'KB','name':'Kyongsang-bukto'},
    '11' : {'code':'KN','name':'Kyongsang-namdo'},
    '12' : {'code':'PG','name':'Pusan-gwangyoksi'},
    '13' : {'code':'SO','name':'Soul-t\'ukpyolsi'},
    '14' : {'code':'TA','name':'Taegu-gwangyoksi'},
    '15' : {'code':'TG','name':'Taejon-gwangyoksi'}
  },
  'KW':{
    '1' : {'code':'AL','name':'Al\'Asimah'},
    '2' : {'code':'AA','name':'Al Ahmadi'},
    '3' : {'code':'AF','name':'Al Farwaniyah'},
    '4' : {'code':'AJ','name':'Al Jahra\''},
    '5' : {'code':'HA','name':'Hawalli'}
  },
  'KG':{
    '1' : {'code':'GB','name':'Bishkek'},
    '2' : {'code':'B','name':'Batken'},
    '3' : {'code':'C','name':'Chu'},
    '4' : {'code':'J','name':'Jalal-Abad'},
    '5' : {'code':'N','name':'Naryn'},
    '6' : {'code':'O','name':'Osh'},
    '7' : {'code':'T','name':'Talas'},
    '8' : {'code':'Y','name':'Ysyk-Kol'}
  },
  'LA':{
    '1' : {'code':'VT','name':'Vientiane'},
    '2' : {'code':'AT','name':'Attapu'},
    '3' : {'code':'BK','name':'Bokeo'},
    '4' : {'code':'BL','name':'Bolikhamxai'},
    '5' : {'code':'CH','name':'Champasak'},
    '6' : {'code':'HO','name':'Houaphan'},
    '7' : {'code':'KH','name':'Khammouan'},
    '8' : {'code':'LM','name':'Louang Namtha'},
    '9' : {'code':'LP','name':'Louangphabang'},
    '10' : {'code':'OU','name':'Oudomxai'},
    '11' : {'code':'PH','name':'Phongsali'},
    '12' : {'code':'SL','name':'Salavan'},
    '13' : {'code':'SV','name':'Savannakhet'},
    '14' : {'code':'VI','name':'Vientiane'},
    '15' : {'code':'XA','name':'Xaignabouli'},
    '16' : {'code':'XE','name':'Xekong'},
    '17' : {'code':'XI','name':'Xiangkhoang'},
    '18' : {'code':'XN','name':'Xaisomboun'}
  },
  'LV':{
    '1' : {'code':'AIZ','name':'Aizkraukles Rajons'},
    '2' : {'code':'ALU','name':'Aluksnes Rajons'},
    '3' : {'code':'BAL','name':'Balvu Rajons'},
    '4' : {'code':'BAU','name':'Bauskas Rajons'},
    '5' : {'code':'CES','name':'Cesu Rajons'},
    '6' : {'code':'DGR','name':'Daugavpils Rajons'},
    '7' : {'code':'DOB','name':'Dobeles Rajons'},
    '8' : {'code':'GUL','name':'Gulbenes Rajons'},
    '9' : {'code':'JEK','name':'Jekabpils Rajons'},
    '10' : {'code':'JGR','name':'Jelgavas Rajons'},
    '11' : {'code':'KRA','name':'Kraslavas Rajons'},
    '12' : {'code':'KUL','name':'Kuldigas Rajons'},
    '13' : {'code':'LPR','name':'Liepajas Rajons'},
    '14' : {'code':'LIM','name':'Limbazu Rajons'},
    '15' : {'code':'LUD','name':'Ludzas Rajons'},
    '16' : {'code':'MAD','name':'Madonas Rajons'},
    '17' : {'code':'OGR','name':'Ogres Rajons'},
    '18' : {'code':'PRE','name':'Preilu Rajons'},
    '19' : {'code':'RZR','name':'Rezeknes Rajons'},
    '20' : {'code':'RGR','name':'Rigas Rajons'},
    '21' : {'code':'SAL','name':'Saldus Rajons'},
    '22' : {'code':'TAL','name':'Talsu Rajons'},
    '23' : {'code':'TUK','name':'Tukuma Rajons'},
    '24' : {'code':'VLK','name':'Valkas Rajons'},
    '25' : {'code':'VLM','name':'Valmieras Rajons'},
    '26' : {'code':'VSR','name':'Ventspils Rajons'},
    '27' : {'code':'DGV','name':'Daugavpils'},
    '28' : {'code':'JGV','name':'Jelgava'},
    '29' : {'code':'JUR','name':'Jurmala'},
    '30' : {'code':'LPK','name':'Liepaja'},
    '31' : {'code':'RZK','name':'Rezekne'},
    '32' : {'code':'RGA','name':'Riga'},
    '33' : {'code':'VSL','name':'Ventspils'}
  },
  'LB':{
    '1' : {'code':'BIN','name':'Bint Jbeil'},
    '2' : {'code':'HAS','name':'Hasbaya'},
    '3' : {'code':'MAR','name':'Marjeyoun'},
    '4' : {'code':'NAB','name':'Nabatieh'},
    '5' : {'code':'BAA','name':'Baalbek'},
    '6' : {'code':'HER','name':'Hermel'},
    '7' : {'code':'RAS','name':'Rashaya'},
    '8' : {'code':'WES','name':'Western Beqaa'},
    '9' : {'code':'ZAH','name':'Zahle'},
    '10' : {'code':'AKK','name':'Akkar'},
    '11' : {'code':'BAT','name':'Batroun'},
    '12' : {'code':'BSH','name':'Bsharri'},
    '13' : {'code':'KOU','name':'Koura'},
    '14' : {'code':'MIN','name':'Miniyeh-Danniyeh'},
    '15' : {'code':'TRI','name':'Tripoli'},
    '16' : {'code':'ZGH','name':'Zgharta'},
    '17' : {'code':'ALE','name':'Aley'},
    '18' : {'code':'BAA','name':'Baabda'},
    '19' : {'code':'BYB','name':'Byblos'},
    '20' : {'code':'CHO','name':'Chouf'},
    '21' : {'code':'KES','name':'Kesrwan'},
    '22' : {'code':'MAT','name':'Matn'},
    '23' : {'code':'JEZ','name':'Jezzine'},
    '24' : {'code':'SID','name':'Sidon'},
    '25' : {'code':'TYR','name':'Tyre'}
  },
  'LS':{
    '1' : {'code':'BE','name':'Berea'},
    '2' : {'code':'BB','name':'Butha-Buthe'},
    '3' : {'code':'LE','name':'Leribe'},
    '4' : {'code':'MF','name':'Mafeteng'},
    '5' : {'code':'MS','name':'Maseru'},
    '6' : {'code':'MH','name':'Mohale\'s Hoek'},
    '7' : {'code':'MK','name':'Mokhotlong'},
    '8' : {'code':'QN','name':'Qacha\'s Nek'},
    '9' : {'code':'QT','name':'Quthing'},
    '10' : {'code':'TT','name':'Thaba-Tseka'}
  },
  'LR':{
    '1' : {'code':'BI','name':'Bomi'},
    '2' : {'code':'BG','name':'Bong'},
    '3' : {'code':'GB','name':'Grand Bassa'},
    '4' : {'code':'CM','name':'Grand Cape Mount'},
    '5' : {'code':'GG','name':'Grand Gedeh'},
    '6' : {'code':'GK','name':'Grand Kru'},
    '7' : {'code':'LO','name':'Lofa'},
    '8' : {'code':'MG','name':'Margibi'},
    '9' : {'code':'ML','name':'Maryland'},
    '10' : {'code':'MS','name':'Montserrado'},
    '11' : {'code':'NB','name':'Nimba'},
    '12' : {'code':'RC','name':'River Cess'},
    '13' : {'code':'SN','name':'Sinoe'}
  },
  'LY':{
    '1' : {'code':'AJ','name':'Ajdabiya'},
    '2' : {'code':'AZ','name':'Al \'Aziziyah'},
    '3' : {'code':'FA','name':'Al Fatih'},
    '4' : {'code':'JA','name':'Al Jabal al Akhdar'},
    '5' : {'code':'JU','name':'Al Jufrah'},
    '6' : {'code':'KH','name':'Al Khums'},
    '7' : {'code':'KU','name':'Al Kufrah'},
    '8' : {'code':'NK','name':'An Nuqat al Khams'},
    '9' : {'code':'AS','name':'Ash Shati\''},
    '10' : {'code':'AW','name':'Awbari'},
    '11' : {'code':'ZA','name':'Az Zawiyah'},
    '12' : {'code':'BA','name':'Banghazi'},
    '13' : {'code':'DA','name':'Darnah'},
    '14' : {'code':'GD','name':'Ghadamis'},
    '15' : {'code':'GY','name':'Gharyan'},
    '16' : {'code':'MI','name':'Misratah'},
    '17' : {'code':'MZ','name':'Murzuq'},
    '18' : {'code':'SB','name':'Sabha'},
    '19' : {'code':'SW','name':'Sawfajjin'},
    '20' : {'code':'SU','name':'Surt'},
    '21' : {'code':'TL','name':'Tarabulus (Tripoli)'},
    '22' : {'code':'TH','name':'Tarhunah'},
    '23' : {'code':'TU','name':'Tubruq'},
    '24' : {'code':'YA','name':'Yafran'},
    '25' : {'code':'ZL','name':'Zlitan'}
  },
  'LI':{
    '1' : {'code':'V','name':'Vaduz'},
    '2' : {'code':'A','name':'Schaan'},
    '3' : {'code':'B','name':'Balzers'},
    '4' : {'code':'N','name':'Triesen'},
    '5' : {'code':'E','name':'Eschen'},
    '6' : {'code':'M','name':'Mauren'},
    '7' : {'code':'T','name':'Triesenberg'},
    '8' : {'code':'R','name':'Ruggell'},
    '9' : {'code':'G','name':'Gamprin'},
    '10' : {'code':'L','name':'Schellenberg'},
    '11' : {'code':'P','name':'Planken'}
  },
  'LT':{
    '1' : {'code':'AL','name':'Alytus'},
    '2' : {'code':'KA','name':'Kaunas'},
    '3' : {'code':'KL','name':'Klaipeda'},
    '4' : {'code':'MA','name':'Marijampole'},
    '5' : {'code':'PA','name':'Panevezys'},
    '6' : {'code':'SI','name':'Siauliai'},
    '7' : {'code':'TA','name':'Taurage'},
    '8' : {'code':'TE','name':'Telsiai'},
    '9' : {'code':'UT','name':'Utena'},
    '10' : {'code':'VI','name':'Vilnius'}
  },
  'LU':{
    '1' : {'code':'DD','name':'Diekirch'},
    '2' : {'code':'DC','name':'Clervaux'},
    '3' : {'code':'DR','name':'Redange'},
    '4' : {'code':'DV','name':'Vianden'},
    '5' : {'code':'DW','name':'Wiltz'},
    '6' : {'code':'GG','name':'Grevenmacher'},
    '7' : {'code':'GE','name':'Echternach'},
    '8' : {'code':'GR','name':'Remich'},
    '9' : {'code':'LL','name':'Luxembourg'},
    '10' : {'code':'LC','name':'Capellen'},
    '11' : {'code':'LE','name':'Esch-sur-Alzette'},
    '12' : {'code':'LM','name':'Mersch'}
  },
  'MO':{
    '1' : {'code':'OLF','name':'Our Lady Fatima Parish'},
    '2' : {'code':'ANT','name':'St. Anthony Parish'},
    '3' : {'code':'LAZ','name':'St. Lazarus Parish'},
    '4' : {'code':'CAT','name':'Cathedral Parish'},
    '5' : {'code':'LAW','name':'St. Lawrence Parish'}
  },
  'MK':{
    '1' : {'code':'AER','name':'Aerodrom'},
    '2' : {'code':'ARA','name':'Aračinovo'},
    '3' : {'code':'BER','name':'Berovo'},
    '4' : {'code':'BIT','name':'Bitola'},
    '5' : {'code':'BOG','name':'Bogdanci'},
    '6' : {'code':'BOG','name':'Bogovinje'},
    '7' : {'code':'BOS','name':'Bosilovo'},
    '8' : {'code':'BRV','name':'Brvenica'},
    '9' : {'code':'BUT','name':'Butel'},
    '10' : {'code':'ČAI','name':'Čair'},
    '11' : {'code':'ČAš','name':'Čaška'},
    '12' : {'code':'CEN','name':'Centar'},
    '13' : {'code':'CEN','name':'Centar Župa'},
    '14' : {'code':'Češ','name':'Češinovo-Obleš'},
    '15' : {'code':'ČUČ','name':'Čučer-Sandevo'},
    '16' : {'code':'DEB','name':'Debar'},
    '17' : {'code':'DEB','name':'Debarca'},
    '18' : {'code':'DEL','name':'Delčevo'},
    '19' : {'code':'DEM','name':'Demir Hisar'},
    '20' : {'code':'DEM','name':'Demir Kapija'},
    '21' : {'code':'DOL','name':'Dolneni'},
    '22' : {'code':'DRU','name':'Drugovo'},
    '23' : {'code':'GAZ','name':'Gazi Baba'},
    '24' : {'code':'GEV','name':'Gevgelija'},
    '25' : {'code':'GJO','name':'Gjorče Petrov'},
    '26' : {'code':'GOS','name':'Gostivar'},
    '27' : {'code':'GRA','name':'Gradsko'},
    '28' : {'code':'ILI','name':'Ilinden'},
    '29' : {'code':'JEG','name':'Jegunovce'},
    '30' : {'code':'KAR','name':'Karbinci'},
    '31' : {'code':'KAR','name':'Karpoš'},
    '32' : {'code':'KAV','name':'Kavadarci'},
    '33' : {'code':'KIČ','name':'Kičevo'},
    '34' : {'code':'KIS','name':'Kisela Voda'},
    '35' : {'code':'KOč','name':'Kočani'},
    '36' : {'code':'KON','name':'Konče'},
    '37' : {'code':'KRA','name':'Kratovo'},
    '38' : {'code':'KRI','name':'Kriva Palanka'},
    '39' : {'code':'KRI','name':'Krivogaštani'},
    '40' : {'code':'KRU','name':'Kruševo'},
    '41' : {'code':'KUM','name':'Kumanovo'},
    '42' : {'code':'LIP','name':'Lipkovo'},
    '43' : {'code':'LOZ','name':'Lozovo'},
    '44' : {'code':'MAK','name':'Makedonska Kamenica'},
    '45' : {'code':'MAK','name':'Makedonski Brod'},
    '46' : {'code':'MAV','name':'Mavrovo and Rostuša'},
    '47' : {'code':'MOG','name':'Mogila'},
    '48' : {'code':'NEG','name':'Negotino'},
    '49' : {'code':'NOV','name':'Novaci'},
    '50' : {'code':'NOV','name':'Novo Selo'},
    '51' : {'code':'OHR','name':'Ohrid'},
    '52' : {'code':'OSL','name':'Oslomej'},
    '53' : {'code':'PEH','name':'Pehčevo'},
    '54' : {'code':'PET','name':'Petrovec'},
    '55' : {'code':'PLA','name':'Plasnica'},
    '56' : {'code':'PRI','name':'Prilep'},
    '57' : {'code':'PRO','name':'Probištip'},
    '58' : {'code':'RAD','name':'Radoviš'},
    '59' : {'code':'RAN','name':'Rankovce'},
    '60' : {'code':'RES','name':'Resen'},
    '61' : {'code':'ROS','name':'Rosoman'},
    '62' : {'code':'SAR','name':'Saraj'},
    '63' : {'code':'SOP','name':'Sopište'},
    '64' : {'code':'STA','name':'Star Dojran'},
    '65' : {'code':'STA','name':'Staro Nagoričane'},
    '66' : {'code':'ŠTI','name':'Štip'},
    '67' : {'code':'STR','name':'Struga'},
    '68' : {'code':'STR','name':'Strumica'},
    '69' : {'code':'STU','name':'Studeničani'},
    '70' : {'code':'ŠUT','name':'Šuto Orizari'},
    '71' : {'code':'SVE','name':'Sveti Nikole'},
    '72' : {'code':'TEA','name':'Tearce'},
    '73' : {'code':'TET','name':'Tetovo'},
    '74' : {'code':'VAL','name':'Valandovo'},
    '75' : {'code':'VAS','name':'Vasilevo'},
    '76' : {'code':'VEL','name':'Veles'},
    '77' : {'code':'VEV','name':'Vevčani'},
    '78' : {'code':'VIN','name':'Vinica'},
    '79' : {'code':'VRA','name':'Vraneštica'},
    '80' : {'code':'VRA','name':'Vrapčište'},
    '81' : {'code':'ZAJ','name':'Zajas'},
    '82' : {'code':'ZEL','name':'Zelenikovo'},
    '83' : {'code':'ŽEL','name':'Želino'},
    '84' : {'code':'ZRN','name':'Zrnovci'}
  },
  'MG':{
    '1' : {'code':'AN','name':'Antananarivo'},
    '2' : {'code':'AS','name':'Antsiranana'},
    '3' : {'code':'FN','name':'Fianarantsoa'},
    '4' : {'code':'MJ','name':'Mahajanga'},
    '5' : {'code':'TM','name':'Toamasina'},
    '6' : {'code':'TL','name':'Toliara'}
  },
  'MW':{
    '1' : {'code':'BLK','name':'Balaka'},
    '2' : {'code':'BLT','name':'Blantyre'},
    '3' : {'code':'CKW','name':'Chikwawa'},
    '4' : {'code':'CRD','name':'Chiradzulu'},
    '5' : {'code':'CTP','name':'Chitipa'},
    '6' : {'code':'DDZ','name':'Dedza'},
    '7' : {'code':'DWA','name':'Dowa'},
    '8' : {'code':'KRG','name':'Karonga'},
    '9' : {'code':'KSG','name':'Kasungu'},
    '10' : {'code':'LKM','name':'Likoma'},
    '11' : {'code':'LLG','name':'Lilongwe'},
    '12' : {'code':'MCG','name':'Machinga'},
    '13' : {'code':'MGC','name':'Mangochi'},
    '14' : {'code':'MCH','name':'Mchinji'},
    '15' : {'code':'MLJ','name':'Mulanje'},
    '16' : {'code':'MWZ','name':'Mwanza'},
    '17' : {'code':'MZM','name':'Mzimba'},
    '18' : {'code':'NTU','name':'Ntcheu'},
    '19' : {'code':'NKB','name':'Nkhata Bay'},
    '20' : {'code':'NKH','name':'Nkhotakota'},
    '21' : {'code':'NSJ','name':'Nsanje'},
    '22' : {'code':'NTI','name':'Ntchisi'},
    '23' : {'code':'PHL','name':'Phalombe'},
    '24' : {'code':'RMP','name':'Rumphi'},
    '25' : {'code':'SLM','name':'Salima'},
    '26' : {'code':'THY','name':'Thyolo'},
    '27' : {'code':'ZBA','name':'Zomba'}
  },
  'MY':{
    '1' : {'code':'Johor','name':'Johor'},
    '2' : {'code':'Kedah','name':'Kedah'},
    '3' : {'code':'Kelantan','name':'Kelantan'},
    '4' : {'code':'Labuan','name':'Labuan'},
    '5' : {'code':'Melaka','name':'Melaka'},
    '6' : {'code':'Negeri Sembilan','name':'Negeri Sembilan'},
    '7' : {'code':'Pahang','name':'Pahang'},
    '8' : {'code':'Perak','name':'Perak'},
    '9' : {'code':'Perlis','name':'Perlis'},
    '10' : {'code':'Pulau Pinang','name':'Pulau Pinang'},
    '11' : {'code':'Sabah','name':'Sabah'},
    '12' : {'code':'Sarawak','name':'Sarawak'},
    '13' : {'code':'Selangor','name':'Selangor'},
    '14' : {'code':'Terengganu','name':'Terengganu'},
    '15' : {'code':'Kuala Lumpur','name':'Kuala Lumpur'}
  },
  'MV':{
    '1' : {'code':'AAD','name':'Ari Atoll Dheknu'},
    '2' : {'code':'AAU','name':'Ari Atoll Uthuru'},
    '3' : {'code':'ADD','name':'Addu'},
    '4' : {'code':'FAA','name':'Faadhippolhu'},
    '5' : {'code':'FEA','name':'Felidhe Atoll'},
    '6' : {'code':'FMU','name':'Fua Mulaku'},
    '7' : {'code':'HAD','name':'Huvadhu Atoll Dhekunu'},
    '8' : {'code':'HAU','name':'Huvadhu Atoll Uthuru'},
    '9' : {'code':'HDH','name':'Hadhdhunmathi'},
    '10' : {'code':'KLH','name':'Kolhumadulu'},
    '11' : {'code':'MAA','name':'Male Atoll'},
    '12' : {'code':'MAD','name':'Maalhosmadulu Dhekunu'},
    '13' : {'code':'MAU','name':'Maalhosmadulu Uthuru'},
    '14' : {'code':'MLD','name':'Miladhunmadulu Dhekunu'},
    '15' : {'code':'MLU','name':'Miladhunmadulu Uthuru'},
    '16' : {'code':'MUA','name':'Mulaku Atoll'},
    '17' : {'code':'NAD','name':'Nilandhe Atoll Dhekunu'},
    '18' : {'code':'NAU','name':'Nilandhe Atoll Uthuru'},
    '19' : {'code':'THD','name':'Thiladhunmathi Dhekunu'},
    '20' : {'code':'THU','name':'Thiladhunmathi Uthuru'}
  },
  'ML':{
    '1' : {'code':'GA','name':'Gao'},
    '2' : {'code':'KY','name':'Kayes'},
    '3' : {'code':'KD','name':'Kidal'},
    '4' : {'code':'KL','name':'Koulikoro'},
    '5' : {'code':'MP','name':'Mopti'},
    '6' : {'code':'SG','name':'Segou'},
    '7' : {'code':'SK','name':'Sikasso'},
    '8' : {'code':'TB','name':'Tombouctou'},
    '9' : {'code':'CD','name':'Bamako Capital District'}
  },
  'MT':{
    '1' : {'code':'ATT','name':'Attard'},
    '2' : {'code':'BAL','name':'Balzan'},
    '3' : {'code':'BGU','name':'Birgu'},
    '4' : {'code':'BKK','name':'Birkirkara'},
    '5' : {'code':'BRZ','name':'Birzebbuga'},
    '6' : {'code':'BOR','name':'Bormla'},
    '7' : {'code':'DIN','name':'Dingli'},
    '8' : {'code':'FGU','name':'Fgura'},
    '9' : {'code':'FLO','name':'Floriana'},
    '10' : {'code':'GDJ','name':'Gudja'},
    '11' : {'code':'GZR','name':'Gzira'},
    '12' : {'code':'GRG','name':'Gargur'},
    '13' : {'code':'GXQ','name':'Gaxaq'},
    '14' : {'code':'HMR','name':'Hamrun'},
    '15' : {'code':'IKL','name':'Iklin'},
    '16' : {'code':'ISL','name':'Isla'},
    '17' : {'code':'KLK','name':'Kalkara'},
    '18' : {'code':'KRK','name':'Kirkop'},
    '19' : {'code':'LIJ','name':'Lija'},
    '20' : {'code':'LUQ','name':'Luqa'},
    '21' : {'code':'MRS','name':'Marsa'},
    '22' : {'code':'MKL','name':'Marsaskala'},
    '23' : {'code':'MXL','name':'Marsaxlokk'},
    '24' : {'code':'MDN','name':'Mdina'},
    '25' : {'code':'MEL','name':'Melliea'},
    '26' : {'code':'MGR','name':'Mgarr'},
    '27' : {'code':'MST','name':'Mosta'},
    '28' : {'code':'MQA','name':'Mqabba'},
    '29' : {'code':'MSI','name':'Msida'},
    '30' : {'code':'MTF','name':'Mtarfa'},
    '31' : {'code':'NAX','name':'Naxxar'},
    '32' : {'code':'PAO','name':'Paola'},
    '33' : {'code':'PEM','name':'Pembroke'},
    '34' : {'code':'PIE','name':'Pieta'},
    '35' : {'code':'QOR','name':'Qormi'},
    '36' : {'code':'QRE','name':'Qrendi'},
    '37' : {'code':'RAB','name':'Rabat'},
    '38' : {'code':'SAF','name':'Safi'},
    '39' : {'code':'SGI','name':'San Giljan'},
    '40' : {'code':'SLU','name':'Santa Lucija'},
    '41' : {'code':'SPB','name':'San Pawl il-Bahar'},
    '42' : {'code':'SGW','name':'San Gwann'},
    '43' : {'code':'SVE','name':'Santa Venera'},
    '44' : {'code':'SIG','name':'Siggiewi'},
    '45' : {'code':'SLM','name':'Sliema'},
    '46' : {'code':'SWQ','name':'Swieqi'},
    '47' : {'code':'TXB','name':'Ta Xbiex'},
    '48' : {'code':'TRX','name':'Tarxien'},
    '49' : {'code':'VLT','name':'Valletta'},
    '50' : {'code':'XGJ','name':'Xgajra'},
    '51' : {'code':'ZBR','name':'Zabbar'},
    '52' : {'code':'ZBG','name':'Zebbug'},
    '53' : {'code':'ZJT','name':'Zejtun'},
    '54' : {'code':'ZRQ','name':'Zurrieq'},
    '55' : {'code':'FNT','name':'Fontana'},
    '56' : {'code':'GHJ','name':'Ghajnsielem'},
    '57' : {'code':'GHR','name':'Gharb'},
    '58' : {'code':'GHS','name':'Ghasri'},
    '59' : {'code':'KRC','name':'Kercem'},
    '60' : {'code':'MUN','name':'Munxar'},
    '61' : {'code':'NAD','name':'Nadur'},
    '62' : {'code':'QAL','name':'Qala'},
    '63' : {'code':'VIC','name':'Victoria'},
    '64' : {'code':'SLA','name':'San Lawrenz'},
    '65' : {'code':'SNT','name':'Sannat'},
    '66' : {'code':'ZAG','name':'Xagra'},
    '67' : {'code':'XEW','name':'Xewkija'},
    '68' : {'code':'ZEB','name':'Zebbug'}
  },
  'MH':{
    '1' : {'code':'ALG','name':'Ailinginae'},
    '2' : {'code':'ALL','name':'Ailinglaplap'},
    '3' : {'code':'ALK','name':'Ailuk'},
    '4' : {'code':'ARN','name':'Arno'},
    '5' : {'code':'AUR','name':'Aur'},
    '6' : {'code':'BKR','name':'Bikar'},
    '7' : {'code':'BKN','name':'Bikini'},
    '8' : {'code':'BKK','name':'Bokak'},
    '9' : {'code':'EBN','name':'Ebon'},
    '10' : {'code':'ENT','name':'Enewetak'},
    '11' : {'code':'EKB','name':'Erikub'},
    '12' : {'code':'JBT','name':'Jabat'},
    '13' : {'code':'JLT','name':'Jaluit'},
    '14' : {'code':'JEM','name':'Jemo'},
    '15' : {'code':'KIL','name':'Kili'},
    '16' : {'code':'KWJ','name':'Kwajalein'},
    '17' : {'code':'LAE','name':'Lae'},
    '18' : {'code':'LIB','name':'Lib'},
    '19' : {'code':'LKP','name':'Likiep'},
    '20' : {'code':'MJR','name':'Majuro'},
    '21' : {'code':'MLP','name':'Maloelap'},
    '22' : {'code':'MJT','name':'Mejit'},
    '23' : {'code':'MIL','name':'Mili'},
    '24' : {'code':'NMK','name':'Namorik'},
    '25' : {'code':'NAM','name':'Namu'},
    '26' : {'code':'RGL','name':'Rongelap'},
    '27' : {'code':'RGK','name':'Rongrik'},
    '28' : {'code':'TOK','name':'Toke'},
    '29' : {'code':'UJA','name':'Ujae'},
    '30' : {'code':'UJL','name':'Ujelang'},
    '31' : {'code':'UTK','name':'Utirik'},
    '32' : {'code':'WTH','name':'Wotho'},
    '33' : {'code':'WTJ','name':'Wotje'}
  },
  'MQ':{
    '1' : {'code':'LAJ','name':'L\'Ajoupa-Bouillon'},
    '2' : {'code':'LES','name':'Les Anses-d\'Arlet'},
    '3' : {'code':'BAS','name':'Basse-Pointe'},
    '4' : {'code':'BEL','name':'Bellefontaine'},
    '5' : {'code':'LE','name':'Le Carbet'},
    '6' : {'code':'CAS','name':'Case-Pilote'},
    '7' : {'code':'LE','name':'Le Diamant'},
    '8' : {'code':'DUC','name':'Ducos'},
    '9' : {'code':'FON','name':'Fonds-Saint-Denis'},
    '10' : {'code':'FOR','name':'Fort-De-France'},
    '11' : {'code':'LE','name':'Le François'},
    '12' : {'code':'GRA','name':'Grand\'Rivière'},
    '13' : {'code':'GRO','name':'Gros-Morne'},
    '14' : {'code':'LE','name':'Le Lamentin'},
    '15' : {'code':'LE','name':'Le Lorrain'},
    '16' : {'code':'MAC','name':'Macouba'},
    '17' : {'code':'LE','name':'Le Marigot'},
    '18' : {'code':'LE','name':'Le Marin'},
    '19' : {'code':'LE','name':'Le Morne-Rouge'},
    '20' : {'code':'LE','name':'Le Morne-Vert'},
    '21' : {'code':'LE','name':'Le Prêcheur'},
    '22' : {'code':'RIV','name':'Rivière-Pilote'},
    '23' : {'code':'RIV','name':'Rivière-Salée'},
    '24' : {'code':'LE','name':'Le Robert'},
    '25' : {'code':'SAI','name':'Sainte-Anne'},
    '26' : {'code':'SAI','name':'Sainte-Luce'},
    '27' : {'code':'SAI','name':'Sainte-Marie'},
    '28' : {'code':'SAI','name':'Saint-Esprit'},
    '29' : {'code':'SAI','name':'Saint-Joseph'},
    '30' : {'code':'SAI','name':'Saint-Pierre'},
    '31' : {'code':'SCH','name':'Schœlcher'},
    '32' : {'code':'LA','name':'La Trinité'},
    '33' : {'code':'LES','name':'Les Trois-Îlets'},
    '34' : {'code':'LE','name':'Le Vauclin'}
  },
  'MR':{
    '1' : {'code':'AD','name':'Adrar'},
    '2' : {'code':'AS','name':'Assaba'},
    '3' : {'code':'BR','name':'Brakna'},
    '4' : {'code':'DN','name':'Dakhlet Nouadhibou'},
    '5' : {'code':'GO','name':'Gorgol'},
    '6' : {'code':'GM','name':'Guidimaka'},
    '7' : {'code':'HC','name':'Hodh Ech Chargui'},
    '8' : {'code':'HG','name':'Hodh El Gharbi'},
    '9' : {'code':'IN','name':'Inchiri'},
    '10' : {'code':'TA','name':'Tagant'},
    '11' : {'code':'TZ','name':'Tiris Zemmour'},
    '12' : {'code':'TR','name':'Trarza'},
    '13' : {'code':'NO','name':'Nouakchott'}
  },
  'MU':{
    '1' : {'code':'AG','name':'Agalega Islands'},
    '2' : {'code':'BL','name':'Black River'},
    '3' : {'code':'BR','name':'Beau Bassin-Rose Hill'},
    '4' : {'code':'CC','name':'Cargados Carajos Shoals (Saint B)'},
    '5' : {'code':'CU','name':'Curepipe'},
    '6' : {'code':'FL','name':'Flacq'},
    '7' : {'code':'GP','name':'Grand Port'},
    '8' : {'code':'MO','name':'Moka'},
    '9' : {'code':'PA','name':'Pamplemousses'},
    '10' : {'code':'PL','name':'Port Louis'},
    '11' : {'code':'PU','name':'Port Louis'},
    '12' : {'code':'PW','name':'Plaines Wilhems'},
    '13' : {'code':'QB','name':'Quatre Bornes'},
    '14' : {'code':'RO','name':'Rodrigues'},
    '15' : {'code':'RR','name':'Riviere du Rempart'},
    '16' : {'code':'SA','name':'Savanne'},
    '17' : {'code':'VP','name':'Vacoas-Phoenix'}
  },
  'YT':{
    '1' : {'code':'DZA','name':'Dzaoudzi'},
    '2' : {'code':'PAM','name':'Pamandzi'},
    '3' : {'code':'MAM','name':'Mamoudzou'},
    '4' : {'code':'DEM','name':'Dembeni'},
    '5' : {'code':'BAN','name':'Bandrele'},
    '6' : {'code':'KAN','name':'Kani-Kéli'},
    '7' : {'code':'BOU','name':'Bouéni'},
    '8' : {'code':'CHI','name':'Chirongui'},
    '9' : {'code':'SAD','name':'Sada'},
    '10' : {'code':'OUA','name':'Ouangani'},
    '11' : {'code':'CHI','name':'Chiconi'},
    '12' : {'code':'TSI','name':'Tsingoni'},
    '13' : {'code':'MTS','name':'M\'Tsangamouji'},
    '14' : {'code':'ACO','name':'Acoua'},
    '15' : {'code':'MTS','name':'Mtsamboro'},
    '16' : {'code':'BAN','name':'Bandraboua'},
    '17' : {'code':'KOU','name':'Koungou'}
  },
  'MX':{
    '1' : {'code':'AGU','name':'Aguascalientes'},
    '2' : {'code':'BCN','name':'Baja California Norte'},
    '3' : {'code':'BCS','name':'Baja California Sur'},
    '4' : {'code':'CAM','name':'Campeche'},
    '5' : {'code':'CHP','name':'Chiapas'},
    '6' : {'code':'CHH','name':'Chihuahua'},
    '7' : {'code':'COA','name':'Coahuila de Zaragoza'},
    '8' : {'code':'COL','name':'Colima'},
    '9' : {'code':'DIF','name':'Distrito Federal'},
    '10' : {'code':'DUR','name':'Durango'},
    '11' : {'code':'GUA','name':'Guanajuato'},
    '12' : {'code':'GRO','name':'Guerrero'},
    '13' : {'code':'HID','name':'Hidalgo'},
    '14' : {'code':'JAL','name':'Jalisco'},
    '15' : {'code':'MEX','name':'Mexico'},
    '16' : {'code':'MIC','name':'Michoacan de Ocampo'},
    '17' : {'code':'MOR','name':'Morelos'},
    '18' : {'code':'NAY','name':'Nayarit'},
    '19' : {'code':'NLE','name':'Nuevo Leon'},
    '20' : {'code':'OAX','name':'Oaxaca'},
    '21' : {'code':'PUE','name':'Puebla'},
    '22' : {'code':'QUE','name':'Queretaro de Arteaga'},
    '23' : {'code':'ROO','name':'Quintana Roo'},
    '24' : {'code':'SLP','name':'San Luis Potosi'},
    '25' : {'code':'SIN','name':'Sinaloa'},
    '26' : {'code':'SON','name':'Sonora'},
    '27' : {'code':'TAB','name':'Tabasco'},
    '28' : {'code':'TAM','name':'Tamaulipas'},
    '29' : {'code':'TLA','name':'Tlaxcala'},
    '30' : {'code':'VER','name':'Veracruz-Llave'},
    '31' : {'code':'YUC','name':'Yucatan'},
    '32' : {'code':'ZAC','name':'Zacatecas'}
  },
  'FM':{
    '1' : {'code':'C','name':'Chuuk'},
    '2' : {'code':'K','name':'Kosrae'},
    '3' : {'code':'P','name':'Pohnpei'},
    '4' : {'code':'Y','name':'Yap'}
  },
  'MD':{
    '1' : {'code':'GA','name':'Gagauzia'},
    '2' : {'code':'CU','name':'Chisinau'},
    '3' : {'code':'BA','name':'Balti'},
    '4' : {'code':'CA','name':'Cahul'},
    '5' : {'code':'ED','name':'Edinet'},
    '6' : {'code':'LA','name':'Lapusna'},
    '7' : {'code':'OR','name':'Orhei'},
    '8' : {'code':'SO','name':'Soroca'},
    '9' : {'code':'TI','name':'Tighina'},
    '10' : {'code':'UN','name':'Ungheni'},
    '11' : {'code':'SN','name':'Stânga Nistrului'}
  },
  'MC':{
    '1' : {'code':'FV','name':'Fontvieille'},
    '2' : {'code':'LC','name':'La Condamine'},
    '3' : {'code':'MV','name':'Monaco-Ville'},
    '4' : {'code':'MC','name':'Monte-Carlo'}
  },
  'MN':{
    '1' : {'code':'1','name':'Ulanbaatar'},
    '2' : {'code':'035','name':'Orhon'},
    '3' : {'code':'037','name':'Darhan uul'},
    '4' : {'code':'039','name':'Hentiy'},
    '5' : {'code':'041','name':'Hovsgol'},
    '6' : {'code':'043','name':'Hovd'},
    '7' : {'code':'046','name':'Uvs'},
    '8' : {'code':'047','name':'Tov'},
    '9' : {'code':'049','name':'Selenge'},
    '10' : {'code':'051','name':'Suhbaatar'},
    '11' : {'code':'053','name':'Omnogovi'},
    '12' : {'code':'055','name':'Ovorhangay'},
    '13' : {'code':'057','name':'Dzavhan'},
    '14' : {'code':'059','name':'DundgovL'},
    '15' : {'code':'061','name':'Dornod'},
    '16' : {'code':'063','name':'Dornogov'},
    '17' : {'code':'064','name':'Govi-Sumber'},
    '18' : {'code':'065','name':'Govi-Altay'},
    '19' : {'code':'067','name':'Bulgan'},
    '20' : {'code':'069','name':'Bayanhongor'},
    '21' : {'code':'071','name':'Bayan-Olgiy'},
    '22' : {'code':'073','name':'Arhangay'}
  },
  'MS':{
    '1' : {'code':'A','name':'Saint Anthony'},
    '2' : {'code':'G','name':'Saint Georges'},
    '3' : {'code':'P','name':'Saint Peter'}
  },
  'MA':{
    '1' : {'code':'AGD','name':'Agadir'},
    '2' : {'code':'HOC','name':'Al Hoceima'},
    '3' : {'code':'AZI','name':'Azilal'},
    '4' : {'code':'BME','name':'Beni Mellal'},
    '5' : {'code':'BSL','name':'Ben Slimane'},
    '6' : {'code':'BLM','name':'Boulemane'},
    '7' : {'code':'CBL','name':'Casablanca'},
    '8' : {'code':'CHA','name':'Chaouen'},
    '9' : {'code':'EJA','name':'El Jadida'},
    '10' : {'code':'EKS','name':'El Kelaa des Sraghna'},
    '11' : {'code':'ERA','name':'Er Rachidia'},
    '12' : {'code':'ESS','name':'Essaouira'},
    '13' : {'code':'FES','name':'Fes'},
    '14' : {'code':'FIG','name':'Figuig'},
    '15' : {'code':'GLM','name':'Guelmim'},
    '16' : {'code':'IFR','name':'Ifrane'},
    '17' : {'code':'KEN','name':'Kenitra'},
    '18' : {'code':'KHM','name':'Khemisset'},
    '19' : {'code':'KHN','name':'Khenifra'},
    '20' : {'code':'KHO','name':'Khouribga'},
    '21' : {'code':'LYN','name':'Laayoune'},
    '22' : {'code':'LAR','name':'Larache'},
    '23' : {'code':'MRK','name':'Marrakech'},
    '24' : {'code':'MKN','name':'Meknes'},
    '25' : {'code':'NAD','name':'Nador'},
    '26' : {'code':'ORZ','name':'Ouarzazate'},
    '27' : {'code':'OUJ','name':'Oujda'},
    '28' : {'code':'RSA','name':'Rabat-Sale'},
    '29' : {'code':'SAF','name':'Safi'},
    '30' : {'code':'SET','name':'Settat'},
    '31' : {'code':'SKA','name':'Sidi Kacem'},
    '32' : {'code':'TGR','name':'Tangier'},
    '33' : {'code':'TAN','name':'Tan-Tan'},
    '34' : {'code':'TAO','name':'Taounate'},
    '35' : {'code':'TRD','name':'Taroudannt'},
    '36' : {'code':'TAT','name':'Tata'},
    '37' : {'code':'TAZ','name':'Taza'},
    '38' : {'code':'TET','name':'Tetouan'},
    '39' : {'code':'TIZ','name':'Tiznit'},
    '40' : {'code':'ADK','name':'Ad Dakhla'},
    '41' : {'code':'BJD','name':'Boujdour'},
    '42' : {'code':'ESM','name':'Es Smara'}
  },
  'MZ':{
    '1' : {'code':'CD','name':'Cabo Delgado'},
    '2' : {'code':'GZ','name':'Gaza'},
    '3' : {'code':'IN','name':'Inhambane'},
    '4' : {'code':'MN','name':'Manica'},
    '5' : {'code':'MC','name':'Maputo (city)'},
    '6' : {'code':'MP','name':'Maputo'},
    '7' : {'code':'NA','name':'Nampula'},
    '8' : {'code':'NI','name':'Niassa'},
    '9' : {'code':'SO','name':'Sofala'},
    '10' : {'code':'TE','name':'Tete'},
    '11' : {'code':'ZA','name':'Zambezia'}
  },
  'MM':{
    '1' : {'code':'AY','name':'Ayeyarwady'},
    '2' : {'code':'BG','name':'Bago'},
    '3' : {'code':'MG','name':'Magway'},
    '4' : {'code':'MD','name':'Mandalay'},
    '5' : {'code':'SG','name':'Sagaing'},
    '6' : {'code':'TN','name':'Tanintharyi'},
    '7' : {'code':'YG','name':'Yangon'},
    '8' : {'code':'CH','name':'Chin State'},
    '9' : {'code':'KC','name':'Kachin State'},
    '10' : {'code':'KH','name':'Kayah State'},
    '11' : {'code':'KN','name':'Kayin State'},
    '12' : {'code':'MN','name':'Mon State'},
    '13' : {'code':'RK','name':'Rakhine State'},
    '14' : {'code':'SH','name':'Shan State'}
  },
  'NA':{
    '1' : {'code':'CA','name':'Caprivi'},
    '2' : {'code':'ER','name':'Erongo'},
    '3' : {'code':'HA','name':'Hardap'},
    '4' : {'code':'KR','name':'Karas'},
    '5' : {'code':'KV','name':'Kavango'},
    '6' : {'code':'KH','name':'Khomas'},
    '7' : {'code':'KU','name':'Kunene'},
    '8' : {'code':'OW','name':'Ohangwena'},
    '9' : {'code':'OK','name':'Omaheke'},
    '10' : {'code':'OT','name':'Omusati'},
    '11' : {'code':'ON','name':'Oshana'},
    '12' : {'code':'OO','name':'Oshikoto'},
    '13' : {'code':'OJ','name':'Otjozondjupa'}
  },
  'NR':{
    '1' : {'code':'AO','name':'Aiwo'},
    '2' : {'code':'AA','name':'Anabar'},
    '3' : {'code':'AT','name':'Anetan'},
    '4' : {'code':'AI','name':'Anibare'},
    '5' : {'code':'BA','name':'Baiti'},
    '6' : {'code':'BO','name':'Boe'},
    '7' : {'code':'BU','name':'Buada'},
    '8' : {'code':'DE','name':'Denigomodu'},
    '9' : {'code':'EW','name':'Ewa'},
    '10' : {'code':'IJ','name':'Ijuw'},
    '11' : {'code':'ME','name':'Meneng'},
    '12' : {'code':'NI','name':'Nibok'},
    '13' : {'code':'UA','name':'Uaboe'},
    '14' : {'code':'YA','name':'Yaren'}
  },
  'NP':{
    '1' : {'code':'BA','name':'Bagmati'},
    '2' : {'code':'BH','name':'Bheri'},
    '3' : {'code':'DH','name':'Dhawalagiri'},
    '4' : {'code':'GA','name':'Gandaki'},
    '5' : {'code':'JA','name':'Janakpur'},
    '6' : {'code':'KA','name':'Karnali'},
    '7' : {'code':'KO','name':'Kosi'},
    '8' : {'code':'LU','name':'Lumbini'},
    '9' : {'code':'MA','name':'Mahakali'},
    '10' : {'code':'ME','name':'Mechi'},
    '11' : {'code':'NA','name':'Narayani'},
    '12' : {'code':'RA','name':'Rapti'},
    '13' : {'code':'SA','name':'Sagarmatha'},
    '14' : {'code':'SE','name':'Seti'}
  },
  'NL':{
    '1' : {'code':'DR','name':'Drenthe'},
    '2' : {'code':'FL','name':'Flevoland'},
    '3' : {'code':'FR','name':'Friesland'},
    '4' : {'code':'GE','name':'Gelderland'},
    '5' : {'code':'GR','name':'Groningen'},
    '6' : {'code':'LI','name':'Limburg'},
    '7' : {'code':'NB','name':'Noord Brabant'},
    '8' : {'code':'NH','name':'Noord Holland'},
    '9' : {'code':'OV','name':'Overijssel'},
    '10' : {'code':'UT','name':'Utrecht'},
    '11' : {'code':'ZE','name':'Zeeland'},
    '12' : {'code':'ZH','name':'Zuid Holland'}
  },
  'AN':{
    '1' : {'code':'BON','name':'Bonaire'},
    '2' : {'code':'CUR','name':'Curaçao'},
    '3' : {'code':'SAB','name':'Saba'},
    '4' : {'code':'SEU','name':'Sint Eustatius'},
    '5' : {'code':'SMA','name':'Sint Maarten'}
  },
  'NC':{
    '1' : {'code':'L','name':'Iles Loyaute'},
    '2' : {'code':'N','name':'Nord'},
    '3' : {'code':'S','name':'Sud'}
  },
  'NZ':{
    '1' : {'code':'AUK','name':'Auckland'},
    '2' : {'code':'BOP','name':'Bay of Plenty'},
    '3' : {'code':'CAN','name':'Canterbury'},
    '4' : {'code':'COR','name':'Coromandel'},
    '5' : {'code':'GIS','name':'Gisborne'},
    '6' : {'code':'FIO','name':'Fiordland'},
    '7' : {'code':'HKB','name':'Hawke\'s Bay'},
    '8' : {'code':'MBH','name':'Marlborough'},
    '9' : {'code':'MWT','name':'Manawatu-Wanganui'},
    '10' : {'code':'MCM','name':'Mt Cook-Mackenzie'},
    '11' : {'code':'NSN','name':'Nelson'},
    '12' : {'code':'NTL','name':'Northland'},
    '13' : {'code':'OTA','name':'Otago'},
    '14' : {'code':'STL','name':'Southland'},
    '15' : {'code':'TKI','name':'Taranaki'},
    '16' : {'code':'WGN','name':'Wellington'},
    '17' : {'code':'WKO','name':'Waikato'},
    '18' : {'code':'WAI','name':'Wairprarapa'},
    '19' : {'code':'WTC','name':'West Coast'}
  },
  'NI':{
    '1' : {'code':'AN','name':'Atlantico Norte'},
    '2' : {'code':'AS','name':'Atlantico Sur'},
    '3' : {'code':'BO','name':'Boaco'},
    '4' : {'code':'CA','name':'Carazo'},
    '5' : {'code':'CI','name':'Chinandega'},
    '6' : {'code':'CO','name':'Chontales'},
    '7' : {'code':'ES','name':'Esteli'},
    '8' : {'code':'GR','name':'Granada'},
    '9' : {'code':'JI','name':'Jinotega'},
    '10' : {'code':'LE','name':'Leon'},
    '11' : {'code':'MD','name':'Madriz'},
    '12' : {'code':'MN','name':'Managua'},
    '13' : {'code':'MS','name':'Masaya'},
    '14' : {'code':'MT','name':'Matagalpa'},
    '15' : {'code':'NS','name':'Nuevo Segovia'},
    '16' : {'code':'RS','name':'Rio San Juan'},
    '17' : {'code':'RI','name':'Rivas'}
  },
  'NE':{
    '1' : {'code':'AG','name':'Agadez'},
    '2' : {'code':'DF','name':'Diffa'},
    '3' : {'code':'DS','name':'Dosso'},
    '4' : {'code':'MA','name':'Maradi'},
    '5' : {'code':'NM','name':'Niamey'},
    '6' : {'code':'TH','name':'Tahoua'},
    '7' : {'code':'TL','name':'Tillaberi'},
    '8' : {'code':'ZD','name':'Zinder'}
  },
  'NG':{
    '1' : {'code':'AB','name':'Abia'},
    '2' : {'code':'CT','name':'Abuja Federal Capital Territory'},
    '3' : {'code':'AD','name':'Adamawa'},
    '4' : {'code':'AK','name':'Akwa Ibom'},
    '5' : {'code':'AN','name':'Anambra'},
    '6' : {'code':'BC','name':'Bauchi'},
    '7' : {'code':'BY','name':'Bayelsa'},
    '8' : {'code':'BN','name':'Benue'},
    '9' : {'code':'BO','name':'Borno'},
    '10' : {'code':'CR','name':'Cross River'},
    '11' : {'code':'DE','name':'Delta'},
    '12' : {'code':'EB','name':'Ebonyi'},
    '13' : {'code':'ED','name':'Edo'},
    '14' : {'code':'EK','name':'Ekiti'},
    '15' : {'code':'EN','name':'Enugu'},
    '16' : {'code':'GO','name':'Gombe'},
    '17' : {'code':'IM','name':'Imo'},
    '18' : {'code':'JI','name':'Jigawa'},
    '19' : {'code':'KD','name':'Kaduna'},
    '20' : {'code':'KN','name':'Kano'},
    '21' : {'code':'KT','name':'Katsina'},
    '22' : {'code':'KE','name':'Kebbi'},
    '23' : {'code':'KO','name':'Kogi'},
    '24' : {'code':'KW','name':'Kwara'},
    '25' : {'code':'LA','name':'Lagos'},
    '26' : {'code':'NA','name':'Nassarawa'},
    '27' : {'code':'NI','name':'Niger'},
    '28' : {'code':'OG','name':'Ogun'},
    '29' : {'code':'ONG','name':'Ondo'},
    '30' : {'code':'OS','name':'Osun'},
    '31' : {'code':'OY','name':'Oyo'},
    '32' : {'code':'PL','name':'Plateau'},
    '33' : {'code':'RI','name':'Rivers'},
    '34' : {'code':'SO','name':'Sokoto'},
    '35' : {'code':'TA','name':'Taraba'},
    '36' : {'code':'YO','name':'Yobe'},
    '37' : {'code':'ZA','name':'Zamfara'}
  },
  'NU':{
    '1' : {'code':'MAK','name':'Makefu'},
    '2' : {'code':'TUA','name':'Tuapa'},
    '3' : {'code':'NAM','name':'Namukulu'},
    '4' : {'code':'HIK','name':'Hikutavake'},
    '5' : {'code':'TOI','name':'Toi'},
    '6' : {'code':'MUT','name':'Mutalau'},
    '7' : {'code':'LAK','name':'Lakepa'},
    '8' : {'code':'LIK','name':'Liku'},
    '9' : {'code':'HAK','name':'Hakupu'},
    '10' : {'code':'VAI','name':'Vaiea'},
    '11' : {'code':'AVA','name':'Avatele'},
    '12' : {'code':'TAM','name':'Tamakautoga'},
    '13' : {'code':'ALO','name':'Alofi South'},
    '14' : {'code':'ALO','name':'Alofi North'}
  },
  'NF':{
    '1' : {'code':'NOR','name':'Norfolk Island'}
  },
  'MP':{
    '1' : {'code':'N','name':'Northern Islands'},
    '2' : {'code':'R','name':'Rota'},
    '3' : {'code':'S','name':'Saipan'},
    '4' : {'code':'T','name':'Tinian'}
  },
  'NO':{
    '1' : {'code':'AK','name':'Akershus'},
    '2' : {'code':'AA','name':'Aust-Agder'},
    '3' : {'code':'BU','name':'Buskerud'},
    '4' : {'code':'FM','name':'Finnmark'},
    '5' : {'code':'HM','name':'Hedmark'},
    '6' : {'code':'HL','name':'Hordaland'},
    '7' : {'code':'MR','name':'Møre og Romsdal'},
    '8' : {'code':'NL','name':'Nordland'},
    '9' : {'code':'NT','name':'Nord-Trøndelag'},
    '10' : {'code':'OP','name':'Oppland'},
    '11' : {'code':'OL','name':'Oslo'},
    '12' : {'code':'RL','name':'Rogaland'},
    '13' : {'code':'SJ','name':'Sogn og Fjordane'},
    '14' : {'code':'ST','name':'Sør-Trøndelag'},
    '15' : {'code':'SV','name':'Svalbard'},
    '16' : {'code':'TM','name':'Telemark'},
    '17' : {'code':'TR','name':'Troms'},
    '18' : {'code':'VA','name':'Vest-Agder'},
    '19' : {'code':'VF','name':'Vestfold'},
    '20' : {'code':'OF','name':'Østfold'}
  },
  'OM':{
    '1' : {'code':'DA','name':'Ad Dakhiliyah'},
    '2' : {'code':'BA','name':'Al Batinah'},
    '3' : {'code':'WU','name':'Al Wusta'},
    '4' : {'code':'SH','name':'Ash Sharqiyah'},
    '5' : {'code':'ZA','name':'Az Zahirah'},
    '6' : {'code':'MA','name':'Masqat'},
    '7' : {'code':'MU','name':'Musandam'},
    '8' : {'code':'ZU','name':'Zufar'}
  },
  'PK':{
    '1' : {'code':'B','name':'Balochistan'},
    '2' : {'code':'T','name':'Federally Administered Tribal Ar'},
    '3' : {'code':'I','name':'Islamabad Capital Territory'},
    '4' : {'code':'N','name':'North-West Frontier'},
    '5' : {'code':'P','name':'Punjab'},
    '6' : {'code':'S','name':'Sindh'}
  },
  'PW':{
    '1' : {'code':'AM','name':'Aimeliik'},
    '2' : {'code':'AR','name':'Airai'},
    '3' : {'code':'AN','name':'Angaur'},
    '4' : {'code':'HA','name':'Hatohobei'},
    '5' : {'code':'KA','name':'Kayangel'},
    '6' : {'code':'KO','name':'Koror'},
    '7' : {'code':'ME','name':'Melekeok'},
    '8' : {'code':'NA','name':'Ngaraard'},
    '9' : {'code':'NG','name':'Ngarchelong'},
    '10' : {'code':'ND','name':'Ngardmau'},
    '11' : {'code':'NT','name':'Ngatpang'},
    '12' : {'code':'NC','name':'Ngchesar'},
    '13' : {'code':'NR','name':'Ngeremlengui'},
    '14' : {'code':'NW','name':'Ngiwal'},
    '15' : {'code':'PE','name':'Peleliu'},
    '16' : {'code':'SO','name':'Sonsorol'}
  },
  'PA':{
    '1' : {'code':'BT','name':'Bocas del Toro'},
    '2' : {'code':'CH','name':'Chiriqui'},
    '3' : {'code':'CC','name':'Cocle'},
    '4' : {'code':'CL','name':'Colon'},
    '5' : {'code':'DA','name':'Darien'},
    '6' : {'code':'HE','name':'Herrera'},
    '7' : {'code':'LS','name':'Los Santos'},
    '8' : {'code':'PA','name':'Panama'},
    '9' : {'code':'SB','name':'San Blas'},
    '10' : {'code':'VG','name':'Veraguas'}
  },
  'PG':{
    '1' : {'code':'BV','name':'Bougainville'},
    '2' : {'code':'CE','name':'Central'},
    '3' : {'code':'CH','name':'Chimbu'},
    '4' : {'code':'EH','name':'Eastern Highlands'},
    '5' : {'code':'EB','name':'East New Britain'},
    '6' : {'code':'ES','name':'East Sepik'},
    '7' : {'code':'EN','name':'Enga'},
    '8' : {'code':'GU','name':'Gulf'},
    '9' : {'code':'MD','name':'Madang'},
    '10' : {'code':'MN','name':'Manus'},
    '11' : {'code':'MB','name':'Milne Bay'},
    '12' : {'code':'MR','name':'Morobe'},
    '13' : {'code':'NC','name':'National Capital'},
    '14' : {'code':'NI','name':'New Ireland'},
    '15' : {'code':'NO','name':'Northern'},
    '16' : {'code':'SA','name':'Sandaun'},
    '17' : {'code':'SH','name':'Southern Highlands'},
    '18' : {'code':'WE','name':'Western'},
    '19' : {'code':'WH','name':'Western Highlands'},
    '20' : {'code':'WB','name':'West New Britain'}
  },
  'PY':{
    '1' : {'code':'AG','name':'Alto Paraguay'},
    '2' : {'code':'AN','name':'Alto Parana'},
    '3' : {'code':'AM','name':'Amambay'},
    '4' : {'code':'AS','name':'Asuncion'},
    '5' : {'code':'BO','name':'Boqueron'},
    '6' : {'code':'CG','name':'Caaguazu'},
    '7' : {'code':'CZ','name':'Caazapa'},
    '8' : {'code':'CN','name':'Canindeyu'},
    '9' : {'code':'CE','name':'Central'},
    '10' : {'code':'CC','name':'Concepcion'},
    '11' : {'code':'CD','name':'Cordillera'},
    '12' : {'code':'GU','name':'Guaira'},
    '13' : {'code':'IT','name':'Itapua'},
    '14' : {'code':'MI','name':'Misiones'},
    '15' : {'code':'NE','name':'Neembucu'},
    '16' : {'code':'PA','name':'Paraguari'},
    '17' : {'code':'PH','name':'Presidente Hayes'},
    '18' : {'code':'SP','name':'San Pedro'}
  },
  'PE':{
    '1' : {'code':'AM','name':'Amazonas'},
    '2' : {'code':'AN','name':'Ancash'},
    '3' : {'code':'AP','name':'Apurimac'},
    '4' : {'code':'AR','name':'Arequipa'},
    '5' : {'code':'AY','name':'Ayacucho'},
    '6' : {'code':'CJ','name':'Cajamarca'},
    '7' : {'code':'CL','name':'Callao'},
    '8' : {'code':'CU','name':'Cusco'},
    '9' : {'code':'HV','name':'Huancavelica'},
    '10' : {'code':'HO','name':'Huanuco'},
    '11' : {'code':'IC','name':'Ica'},
    '12' : {'code':'JU','name':'Junin'},
    '13' : {'code':'LD','name':'La Libertad'},
    '14' : {'code':'LY','name':'Lambayeque'},
    '15' : {'code':'LI','name':'Lima'},
    '16' : {'code':'LO','name':'Loreto'},
    '17' : {'code':'MD','name':'Madre de Dios'},
    '18' : {'code':'MO','name':'Moquegua'},
    '19' : {'code':'PA','name':'Pasco'},
    '20' : {'code':'PI','name':'Piura'},
    '21' : {'code':'PU','name':'Puno'},
    '22' : {'code':'SM','name':'San Martin'},
    '23' : {'code':'TA','name':'Tacna'},
    '24' : {'code':'TU','name':'Tumbes'},
    '25' : {'code':'UC','name':'Ucayali'}
  },
  'PH':{
    '1' : {'code':'ABR','name':'Abra'},
    '2' : {'code':'ANO','name':'Agusan del Norte'},
    '3' : {'code':'ASU','name':'Agusan del Sur'},
    '4' : {'code':'AKL','name':'Aklan'},
    '5' : {'code':'ALB','name':'Albay'},
    '6' : {'code':'ANT','name':'Antique'},
    '7' : {'code':'APY','name':'Apayao'},
    '8' : {'code':'AUR','name':'Aurora'},
    '9' : {'code':'BAS','name':'Basilan'},
    '10' : {'code':'BTA','name':'Bataan'},
    '11' : {'code':'BTE','name':'Batanes'},
    '12' : {'code':'BTG','name':'Batangas'},
    '13' : {'code':'BLR','name':'Biliran'},
    '14' : {'code':'BEN','name':'Benguet'},
    '15' : {'code':'BOL','name':'Bohol'},
    '16' : {'code':'BUK','name':'Bukidnon'},
    '17' : {'code':'BUL','name':'Bulacan'},
    '18' : {'code':'CAG','name':'Cagayan'},
    '19' : {'code':'CNO','name':'Camarines Norte'},
    '20' : {'code':'CSU','name':'Camarines Sur'},
    '21' : {'code':'CAM','name':'Camiguin'},
    '22' : {'code':'CAP','name':'Capiz'},
    '23' : {'code':'CAT','name':'Catanduanes'},
    '24' : {'code':'CAV','name':'Cavite'},
    '25' : {'code':'CEB','name':'Cebu'},
    '26' : {'code':'CMP','name':'Compostela'},
    '27' : {'code':'DNO','name':'Davao del Norte'},
    '28' : {'code':'DSU','name':'Davao del Sur'},
    '29' : {'code':'DOR','name':'Davao Oriental'},
    '30' : {'code':'ESA','name':'Eastern Samar'},
    '31' : {'code':'GUI','name':'Guimaras'},
    '32' : {'code':'IFU','name':'Ifugao'},
    '33' : {'code':'INO','name':'Ilocos Norte'},
    '34' : {'code':'ISU','name':'Ilocos Sur'},
    '35' : {'code':'ILO','name':'Iloilo'},
    '36' : {'code':'ISA','name':'Isabela'},
    '37' : {'code':'KAL','name':'Kalinga'},
    '38' : {'code':'LAG','name':'Laguna'},
    '39' : {'code':'LNO','name':'Lanao del Norte'},
    '40' : {'code':'LSU','name':'Lanao del Sur'},
    '41' : {'code':'UNI','name':'La Union'},
    '42' : {'code':'LEY','name':'Leyte'},
    '43' : {'code':'MAG','name':'Maguindanao'},
    '44' : {'code':'MRN','name':'Marinduque'},
    '45' : {'code':'MSB','name':'Masbate'},
    '46' : {'code':'MIC','name':'Mindoro Occidental'},
    '47' : {'code':'MIR','name':'Mindoro Oriental'},
    '48' : {'code':'MSC','name':'Misamis Occidental'},
    '49' : {'code':'MOR','name':'Misamis Oriental'},
    '50' : {'code':'MOP','name':'Mountain'},
    '51' : {'code':'NOC','name':'Negros Occidental'},
    '52' : {'code':'NOR','name':'Negros Oriental'},
    '53' : {'code':'NCT','name':'North Cotabato'},
    '54' : {'code':'NSM','name':'Northern Samar'},
    '55' : {'code':'NEC','name':'Nueva Ecija'},
    '56' : {'code':'NVZ','name':'Nueva Vizcaya'},
    '57' : {'code':'PLW','name':'Palawan'},
    '58' : {'code':'PMP','name':'Pampanga'},
    '59' : {'code':'PNG','name':'Pangasinan'},
    '60' : {'code':'QZN','name':'Quezon'},
    '61' : {'code':'QRN','name':'Quirino'},
    '62' : {'code':'RIZ','name':'Rizal'},
    '63' : {'code':'ROM','name':'Romblon'},
    '64' : {'code':'SMR','name':'Samar'},
    '65' : {'code':'SRG','name':'Sarangani'},
    '66' : {'code':'SQJ','name':'Siquijor'},
    '67' : {'code':'SRS','name':'Sorsogon'},
    '68' : {'code':'SCO','name':'South Cotabato'},
    '69' : {'code':'SLE','name':'Southern Leyte'},
    '70' : {'code':'SKU','name':'Sultan Kudarat'},
    '71' : {'code':'SLU','name':'Sulu'},
    '72' : {'code':'SNO','name':'Surigao del Norte'},
    '73' : {'code':'SSU','name':'Surigao del Sur'},
    '74' : {'code':'TAR','name':'Tarlac'},
    '75' : {'code':'TAW','name':'Tawi-Tawi'},
    '76' : {'code':'ZBL','name':'Zambales'},
    '77' : {'code':'ZNO','name':'Zamboanga del Norte'},
    '78' : {'code':'ZSU','name':'Zamboanga del Sur'},
    '79' : {'code':'ZSI','name':'Zamboanga Sibugay'}
  },
  'PN':{
    '1' : {'code':'PIT','name':'Pitcairn Island'}
  },
  'PL':{
    '1': {'code':'DO','name':'Dolnośląskie'},
    '2' : {'code':'KP','name':'Kujawsko-Pomorskie'},
    '3': {'code':'LL','name':'Lubelskie'},
    '4': {'code':'LU','name':'Lubuskie'},
    '5': {'code':'LO','name':'Łódzkie'},
    '6': {'code':'ML','name':'Małopolskie'},
    '7' : {'code':'MZ','name':'Mazowieckie'},
    '8' : {'code':'OP','name':'Opolskie'},
    '9' : {'code':'PP','name':'Podkarpackie'},
    '10' : {'code':'PL','name':'Podlaskie'},
    '11' : {'code':'PM','name':'Pomorskie'},
    '12': {'code':'SL','name':'Śląskie'},
    '13': {'code':'SW','name':'Świętokrzyskie'},
    '14': {'code':'WM','name':'Warmińsko-Mazurskie'},
    '15' : {'code':'WP','name':'Wielkopolskie'},
    '16' : {'code':'ZA','name':'Zachodniopomorskie'}
  },
  'PT':{
    '1' : {'code':'AC','name':'Açores'},
    '2' : {'code':'AV','name':'Aveiro'},
    '3' : {'code':'BE','name':'Beja'},
    '4' : {'code':'BR','name':'Braga'},
    '5' : {'code':'BA','name':'Bragança'},
    '6' : {'code':'CB','name':'Castelo Branco'},
    '7' : {'code':'CO','name':'Coimbra'},
    '8' : {'code':'EV','name':'évora'},
    '9' : {'code':'FA','name':'Faro'},
    '10' : {'code':'GU','name':'Guarda'},
    '12' : {'code':'LE','name':'Leiria'},
    '13' : {'code':'LI','name':'Lisboa'},
    '14' : {'code':'ME','name':'Madeira'},
    '15' : {'code':'PO','name':'Portalegre'},
    '16' : {'code':'PR','name':'Porto'},
    '17' : {'code':'SA','name':'Santarém'},
    '18' : {'code':'SE','name':'SetÚbal'},
    '19' : {'code':'VC','name':'Viana do Castelo'},
    '20' : {'code':'VR','name':'Vila Real'},
    '21' : {'code':'VI','name':'Viseu'}
  },
  'PR':{
    '1' : {'code':'A-A','name':'Añasco'},
    '2' : {'code':'ADJ','name':'Adjuntas'},
    '3' : {'code':'AGU','name':'Aguada'},
    '4' : {'code':'AGU','name':'Aguadilla'},
    '5' : {'code':'AGU','name':'Aguas Buenas'},
    '6' : {'code':'AIB','name':'Aibonito'},
    '7' : {'code':'ARE','name':'Arecibo'},
    '8' : {'code':'ARR','name':'Arroyo'},
    '9' : {'code':'BAR','name':'Barceloneta'},
    '10' : {'code':'BAR','name':'Barranquitas'},
    '11' : {'code':'BAY','name':'Bayamón'},
    '12' : {'code':'CAB','name':'Cabo Rojo'},
    '13' : {'code':'CAG','name':'Caguas'},
    '14' : {'code':'CAM','name':'Camuy'},
    '15' : {'code':'CAN','name':'Canóvanas'},
    '16' : {'code':'CAR','name':'Carolina'},
    '17' : {'code':'CAT','name':'Cataño'},
    '18' : {'code':'CAY','name':'Cayey'},
    '19' : {'code':'CEI','name':'Ceiba'},
    '20' : {'code':'CIA','name':'Ciales'},
    '21' : {'code':'CID','name':'Cidra'},
    '22' : {'code':'COA','name':'Coamo'},
    '23' : {'code':'COM','name':'Comerío'},
    '24' : {'code':'COR','name':'Corozal'},
    '25' : {'code':'CUL','name':'Culebra'},
    '26' : {'code':'DOR','name':'Dorado'},
    '27' : {'code':'FAJ','name':'Fajardo'},
    '28' : {'code':'FLO','name':'Florida'},
    '29' : {'code':'GUA','name':'Guayama'},
    '30' : {'code':'GUA','name':'Guayanilla'},
    '31' : {'code':'GUA','name':'Guaynabo'},
    '32' : {'code':'GUR','name':'Gurabo'},
    '33' : {'code':'GU¡','name':'Guánica'},
    '34' : {'code':'HAT','name':'Hatillo'},
    '35' : {'code':'HOR','name':'Hormigueros'},
    '36' : {'code':'HUM','name':'Humacao'},
    '37' : {'code':'ISA','name':'Isabela'},
    '38' : {'code':'JAY','name':'Jayuya'},
    '39' : {'code':'JUA','name':'Juana Díaz'},
    '40' : {'code':'JUN','name':'Juncos'},
    '41' : {'code':'LAJ','name':'Lajas'},
    '42' : {'code':'LAR','name':'Lares'},
    '43' : {'code':'LAS','name':'Las Marías'},
    '44' : {'code':'LAS','name':'Las Piedras'},
    '45' : {'code':'LOÕ','name':'Loíza'},
    '46' : {'code':'LUQ','name':'Luquillo'},
    '47' : {'code':'MAN','name':'Manatí'},
    '48' : {'code':'MAR','name':'Maricao'},
    '49' : {'code':'MAU','name':'Maunabo'},
    '50' : {'code':'MAY','name':'Mayagüez'},
    '51' : {'code':'MOC','name':'Moca'},
    '52' : {'code':'MOR','name':'Morovis'},
    '53' : {'code':'NAG','name':'Naguabo'},
    '54' : {'code':'NAR','name':'Naranjito'},
    '55' : {'code':'ORO','name':'Orocovis'},
    '56' : {'code':'PAT','name':'Patillas'},
    '57' : {'code':'PE-','name':'Peñuelas'},
    '58' : {'code':'PON','name':'Ponce'},
    '59' : {'code':'QUE','name':'Quebradillas'},
    '60' : {'code':'RIN','name':'Rincón'},
    '61' : {'code':'RIO','name':'Rio Grande'},
    '62' : {'code':'SAB','name':'Sabana Grande'},
    '63' : {'code':'SAL','name':'Salinas'},
    '64' : {'code':'SAN','name':'San Germàn'},
    '65' : {'code':'SAN','name':'San Juan'},
    '66' : {'code':'SAN','name':'San Lorenzo'},
    '67' : {'code':'SAN','name':'San Sebastiàn'},
    '68' : {'code':'SAN','name':'Santa Isabel'},
    '69' : {'code':'TOA','name':'Toa Alta'},
    '70' : {'code':'TOA','name':'Toa Baja'},
    '71' : {'code':'TRU','name':'Trujillo Alto'},
    '72' : {'code':'UTU','name':'Utuado'},
    '73' : {'code':'VEG','name':'Vega Alta'},
    '74' : {'code':'VEG','name':'Vega Baja'},
    '75' : {'code':'VIE','name':'Vieques'},
    '76' : {'code':'VIL','name':'Villalba'},
    '77' : {'code':'YAB','name':'Yabucoa'},
    '78' : {'code':'YAU','name':'Yauco'}
  },
  'QA':{
    '1' : {'code':'DW','name':'Ad Dawhah'},
    '2' : {'code':'GW','name':'Al Ghuwayriyah'},
    '3' : {'code':'JM','name':'Al Jumayliyah'},
    '4' : {'code':'KR','name':'Al Khawr'},
    '5' : {'code':'WK','name':'Al Wakrah'},
    '6' : {'code':'RN','name':'Ar Rayyan'},
    '7' : {'code':'JB','name':'Jarayan al Batinah'},
    '8' : {'code':'MS','name':'Madinat ash Shamal'},
    '9' : {'code':'UD','name':'Umm Sa\'id'},
    '10' : {'code':'UL','name':'Umm Salal'}
  },
  'RO':{
    '1' : {'code':'AB','name':'Alba'},
    '2' : {'code':'AR','name':'Arad'},
    '3' : {'code':'AG','name':'Arges'},
    '4' : {'code':'BC','name':'Bacau'},
    '5' : {'code':'BH','name':'Bihor'},
    '6' : {'code':'BN','name':'Bistrita-Nasaud'},
    '7' : {'code':'BT','name':'Botosani'},
    '8' : {'code':'BV','name':'Brasov'},
    '9' : {'code':'BR','name':'Braila'},
    '10' : {'code':'B','name':'Bucuresti'},
    '11' : {'code':'BZ','name':'Buzau'},
    '12' : {'code':'CS','name':'Caras-Severin'},
    '13' : {'code':'CL','name':'Calarasi'},
    '14' : {'code':'CJ','name':'Cluj'},
    '15' : {'code':'CT','name':'Constanta'},
    '16' : {'code':'CV','name':'Covasna'},
    '17' : {'code':'DB','name':'Dimbovita'},
    '18' : {'code':'DJ','name':'Dolj'},
    '19' : {'code':'GL','name':'Galati'},
    '20' : {'code':'GR','name':'Giurgiu'},
    '21' : {'code':'GJ','name':'Gorj'},
    '22' : {'code':'HR','name':'Harghita'},
    '23' : {'code':'HD','name':'Hunedoara'},
    '24' : {'code':'IL','name':'Ialomita'},
    '25' : {'code':'IS','name':'Iasi'},
    '26' : {'code':'IF','name':'Ilfov'},
    '27' : {'code':'MM','name':'Maramures'},
    '28' : {'code':'MH','name':'Mehedinti'},
    '29' : {'code':'MS','name':'Mures'},
    '30' : {'code':'NT','name':'Neamt'},
    '31' : {'code':'OT','name':'Olt'},
    '32' : {'code':'PH','name':'Prahova'},
    '33' : {'code':'SM','name':'Satu-Mare'},
    '34' : {'code':'SJ','name':'Salaj'},
    '35' : {'code':'SB','name':'Sibiu'},
    '36' : {'code':'SV','name':'Suceava'},
    '37' : {'code':'TR','name':'Teleorman'},
    '38' : {'code':'TM','name':'Timis'},
    '39' : {'code':'TL','name':'Tulcea'},
    '40' : {'code':'VS','name':'Vaslui'},
    '41' : {'code':'VL','name':'Valcea'},
    '42' : {'code':'VN','name':'Vrancea'}
  },
  'RU':{
    '1' : {'code':'AB','name':'Abakan'},
    '2' : {'code':'AG','name':'Aginskoye'},
    '3' : {'code':'AN','name':'Anadyr'},
    '4' : {'code':'AR','name':'Arkahangelsk'},
    '5' : {'code':'AS','name':'Astrakhan'},
    '6' : {'code':'BA','name':'Barnaul'},
    '7' : {'code':'BE','name':'Belgorod'},
    '8' : {'code':'BI','name':'Birobidzhan'},
    '9' : {'code':'BL','name':'Blagoveshchensk'},
    '10' : {'code':'BR','name':'Bryansk'},
    '11' : {'code':'CH','name':'Cheboksary'},
    '12' : {'code':'CL','name':'Chelyabinsk'},
    '13' : {'code':'CR','name':'Cherkessk'},
    '14' : {'code':'CI','name':'Chita'},
    '15' : {'code':'DU','name':'Dudinka'},
    '16' : {'code':'EL','name':'Elista'},
    '17' : {'code':'GO','name':'Gomo-Altaysk'},
    '18' : {'code':'GA','name':'Gorno-Altaysk'},
    '19' : {'code':'GR','name':'Groznyy'},
    '20' : {'code':'IR','name':'Irkutsk'},
    '21' : {'code':'IV','name':'Ivanovo'},
    '22' : {'code':'IZ','name':'Izhevsk'},
    '23' : {'code':'KA','name':'Kalinigrad'},
    '24' : {'code':'KL','name':'Kaluga'},
    '25' : {'code':'KS','name':'Kasnodar'},
    '26' : {'code':'KZ','name':'Kazan'},
    '27' : {'code':'KE','name':'Kemerovo'},
    '28' : {'code':'KH','name':'Khabarovsk'},
    '29' : {'code':'KM','name':'Khanty-Mansiysk'},
    '30' : {'code':'KO','name':'Kostroma'},
    '31' : {'code':'KR','name':'Krasnodar'},
    '32' : {'code':'KN','name':'Krasnoyarsk'},
    '33' : {'code':'KU','name':'Kudymkar'},
    '34' : {'code':'KG','name':'Kurgan'},
    '35' : {'code':'KK','name':'Kursk'},
    '36' : {'code':'KY','name':'Kyzyl'},
    '37' : {'code':'LI','name':'Lipetsk'},
    '38' : {'code':'MA','name':'Magadan'},
    '39' : {'code':'MK','name':'Makhachkala'},
    '40' : {'code':'MY','name':'Maykop'},
    '41' : {'code':'MO','name':'Moscow'},
    '42' : {'code':'MU','name':'Murmansk'},
    '43' : {'code':'NA','name':'Nalchik'},
    '44' : {'code':'NR','name':'Naryan Mar'},
    '45' : {'code':'NZ','name':'Nazran'},
    '46' : {'code':'NI','name':'Nizhniy Novgorod'},
    '47' : {'code':'NO','name':'Novgorod'},
    '48' : {'code':'NV','name':'Novosibirsk'},
    '49' : {'code':'OM','name':'Omsk'},
    '50' : {'code':'OR','name':'Orel'},
    '51' : {'code':'OE','name':'Orenburg'},
    '52' : {'code':'PA','name':'Palana'},
    '53' : {'code':'PE','name':'Penza'},
    '54' : {'code':'PR','name':'Perm'},
    '55' : {'code':'PK','name':'Petropavlovsk-Kamchatskiy'},
    '56' : {'code':'PT','name':'Petrozavodsk'},
    '57' : {'code':'PS','name':'Pskov'},
    '58' : {'code':'RO','name':'Rostov-na-Donu'},
    '59' : {'code':'RY','name':'Ryazan'},
    '60' : {'code':'SL','name':'Salekhard'},
    '61' : {'code':'SA','name':'Samara'},
    '62' : {'code':'SR','name':'Saransk'},
    '63' : {'code':'SV','name':'Saratov'},
    '64' : {'code':'SM','name':'Smolensk'},
    '65' : {'code':'SP','name':'St. Petersburg'},
    '66' : {'code':'ST','name':'Stavropol'},
    '67' : {'code':'SY','name':'Syktyvkar'},
    '68' : {'code':'TA','name':'Tambov'},
    '69' : {'code':'TO','name':'Tomsk'},
    '70' : {'code':'TU','name':'Tula'},
    '71' : {'code':'TR','name':'Tura'},
    '72' : {'code':'TV','name':'Tver'},
    '73' : {'code':'TY','name':'Tyumen'},
    '74' : {'code':'UF','name':'Ufa'},
    '75' : {'code':'UL','name':'Ul\'yanovsk'},
    '76' : {'code':'UU','name':'Ulan-Ude'},
    '77' : {'code':'US','name':'Ust\'-Ordynskiy'},
    '78' : {'code':'VL','name':'Vladikavkaz'},
    '79' : {'code':'VA','name':'Vladimir'},
    '80' : {'code':'VV','name':'Vladivostok'},
    '81' : {'code':'VG','name':'Volgograd'},
    '82' : {'code':'VD','name':'Vologda'},
    '83' : {'code':'VO','name':'Voronezh'},
    '84' : {'code':'VY','name':'Vyatka'},
    '85' : {'code':'YA','name':'Yakutsk'},
    '86' : {'code':'YR','name':'Yaroslavl'},
    '87' : {'code':'YE','name':'Yekaterinburg'},
    '88' : {'code':'YO','name':'Yoshkar-Ola'}
  },
  'RW':{
    '1' : {'code':'BU','name':'Butare'},
    '2' : {'code':'BY','name':'Byumba'},
    '3' : {'code':'CY','name':'Cyangugu'},
    '4' : {'code':'GK','name':'Gikongoro'},
    '5' : {'code':'GS','name':'Gisenyi'},
    '6' : {'code':'GT','name':'Gitarama'},
    '7' : {'code':'KG','name':'Kibungo'},
    '8' : {'code':'KY','name':'Kibuye'},
    '9' : {'code':'KR','name':'Kigali Rurale'},
    '10' : {'code':'KV','name':'Kigali-ville'},
    '11' : {'code':'RU','name':'Ruhengeri'},
    '12' : {'code':'UM','name':'Umutara'}
  },
  'KN':{
    '1' : {'code':'CCN','name':'Christ Church Nichola Town'},
    '2' : {'code':'SAS','name':'Saint Anne Sandy Point'},
    '3' : {'code':'SGB','name':'Saint George Basseterre'},
    '4' : {'code':'SGG','name':'Saint George Gingerland'},
    '5' : {'code':'SJW','name':'Saint James Windward'},
    '6' : {'code':'SJC','name':'Saint John Capesterre'},
    '7' : {'code':'SJF','name':'Saint John Figtree'},
    '8' : {'code':'SMC','name':'Saint Mary Cayon'},
    '9' : {'code':'CAP','name':'Saint Paul Capesterre'},
    '10' : {'code':'CHA','name':'Saint Paul Charlestown'},
    '11' : {'code':'SPB','name':'Saint Peter Basseterre'},
    '12' : {'code':'STL','name':'Saint Thomas Lowland'},
    '13' : {'code':'STM','name':'Saint Thomas Middle Island'},
    '14' : {'code':'TPP','name':'Trinity Palmetto Point'}
  },
  'LC':{
    '1' : {'code':'AR','name':'Anse-la-Raye'},
    '2' : {'code':'CA','name':'Castries'},
    '3' : {'code':'CH','name':'Choiseul'},
    '4' : {'code':'DA','name':'Dauphin'},
    '5' : {'code':'DE','name':'Dennery'},
    '6' : {'code':'GI','name':'Gros-Islet'},
    '7' : {'code':'LA','name':'Laborie'},
    '8' : {'code':'MI','name':'Micoud'},
    '9' : {'code':'PR','name':'Praslin'},
    '10' : {'code':'SO','name':'Soufriere'},
    '11' : {'code':'VF','name':'Vieux-Fort'}
  },
  'VC':{
    '1' : {'code':'C','name':'Charlotte'},
    '2' : {'code':'R','name':'Grenadines'},
    '3' : {'code':'A','name':'Saint Andrew'},
    '4' : {'code':'D','name':'Saint David'},
    '5' : {'code':'G','name':'Saint George'},
    '6' : {'code':'P','name':'Saint Patrick'}
  },
  'WS':{
    '1' : {'code':'AN','name':'A\'ana'},
    '2' : {'code':'AI','name':'Aiga-i-le-Tai'},
    '3' : {'code':'AT','name':'Atua'},
    '4' : {'code':'FA','name':'Fa\'asaleleaga'},
    '5' : {'code':'GE','name':'Gaga\'emauga'},
    '6' : {'code':'GF','name':'Gagaifomauga'},
    '7' : {'code':'PA','name':'Palauli'},
    '8' : {'code':'SA','name':'Satupa\'itea'},
    '9' : {'code':'TU','name':'Tuamasaga'},
    '10' : {'code':'VF','name':'Va\'a-o-Fonoti'},
    '11' : {'code':'VS','name':'Vaisigano'}
  },
  'SM':{
    '1' : {'code':'AC','name':'Acquaviva'},
    '2' : {'code':'BM','name':'Borgo Maggiore'},
    '3' : {'code':'CH','name':'Chiesanuova'},
    '4' : {'code':'DO','name':'Domagnano'},
    '5' : {'code':'FA','name':'Faetano'},
    '6' : {'code':'FI','name':'Fiorentino'},
    '7' : {'code':'MO','name':'Montegiardino'},
    '8' : {'code':'SM','name':'Citta di San Marino'},
    '9' : {'code':'SE','name':'Serravalle'}
  },
  'ST':{
    '1' : {'code':'S','name':'Sao Tome'},
    '2' : {'code':'P','name':'Principe'}
  },
  'SA':{
    '1' : {'code':'BH','name':'Al Bahah'},
    '2' : {'code':'HS','name':'Al Hudud ash Shamaliyah'},
    '3' : {'code':'JF','name':'Al Jawf'},
    '4' : {'code':'MD','name':'Al Madinah'},
    '5' : {'code':'QS','name':'Al Qasim'},
    '6' : {'code':'RD','name':'Ar Riyad'},
    '7' : {'code':'AQ','name':'Ash Sharqiyah (Eastern)'},
    '8' : {'code':'AS','name':'\'Asir'},
    '9' : {'code':'HL','name':'Ha\'il'},
    '10' : {'code':'JZ','name':'Jizan'},
    '11' : {'code':'ML','name':'Makkah'},
    '12' : {'code':'NR','name':'Najran'},
    '13' : {'code':'TB','name':'Tabuk'}
  },
  'SN':{
    '1' : {'code':'DA','name':'Dakar'},
    '2' : {'code':'DI','name':'Diourbel'},
    '3' : {'code':'FA','name':'Fatick'},
    '4' : {'code':'KA','name':'Kaolack'},
    '5' : {'code':'KO','name':'Kolda'},
    '6' : {'code':'LO','name':'Louga'},
    '7' : {'code':'MA','name':'Matam'},
    '8' : {'code':'SL','name':'Saint-Louis'},
    '9' : {'code':'TA','name':'Tambacounda'},
    '10' : {'code':'TH','name':'Thies'},
    '11' : {'code':'ZI','name':'Ziguinchor'}
  },
  'SC':{
    '1' : {'code':'AP','name':'Anse aux Pins'},
    '2' : {'code':'AB','name':'Anse Boileau'},
    '3' : {'code':'AE','name':'Anse Etoile'},
    '4' : {'code':'AL','name':'Anse Louis'},
    '5' : {'code':'AR','name':'Anse Royale'},
    '6' : {'code':'BL','name':'Baie Lazare'},
    '7' : {'code':'BS','name':'Baie Sainte Anne'},
    '8' : {'code':'BV','name':'Beau Vallon'},
    '9' : {'code':'BA','name':'Bel Air'},
    '10' : {'code':'BO','name':'Bel Ombre'},
    '11' : {'code':'CA','name':'Cascade'},
    '12' : {'code':'GL','name':'Glacis'},
    '13' : {'code':'GM','name':'Grand\' Anse (on Mahe)'},
    '14' : {'code':'GP','name':'Grand\' Anse (on Praslin)'},
    '15' : {'code':'DG','name':'La Digue'},
    '16' : {'code':'RA','name':'La Riviere Anglaise'},
    '17' : {'code':'MB','name':'Mont Buxton'},
    '18' : {'code':'MF','name':'Mont Fleuri'},
    '19' : {'code':'PL','name':'Plaisance'},
    '20' : {'code':'PR','name':'Pointe La Rue'},
    '21' : {'code':'PG','name':'Port Glaud'},
    '22' : {'code':'SL','name':'Saint Louis'},
    '23' : {'code':'TA','name':'Takamaka'}
  },
  'SL':{
    '1' : {'code':'E','name':'Eastern'},
    '2' : {'code':'N','name':'Northern'},
    '3' : {'code':'S','name':'Southern'},
    '4' : {'code':'W','name':'Western'}
  },
  'SK':{
    '1' : {'code':'BA','name':'Banskobystricky'},
    '2' : {'code':'BR','name':'Bratislavsky'},
    '3' : {'code':'KO','name':'Kosicky'},
    '4' : {'code':'NI','name':'Nitriansky'},
    '5' : {'code':'PR','name':'Presovsky'},
    '6' : {'code':'TC','name':'Trenciansky'},
    '7' : {'code':'TV','name':'Trnavsky'},
    '8' : {'code':'ZI','name':'Zilinsky'}
  },
  'SI':{
    '1' : {'code':'4','name':'Štajerska'},
    '2' : {'code':'2A','name':'Gorenjska'},
    '3' : {'code':'5','name':'Prekmurje'},
    '4' : {'code':'3','name':'Koroška'},
    '5' : {'code':'2B','name':'Notranjska'},
    '6' : {'code':'1','name':'Primorska'},
    '7' : {'code':'2C','name':'Dolenjska'},
    '8' : {'code':'2C','name':'Bela Krajina'}
  },
  'SB':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'CH','name':'Choiseul'},
    '3' : {'code':'GC','name':'Guadalcanal'},
    '4' : {'code':'HO','name':'Honiara'},
    '5' : {'code':'IS','name':'Isabel'},
    '6' : {'code':'MK','name':'Makira'},
    '7' : {'code':'ML','name':'Malaita'},
    '8' : {'code':'RB','name':'Rennell and Bellona'},
    '9' : {'code':'TM','name':'Temotu'},
    '10' : {'code':'WE','name':'Western'}
  },
  'SO':{
    '1' : {'code':'AW','name':'Awdal'},
    '2' : {'code':'BK','name':'Bakool'},
    '3' : {'code':'BN','name':'Banaadir'},
    '4' : {'code':'BR','name':'Bari'},
    '5' : {'code':'BY','name':'Bay'},
    '6' : {'code':'GA','name':'Galguduud'},
    '7' : {'code':'GE','name':'Gedo'},
    '8' : {'code':'HI','name':'Hiiraan'},
    '9' : {'code':'JD','name':'Jubbada Dhexe'},
    '10' : {'code':'JH','name':'Jubbada Hoose'},
    '11' : {'code':'MU','name':'Mudug'},
    '12' : {'code':'NU','name':'Nugaal'},
    '13' : {'code':'SA','name':'Sanaag'},
    '14' : {'code':'SD','name':'Shabeellaha Dhexe'},
    '15' : {'code':'SH','name':'Shabeellaha Hoose'},
    '16' : {'code':'SL','name':'Sool'},
    '17' : {'code':'TO','name':'Togdheer'},
    '18' : {'code':'WG','name':'Woqooyi Galbeed'}
  },
  'ZA':{
    '1' : {'code':'EC','name':'Eastern Cape'},
    '2' : {'code':'FS','name':'Free State'},
    '3' : {'code':'GT','name':'Gauteng'},
    '4' : {'code':'KN','name':'KwaZulu-Natal'},
    '5' : {'code':'LP','name':'Limpopo'},
    '6' : {'code':'MP','name':'Mpumalanga'},
    '7' : {'code':'NW','name':'North West'},
    '8' : {'code':'NC','name':'Northern Cape'},
    '9' : {'code':'WC','name':'Western Cape'}
  },
  'ES':{
    '1' : {'code':'CA','name':'La Coruña'},
    '2' : {'code':'AL','name':'Álava'},
    '3' : {'code':'AB','name':'Albacete'},
    '4' : {'code':'AC','name':'Alicante'},
    '5' : {'code':'AM','name':'Almeria'},
    '6' : {'code':'AS','name':'Asturias'},
    '7' : {'code':'AV','name':'Ávila'},
    '8' : {'code':'BJ','name':'Badajoz'},
    '9' : {'code':'IB','name':'Baleares'},
    '10' : {'code':'BA','name':'Barcelona'},
    '11' : {'code':'BU','name':'Burgos'},
    '12' : {'code':'CC','name':'Cáceres'},
    '13' : {'code':'CZ','name':'Cádiz'},
    '14' : {'code':'CT','name':'Cantabria'},
    '15' : {'code':'CL','name':'Castellón'},
    '16' : {'code':'CE','name':'Ceuta'},
    '17' : {'code':'CR','name':'Ciudad Real'},
    '18' : {'code':'CD','name':'Córdoba'},
    '19' : {'code':'CU','name':'Cuenca'},
    '20' : {'code':'GI','name':'Gerona'},
    '21' : {'code':'GD','name':'Granada'},
    '22' : {'code':'GJ','name':'Guadalajara'},
    '23' : {'code':'GP','name':'Guipúzcoa'},
    '24' : {'code':'HL','name':'Huelva'},
    '25' : {'code':'HS','name':'Huesca'},
    '26' : {'code':'JN','name':'Jaén'},
    '27' : {'code':'RJ','name':'La Rioja'},
    '28' : {'code':'PM','name':'Las Palmas'},
    '29' : {'code':'LE','name':'León'},
    '30' : {'code':'LL','name':'Lérida'},
    '31' : {'code':'LG','name':'Lugo'},
    '32' : {'code':'MD','name':'Madrid'},
    '33' : {'code':'MA','name':'Málaga'},
    '34' : {'code':'ML','name':'Melilla'},
    '35' : {'code':'MU','name':'Murcia'},
    '36' : {'code':'NV','name':'Navarra'},
    '37' : {'code':'OU','name':'Ourense'},
    '38' : {'code':'PL','name':'Palencia'},
    '39' : {'code':'PO','name':'Pontevedra'},
    '40' : {'code':'SL','name':'Salamanca'},
    '41' : {'code':'SC','name':'Santa Cruz de Tenerife'},
    '42' : {'code':'SG','name':'Segovia'},
    '43' : {'code':'SV','name':'Sevilla'},
    '44' : {'code':'SO','name':'Soria'},
    '45' : {'code':'TA','name':'Tarragona'},
    '46' : {'code':'TE','name':'Teruel'},
    '47' : {'code':'TO','name':'Toledo'},
    '48' : {'code':'VC','name':'Valencia'},
    '49' : {'code':'VD','name':'Valladolid'},
    '50' : {'code':'VZ','name':'Vizcaya'},
    '51' : {'code':'ZM','name':'Zamora'},
    '52' : {'code':'ZR','name':'Zaragoza'}
  },
  'LK':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'EA','name':'Eastern'},
    '3' : {'code':'NC','name':'North Central'},
    '4' : {'code':'NO','name':'Northern'},
    '5' : {'code':'NW','name':'North Western'},
    '6' : {'code':'SA','name':'Sabaragamuwa'},
    '7' : {'code':'SO','name':'Southern'},
    '8' : {'code':'UV','name':'Uva'},
    '9' : {'code':'WE','name':'Western'}
  },
  'SH':{
    '1' : {'code':'A','name':'Ascension'},
    '2' : {'code':'S','name':'Saint Helena'},
    '3' : {'code':'T','name':'Tristan da Cunha'}
  },
  'PM':{
    '1' : {'code':'P','name':'Saint Pierre'},
    '2' : {'code':'M','name':'Miquelon'}
  },
  'SD':{
    '1' : {'code':'ANL','name':'A\'ali an Nil'},
    '2' : {'code':'BAM','name':'Al Bahr al Ahmar'},
    '3' : {'code':'BRT','name':'Al Buhayrat'},
    '4' : {'code':'JZR','name':'Al Jazirah'},
    '5' : {'code':'KRT','name':'Al Khartum'},
    '6' : {'code':'QDR','name':'Al Qadarif'},
    '7' : {'code':'WDH','name':'Al Wahdah'},
    '8' : {'code':'ANB','name':'An Nil al Abyad'},
    '9' : {'code':'ANZ','name':'An Nil al Azraq'},
    '10' : {'code':'ASH','name':'Ash Shamaliyah'},
    '11' : {'code':'BJA','name':'Bahr al Jabal'},
    '12' : {'code':'GIS','name':'Gharb al Istiwa\'iyah'},
    '13' : {'code':'GBG','name':'Gharb Bahr al Ghazal'},
    '14' : {'code':'GDA','name':'Gharb Darfur'},
    '15' : {'code':'GKU','name':'Gharb Kurdufan'},
    '16' : {'code':'JDA','name':'Janub Darfur'},
    '17' : {'code':'JKU','name':'Janub Kurdufan'},
    '18' : {'code':'JQL','name':'Junqali'},
    '19' : {'code':'KSL','name':'Kassala'},
    '20' : {'code':'NNL','name':'Nahr an Nil'},
    '21' : {'code':'SBG','name':'Shamal Bahr al Ghazal'},
    '22' : {'code':'SDA','name':'Shamal Darfur'},
    '23' : {'code':'SKU','name':'Shamal Kurdufan'},
    '24' : {'code':'SIS','name':'Sharq al Istiwa\'iyah'},
    '25' : {'code':'SNR','name':'Sinnar'},
    '26' : {'code':'WRB','name':'Warab'}
  },
  'SR':{
    '1' : {'code':'BR','name':'Brokopondo'},
    '2' : {'code':'CM','name':'Commewijne'},
    '3' : {'code':'CR','name':'Coronie'},
    '4' : {'code':'MA','name':'Marowijne'},
    '5' : {'code':'NI','name':'Nickerie'},
    '6' : {'code':'PA','name':'Para'},
    '7' : {'code':'PM','name':'Paramaribo'},
    '9' : {'code':'SA','name':'Saramacca'},
    '10' : {'code':'SI','name':'Sipaliwini'},
    '11' : {'code':'WA','name':'Wanica'}
  },
  'SZ':{
    '1' : {'code':'H','name':'Hhohho'},
    '2' : {'code':'L','name':'Lubombo'},
    '3' : {'code':'M','name':'Manzini'},
    '4' : {'code':'S','name':'Shishelweni'}
  },
  'SE':{
    '1' : {'code':'K','name':'Blekinge'},
    '2' : {'code':'W','name':'Dalama'},
    '3' : {'code':'I','name':'Gotland'},
    '4' : {'code':'X','name':'Gävleborg'},
    '5' : {'code':'N','name':'Halland'},
    '6' : {'code':'Z','name':'Jämtland'},
    '7' : {'code':'F','name':'Jönköping'},
    '8' : {'code':'H','name':'Kalmar'},
    '9' : {'code':'G','name':'Kronoberg'},
    '10' : {'code':'BD','name':'Norrbotten'},
    '11' : {'code':'M','name':'Skåne'},
    '12' : {'code':'AB','name':'Stockholm'},
    '13' : {'code':'D','name':'Södermanland'},
    '14' : {'code':'C','name':'Uppsala'},
    '15' : {'code':'S','name':'Värmland'},
    '16' : {'code':'AC','name':'Västerbotten'},
    '17' : {'code':'Y','name':'Västernorrland'},
    '18' : {'code':'U','name':'Västmanland'},
    '19' : {'code':'O','name':'Västra Götaland'},
    '20' : {'code':'T','name':'Örebro'},
    '21' : {'code':'E','name':'Östergötland'}
  },
  'CH':{
    '1' : {'code':'AG','name':'Aargau'},
    '2' : {'code':'AR','name':'Appenzell Ausserrhoden'},
    '3' : {'code':'AI','name':'Appenzell Innerrhoden'},
    '4' : {'code':'BS','name':'Basel-Stadt'},
    '5' : {'code':'BL','name':'Basel-Landschaft'},
    '6' : {'code':'BE','name':'Bern'},
    '7' : {'code':'FR','name':'Fribourg'},
    '8' : {'code':'GE','name':'Genève'},
    '9' : {'code':'GL','name':'Glarus'},
    '10' : {'code':'GR','name':'Graubünden'},
    '11' : {'code':'JU','name':'Jura'},
    '12' : {'code':'LU','name':'Lucerne'},
    '13' : {'code':'NE','name':'Neuchâtel'},
    '14' : {'code':'NW','name':'Nidwalden'},
    '15' : {'code':'OW','name':'Obwalden'},
    '16' : {'code':'SG','name':'St. Gallen'},
    '17' : {'code':'SH','name':'Schaffhausen'},
    '18' : {'code':'SZ','name':'Schwyz'},
    '19' : {'code':'SO','name':'Solothurn'},
    '20' : {'code':'TG','name':'Thurgau'},
    '21' : {'code':'TI','name':'Ticino'},
    '22' : {'code':'UR','name':'Uri'},
    '23' : {'code':'VS','name':'Valais'},
    '24' : {'code':'VD','name':'Vaud'},
    '25' : {'code':'ZG','name':'Zug'},
    '26' : {'code':'ZH','name':'Zürich'}
  },
  'SY':{
    '1' : {'code':'HA','name':'Al Hasakah'},
    '2' : {'code':'LA','name':'Al Ladhiqiyah'},
    '3' : {'code':'QU','name':'Al Qunaytirah'},
    '4' : {'code':'RQ','name':'Ar Raqqah'},
    '5' : {'code':'SU','name':'As Suwayda'},
    '6' : {'code':'DA','name':'Dara'},
    '7' : {'code':'DZ','name':'Dayr az Zawr'},
    '8' : {'code':'DI','name':'Dimashq'},
    '9' : {'code':'HL','name':'Halab'},
    '10' : {'code':'HM','name':'Hamah'},
    '11' : {'code':'HI','name':'Hims'},
    '12' : {'code':'ID','name':'Idlib'},
    '13' : {'code':'RD','name':'Rif Dimashq'},
    '14' : {'code':'TA','name':'Tartus'}
  },
  'TW':{
    '1' : {'code':'CH','name':'Chang-hua'},
    '2' : {'code':'CI','name':'Chia-i'},
    '3' : {'code':'HS','name':'Hsin-chu'},
    '4' : {'code':'HL','name':'Hua-lien'},
    '5' : {'code':'IL','name':'I-lan'},
    '6' : {'code':'KH','name':'Kao-hsiung county'},
    '7' : {'code':'KM','name':'Kin-men'},
    '8' : {'code':'LC','name':'Lien-chiang'},
    '9' : {'code':'ML','name':'Miao-li'},
    '10' : {'code':'NT','name':'Nan-t\'ou'},
    '11' : {'code':'PH','name':'P\'eng-hu'},
    '12' : {'code':'PT','name':'P\'ing-tung'},
    '13' : {'code':'TG','name':'T\'ai-chung'},
    '14' : {'code':'TA','name':'T\'ai-nan'},
    '15' : {'code':'TP','name':'T\'ai-pei county'},
    '16' : {'code':'TT','name':'T\'ai-tung'},
    '17' : {'code':'TY','name':'T\'ao-yuan'},
    '18' : {'code':'YL','name':'Yun-lin'},
    '19' : {'code':'CC','name':'Chia-i city'},
    '20' : {'code':'CL','name':'Chi-lung'},
    '21' : {'code':'HC','name':'Hsin-chu'},
    '22' : {'code':'TH','name':'T\'ai-chung'},
    '23' : {'code':'TN','name':'T\'ai-nan'},
    '24' : {'code':'KC','name':'Kao-hsiung city'},
    '25' : {'code':'TC','name':'T\'ai-pei city'}
  },
  'TJ':{
    '1' : {'code':'GB','name':'Gorno-Badakhstan'},
    '2' : {'code':'KT','name':'Khatlon'},
    '3' : {'code':'SU','name':'Sughd'}
  },
  'TZ':{
    '1' : {'code':'AR','name':'Arusha'},
    '2' : {'code':'DS','name':'Dar es Salaam'},
    '3' : {'code':'DO','name':'Dodoma'},
    '4' : {'code':'IR','name':'Iringa'},
    '5' : {'code':'KA','name':'Kagera'},
    '6' : {'code':'KI','name':'Kigoma'},
    '7' : {'code':'KJ','name':'Kilimanjaro'},
    '8' : {'code':'LN','name':'Lindi'},
    '9' : {'code':'MY','name':'Manyara'},
    '10' : {'code':'MR','name':'Mara'},
    '11' : {'code':'MB','name':'Mbeya'},
    '12' : {'code':'MO','name':'Morogoro'},
    '13' : {'code':'MT','name':'Mtwara'},
    '14' : {'code':'MW','name':'Mwanza'},
    '15' : {'code':'PN','name':'Pemba North'},
    '16' : {'code':'PS','name':'Pemba South'},
    '17' : {'code':'PW','name':'Pwani'},
    '18' : {'code':'RK','name':'Rukwa'},
    '19' : {'code':'RV','name':'Ruvuma'},
    '20' : {'code':'SH','name':'Shinyanga'},
    '21' : {'code':'SI','name':'Singida'},
    '22' : {'code':'TB','name':'Tabora'},
    '23' : {'code':'TN','name':'Tanga'},
    '24' : {'code':'ZC','name':'Zanzibar Central/South'},
    '25' : {'code':'ZN','name':'Zanzibar North'},
    '26' : {'code':'ZU','name':'Zanzibar Urban/West'}
  },
  'TH':{
    '1' : {'code':'Amnat Charoen','name':'Amnat Charoen'},
    '2' : {'code':'Ang Thong','name':'Ang Thong'},
    '3' : {'code':'Ayutthaya','name':'Ayutthaya'},
    '4' : {'code':'Bangkok','name':'Bangkok'},
    '5' : {'code':'Buriram','name':'Buriram'},
    '6' : {'code':'Chachoengsao','name':'Chachoengsao'},
    '7' : {'code':'Chai Nat','name':'Chai Nat'},
    '8' : {'code':'Chaiyaphum','name':'Chaiyaphum'},
    '9' : {'code':'Chanthaburi','name':'Chanthaburi'},
    '10' : {'code':'Chiang Mai','name':'Chiang Mai'},
    '11' : {'code':'Chiang Rai','name':'Chiang Rai'},
    '12' : {'code':'Chon Buri','name':'Chon Buri'},
    '13' : {'code':'Chumphon','name':'Chumphon'},
    '14' : {'code':'Kalasin','name':'Kalasin'},
    '15' : {'code':'Kamphaeng Phet','name':'Kamphaeng Phet'},
    '16' : {'code':'Kanchanaburi','name':'Kanchanaburi'},
    '17' : {'code':'Khon Kaen','name':'Khon Kaen'},
    '18' : {'code':'Krabi','name':'Krabi'},
    '19' : {'code':'Lampang','name':'Lampang'},
    '20' : {'code':'Lamphun','name':'Lamphun'},
    '21' : {'code':'Loei','name':'Loei'},
    '22' : {'code':'Lop Buri','name':'Lop Buri'},
    '23' : {'code':'Mae Hong Son','name':'Mae Hong Son'},
    '24' : {'code':'Maha Sarakham','name':'Maha Sarakham'},
    '25' : {'code':'Mukdahan','name':'Mukdahan'},
    '26' : {'code':'Nakhon Nayok','name':'Nakhon Nayok'},
    '27' : {'code':'Nakhon Pathom','name':'Nakhon Pathom'},
    '28' : {'code':'Nakhon Phanom','name':'Nakhon Phanom'},
    '29' : {'code':'Nakhon Ratchasima','name':'Nakhon Ratchasima'},
    '30' : {'code':'Nakhon Sawan','name':'Nakhon Sawan'},
    '31' : {'code':'Nakhon Si Thammarat','name':'Nakhon Si Thammarat'},
    '32' : {'code':'Nan','name':'Nan'},
    '33' : {'code':'Narathiwat','name':'Narathiwat'},
    '34' : {'code':'Nong Bua Lamphu','name':'Nong Bua Lamphu'},
    '35' : {'code':'Nong Khai','name':'Nong Khai'},
    '36' : {'code':'Nonthaburi','name':'Nonthaburi'},
    '37' : {'code':'Pathum Thani','name':'Pathum Thani'},
    '38' : {'code':'Pattani','name':'Pattani'},
    '39' : {'code':'Phangnga','name':'Phangnga'},
    '40' : {'code':'Phatthalung','name':'Phatthalung'},
    '41' : {'code':'Phayao','name':'Phayao'},
    '42' : {'code':'Phetchabun','name':'Phetchabun'},
    '43' : {'code':'Phetchaburi','name':'Phetchaburi'},
    '44' : {'code':'Phichit','name':'Phichit'},
    '45' : {'code':'Phitsanulok','name':'Phitsanulok'},
    '46' : {'code':'Phrae','name':'Phrae'},
    '47' : {'code':'Phuket','name':'Phuket'},
    '48' : {'code':'Prachin Buri','name':'Prachin Buri'},
    '49' : {'code':'Prachuap Khiri Khan','name':'Prachuap Khiri Khan'},
    '50' : {'code':'Ranong','name':'Ranong'},
    '51' : {'code':'Ratchaburi','name':'Ratchaburi'},
    '52' : {'code':'Rayong','name':'Rayong'},
    '53' : {'code':'Roi Et','name':'Roi Et'},
    '54' : {'code':'Sa Kaeo','name':'Sa Kaeo'},
    '55' : {'code':'Sakon Nakhon','name':'Sakon Nakhon'},
    '56' : {'code':'Samut Prakan','name':'Samut Prakan'},
    '57' : {'code':'Samut Sakhon','name':'Samut Sakhon'},
    '58' : {'code':'Samut Songkhram','name':'Samut Songkhram'},
    '59' : {'code':'Sara Buri','name':'Sara Buri'},
    '60' : {'code':'Satun','name':'Satun'},
    '61' : {'code':'Sing Buri','name':'Sing Buri'},
    '62' : {'code':'Sisaket','name':'Sisaket'},
    '63' : {'code':'Songkhla','name':'Songkhla'},
    '64' : {'code':'Sukhothai','name':'Sukhothai'},
    '65' : {'code':'Suphan Buri','name':'Suphan Buri'},
    '66' : {'code':'Surat Thani','name':'Surat Thani'},
    '67' : {'code':'Surin','name':'Surin'},
    '68' : {'code':'Tak','name':'Tak'},
    '69' : {'code':'Trang','name':'Trang'},
    '70' : {'code':'Trat','name':'Trat'},
    '71' : {'code':'Ubon Ratchathani','name':'Ubon Ratchathani'},
    '72' : {'code':'Udon Thani','name':'Udon Thani'},
    '73' : {'code':'Uthai Thani','name':'Uthai Thani'},
    '74' : {'code':'Uttaradit','name':'Uttaradit'},
    '75' : {'code':'Yala','name':'Yala'},
    '76' : {'code':'Yasothon','name':'Yasothon'}
  },
  'TG':{
    '1' : {'code':'K','name':'Kara'},
    '2' : {'code':'P','name':'Plateaux'},
    '3' : {'code':'S','name':'Savanes'},
    '4' : {'code':'C','name':'Centrale'},
    '5' : {'code':'M','name':'Maritime'}
  },
  'TK':{
    '1' : {'code':'A','name':'Atafu'},
    '2' : {'code':'F','name':'Fakaofo'},
    '3' : {'code':'N','name':'Nukunonu'}
  },
  'TO':{
    '1' : {'code':'H','name':'Ha\'apai'},
    '2' : {'code':'T','name':'Tongatapu'},
    '3' : {'code':'V','name':'Vava\'u'}
  },
  'TT':{
    '1' : {'code':'CT','name':'Couva/Tabaquite/Talparo'},
    '2' : {'code':'DM','name':'Diego Martin'},
    '3' : {'code':'MR','name':'Mayaro/Rio Claro'},
    '4' : {'code':'PD','name':'Penal/Debe'},
    '5' : {'code':'PT','name':'Princes Town'},
    '6' : {'code':'SG','name':'Sangre Grande'},
    '7' : {'code':'SL','name':'San Juan/Laventille'},
    '8' : {'code':'SI','name':'Siparia'},
    '9' : {'code':'TP','name':'Tunapuna/Piarco'},
    '10' : {'code':'PS','name':'Port of Spain'},
    '11' : {'code':'SF','name':'San Fernando'},
    '12' : {'code':'AR','name':'Arima'},
    '13' : {'code':'PF','name':'Point Fortin'},
    '14' : {'code':'CH','name':'Chaguanas'},
    '15' : {'code':'TO','name':'Tobago'}
  },
  'TN':{
    '1' : {'code':'AR','name':'Ariana'},
    '2' : {'code':'BJ','name':'Beja'},
    '3' : {'code':'BA','name':'Ben Arous'},
    '4' : {'code':'BI','name':'Bizerte'},
    '5' : {'code':'GB','name':'Gabes'},
    '6' : {'code':'GF','name':'Gafsa'},
    '7' : {'code':'JE','name':'Jendouba'},
    '8' : {'code':'KR','name':'Kairouan'},
    '9' : {'code':'KS','name':'Kasserine'},
    '10' : {'code':'KB','name':'Kebili'},
    '11' : {'code':'KF','name':'Kef'},
    '12' : {'code':'MH','name':'Mahdia'},
    '13' : {'code':'MN','name':'Manouba'},
    '14' : {'code':'ME','name':'Medenine'},
    '15' : {'code':'MO','name':'Monastir'},
    '16' : {'code':'NA','name':'Nabeul'},
    '17' : {'code':'SF','name':'Sfax'},
    '18' : {'code':'SD','name':'Sidi'},
    '19' : {'code':'SL','name':'Siliana'},
    '20' : {'code':'SO','name':'Sousse'},
    '21' : {'code':'TA','name':'Tataouine'},
    '22' : {'code':'TO','name':'Tozeur'},
    '23' : {'code':'TU','name':'Tunis'},
    '24' : {'code':'ZA','name':'Zaghouan'}
  },
  'TR':{
    '1' : {'code':'ADA','name':'Adana'},
    '2' : {'code':'ADI','name':'Adiyaman'},
    '3' : {'code':'AFY','name':'Afyonkarahisar'},
    '4' : {'code':'AGR','name':'Agri'},
    '5' : {'code':'AKS','name':'Aksaray'},
    '6' : {'code':'AMA','name':'Amasya'},
    '7' : {'code':'ANK','name':'Ankara'},
    '8' : {'code':'ANT','name':'Antalya'},
    '9' : {'code':'ARD','name':'Ardahan'},
    '10' : {'code':'ART','name':'Artvin'},
    '11' : {'code':'AYI','name':'Aydin'},
    '12' : {'code':'BAL','name':'Balikesir'},
    '13' : {'code':'BAR','name':'Bartin'},
    '14' : {'code':'BAT','name':'Batman'},
    '15' : {'code':'BAY','name':'Bayburt'},
    '16' : {'code':'BIL','name':'Bilecik'},
    '17' : {'code':'BIN','name':'Bingol'},
    '18' : {'code':'BIT','name':'Bitlis'},
    '19' : {'code':'BOL','name':'Bolu'},
    '20' : {'code':'BRD','name':'Burdur'},
    '21' : {'code':'BRS','name':'Bursa'},
    '22' : {'code':'CKL','name':'Canakkale'},
    '23' : {'code':'CKR','name':'Cankiri'},
    '24' : {'code':'COR','name':'Corum'},
    '25' : {'code':'DEN','name':'Denizli'},
    '26' : {'code':'DIY','name':'Diyarbakir'},
    '27' : {'code':'DUZ','name':'Duzce'},
    '28' : {'code':'EDI','name':'Edirne'},
    '29' : {'code':'ELA','name':'Elazig'},
    '30' : {'code':'EZC','name':'Erzincan'},
    '31' : {'code':'EZR','name':'Erzurum'},
    '32' : {'code':'ESK','name':'Eskisehir'},
    '33' : {'code':'GAZ','name':'Gaziantep'},
    '34' : {'code':'GIR','name':'Giresun'},
    '35' : {'code':'GMS','name':'Gumushane'},
    '36' : {'code':'HKR','name':'Hakkari'},
    '37' : {'code':'HTY','name':'Hatay'},
    '38' : {'code':'IGD','name':'Igdir'},
    '39' : {'code':'ISP','name':'Isparta'},
    '40' : {'code':'IST','name':'Istanbul'},
    '41' : {'code':'IZM','name':'Izmir'},
    '42' : {'code':'KAH','name':'Kahramanmaras'},
    '43' : {'code':'KRB','name':'Karabuk'},
    '44' : {'code':'KRM','name':'Karaman'},
    '45' : {'code':'KRS','name':'Kars'},
    '46' : {'code':'KAS','name':'Kastamonu'},
    '47' : {'code':'KAY','name':'Kayseri'},
    '48' : {'code':'KLS','name':'Kilis'},
    '49' : {'code':'KRK','name':'Kirikkale'},
    '50' : {'code':'KLR','name':'Kirklareli'},
    '51' : {'code':'KRH','name':'Kirsehir'},
    '52' : {'code':'KOC','name':'Kocaeli'},
    '53' : {'code':'KON','name':'Konya'},
    '54' : {'code':'KUT','name':'Kutahya'},
    '55' : {'code':'MAL','name':'Malatya'},
    '56' : {'code':'MAN','name':'Manisa'},
    '57' : {'code':'MAR','name':'Mardin'},
    '58' : {'code':'MER','name':'Mersin'},
    '59' : {'code':'MUG','name':'Mugla'},
    '60' : {'code':'MUS','name':'Mus'},
    '61' : {'code':'NEV','name':'Nevsehir'},
    '62' : {'code':'NIG','name':'Nigde'},
    '63' : {'code':'ORD','name':'Ordu'},
    '64' : {'code':'OSM','name':'Osmaniye'},
    '65' : {'code':'RIZ','name':'Rize'},
    '66' : {'code':'SAK','name':'Sakarya'},
    '67' : {'code':'SAM','name':'Samsun'},
    '68' : {'code':'SAN','name':'Sanliurfa'},
    '69' : {'code':'SII','name':'Siirt'},
    '70' : {'code':'SIN','name':'Sinop'},
    '71' : {'code':'SIR','name':'Sirnak'},
    '72' : {'code':'SIV','name':'Sivas'},
    '73' : {'code':'TEL','name':'Tekirdag'},
    '74' : {'code':'TOK','name':'Tokat'},
    '75' : {'code':'TRA','name':'Trabzon'},
    '76' : {'code':'TUN','name':'Tunceli'},
    '77' : {'code':'USK','name':'Usak'},
    '78' : {'code':'VAN','name':'Van'},
    '79' : {'code':'YAL','name':'Yalova'},
    '80' : {'code':'YOZ','name':'Yozgat'},
    '81' : {'code':'ZON','name':'Zonguldak'}
  },
  'TM':{
    '1' : {'code':'A','name':'Ahal Welayaty'},
    '2' : {'code':'B','name':'Balkan Welayaty'},
    '3' : {'code':'D','name':'Dashhowuz Welayaty'},
    '4' : {'code':'L','name':'Lebap Welayaty'},
    '5' : {'code':'M','name':'Mary Welayaty'}
  },
  'TC':{
    '1' : {'code':'AC','name':'Ambergris Cays'},
    '2' : {'code':'DC','name':'Dellis Cay'},
    '3' : {'code':'FC','name':'French Cay'},
    '4' : {'code':'LW','name':'Little Water Cay'},
    '5' : {'code':'RC','name':'Parrot Cay'},
    '6' : {'code':'PN','name':'Pine Cay'},
    '7' : {'code':'SL','name':'Salt Cay'},
    '8' : {'code':'GT','name':'Grand Turk'},
    '9' : {'code':'SC','name':'South Caicos'},
    '10' : {'code':'EC','name':'East Caicos'},
    '11' : {'code':'MC','name':'Middle Caicos'},
    '12' : {'code':'NC','name':'North Caicos'},
    '13' : {'code':'PR','name':'Providenciales'},
    '14' : {'code':'WC','name':'West Caicos'}
  },
  'TV':{
    '1' : {'code':'NMG','name':'Nanumanga'},
    '2' : {'code':'NLK','name':'Niulakita'},
    '3' : {'code':'NTO','name':'Niutao'},
    '4' : {'code':'FUN','name':'Funafuti'},
    '5' : {'code':'NME','name':'Nanumea'},
    '6' : {'code':'NUI','name':'Nui'},
    '7' : {'code':'NFT','name':'Nukufetau'},
    '8' : {'code':'NLL','name':'Nukulaelae'},
    '9' : {'code':'VAI','name':'Vaitupu'}
  },
  'UG':{
    '1' : {'code':'KAL','name':'Kalangala'},
    '2' : {'code':'KMP','name':'Kampala'},
    '3' : {'code':'KAY','name':'Kayunga'},
    '4' : {'code':'KIB','name':'Kiboga'},
    '5' : {'code':'LUW','name':'Luwero'},
    '6' : {'code':'MAS','name':'Masaka'},
    '7' : {'code':'MPI','name':'Mpigi'},
    '8' : {'code':'MUB','name':'Mubende'},
    '9' : {'code':'MUK','name':'Mukono'},
    '10' : {'code':'NKS','name':'Nakasongola'},
    '11' : {'code':'RAK','name':'Rakai'},
    '12' : {'code':'SEM','name':'Sembabule'},
    '13' : {'code':'WAK','name':'Wakiso'},
    '14' : {'code':'BUG','name':'Bugiri'},
    '15' : {'code':'BUS','name':'Busia'},
    '16' : {'code':'IGA','name':'Iganga'},
    '17' : {'code':'JIN','name':'Jinja'},
    '18' : {'code':'KAB','name':'Kaberamaido'},
    '19' : {'code':'KML','name':'Kamuli'},
    '20' : {'code':'KPC','name':'Kapchorwa'},
    '21' : {'code':'KTK','name':'Katakwi'},
    '22' : {'code':'KUM','name':'Kumi'},
    '23' : {'code':'MAY','name':'Mayuge'},
    '24' : {'code':'MBA','name':'Mbale'},
    '25' : {'code':'PAL','name':'Pallisa'},
    '26' : {'code':'SIR','name':'Sironko'},
    '27' : {'code':'SOR','name':'Soroti'},
    '28' : {'code':'TOR','name':'Tororo'},
    '29' : {'code':'ADJ','name':'Adjumani'},
    '30' : {'code':'APC','name':'Apac'},
    '31' : {'code':'ARU','name':'Arua'},
    '32' : {'code':'GUL','name':'Gulu'},
    '33' : {'code':'KIT','name':'Kitgum'},
    '34' : {'code':'KOT','name':'Kotido'},
    '35' : {'code':'LIR','name':'Lira'},
    '36' : {'code':'MRT','name':'Moroto'},
    '37' : {'code':'MOY','name':'Moyo'},
    '38' : {'code':'NAK','name':'Nakapiripirit'},
    '39' : {'code':'NEB','name':'Nebbi'},
    '40' : {'code':'PAD','name':'Pader'},
    '41' : {'code':'YUM','name':'Yumbe'},
    '42' : {'code':'BUN','name':'Bundibugyo'},
    '43' : {'code':'BSH','name':'Bushenyi'},
    '44' : {'code':'HOI','name':'Hoima'},
    '45' : {'code':'KBL','name':'Kabale'},
    '46' : {'code':'KAR','name':'Kabarole'},
    '47' : {'code':'KAM','name':'Kamwenge'},
    '48' : {'code':'KAN','name':'Kanungu'},
    '49' : {'code':'KAS','name':'Kasese'},
    '50' : {'code':'KBA','name':'Kibaale'},
    '51' : {'code':'KIS','name':'Kisoro'},
    '52' : {'code':'KYE','name':'Kyenjojo'},
    '53' : {'code':'MSN','name':'Masindi'},
    '54' : {'code':'MBR','name':'Mbarara'},
    '55' : {'code':'NTU','name':'Ntungamo'},
    '56' : {'code':'RUK','name':'Rukungiri'}
  },
  'UA':{
    '1' : {'code':'CK','name':'Cherkasy'},
    '2' : {'code':'CH','name':'Chernihiv'},
    '3' : {'code':'CV','name':'Chernivtsi'},
    '4' : {'code':'CR','name':'Crimea'},
    '5' : {'code':'DN','name':'Dnipropetrovs\'k'},
    '6' : {'code':'DO','name':'Donets\'k'},
    '7' : {'code':'IV','name':'Ivano-Frankivs\'k'},
    '8' : {'code':'KL','name':'Kharkiv Kherson'},
    '9' : {'code':'KM','name':'Khmel\'nyts\'kyy'},
    '10' : {'code':'KR','name':'Kirovohrad'},
    '11' : {'code':'KV','name':'Kiev'},
    '12' : {'code':'KY','name':'Kyyiv'},
    '13' : {'code':'LU','name':'Luhans\'k'},
    '14' : {'code':'LV','name':'L\'viv'},
    '15' : {'code':'MY','name':'Mykolayiv'},
    '16' : {'code':'OD','name':'Odesa'},
    '17' : {'code':'PO','name':'Poltava'},
    '18' : {'code':'RI','name':'Rivne'},
    '19' : {'code':'SE','name':'Sevastopol'},
    '20' : {'code':'SU','name':'Sumy'},
    '21' : {'code':'TE','name':'Ternopil\''},
    '22' : {'code':'VI','name':'Vinnytsya'},
    '23' : {'code':'VO','name':'Volyn\''},
    '24' : {'code':'ZK','name':'Zakarpattya'},
    '25' : {'code':'ZA','name':'Zaporizhzhya'},
    '26' : {'code':'ZH','name':'Zhytomyr'}
  },
  'AE':{
    '1' : {'code':'AZ','name':'Abu Zaby'},
    '2' : {'code':'AJ','name':'\'Ajman'},
    '3' : {'code':'FU','name':'Al Fujayrah'},
    '4' : {'code':'SH','name':'Ash Shariqah'},
    '5' : {'code':'DU','name':'Dubayy'},
    '6' : {'code':'RK','name':'R\'as al Khaymah'},
    '7' : {'code':'UQ','name':'Umm al Qaywayn'}
  },
  'GB':{
    '1' : {'code':'ABN','name':'Aberdeen'},
    '2' : {'code':'ABNS','name':'Aberdeenshire'},
    '3' : {'code':'ANG','name':'Anglesey'},
    '4' : {'code':'AGS','name':'Angus'},
    '5' : {'code':'ARY','name':'Argyll and Bute'},
    '6' : {'code':'BEDS','name':'Bedfordshire'},
    '7' : {'code':'BERKS','name':'Berkshire'},
    '8' : {'code':'BLA','name':'Blaenau Gwent'},
    '9' : {'code':'BRI','name':'Bridgend'},
    '10' : {'code':'BSTL','name':'Bristol'},
    '11' : {'code':'BUCKS','name':'Buckinghamshire'},
    '12' : {'code':'CAE','name':'Caerphilly'},
    '13' : {'code':'CAMBS','name':'Cambridgeshire'},
    '14' : {'code':'CDF','name':'Cardiff'},
    '15' : {'code':'CARM','name':'Carmarthenshire'},
    '16' : {'code':'CDGN','name':'Ceredigion'},
    '17' : {'code':'CHES','name':'Cheshire'},
    '18' : {'code':'CLACK','name':'Clackmannanshire'},
    '19' : {'code':'CON','name':'Conwy'},
    '20' : {'code':'CORN','name':'Cornwall'},
    '21' : {'code':'DNBG','name':'Denbighshire'},
    '22' : {'code':'DERBY','name':'Derbyshire'},
    '23' : {'code':'DVN','name':'Devon'},
    '24' : {'code':'DOR','name':'Dorset'},
    '25' : {'code':'DGL','name':'Dumfries and Galloway'},
    '26' : {'code':'DUND','name':'Dundee'},
    '27' : {'code':'DHM','name':'Durham'},
    '28' : {'code':'ARYE','name':'East Ayrshire'},
    '29' : {'code':'DUNBE','name':'East Dunbartonshire'},
    '30' : {'code':'LOTE','name':'East Lothian'},
    '31' : {'code':'RENE','name':'East Renfrewshire'},
    '32' : {'code':'ERYS','name':'East Riding of Yorkshire'},
    '33' : {'code':'SXE','name':'East Sussex'},
    '34' : {'code':'EDIN','name':'Edinburgh'},
    '35' : {'code':'ESX','name':'Essex'},
    '36' : {'code':'FALK','name':'Falkirk'},
    '37' : {'code':'FFE','name':'Fife'},
    '38' : {'code':'FLINT','name':'Flintshire'},
    '39' : {'code':'GLAS','name':'Glasgow'},
    '40' : {'code':'GLOS','name':'Gloucestershire'},
    '41' : {'code':'LDN','name':'Greater London'},
    '42' : {'code':'MCH','name':'Greater Manchester'},
    '43' : {'code':'GDD','name':'Gwynedd'},
    '44' : {'code':'HANTS','name':'Hampshire'},
    '45' : {'code':'HWR','name':'Herefordshire'},
    '46' : {'code':'HERTS','name':'Hertfordshire'},
    '47' : {'code':'HLD','name':'Highlands'},
    '48' : {'code':'IVER','name':'Inverclyde'},
    '49' : {'code':'IOW','name':'Isle of Wight'},
    '50' : {'code':'KNT','name':'Kent'},
    '51' : {'code':'LANCS','name':'Lancashire'},
    '52' : {'code':'LEICS','name':'Leicestershire'},
    '53' : {'code':'LINCS','name':'Lincolnshire'},
    '54' : {'code':'MSY','name':'Merseyside'},
    '55' : {'code':'MERT','name':'Merthyr Tydfil'},
    '56' : {'code':'MLOT','name':'Midlothian'},
    '57' : {'code':'MMOUTH','name':'Monmouthshire'},
    '58' : {'code':'MORAY','name':'Moray'},
    '59' : {'code':'NPRTAL','name':'Neath Port Talbot'},
    '60' : {'code':'NEWPT','name':'Newport'},
    '61' : {'code':'NOR','name':'Norfolk'},
    '62' : {'code':'ARYN','name':'North Ayrshire'},
    '63' : {'code':'LANN','name':'North Lanarkshire'},
    '64' : {'code':'YSN','name':'North Yorkshire'},
    '65' : {'code':'NHM','name':'Northamptonshire'},
    '66' : {'code':'NLD','name':'Northumberland'},
    '67' : {'code':'NOT','name':'Nottinghamshire'},
    '68' : {'code':'ORK','name':'Orkney Islands'},
    '69' : {'code':'OFE','name':'Oxfordshire'},
    '70' : {'code':'PEM','name':'Pembrokeshire'},
    '71' : {'code':'PERTH','name':'Perth and Kinross'},
    '72' : {'code':'PWS','name':'Powys'},
    '73' : {'code':'REN','name':'Renfrewshire'},
    '74' : {'code':'RHON','name':'Rhondda Cynon Taff'},
    '75' : {'code':'RUT','name':'Rutland'},
    '76' : {'code':'BOR','name':'Scottish Borders'},
    '77' : {'code':'SHET','name':'Shetland Islands'},
    '78' : {'code':'SPE','name':'Shropshire'},
    '79' : {'code':'SOM','name':'Somerset'},
    '80' : {'code':'ARYS','name':'South Ayrshire'},
    '81' : {'code':'LANS','name':'South Lanarkshire'},
    '82' : {'code':'YSS','name':'South Yorkshire'},
    '83' : {'code':'SFD','name':'Staffordshire'},
    '84' : {'code':'STIR','name':'Stirling'},
    '85' : {'code':'SFK','name':'Suffolk'},
    '86' : {'code':'SRY','name':'Surrey'},
    '87' : {'code':'SWAN','name':'Swansea'},
    '88' : {'code':'TORF','name':'Torfaen'},
    '89' : {'code':'TWR','name':'Tyne and Wear'},
    '90' : {'code':'VGLAM','name':'Vale of Glamorgan'},
    '91' : {'code':'WARKS','name':'Warwickshire'},
    '92' : {'code':'WDUN','name':'West Dunbartonshire'},
    '93' : {'code':'WLOT','name':'West Lothian'},
    '94' : {'code':'WMD','name':'West Midlands'},
    '95' : {'code':'SXW','name':'West Sussex'},
    '96' : {'code':'YSW','name':'West Yorkshire'},
    '97' : {'code':'WIL','name':'Western Isles'},
    '98' : {'code':'WLT','name':'Wiltshire'},
    '99' : {'code':'WORCS','name':'Worcestershire'},
    '100' : {'code':'WRX','name':'Wrexham'}
  },
  'US':{
    '1' : {'code':'AL','name':'Alabama'},
    '2' : {'code':'AK','name':'Alaska'},
    '3' : {'code':'AS','name':'American Samoa'},
    '4' : {'code':'AZ','name':'Arizona'},
    '5' : {'code':'AR','name':'Arkansas'},
    '6' : {'code':'AF','name':'Armed Forces Africa'},
    '7' : {'code':'AA','name':'Armed Forces Americas'},
    '8' : {'code':'AC','name':'Armed Forces Canada'},
    '9' : {'code':'AE','name':'Armed Forces Europe'},
    '10' : {'code':'AM','name':'Armed Forces Middle East'},
    '11' : {'code':'AP','name':'Armed Forces Pacific'},
    '12' : {'code':'CA','name':'California'},
    '13' : {'code':'CO','name':'Colorado'},
    '14' : {'code':'CT','name':'Connecticut'},
    '15' : {'code':'DE','name':'Delaware'},
    '16' : {'code':'DC','name':'District of Columbia'},
    '17' : {'code':'FM','name':'Federated States Of Micronesia'},
    '18' : {'code':'FL','name':'Florida'},
    '19' : {'code':'GA','name':'Georgia'},
    '20' : {'code':'GU','name':'Guam'},
    '21' : {'code':'HI','name':'Hawaii'},
    '22' : {'code':'ID','name':'Idaho'},
    '23' : {'code':'IL','name':'Illinois'},
    '24' : {'code':'IN','name':'Indiana'},
    '25' : {'code':'IA','name':'Iowa'},
    '26' : {'code':'KS','name':'Kansas'},
    '27' : {'code':'KY','name':'Kentucky'},
    '28' : {'code':'LA','name':'Louisiana'},
    '29' : {'code':'ME','name':'Maine'},
    '30' : {'code':'MH','name':'Marshall Islands'},
    '31' : {'code':'MD','name':'Maryland'},
    '32' : {'code':'MA','name':'Massachusetts'},
    '33' : {'code':'MI','name':'Michigan'},
    '34' : {'code':'MN','name':'Minnesota'},
    '35' : {'code':'MS','name':'Mississippi'},
    '36' : {'code':'MO','name':'Missouri'},
    '37' : {'code':'MT','name':'Montana'},
    '38' : {'code':'NE','name':'Nebraska'},
    '39' : {'code':'NV','name':'Nevada'},
    '40' : {'code':'NH','name':'New Hampshire'},
    '41' : {'code':'NJ','name':'New Jersey'},
    '42' : {'code':'NM','name':'New Mexico'},
    '43' : {'code':'NY','name':'New York'},
    '44' : {'code':'NC','name':'North Carolina'},
    '45' : {'code':'ND','name':'North Dakota'},
    '46' : {'code':'MP','name':'Northern Mariana Islands'},
    '47' : {'code':'OH','name':'Ohio'},
    '48' : {'code':'OK','name':'Oklahoma'},
    '49' : {'code':'OR','name':'Oregon'},
    '50' : {'code':'PW','name':'Palau'},
    '51' : {'code':'PA','name':'Pennsylvania'},
    '52' : {'code':'PR','name':'Puerto Rico'},
    '53' : {'code':'RI','name':'Rhode Island'},
    '54' : {'code':'SC','name':'South Carolina'},
    '55' : {'code':'SD','name':'South Dakota'},
    '56' : {'code':'TN','name':'Tennessee'},
    '57' : {'code':'TX','name':'Texas'},
    '58' : {'code':'UT','name':'Utah'},
    '59' : {'code':'VT','name':'Vermont'},
    '60' : {'code':'VI','name':'Virgin Islands'},
    '61' : {'code':'VA','name':'Virginia'},
    '62' : {'code':'WA','name':'Washington'},
    '63' : {'code':'WV','name':'West Virginia'},
    '64' : {'code':'WI','name':'Wisconsin'},
    '65' : {'code':'WY','name':'Wyoming'}
  },
  'UM':{
    '1' : {'code':'BI','name':'Baker Island'},
    '2' : {'code':'HI','name':'Howland Island'},
    '3' : {'code':'JI','name':'Jarvis Island'},
    '4' : {'code':'JA','name':'Johnston Atoll'},
    '5' : {'code':'KR','name':'Kingman Reef'},
    '6' : {'code':'MA','name':'Midway Atoll'},
    '7' : {'code':'NI','name':'Navassa Island'},
    '8' : {'code':'PA','name':'Palmyra Atoll'},
    '9' : {'code':'WI','name':'Wake Island'}
  },
  'UY':{
    '1' : {'code':'AR','name':'Artigas'},
    '2' : {'code':'CA','name':'Canelones'},
    '3' : {'code':'CL','name':'Cerro Largo'},
    '4' : {'code':'CO','name':'Colonia'},
    '5' : {'code':'DU','name':'Durazno'},
    '6' : {'code':'FS','name':'Flores'},
    '7' : {'code':'FA','name':'Florida'},
    '8' : {'code':'LA','name':'Lavalleja'},
    '9' : {'code':'MA','name':'Maldonado'},
    '10' : {'code':'MO','name':'Montevideo'},
    '11' : {'code':'PA','name':'Paysandu'},
    '12' : {'code':'RN','name':'Rio Negro'},
    '13' : {'code':'RV','name':'Rivera'},
    '14' : {'code':'RO','name':'Rocha'},
    '15' : {'code':'SL','name':'Salto'},
    '16' : {'code':'SJ','name':'San Jose'},
    '17' : {'code':'SO','name':'Soriano'},
    '18' : {'code':'TA','name':'Tacuarembo'},
    '19' : {'code':'TT','name':'Treinta y Tres'}
  },
  'UZ':{
    '1' : {'code':'AN','name':'Andijon'},
    '2' : {'code':'BU','name':'Buxoro'},
    '3' : {'code':'FA','name':'Farg\'ona'},
    '4' : {'code':'JI','name':'Jizzax'},
    '5' : {'code':'NG','name':'Namangan'},
    '6' : {'code':'NW','name':'Navoiy'},
    '7' : {'code':'QA','name':'Qashqadaryo'},
    '8' : {'code':'QR','name':'Qoraqalpog\'iston Republikasi'},
    '9' : {'code':'SA','name':'Samarqand'},
    '10' : {'code':'SI','name':'Sirdaryo'},
    '11' : {'code':'SU','name':'Surxondaryo'},
    '12' : {'code':'TK','name':'Toshkent City'},
    '13' : {'code':'TO','name':'Toshkent Region'},
    '14' : {'code':'XO','name':'Xorazm'}
  },
  'VU':{
    '1' : {'code':'MA','name':'Malampa'},
    '2' : {'code':'PE','name':'Penama'},
    '3' : {'code':'SA','name':'Sanma'},
    '4' : {'code':'SH','name':'Shefa'},
    '5' : {'code':'TA','name':'Tafea'},
    '6' : {'code':'TO','name':'Torba'}
  },
  'VE':{
    '1' : {'code':'AM','name':'Amazonas'},
    '2' : {'code':'AN','name':'Anzoategui'},
    '3' : {'code':'AP','name':'Apure'},
    '4' : {'code':'AR','name':'Aragua'},
    '5' : {'code':'BA','name':'Barinas'},
    '6' : {'code':'BO','name':'Bolivar'},
    '7' : {'code':'CA','name':'Carabobo'},
    '8' : {'code':'CO','name':'Cojedes'},
    '9' : {'code':'DA','name':'Delta Amacuro'},
    '10' : {'code':'DF','name':'Dependencias Federales'},
    '11' : {'code':'DI','name':'Distrito Federal'},
    '12' : {'code':'FA','name':'Falcon'},
    '13' : {'code':'GU','name':'Guarico'},
    '14' : {'code':'LA','name':'Lara'},
    '15' : {'code':'ME','name':'Merida'},
    '16' : {'code':'MI','name':'Miranda'},
    '17' : {'code':'MO','name':'Monagas'},
    '18' : {'code':'NE','name':'Nueva Esparta'},
    '19' : {'code':'PO','name':'Portuguesa'},
    '20' : {'code':'SU','name':'Sucre'},
    '21' : {'code':'TA','name':'Tachira'},
    '22' : {'code':'TR','name':'Trujillo'},
    '23' : {'code':'VA','name':'Vargas'},
    '24' : {'code':'YA','name':'Yaracuy'},
    '25' : {'code':'ZU','name':'Zulia'}
  },
  'VN':{
    '1' : {'code':'AG','name':'An Giang'},
    '2' : {'code':'BG','name':'Bac Giang'},
    '3' : {'code':'BK','name':'Bac Kan'},
    '4' : {'code':'BL','name':'Bac Lieu'},
    '5' : {'code':'BC','name':'Bac Ninh'},
    '6' : {'code':'BR','name':'Ba Ria-Vung Tau'},
    '7' : {'code':'BN','name':'Ben Tre'},
    '8' : {'code':'BH','name':'Binh Dinh'},
    '9' : {'code':'BU','name':'Binh Duong'},
    '10' : {'code':'BP','name':'Binh Phuoc'},
    '11' : {'code':'BT','name':'Binh Thuan'},
    '12' : {'code':'CM','name':'Ca Mau'},
    '13' : {'code':'CT','name':'Can Tho'},
    '14' : {'code':'CB','name':'Cao Bang'},
    '15' : {'code':'DL','name':'Dak Lak'},
    '16' : {'code':'DG','name':'Dak Nong'},
    '17' : {'code':'DN','name':'Da Nang'},
    '18' : {'code':'DB','name':'Dien Bien'},
    '19' : {'code':'DI','name':'Dong Nai'},
    '20' : {'code':'DT','name':'Dong Thap'},
    '21' : {'code':'GL','name':'Gia Lai'},
    '22' : {'code':'HG','name':'Ha Giang'},
    '23' : {'code':'HD','name':'Hai Duong'},
    '24' : {'code':'HP','name':'Hai Phong'},
    '25' : {'code':'HM','name':'Ha Nam'},
    '26' : {'code':'HI','name':'Ha Noi'},
    '27' : {'code':'HT','name':'Ha Tay'},
    '28' : {'code':'HH','name':'Ha Tinh'},
    '29' : {'code':'HB','name':'Hoa Binh'},
    '30' : {'code':'HC','name':'Ho Chin Minh'},
    '31' : {'code':'HU','name':'Hau Giang'},
    '32' : {'code':'HY','name':'Hung Yen'}
  },
  'VI':{
    '1' : {'code':'C','name':'Saint Croix'},
    '2' : {'code':'J','name':'Saint John'},
    '3' : {'code':'T','name':'Saint Thomas'}
  },
  'WF':{
    '1' : {'code':'A','name':'Alo'},
    '2' : {'code':'S','name':'Sigave'},
    '3' : {'code':'W','name':'Wallis'}
  },
  'YE':{
    '1' : {'code':'AB','name':'Abyan'},
    '2' : {'code':'AD','name':'Adan'},
    '3' : {'code':'AM','name':'Amran'},
    '4' : {'code':'BA','name':'Al Bayda'},
    '5' : {'code':'DA','name':'Ad Dali'},
    '6' : {'code':'DH','name':'Dhamar'},
    '7' : {'code':'HD','name':'Hadramawt'},
    '8' : {'code':'HJ','name':'Hajjah'},
    '9' : {'code':'HU','name':'Al Hudaydah'},
    '10' : {'code':'IB','name':'Ibb'},
    '11' : {'code':'JA','name':'Al Jawf'},
    '12' : {'code':'LA','name':'Lahij'},
    '13' : {'code':'MA','name':'Ma\'rib'},
    '14' : {'code':'MR','name':'Al Mahrah'},
    '15' : {'code':'MW','name':'Al Mahwit'},
    '16' : {'code':'SD','name':'Sa\'dah'},
    '17' : {'code':'SN','name':'San\'a'},
    '18' : {'code':'SH','name':'Shabwah'},
    '19' : {'code':'TA','name':'Ta\'izz'}
  },
  'YU':{
    '1' : {'code':'KOS','name':'Kosovo'},
    '2' : {'code':'MON','name':'Montenegro'},
    '3' : {'code':'SER','name':'Serbia'},
    '4' : {'code':'VOJ','name':'Vojvodina'}
  },
  'ZR':{
    '1' : {'code':'BC','name':'Bas-Congo'},
    '2' : {'code':'BN','name':'Bandundu'},
    '3' : {'code':'EQ','name':'Equateur'},
    '4' : {'code':'KA','name':'Katanga'},
    '5' : {'code':'KE','name':'Kasai-Oriental'},
    '6' : {'code':'KN','name':'Kinshasa'},
    '7' : {'code':'KW','name':'Kasai-Occidental'},
    '8' : {'code':'MA','name':'Maniema'},
    '9' : {'code':'NK','name':'Nord-Kivu'},
    '10' : {'code':'OR','name':'Orientale'},
    '11' : {'code':'SK','name':'Sud-Kivu'}
  },
  'ZM':{
    '1' : {'code':'CE','name':'Central'},
    '2' : {'code':'CB','name':'Copperbelt'},
    '3' : {'code':'EA','name':'Eastern'},
    '4' : {'code':'LP','name':'Luapula'},
    '5' : {'code':'LK','name':'Lusaka'},
    '6' : {'code':'NO','name':'Northern'},
    '7' : {'code':'NW','name':'North-Western'},
    '8' : {'code':'SO','name':'Southern'},
    '9' : {'code':'WE','name':'Western'}
  },
  'ZW':{
    '1' : {'code':'BU','name':'Bulawayo'},
    '2' : {'code':'HA','name':'Harare'},
    '3' : {'code':'ML','name':'Manicaland'},
    '4' : {'code':'MC','name':'Mashonaland Central'},
    '5' : {'code':'ME','name':'Mashonaland East'},
    '6' : {'code':'MW','name':'Mashonaland West'},
    '7' : {'code':'MV','name':'Masvingo'},
    '8' : {'code':'MN','name':'Matabeleland North'},
    '9' : {'code':'MS','name':'Matabeleland South'},
    '10' : {'code':'MD','name':'Midlands'}
  }
};

/* ==========================================================
 * bootstrap-formhelpers-timepicker.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHTimePickerDelimiter = ':';

var BFHTimePickerModes = {
  'am': 'AM',
  'pm': 'PM'
};
/* ==========================================================
 * bootstrap-formhelpers-timezones.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
var BFHTimezonesList = {
  'AF': {
    'Asia/Kabul': 'Kabul'
  },
  'AL': {
    'Europe/Tirane': 'Tirane'
  },
  'DZ': {
    'Africa/Algiers': 'Algiers'
  },
  'AS': {
    'Pacific/Pago_Pago': 'Pago Pago'
  },
  'AD': {
    'Europe/Andorra': 'Andorra'
  },
  'AO': {
    'Africa/Luanda': 'Luanda'
  },
  'AI': {
    'America/Anguilla': 'Anguilla'
  },
  'AQ': {
    'Antarctica/Casey': 'Casey',
    'Antarctica/Davis': 'Davis',
    'Antarctica/DumontDUrville': 'DumontDUrville',
    'Antarctica/Macquarie': 'Macquarie',
    'Antarctica/Mawson': 'Mawson',
    'Antarctica/McMurdo': 'McMurdo',
    'Antarctica/Palmer': 'Palmer',
    'Antarctica/Rothera': 'Rothera',
    'Antarctica/South_Pole': 'South Pole',
    'Antarctica/Syowa': 'Syowa',
    'Antarctica/Vostok': 'Vostok'
  },
  'AG': {
    'America/Antigua': 'Antigua'
  },
  'AR': {
    'America/Argentina/Buenos_Aires': 'Argentina / Buenos Aires',
    'America/Argentina/Catamarca': 'Argentina / Catamarca',
    'America/Argentina/Cordoba': 'Argentina / Cordoba',
    'America/Argentina/Jujuy': 'Argentina / Jujuy',
    'America/Argentina/La_Rioja': 'Argentina / La Rioja',
    'America/Argentina/Mendoza': 'Argentina / Mendoza',
    'America/Argentina/Rio_Gallegos': 'Argentina / Rio Gallegos',
    'America/Argentina/Salta': 'Argentina / Salta',
    'America/Argentina/San_Juan': 'Argentina / San Juan',
    'America/Argentina/San_Luis': 'Argentina / San Luis',
    'America/Argentina/Tucuman': 'Argentina / Tucuman',
    'America/Argentina/Ushuaia': 'Argentina / Ushuaia'
  },
  'AM': {
    'Asia/Yerevan': 'Yerevan'
  },
  'AW': {
    'America/Aruba': 'Aruba'
  },
  'AU': {
    'Australia/Adelaide': 'Adelaide',
    'Australia/Brisbane': 'Brisbane',
    'Australia/Broken_Hill': 'Broken Hill',
    'Australia/Currie': 'Currie',
    'Australia/Darwin': 'Darwin',
    'Australia/Eucla': 'Eucla',
    'Australia/Hobart': 'Hobart',
    'Australia/Lindeman': 'Lindeman',
    'Australia/Lord_Howe': 'Lord Howe',
    'Australia/Melbourne': 'Melbourne',
    'Australia/Perth': 'Perth',
    'Australia/Sydney': 'Sydney'
  },
  'AT': {
    'Europe/Vienna': 'Vienna'
  },
  'AZ': {
    'Asia/Baku': 'Baku'
  },
  'BH': {
    'Asia/Bahrain': 'Bahrain'
  },
  'BD': {
    'Asia/Dhaka': 'Dhaka'
  },
  'BB': {
    'America/Barbados': 'Barbados'
  },
  'BY': {
    'Europe/Minsk': 'Minsk'
  },
  'BE': {
    'Europe/Brussels': 'Brussels'
  },
  'BZ': {
    'America/Belize': 'Belize'
  },
  'BJ': {
    'Africa/Porto-Novo': 'Porto-Novo'
  },
  'BM': {
    'Atlantic/Bermuda': 'Bermuda'
  },
  'BT': {
    'Asia/Thimphu': 'Thimphu'
  },
  'BO': {
    'America/La_Paz': 'La Paz'
  },
  'BA': {
    'Europe/Sarajevo': 'Sarajevo'
  },
  'BW': {
    'Africa/Gaborone': 'Gaborone'
  },
  'BR': {
    'America/Araguaina': 'Araguaina',
    'America/Bahia': 'Bahia',
    'America/Belem': 'Belem',
    'America/Boa_Vista': 'Boa Vista',
    'America/Campo_Grande': 'Campo Grande',
    'America/Cuiaba': 'Cuiaba',
    'America/Eirunepe': 'Eirunepe',
    'America/Fortaleza': 'Fortaleza',
    'America/Maceio': 'Maceio',
    'America/Manaus': 'Manaus',
    'America/Noronha': 'Noronha',
    'America/Porto_Velho': 'Porto Velho',
    'America/Recife': 'Recife',
    'America/Rio_Branco': 'Rio Branco',
    'America/Santarem': 'Santarem',
    'America/Sao_Paulo': 'Sao Paulo'
  },
  'VG': {
    'America/Tortola': 'Tortola'
  },
  'BN': {
    'Asia/Brunei': 'Brunei'
  },
  'BG': {
    'Europe/Sofia': 'Sofia'
  },
  'BF': {
    'Africa/Ouagadougou': 'Ouagadougou'
  },
  'BI': {
    'Africa/Bujumbura': 'Bujumbura'
  },
  'CI': {
    'Africa/Abidjan': 'Abidjan'
  },
  'KH': {
    'Asia/Phnom_Penh': 'Phnom Penh'
  },
  'CM': {
    'Africa/Douala': 'Douala'
  },
  'CA': {
    'America/Atikokan': 'Atikokan',
    'America/Blanc-Sablon': 'Blanc-Sablon',
    'America/Cambridge_Bay': 'Cambridge Bay',
    'America/Creston': 'Creston',
    'America/Dawson': 'Dawson',
    'America/Dawson_Creek': 'Dawson Creek',
    'America/Edmonton': 'Edmonton',
    'America/Glace_Bay': 'Glace Bay',
    'America/Goose_Bay': 'Goose Bay',
    'America/Halifax': 'Halifax',
    'America/Inuvik': 'Inuvik',
    'America/Iqaluit': 'Iqaluit',
    'America/Moncton': 'Moncton',
    'America/Montreal': 'Montreal',
    'America/Nipigon': 'Nipigon',
    'America/Pangnirtung': 'Pangnirtung',
    'America/Rainy_River': 'Rainy River',
    'America/Rankin_Inlet': 'Rankin Inlet',
    'America/Regina': 'Regina',
    'America/Resolute': 'Resolute',
    'America/St_Johns': 'St Johns',
    'America/Swift_Current': 'Swift Current',
    'America/Thunder_Bay': 'Thunder Bay',
    'America/Toronto': 'Toronto',
    'America/Vancouver': 'Vancouver',
    'America/Whitehorse': 'Whitehorse',
    'America/Winnipeg': 'Winnipeg',
    'America/Yellowknife': 'Yellowknife'
  },
  'CV': {
    'Atlantic/Cape_Verde': 'Cape Verde'
  },
  'KY': {
    'America/Cayman': 'Cayman'
  },
  'CF': {
    'Africa/Bangui': 'Bangui'
  },
  'TD': {
    'Africa/Ndjamena': 'Ndjamena'
  },
  'CL': {
    'America/Santiago': 'Santiago',
    'Pacific/Easter': 'Easter'
  },
  'CN': {
    'Asia/Chongqing': 'Chongqing',
    'Asia/Harbin': 'Harbin',
    'Asia/Kashgar': 'Kashgar',
    'Asia/Shanghai': 'Shanghai',
    'Asia/Urumqi': 'Urumqi'
  },
  'CO': {
    'America/Bogota': 'Bogota'
  },
  'KM': {
    'Indian/Comoro': 'Comoro'
  },
  'CG': {
    'Africa/Brazzaville': 'Brazzaville'
  },
  'CR': {
    'America/Costa_Rica': 'Costa Rica'
  },
  'HR': {
    'Europe/Zagreb': 'Zagreb'
  },
  'CU': {
    'America/Havana': 'Havana'
  },
  'CY': {
    'Asia/Nicosia': 'Nicosia'
  },
  'CZ': {
    'Europe/Prague': 'Prague'
  },
  'CD': {
    'Africa/Kinshasa': 'Kinshasa',
    'Africa/Lubumbashi': 'Lubumbashi'
  },
  'DK': {
    'Europe/Copenhagen': 'Copenhagen'
  },
  'DJ': {
    'Africa/Djibouti': 'Djibouti'
  },
  'DM': {
    'America/Dominica': 'Dominica'
  },
  'DO': {
    'America/Santo_Domingo': 'Santo Domingo'
  },
  'TP': {
  },
  'EC': {
    'America/Guayaquil': 'Guayaquil',
    'Pacific/Galapagos': 'Galapagos'
  },
  'EG': {
    'Africa/Cairo': 'Cairo'
  },
  'SV': {
    'America/El_Salvador': 'El Salvador'
  },
  'GQ': {
    'Africa/Malabo': 'Malabo'
  },
  'ER': {
    'Africa/Asmara': 'Asmara'
  },
  'EE': {
    'Europe/Tallinn': 'Tallinn'
  },
  'ET': {
    'Africa/Addis_Ababa': 'Addis Ababa'
  },
  'FO': {
    'Atlantic/Faroe': 'Faroe'
  },
  'FK': {
    'Atlantic/Stanley': 'Stanley'
  },
  'FJ': {
    'Pacific/Fiji': 'Fiji'
  },
  'FI': {
    'Europe/Helsinki': 'Helsinki'
  },
  'MK': {
    'Europe/Skopje': 'Skopje'
  },
  'FR': {
    'Europe/Paris': 'Paris'
  },
  'GA': {
    'Africa/Libreville': 'Libreville'
  },
  'GE': {
    'Asia/Tbilisi': 'Tbilisi'
  },
  'DE': {
    'Europe/Berlin': 'Berlin'
  },
  'GH': {
    'Africa/Accra': 'Accra'
  },
  'GR': {
    'Europe/Athens': 'Athens'
  },
  'GL': {
    'America/Danmarkshavn': 'Danmarkshavn',
    'America/Godthab': 'Godthab',
    'America/Scoresbysund': 'Scoresbysund',
    'America/Thule': 'Thule'
  },
  'GD': {
    'America/Grenada': 'Grenada'
  },
  'GU': {
    'Pacific/Guam': 'Guam'
  },
  'GT': {
    'America/Guatemala': 'Guatemala'
  },
  'GN': {
    'Africa/Conakry': 'Conakry'
  },
  'GW': {
    'Africa/Bissau': 'Bissau'
  },
  'GY': {
    'America/Guyana': 'Guyana'
  },
  'HT': {
    'America/Port-au-Prince': 'Port-au-Prince'
  },
  'HN': {
    'America/Tegucigalpa': 'Tegucigalpa'
  },
  'HK': {
    'Asia/Hong_Kong': 'Hong Kong'
  },
  'HU': {
    'Europe/Budapest': 'Budapest'
  },
  'IS': {
    'Atlantic/Reykjavik': 'Reykjavik'
  },
  'IN': {
    'Asia/Kolkata': 'Kolkata'
  },
  'ID': {
    'Asia/Jakarta': 'Jakarta',
    'Asia/Jayapura': 'Jayapura',
    'Asia/Makassar': 'Makassar',
    'Asia/Pontianak': 'Pontianak'
  },
  'IR': {
    'Asia/Tehran': 'Tehran'
  },
  'IQ': {
    'Asia/Baghdad': 'Baghdad'
  },
  'IE': {
    'Europe/Dublin': 'Dublin'
  },
  'IL': {
    'Asia/Jerusalem': 'Jerusalem'
  },
  'IT': {
    'Europe/Rome': 'Rome'
  },
  'JM': {
    'America/Jamaica': 'Jamaica'
  },
  'JP': {
    'Asia/Tokyo': 'Tokyo'
  },
  'JO': {
    'Asia/Amman': 'Amman'
  },
  'KZ': {
    'Asia/Almaty': 'Almaty',
    'Asia/Aqtau': 'Aqtau',
    'Asia/Aqtobe': 'Aqtobe',
    'Asia/Oral': 'Oral',
    'Asia/Qyzylorda': 'Qyzylorda'
  },
  'KE': {
    'Africa/Nairobi': 'Nairobi'
  },
  'KI': {
    'Pacific/Enderbury': 'Enderbury',
    'Pacific/Kiritimati': 'Kiritimati',
    'Pacific/Tarawa': 'Tarawa'
  },
  'KW': {
    'Asia/Kuwait': 'Kuwait'
  },
  'KG': {
    'Asia/Bishkek': 'Bishkek'
  },
  'LA': {
    'Asia/Vientiane': 'Vientiane'
  },
  'LV': {
    'Europe/Riga': 'Riga'
  },
  'LB': {
    'Asia/Beirut': 'Beirut'
  },
  'LS': {
    'Africa/Maseru': 'Maseru'
  },
  'LR': {
    'Africa/Monrovia': 'Monrovia'
  },
  'LY': {
    'Africa/Tripoli': 'Tripoli'
  },
  'LI': {
    'Europe/Vaduz': 'Vaduz'
  },
  'LT': {
    'Europe/Vilnius': 'Vilnius'
  },
  'LU': {
    'Europe/Luxembourg': 'Luxembourg'
  },
  'MO': {
    'Asia/Macau': 'Macau'
  },
  'MG': {
    'Indian/Antananarivo': 'Antananarivo'
  },
  'MW': {
    'Africa/Blantyre': 'Blantyre'
  },
  'MY': {
    'Asia/Kuala_Lumpur': 'Kuala Lumpur',
    'Asia/Kuching': 'Kuching'
  },
  'MV': {
    'Indian/Maldives': 'Maldives'
  },
  'ML': {
    'Africa/Bamako': 'Bamako'
  },
  'MT': {
    'Europe/Malta': 'Malta'
  },
  'MH': {
    'Pacific/Kwajalein': 'Kwajalein',
    'Pacific/Majuro': 'Majuro'
  },
  'MR': {
    'Africa/Nouakchott': 'Nouakchott'
  },
  'MU': {
    'Indian/Mauritius': 'Mauritius'
  },
  'MX': {
    'America/Bahia_Banderas': 'Bahia Banderas',
    'America/Cancun': 'Cancun',
    'America/Chihuahua': 'Chihuahua',
    'America/Hermosillo': 'Hermosillo',
    'America/Matamoros': 'Matamoros',
    'America/Mazatlan': 'Mazatlan',
    'America/Merida': 'Merida',
    'America/Mexico_City': 'Mexico City',
    'America/Monterrey': 'Monterrey',
    'America/Ojinaga': 'Ojinaga',
    'America/Santa_Isabel': 'Santa Isabel',
    'America/Tijuana': 'Tijuana'
  },
  'FM': {
    'Pacific/Chuuk': 'Chuuk',
    'Pacific/Kosrae': 'Kosrae',
    'Pacific/Pohnpei': 'Pohnpei'
  },
  'MD': {
    'Europe/Chisinau': 'Chisinau'
  },
  'MC': {
    'Europe/Monaco': 'Monaco'
  },
  'MN': {
    'Asia/Choibalsan': 'Choibalsan',
    'Asia/Hovd': 'Hovd',
    'Asia/Ulaanbaatar': 'Ulaanbaatar'
  },
  'ME': {
    'Europe/Podgorica': 'Podgorica'
  },
  'MS': {
    'America/Montserrat': 'Montserrat'
  },
  'MA': {
    'Africa/Casablanca': 'Casablanca'
  },
  'MZ': {
    'Africa/Maputo': 'Maputo'
  },
  'MM': {
    'Asia/Rangoon': 'Rangoon'
  },
  'NA': {
    'Africa/Windhoek': 'Windhoek'
  },
  'NR': {
    'Pacific/Nauru': 'Nauru'
  },
  'NP': {
    'Asia/Kathmandu': 'Kathmandu'
  },
  'NL': {
    'Europe/Amsterdam': 'Amsterdam'
  },
  'AN': {
  },
  'NZ': {
    'Pacific/Auckland': 'Auckland',
    'Pacific/Chatham': 'Chatham'
  },
  'NI': {
    'America/Managua': 'Managua'
  },
  'NE': {
    'Africa/Niamey': 'Niamey'
  },
  'NG': {
    'Africa/Lagos': 'Lagos'
  },
  'NF': {
    'Pacific/Norfolk': 'Norfolk'
  },
  'KP': {
    'Asia/Pyongyang': 'Pyongyang'
  },
  'MP': {
    'Pacific/Saipan': 'Saipan'
  },
  'NO': {
    'Europe/Oslo': 'Oslo'
  },
  'OM': {
    'Asia/Muscat': 'Muscat'
  },
  'PK': {
    'Asia/Karachi': 'Karachi'
  },
  'PW': {
    'Pacific/Palau': 'Palau'
  },
  'PA': {
    'America/Panama': 'Panama'
  },
  'PG': {
    'Pacific/Port_Moresby': 'Port Moresby'
  },
  'PY': {
    'America/Asuncion': 'Asuncion'
  },
  'PE': {
    'America/Lima': 'Lima'
  },
  'PH': {
    'Asia/Manila': 'Manila'
  },
  'PN': {
    'Pacific/Pitcairn': 'Pitcairn'
  },
  'PL': {
    'Europe/Warsaw': 'Warsaw'
  },
  'PT': {
    'Atlantic/Azores': 'Azores',
    'Atlantic/Madeira': 'Madeira',
    'Europe/Lisbon': 'Lisbon'
  },
  'PR': {
    'America/Puerto_Rico': 'Puerto Rico'
  },
  'QA': {
    'Asia/Qatar': 'Qatar'
  },
  'RO': {
    'Europe/Bucharest': 'Bucharest'
  },
  'RU': {
    'Asia/Anadyr': 'Anadyr',
    'Asia/Irkutsk': 'Irkutsk',
    'Asia/Kamchatka': 'Kamchatka',
    'Asia/Krasnoyarsk': 'Krasnoyarsk',
    'Asia/Magadan': 'Magadan',
    'Asia/Novokuznetsk': 'Novokuznetsk',
    'Asia/Novosibirsk': 'Novosibirsk',
    'Asia/Omsk': 'Omsk',
    'Asia/Sakhalin': 'Sakhalin',
    'Asia/Vladivostok': 'Vladivostok',
    'Asia/Yakutsk': 'Yakutsk',
    'Asia/Yekaterinburg': 'Yekaterinburg',
    'Europe/Kaliningrad': 'Kaliningrad',
    'Europe/Moscow': 'Moscow',
    'Europe/Samara': 'Samara',
    'Europe/Volgograd': 'Volgograd'
  },
  'RW': {
    'Africa/Kigali': 'Kigali'
  },
  'ST': {
    'Africa/Sao_Tome': 'Sao Tome'
  },
  'SH': {
    'Atlantic/St_Helena': 'St Helena'
  },
  'KN': {
    'America/St_Kitts': 'St Kitts'
  },
  'LC': {
    'America/St_Lucia': 'St Lucia'
  },
  'VC': {
    'America/St_Vincent': 'St Vincent'
  },
  'WS': {
    'Pacific/Apia': 'Apia'
  },
  'SM': {
    'Europe/San_Marino': 'San Marino'
  },
  'SA': {
    'Asia/Riyadh': 'Riyadh'
  },
  'SN': {
    'Africa/Dakar': 'Dakar'
  },
  'RS': {
    'Europe/Belgrade': 'Belgrade'
  },
  'SC': {
    'Indian/Mahe': 'Mahe'
  },
  'SL': {
    'Africa/Freetown': 'Freetown'
  },
  'SG': {
    'Asia/Singapore': 'Singapore'
  },
  'SK': {
    'Europe/Bratislava': 'Bratislava'
  },
  'SI': {
    'Europe/Ljubljana': 'Ljubljana'
  },
  'SB': {
    'Pacific/Guadalcanal': 'Guadalcanal'
  },
  'SO': {
    'Africa/Mogadishu': 'Mogadishu'
  },
  'ZA': {
    'Africa/Johannesburg': 'Johannesburg'
  },
  'GS': {
    'Atlantic/South_Georgia': 'South Georgia'
  },
  'KR': {
    'Asia/Seoul': 'Seoul'
  },
  'ES': {
    'Africa/Ceuta': 'Ceuta',
    'Atlantic/Canary': 'Canary',
    'Europe/Madrid': 'Madrid'
  },
  'LK': {
    'Asia/Colombo': 'Colombo'
  },
  'SD': {
    'Africa/Khartoum': 'Khartoum'
  },
  'SR': {
    'America/Paramaribo': 'Paramaribo'
  },
  'SZ': {
    'Africa/Mbabane': 'Mbabane'
  },
  'SE': {
    'Europe/Stockholm': 'Stockholm'
  },
  'CH': {
    'Europe/Zurich': 'Zurich'
  },
  'SY': {
    'Asia/Damascus': 'Damascus'
  },
  'TW': {
    'Asia/Taipei': 'Taipei'
  },
  'TJ': {
    'Asia/Dushanbe': 'Dushanbe'
  },
  'TZ': {
    'Africa/Dar_es_Salaam': 'Dar es Salaam'
  },
  'TH': {
    'Asia/Bangkok': 'Bangkok'
  },
  'BS': {
    'America/Nassau': 'Nassau'
  },
  'GM': {
    'Africa/Banjul': 'Banjul'
  },
  'TG': {
    'Africa/Lome': 'Lome'
  },
  'TO': {
    'Pacific/Tongatapu': 'Tongatapu'
  },
  'TT': {
    'America/Port_of_Spain': 'Port of Spain'
  },
  'TN': {
    'Africa/Tunis': 'Tunis'
  },
  'TR': {
    'Europe/Istanbul': 'Istanbul'
  },
  'TM': {
    'Asia/Ashgabat': 'Ashgabat'
  },
  'TC': {
    'America/Grand_Turk': 'Grand Turk'
  },
  'TV': {
    'Pacific/Funafuti': 'Funafuti'
  },
  'VI': {
    'America/St_Thomas': 'St Thomas'
  },
  'UG': {
    'Africa/Kampala': 'Kampala'
  },
  'UA': {
    'Europe/Kiev': 'Kiev',
    'Europe/Simferopol': 'Simferopol',
    'Europe/Uzhgorod': 'Uzhgorod',
    'Europe/Zaporozhye': 'Zaporozhye'
  },
  'AE': {
    'Asia/Dubai': 'Dubai'
  },
  'GB': {
    'Europe/London': 'London'
  },
  'US': {
    'America/Adak': 'Adak',
    'America/Anchorage': 'Anchorage',
    'America/Boise': 'Boise',
    'America/Chicago': 'Chicago',
    'America/Denver': 'Denver',
    'America/Detroit': 'Detroit',
    'America/Indiana/Indianapolis': 'Indiana / Indianapolis',
    'America/Indiana/Knox': 'Indiana / Knox',
    'America/Indiana/Marengo': 'Indiana / Marengo',
    'America/Indiana/Petersburg': 'Indiana / Petersburg',
    'America/Indiana/Tell_City': 'Indiana / Tell City',
    'America/Indiana/Vevay': 'Indiana / Vevay',
    'America/Indiana/Vincennes': 'Indiana / Vincennes',
    'America/Indiana/Winamac': 'Indiana / Winamac',
    'America/Juneau': 'Juneau',
    'America/Kentucky/Louisville': 'Kentucky / Louisville',
    'America/Kentucky/Monticello': 'Kentucky / Monticello',
    'America/Los_Angeles': 'Los Angeles',
    'America/Menominee': 'Menominee',
    'America/Metlakatla': 'Metlakatla',
    'America/New_York': 'New York',
    'America/Nome': 'Nome',
    'America/North_Dakota/Beulah': 'North Dakota / Beulah',
    'America/North_Dakota/Center': 'North Dakota / Center',
    'America/North_Dakota/New_Salem': 'North Dakota / New Salem',
    'America/Phoenix': 'Phoenix',
    'America/Shiprock': 'Shiprock',
    'America/Sitka': 'Sitka',
    'America/Yakutat': 'Yakutat',
    'Pacific/Honolulu': 'Honolulu'
  },
  'UY': {
    'America/Montevideo': 'Montevideo'
  },
  'UZ': {
    'Asia/Samarkand': 'Samarkand',
    'Asia/Tashkent': 'Tashkent'
  },
  'VU': {
    'Pacific/Efate': 'Efate'
  },
  'VA': {
    'Europe/Vatican': 'Vatican'
  },
  'VE': {
    'America/Caracas': 'Caracas'
  },
  'VN': {
    'Asia/Ho_Chi_Minh': 'Ho Chi Minh'
  },
  'EH': {
    'Africa/El_Aaiun': 'El Aaiun'
  },
  'YE': {
    'Asia/Aden': 'Aden'
  },
  'ZM': {
    'Africa/Lusaka': 'Lusaka'
  },
  'ZW': {
    'Africa/Harare': 'Harare'
  }
};

/* ==========================================================
 * bootstrap-formhelpers-colorpicker.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
 
+function ($) {

  'use strict';
  
  
  /* COLORPICKER CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=bfh-colorpicker]',
      BFHColorPicker = function (element, options) {
        this.options = $.extend({}, $.fn.bfhcolorpicker.defaults, options);
        this.$element = $(element);

        this.initPopover();
      };

  BFHColorPicker.prototype = {

    constructor: BFHColorPicker,

    initPalette: function() {
      var $canvas,
          context,
          gradient;
          
      $canvas = this.$element.find('canvas');
      context = $canvas[0].getContext('2d');
      
      gradient = context.createLinearGradient(0, 0, $canvas.width(), 0);
      
      gradient.addColorStop(0,    'rgb(255, 255, 255)');
      gradient.addColorStop(0.1,  'rgb(255,   0,   0)');
      gradient.addColorStop(0.25, 'rgb(255,   0, 255)');
      gradient.addColorStop(0.4,  'rgb(0,     0, 255)');
      gradient.addColorStop(0.55, 'rgb(0,   255, 255)');
      gradient.addColorStop(0.7,  'rgb(0,   255,   0)');
      gradient.addColorStop(0.85, 'rgb(255, 255,   0)');
      gradient.addColorStop(1,    'rgb(255,   0,   0)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      
      gradient = context.createLinearGradient(0, 0, 0, $canvas.height());
      gradient.addColorStop(0,   'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0,     0,   0, 0)');
      gradient.addColorStop(1,   'rgba(0,     0,   0, 1)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    },
    
    initPopover: function() {
      var iconLeft,
          iconRight;

      iconLeft = '';
      iconRight = '';
      if (this.options.align === 'right') {
        iconRight = '<span class="input-group-addon"><span class="bfh-colorpicker-icon"></span></span>';
      } else {
        iconLeft = '<span class="input-group-addon"><span class="bfh-colorpicker-icon"></span></span>';
      }

      this.$element.html(
        '<div class="input-group bfh-colorpicker-toggle" data-toggle="bfh-colorpicker">' +
        iconLeft +
        '<input type="text" name="' + this.options.name + '" class="' + this.options.input + '" placeholder="' + this.options.placeholder + '" readonly>' +
        iconRight +
        '</div>' +
        '<div class="bfh-colorpicker-popover">' +
        '<canvas class="bfh-colorpicker-palette" width="384" height="256"></canvas>' +
        '</div>'
      );

      this.$element
        .on('click.bfhcolorpicker.data-api touchstart.bfhcolorpicker.data-api', toggle, BFHColorPicker.prototype.toggle)
        .on('mousedown.bfhcolorpicker.data-api', 'canvas', BFHColorPicker.prototype.mouseDown)
        .on('click.bfhcolorpicker.data-api touchstart.bfhcolorpicker.data-api', '.bfh-colorpicker-popover', function() { return false; });

      this.initPalette();
      
      this.$element.val(this.options.color);
    },
    
    updateVal: function(positionX, positionY) {
      var $canvas,
          context,
          colorX,
          colorY,
          snappiness,
          imageData,
          newColor;
      
      snappiness = 5;
      
      $canvas = this.$element.find('canvas');
      context = $canvas[0].getContext('2d');
      
      colorX = positionX - $canvas.offset().left;
      colorY = positionY - $canvas.offset().top;
      
      colorX = Math.round(colorX / snappiness) * snappiness;
      colorY = Math.round(colorY / snappiness) * snappiness;
      
      if (colorX < 0) {
        colorX = 0;
      }
      if (colorX >= $canvas.width()) {
        colorX = $canvas.width() - 1;
      }
      
      if (colorY < 0) {
        colorY = 0;
      }
      if (colorY > $canvas.height()) {
        colorY = $canvas.height();
      }
      
      imageData = context.getImageData(colorX, colorY, 1, 1);
      newColor = rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]);
      
      if (newColor !== this.$element.val()) {
        this.$element.val(newColor);
        
        this.$element.trigger('change.bfhcolorpicker');
      }
    },
    
    mouseDown: function(e) {
      var $this,
          $parent;
      
      $this = $(this);
      $parent = getParent($this);
      
      $(document)
        .on('mousemove.bfhcolorpicker.data-api', {colorpicker: $parent}, BFHColorPicker.prototype.mouseMove)
        .one('mouseup.bfhcolorpicker.data-api', {colorpicker: $parent}, BFHColorPicker.prototype.mouseUp);
    },
    
    mouseMove: function(e) {
      var $this;
      
      $this = e.data.colorpicker;
      
      $this.data('bfhcolorpicker').updateVal(e.pageX, e.pageY);
    },
    
    mouseUp: function(e) {
      var $this;
      
      $this = e.data.colorpicker;
      
      $this.data('bfhcolorpicker').updateVal(e.pageX, e.pageY);
      
      $(document).off('mousemove.bfhcolorpicker.data-api');
      
      if ($this.data('bfhcolorpicker').options.close === true) {
        clearMenus();
      }
    },

    toggle: function (e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhcolorpicker'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhcolorpicker');

        $this.focus();
      }

      return false;
    }
  };
  
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
      
  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhcolorpicker'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhcolorpicker');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-colorpicker');
  }
  
  
  /* COLORPICKER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhcolorpicker;

  $.fn.bfhcolorpicker = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhcolorpicker');
      options = typeof option === 'object' && option;
      this.type = 'bfhcolorpicker';

      if (!data) {
        $this.data('bfhcolorpicker', (data = new BFHColorPicker(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhcolorpicker.Constructor = BFHColorPicker;

  $.fn.bfhcolorpicker.defaults = {
    align: 'left',
    input: 'form-control',
    placeholder: '',
    name: '',
    color: '#000000',
    close: true
  };
  
  
  /* COLORPICKER NO CONFLICT
   * ========================== */

  $.fn.bfhcolorpicker.noConflict = function () {
    $.fn.bfhcolorpicker = old;
    return this;
  };
  
  
  /* COLORPICKER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-colorpicker')) {
        return $(el).find('input[type="text"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      if ($(el).hasClass('bfh-colorpicker')) {
        $(el).find('.bfh-colorpicker-icon').css('background-color', val);
        $(el).find('input[type="text"]').val(val);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };
  
  
  /* COLORPICKER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-colorpicker').each(function () {
      var $colorpicker;

      $colorpicker = $(this);

      $colorpicker.bfhcolorpicker($colorpicker.data());
    });
  });
  
  
  /* APPLY TO STANDARD COLORPICKER ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhcolorpicker.data-api', clearMenus);

}(window.jQuery);
/* ==========================================================
 * bootstrap-formhelpers-countries.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* COUNTRIES CLASS DEFINITION
   * ====================== */

  var BFHCountries = function (element, options) {
    this.options = $.extend({}, $.fn.bfhcountries.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addCountries();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapCountries();
    }

    if (this.$element.is('span')) {
      this.displayCountry();
    }
  };

  BFHCountries.prototype = {

    constructor: BFHCountries,

    getCountries: function() {
      var country,
          countries;

      if (this.options.available) {
        if (typeof this.options.available === 'string') {
          countries = [];
  
          this.options.available = this.options.available.split(',');
  
          for (country in BFHCountriesList) {
            if (BFHCountriesList.hasOwnProperty(country)) {
              if ($.inArray(country, this.options.available) >= 0) {
                countries[country] = BFHCountriesList[country];
              }
            }
          }
        } else {
          countries = this.options.available;
        }

        return countries;
      } else {
        return BFHCountriesList;
      }
    },

    addCountries: function () {
      var value,
          country,
          countries;

      value = this.options.country;
      countries = this.getCountries();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (country in countries) {
        if (countries.hasOwnProperty(country)) {
          this.$element.append('<option value="' + country + '">' + countries[country] + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapCountries: function() {
      var $input,
          $toggle,
          $options,
          value,
          country,
          countries;

      value = this.options.country;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      countries = this.getCountries();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (country in countries) {
        if (countries.hasOwnProperty(country)) {
          if (this.options.flags === true) {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + country + '"><i class="glyphicon bfh-flag-' + country + '"></i>' + countries[country] + '</a></li>');
          } else {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + country + '">' + countries[country] + '</a></li>');
          }
        }
      }

      this.$element.val(value);
    },

    displayCountry: function () {
      var value;

      value = this.options.country;

      if (this.options.flags === true) {
        this.$element.html('<i class="glyphicon bfh-flag-' + value + '"></i> ' + BFHCountriesList[value]);
      } else {
        this.$element.html(BFHCountriesList[value]);
      }
    }

  };


  /* COUNTRY PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhcountries;

  $.fn.bfhcountries = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhcountries');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhcountries', (data = new BFHCountries(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhcountries.Constructor = BFHCountries;

  $.fn.bfhcountries.defaults = {
    country: '',
    available: '',
    flags: false,
    blank: true
  };


  /* COUNTRY NO CONFLICT
   * ========================== */

  $.fn.bfhcountries.noConflict = function () {
    $.fn.bfhcountries = old;
    return this;
  };


  /* COUNTRY DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-countries, span.bfh-countries, div.bfh-countries').each(function () {
      var $countries;

      $countries = $(this);

      if ($countries.hasClass('bfh-selectbox')) {
        $countries.bfhselectbox($countries.data());
      }
      $countries.bfhcountries($countries.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-currencies.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2013 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* COUNTRIES CLASS DEFINITION
   * ====================== */

  var BFHCurrencies = function (element, options) {
    this.options = $.extend({}, $.fn.bfhcurrencies.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addCurrencies();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapCurrencies();
    }

    if (this.$element.is('span')) {
      this.displayCurrency();
    }
  };

  BFHCurrencies.prototype = {

    constructor: BFHCurrencies,

    getCurrencies: function () {
      var currency,
          currencies;

      if (this.options.available) {
        currencies = [];

        this.options.available = this.options.available.split(',');

        for (currency in BFHCurrenciesList) {
          if (BFHCurrenciesList.hasOwnProperty(currency)) {
            if ($.inArray(currency, this.options.available) >= 0) {
              currencies[currency] = BFHCurrenciesList[currency];
            }
          }
        }

        return currencies;
      } else {
        return BFHCurrenciesList;
      }
    },

    addCurrencies: function () {
      var value,
          currency,
          currencies;

      value = this.options.currency;
      currencies = this.getCurrencies();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (currency in currencies) {
        if (currencies.hasOwnProperty(currency)) {
          this.$element.append('<option value="' + currency + '">' + currencies[currency].label + '</option>');
        }
      }

      this.$element.val(value);
    },


    addBootstrapCurrencies: function() {
      var $input,
          $toggle,
          $options,
          value,
          currency,
          currencies,
          flag;

      value = this.options.currency;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      currencies = this.getCurrencies();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (currency in currencies) {
        if (currencies.hasOwnProperty(currency)) {
          if (this.options.flags === true) {
            if (currencies[currency].currencyflag) {
              flag = currencies[currency].currencyflag;
            } else {
              flag = currency.substr(0,2);
            }
            $options.append('<li><a tabindex="-1" href="#" data-option="' + currency +  '"><i class="glyphicon bfh-flag-' + flag + '"></i>' + currencies[currency].label + '</a></li>');
          } else {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + currency + '">' + currencies[currency].label + '</a></li>');
          }
        }
      }

      this.$element.val(value);
    },

    displayCurrency: function () {
      var value,
          flag;

      value = this.options.currency;

      if (this.options.flags === true) {
        if (BFHCurrenciesList[value].currencyflag) {
          flag = BFHCurrenciesList[value].currencyflag;
        } else {
          flag = value.substr(0,2);
        }
        this.$element.html('<i class="glyphicon bfh-flag-' + flag + '"></i> ' + BFHCurrenciesList[value].label);
      } else {
        this.$element.html(BFHCurrenciesList[value].label);
      }
    }

  };


  /* CURRENCY PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhcurrencies;

  $.fn.bfhcurrencies = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhcurrencies');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhcurrencies', (data = new BFHCurrencies(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhcurrencies.Constructor = BFHCurrencies;

  $.fn.bfhcurrencies.defaults = {
    currency: '',
    available: '',
    flags: false,
    blank: true
  };


  /* CURRENCY NO CONFLICT
   * ========================== */

  $.fn.bfhcurrencies.noConflict = function () {
    $.fn.bfhcurrencies = old;
    return this;
  };


  /* CURRENCY DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-currencies, span.bfh-currencies, div.bfh-currencies').each(function () {
      var $currencies;

      $currencies = $(this);

      if ($currencies.hasClass('bfh-selectbox')) {
        $currencies.bfhselectbox($currencies.data());
      }
      $currencies.bfhcurrencies($currencies.data());
    });
  });


}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-datepicker.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* BFHDATEPICKER CLASS DEFINITION
   * ========================= */

  var toggle = '[data-toggle=bfh-datepicker]',
      BFHDatePicker = function (element, options) {
        this.options = $.extend({}, $.fn.bfhdatepicker.defaults, options);
        this.$element = $(element);

        this.initCalendar();
      };

  BFHDatePicker.prototype = {

    constructor: BFHDatePicker,

    setDate: function() {
      var date,
          today,
          format;

      date = this.options.date;
      format = this.options.format;

      if (date === '' || date === 'today' || date === undefined) {
        today = new Date();

        if (date === 'today') {
          this.$element.val(formatDate(format, today.getMonth(), today.getFullYear(), today.getDate()));
        }

        this.$element.data('month', today.getMonth());
        this.$element.data('year', today.getFullYear());
      } else {
        this.$element.val(date);
        this.$element.data('month', Number(getDatePart(format, date, 'm') - 1));
        this.$element.data('year', Number(getDatePart(format, date, 'y')));
      }
    },

    setDateLimit: function(date, limitPrefix) {
      var today,
          format;

      format = this.options.format;

      if (date !== '') {
        this.$element.data(limitPrefix + 'limit', true);

        if (date === 'today') {
          today = new Date();

          this.$element.data(limitPrefix + 'day', today.getDate());
          this.$element.data(limitPrefix + 'month', today.getMonth());
          this.$element.data(limitPrefix + 'year', today.getFullYear());
        } else {
          this.$element.data(limitPrefix + 'day', Number(getDatePart(format, date, 'd')));
          this.$element.data(limitPrefix + 'month', Number(getDatePart(format, date, 'm') - 1));
          this.$element.data(limitPrefix + 'year', Number(getDatePart(format, date, 'y')));
        }
      } else {
        this.$element.data(limitPrefix + 'limit', false);
      }
    },

    initCalendar: function() {
      var iconLeft,
          iconRight,
          iconAddon;

      iconLeft = '';
      iconRight = '';
      iconAddon = '';
      if (this.options.icon !== '') {
        if (this.options.align === 'right') {
          iconRight = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        } else {
          iconLeft = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        }
        iconAddon = 'input-group';
      }

      this.$element.html(
        '<div class="' + iconAddon + ' bfh-datepicker-toggle" data-toggle="bfh-datepicker">' +
        iconLeft +
        '<input type="text" name="' + this.options.name + '" class="' + this.options.input + '" placeholder="' + this.options.placeholder + '" readonly>' +
        iconRight +
        '</div>' +
        '<div class="bfh-datepicker-calendar">' +
        '<table class="calendar table table-bordered">' +
        '<thead>' +
        '<tr class="months-header">' +
        '<th class="month" colspan="4">' +
        '<a class="previous" href="#"><i class="glyphicon glyphicon-chevron-left"></i></a>' +
        '<span></span>' +
        '<a class="next" href="#"><i class="glyphicon glyphicon-chevron-right"></i></a>' +
        '</th>' +
        '<th class="year" colspan="3">' +
        '<a class="previous" href="#"><i class="glyphicon glyphicon-chevron-left"></i></a>' +
        '<span></span>' +
        '<a class="next" href="#"><i class="glyphicon glyphicon-chevron-right"></i></a>' +
        '</th>' +
        '</tr>' +
        '<tr class="days-header">' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>' +
        '</table>' +
        '</div>'
      );

      this.$element
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', toggle, BFHDatePicker.prototype.toggle)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .month > .previous', BFHDatePicker.prototype.previousMonth)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .month > .next', BFHDatePicker.prototype.nextMonth)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .year > .previous', BFHDatePicker.prototype.previousYear)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar .year > .next', BFHDatePicker.prototype.nextYear)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar td:not(.off)', BFHDatePicker.prototype.select)
        .on('click.bfhdatepicker.data-api touchstart.bfhdatepicker.data-api', '.bfh-datepicker-calendar > table.calendar', function() { return false; });

      this.setDate();
      this.setDateLimit(this.options.min, 'lower');
      this.setDateLimit(this.options.max, 'higher');

      this.updateCalendar();
    },

    updateCalendarHeader: function($calendar, month, year) {
      var $daysHeader,
          day;

      $calendar.find('table > thead > tr > th.month > span').text(BFHMonthsList[month]);
      $calendar.find('table > thead > tr > th.year > span').text(year);

      $daysHeader = $calendar.find('table > thead > tr.days-header');
      $daysHeader.html('');
      for (day=BFHDayOfWeekStart; day < BFHDaysList.length; day=day+1) {
        $daysHeader.append('<th>' + BFHDaysList[day] + '</th>');
      }
      for (day=0; day < BFHDayOfWeekStart; day=day+1) {
        $daysHeader.append('<th>' + BFHDaysList[day] + '</th>');
      }
    },

    checkMinDate: function(day, month, year) {
      var lowerlimit,
          lowerday,
          lowermonth,
          loweryear;

      lowerlimit = this.$element.data('lowerlimit');

      if (lowerlimit === true) {
        lowerday = this.$element.data('lowerday');
        lowermonth = this.$element.data('lowermonth');
        loweryear = this.$element.data('loweryear');

        if ((day < lowerday && month === lowermonth && year === loweryear) || (month < lowermonth && year === loweryear) || (year < loweryear)) {
          return true;
        }
      }

      return false;
    },

    checkMaxDate: function(day, month, year) {
      var higherlimit,
          higherday,
          highermonth,
          higheryear;

      higherlimit = this.$element.data('higherlimit');

      if (higherlimit === true) {
        higherday = this.$element.data('higherday');
        highermonth = this.$element.data('highermonth');
        higheryear = this.$element.data('higheryear');

        if ((day > higherday && month === highermonth && year === higheryear) || (month > highermonth && year === higheryear) || (year > higheryear)) {
          return true;
        }
      }

      return false;
    },

    checkToday: function(day, month, year) {
      var today;

      today = new Date();

      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        return true;
      }

      return false;
    },

    updateCalendarDays: function($calendar, month, year) {
      var $days,
          numDaysPreviousMonth,
          numDaysCurrentMonth,
          firstDay,
          lastDay,
          row,
          day;

      $days = $calendar.find('table > tbody').html('');
      numDaysPreviousMonth = getNumDaysInMonth(month, year);
      numDaysCurrentMonth = getNumDaysInMonth(month + 1, year);
      firstDay = getDayOfWeek(month, year, 1);
      lastDay = getDayOfWeek(month, year, numDaysCurrentMonth);

      row = '';
      for (day=0; day < (firstDay - BFHDayOfWeekStart + 7) % 7; day=day+1) {
        row += '<td class="off">' + (numDaysPreviousMonth - (firstDay - BFHDayOfWeekStart + 7) % 7 + day + 1) + '</td>';
      }

      for (day=1; day <= numDaysCurrentMonth; day=day+1) {
        if (this.checkMinDate(day, month, year)) {
          row += '<td data-day="' + day + '" class="off">' + day + '</td>';
        } else if (this.checkMaxDate(day, month, year)) {
          row += '<td data-day="' + day + '" class="off">' + day + '</td>';
        } else if (this.checkToday(day, month, year)) {
          row += '<td data-day="' + day + '" class="today">' + day + '</td>';
        } else {
          row += '<td data-day="' + day + '">' + day + '</td>';
        }
        if (getDayOfWeek(month, year, day) === (6 + BFHDayOfWeekStart) % 7) {
          $days.append('<tr>' + row + '</tr>');
          row = '';
        }
      }

      for (day=1; day <= (7 - ((lastDay + 1 - BFHDayOfWeekStart + 7) % 7)) % 7 + 1; day=day+1) {
        row += '<td class="off">' + day + '</td>';
        if (day === (7 - ((lastDay + 1 - BFHDayOfWeekStart + 7) % 7)) % 7) {
          $days.append('<tr>' + row + '</tr>');
        }
      }
    },

    updateCalendar: function () {
      var $calendar,
          month,
          year;

      $calendar = this.$element.find('.bfh-datepicker-calendar');
      month = this.$element.data('month');
      year = this.$element.data('year');

      this.updateCalendarHeader($calendar, month, year);
      this.updateCalendarDays($calendar, month, year);
    },

    previousMonth: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      if (Number($parent.data('month')) === 0) {
        $parent.data('month', 11);
        $parent.data('year', Number($parent.data('year')) - 1);
      } else {
        $parent.data('month', Number($parent.data('month')) - 1);
      }

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    nextMonth: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      if (Number($parent.data('month')) === 11) {
        $parent.data('month', 0);
        $parent.data('year', Number($parent.data('year')) + 1);
      } else {
        $parent.data('month', Number($parent.data('month')) + 1);
      }

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    previousYear: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      $parent.data('year', Number($parent.data('year')) - 1);

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    nextYear: function () {
      var $this,
          $parent,
          $datePicker;

      $this = $(this);
      $parent = getParent($this);

      $parent.data('year', Number($parent.data('year')) + 1);

      $datePicker = $parent.data('bfhdatepicker');
      $datePicker.updateCalendar();

      return false;
    },

    select: function (e) {
      var $this,
          $parent,
          $datePicker,
          month,
          year,
          day;

      $this = $(this);

      e.preventDefault();
      e.stopPropagation();

      $parent = getParent($this);
      $datePicker = $parent.data('bfhdatepicker');
      month = $parent.data('month');
      year = $parent.data('year');
      day = $this.data('day');

      $parent.val(formatDate($datePicker.options.format, month, year, day));
      $parent.trigger('change.bfhdatepicker');

      if ($datePicker.options.close === true) {
        clearMenus();
      }
    },

    toggle: function (e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhdatepicker'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhdatepicker');

        $this.focus();
      }

      return false;
    }
  };

  function getNumDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function getDayOfWeek(month, year, day) {
    return new Date(year, month, day).getDay();
  }

  function formatDate(format, month, year, day) {
    month += 1;
    month = String(month);
    day = String(day);

    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }

    return format.replace('m', month).replace('y', year).replace('d', day);
  }

  function getDatePart(format, date, part) {
    var partPositions,
        partPosition,
        parts;

    partPositions = [
      {'part': 'm', 'position': format.indexOf('m')},
      {'part': 'y', 'position': format.indexOf('y')},
      {'part': 'd', 'position': format.indexOf('d')}
    ];

    partPositions.sort(function(a, b) {return a.position - b.position;});

    parts = date.match(/(\d+)/g);

    for (partPosition in partPositions) {
      if (partPositions.hasOwnProperty(partPosition)) {
        if (partPositions[partPosition].part === part) {
          return Number(parts[partPosition]).toString();
        }
      }
    }
  }

  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhdatepicker'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhdatepicker');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-datepicker');
  }


  /* DATEPICKER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhdatepicker;

  $.fn.bfhdatepicker = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhdatepicker');
      options = typeof option === 'object' && option;
      this.type = 'bfhdatepicker';

      if (!data) {
        $this.data('bfhdatepicker', (data = new BFHDatePicker(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhdatepicker.Constructor = BFHDatePicker;

  $.fn.bfhdatepicker.defaults = {
    icon: 'glyphicon glyphicon-calendar',
    align: 'left',
    input: 'form-control',
    placeholder: '',
    name: '',
    date: 'today',
    format: 'm/d/y',
    min: '',
    max: '',
    close: true
  };


  /* DATEPICKER NO CONFLICT
   * ========================== */

  $.fn.bfhdatepicker.noConflict = function () {
    $.fn.bfhdatepicker = old;
    return this;
  };


  /* DATEPICKER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-datepicker')) {
        return $(el).find('input[type="text"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      if ($(el).hasClass('bfh-datepicker')) {
        $(el).find('input[type="text"]').val(val);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* DATEPICKER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-datepicker').each(function () {
      var $datepicker;

      $datepicker = $(this);

      $datepicker.bfhdatepicker($datepicker.data());
    });
  });


  /* APPLY TO STANDARD DATEPICKER ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhdatepicker.data-api', clearMenus);

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-fonts.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* FONTS CLASS DEFINITION
   * ====================== */

  var BFHFonts = function (element, options) {
    this.options = $.extend({}, $.fn.bfhfonts.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addFonts();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapFonts();
    }
  };

  BFHFonts.prototype = {

    constructor: BFHFonts,

    getFonts: function() {
      var font,
          fonts;

      if (this.options.available) {
        fonts = [];

        this.options.available = this.options.available.split(',');

        for (font in BFHFontsList) {
          if (BFHFontsList.hasOwnProperty(font)) {
            if ($.inArray(font, this.options.available) >= 0) {
              fonts[font] = BFHFontsList[font];
            }
          }
        }

        return fonts;
      } else {
        return BFHFontsList;
      }
    },

    addFonts: function () {
      var value,
          font,
          fonts;

      value = this.options.font;
      fonts = this.getFonts();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          this.$element.append('<option value="' + font + '">' + font + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapFonts: function() {
      var $input,
          $toggle,
          $options,
          value,
          font,
          fonts;

      value = this.options.font;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      fonts = this.getFonts();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          $options.append('<li><a tabindex="-1" href="#" style=\'font-family: ' + fonts[font] + '\' data-option="' + font + '">' + font + '</a></li>');
        }
      }

      this.$element.val(value);
    }

  };


  /* FONTS PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhfonts;

  $.fn.bfhfonts = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhfonts');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhfonts', (data = new BFHFonts(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhfonts.Constructor = BFHFonts;

  $.fn.bfhfonts.defaults = {
    font: '',
    available: '',
    blank: true
  };


  /* FONTS NO CONFLICT
   * ========================== */

  $.fn.bfhfonts.noConflict = function () {
    $.fn.bfhfonts = old;
    return this;
  };


  /* FONTS DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-fonts, span.bfh-fonts, div.bfh-fonts').each(function () {
      var $fonts;

      $fonts = $(this);

      if ($fonts.hasClass('bfh-selectbox')) {
        $fonts.bfhselectbox($fonts.data());
      }
      $fonts.bfhfonts($fonts.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-fontsizes.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* FONTSIZES CLASS DEFINITION
   * ====================== */

  var BFHFontSizes = function (element, options) {
    this.options = $.extend({}, $.fn.bfhfontsizes.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addFontSizes();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapFontSizes();
    }
  };

  BFHFontSizes.prototype = {

    constructor: BFHFontSizes,

    getFontsizes: function() {
      var fontsize,
          fontsizes;

      if (this.options.available) {
        fontsizes = [];

        this.options.available = this.options.available.split(',');

        for (fontsize in BFHFontSizesList) {
          if (BFHFontSizesList.hasOwnProperty(fontsize)) {
            if ($.inArray(fontsize, this.options.available) >= 0) {
              fontsizes[fontsize] = BFHFontSizesList[fontsize];
            }
          }
        }

        return fontsizes;
      } else {
        return BFHFontSizesList;
      }
    },

    addFontSizes: function () {
      var value,
          fontsize,
          fontsizes;

      value = this.options.fontsize;
      fontsizes = this.getFontsizes();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (fontsize in fontsizes) {
        if (fontsizes.hasOwnProperty(fontsize)) {
          this.$element.append('<option value="' + fontsize + '">' + fontsizes[fontsize] + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapFontSizes: function() {
      var $input,
          $toggle,
          $options,
          value,
          fontsize,
          fontsizes;

      value = this.options.fontsize;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      fontsizes = this.getFontsizes();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (fontsize in fontsizes) {
        if (fontsizes.hasOwnProperty(fontsize)) {
          $options.append('<li><a tabindex="-1" href="#" data-option="' + fontsize + '">' + fontsizes[fontsize] + '</a></li>');
        }
      }

      this.$element.val(value);
    }

  };


  /* FONTSIZES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhfontsizes;

  $.fn.bfhfontsizes = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhfontsizes');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhfontsizes', (data = new BFHFontSizes(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhfontsizes.Constructor = BFHFontSizes;

  $.fn.bfhfontsizes.defaults = {
    fontsize: '',
    available: '',
    blank: true
  };


  /* FONTSIZES NO CONFLICT
   * ========================== */

  $.fn.bfhfontsizes.noConflict = function () {
    $.fn.bfhfontsizes = old;
    return this;
  };


  /* FONTSIZES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-fontsizes, span.bfh-fontsizes, div.bfh-fontsizes').each(function () {
      var $fontSizes;

      $fontSizes = $(this);

      if ($fontSizes.hasClass('bfh-selectbox')) {
        $fontSizes.bfhselectbox($fontSizes.data());
      }
      $fontSizes.bfhfontsizes($fontSizes.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-googlefonts.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * contributed by Aaron Collegeman, Squidoo, 2012
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* GOOGLE FONTS CLASS DEFINITION
   * ====================== */

  var BFHGoogleFonts = function (element, options) {
    this.options = $.extend({}, $.fn.bfhgooglefonts.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addFonts();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapFonts();
    }
  };

  BFHGoogleFonts.prototype = {

    constructor: BFHGoogleFonts,

    getFonts: function() {
      var font,
          fonts;

      fonts = [];

      if (this.options.subset) {
        for (font in BFHGoogleFontsList.items) {
          if (BFHGoogleFontsList.items.hasOwnProperty(font)) {
            if ($.inArray(this.options.subset, BFHGoogleFontsList.items[font].subsets) >= 0) {
              fonts[BFHGoogleFontsList.items[font].family] = {
                'info': BFHGoogleFontsList.items[font],
                'index': parseInt(font, 10)
              };
            }
          }
        }
      } else if (this.options.available) {
        this.options.available = this.options.available.split(',');

        for (font in BFHGoogleFontsList.items) {
          if (BFHGoogleFontsList.items.hasOwnProperty(font)) {
            if ($.inArray(BFHGoogleFontsList.items[font].family, this.options.available) >= 0) {
              fonts[BFHGoogleFontsList.items[font].family] = {
                'info': BFHGoogleFontsList.items[font],
                'index': parseInt(font, 10)
              };
            }
          }
        }
      } else {
        for (font in BFHGoogleFontsList.items) {
          if (BFHGoogleFontsList.items.hasOwnProperty(font)) {
            fonts[BFHGoogleFontsList.items[font].family] = {
              'info': BFHGoogleFontsList.items[font],
              'index': parseInt(font, 10)
            };
          }
        }
      }

      return fonts;
    },

    addFonts: function () {
      var value,
          font,
          fonts;

      value = this.options.font;
      fonts = this.getFonts();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          this.$element.append('<option value="' + fonts[font].info.family + '">' + fonts[font].info.family + '</option>');
        }
      }

      this.$element.val(value);
    },

    addBootstrapFonts: function() {
      var $input,
          $toggle,
          $options,
          value,
          font,
          fonts;

      value = this.options.font;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      fonts = this.getFonts();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option="" style="background-image: none;"></a></li>');
      }

      for (font in fonts) {
        if (fonts.hasOwnProperty(font)) {
          $options.append('<li><a tabindex="-1" href="#" style="background-position: 0 -' + ((fonts[font].index * 30) - 2) + 'px;" data-option="' + fonts[font].info.family + '">' + fonts[font].info.family + '</a></li>');
        }
      }

      this.$element.val(value);
    }

  };


  /* GOOGLE FONTS PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhgooglefonts;

  $.fn.bfhgooglefonts = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhgooglefonts');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhgooglefonts', (data = new BFHGoogleFonts(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhgooglefonts.Constructor = BFHGoogleFonts;

  $.fn.bfhgooglefonts.defaults = {
    font: '',
    available: '',
    subset: '',
    blank: true
  };


  /* GOOGLE FONTS NO CONFLICT
   * ========================== */

  $.fn.bfhgooglefonts.noConflict = function () {
    $.fn.bfhgooglefonts = old;
    return this;
  };


  /* GOOGLE FONTS DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-googlefonts, span.bfh-googlefonts, div.bfh-googlefonts').each(function () {
      var $googleFonts;

      $googleFonts = $(this);

      if ($googleFonts.hasClass('bfh-selectbox')) {
        $googleFonts.bfhselectbox($googleFonts.data());
      }
      $googleFonts.bfhgooglefonts($googleFonts.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-languages.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 * Contribution 2013 Tomasz Kuter
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* LANGUAGES CLASS DEFINITION
   * ====================== */

  var BFHLanguages = function (element, options) {
    this.options = $.extend({}, $.fn.bfhlanguages.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addLanguages();
    }

    if (this.$element.is('span')) {
      this.displayLanguage();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapLanguages();
    }
  };

  BFHLanguages.prototype = {

    constructor: BFHLanguages,

    getLanguages: function () {
      var split,
          language,
          languages;

      if (this.options.available) {
        languages = [];

        this.options.available = this.options.available.split(',');

        for (language in this.options.available) {
          if (this.options.available.hasOwnProperty(language)) {
            if (this.options.available[language].indexOf('_') !== -1) {
              split = this.options.available[language].split('_');
              languages[split[0]] = {name: BFHLanguagesList[split[0]], country: split[1]};
            } else {
              languages[this.options.available[language]] = BFHLanguagesList[this.options.available[language]];
            }
          }
        }

        return languages;
      } else {
        return BFHLanguagesList;
      }
    },

    addLanguages: function () {
      var split,
          value,
          languages,
          language;

      value = this.options.language;
      languages = this.getLanguages();

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (language in languages) {
        if (languages.hasOwnProperty(language)) {
          if (languages[language].hasOwnProperty('name')) {
            this.$element.append('<option value="' + language + '_' + languages[language].country + '">' + languages[language].name.toProperCase() + ' (' + BFHCountriesList[languages[language].country] + ')</option>');
          } else {
            this.$element.append('<option value="' + language + '">' + languages[language].toProperCase() + '</option>');
          }
        }
      }

      this.$element.val(value);
    },

    addBootstrapLanguages: function() {
      var $input,
          $toggle,
          $options,
          value,
          languages,
          language,
          split;

      value = this.options.language;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');
      languages = this.getLanguages();

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (language in languages) {
        if (languages.hasOwnProperty(language)) {
          if (languages[language].hasOwnProperty('name')) {
            if (this.options.flags === true) {
              $options.append('<li><a tabindex="-1" href="#" data-option="' + language + '_' + languages[language].country + '"><i class="glyphicon bfh-flag-' + languages[language].country + '"></i>' + languages[language].name.toProperCase() + '</a></li>');
            } else {
              $options.append('<li><a tabindex="-1" href="#" data-option="' + language + '_' + languages[language].country + '">' + languages[language].name.toProperCase() + ' (' + BFHCountriesList[languages[language].country] + ')</a></li>');
            }
          } else {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + language + '">' + languages[language] + '</a></li>');
          }
        }
      }

      this.$element.val(value);
    },

    displayLanguage: function () {
      var value;

      value = this.options.language;

      if (value.indexOf('_') !== -1) {
        value = value.split('_');
        if (this.options.flags === true) {
          this.$element.html('<i class="glyphicon bfh-flag-' + value[1] + '"></i> ' + BFHLanguagesList[value[0]].toProperCase());
        } else {
          this.$element.html(BFHLanguagesList[value[0]].toProperCase() + ' (' + BFHCountriesList[value[1]] + ')');
        }
      } else {
        this.$element.html(BFHLanguagesList[value].toProperCase());
      }
    }

  };


  /* LANGUAGES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhlanguages;

  $.fn.bfhlanguages = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhlanguages');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhlanguages', (data = new BFHLanguages(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhlanguages.Constructor = BFHLanguages;

  $.fn.bfhlanguages.defaults = {
    language: '',
    available: '',
    flags: false,
    blank: true
  };


  /* LANGUAGES NO CONFLICT
   * ========================== */

  $.fn.bfhlanguages.noConflict = function () {
    $.fn.bfhlanguages = old;
    return this;
  };


  /* LANGUAGES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-languages, span.bfh-languages, div.bfh-languages').each(function () {
      var $languages;

      $languages = $(this);

      if ($languages.hasClass('bfh-selectbox')) {
        $languages.bfhselectbox($languages.data());
      }
      $languages.bfhlanguages($languages.data());
    });
  });


  /* LANGUAGES HELPERS
   * ============== */

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-number.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* NUMBER CLASS DEFINITION
   * ====================== */

  var BFHNumber = function (element, options) {
    this.options = $.extend({}, $.fn.bfhnumber.defaults, options);
    this.$element = $(element);

    this.initInput();
  };

  BFHNumber.prototype = {

    constructor: BFHNumber,

    initInput: function() {
      var value;
      
      if (this.options.buttons === true) {
        this.$element.wrap('<div class="input-group"></div>');
        this.$element.parent().append('<span class="input-group-addon bfh-number-btn inc"><span class="glyphicon glyphicon-chevron-up"></span></span>');
        this.$element.parent().append('<span class="input-group-addon bfh-number-btn dec"><span class="glyphicon glyphicon-chevron-down"></span></span>');
      }
      
      this.$element.on('change.bfhnumber.data-api', BFHNumber.prototype.change);
        
      if (this.options.keyboard === true) {
        this.$element.on('keydown.bfhnumber.data-api', BFHNumber.prototype.keydown);
      }
      
      if (this.options.buttons === true) {
        this.$element.parent()
          .on('mousedown.bfhnumber.data-api', '.inc', BFHNumber.prototype.btninc)
          .on('mousedown.bfhnumber.data-api', '.dec', BFHNumber.prototype.btndec);
      }
      
      this.formatNumber();
    },
    
    keydown: function(e) {
      var $this;
      
      $this = $(this).data('bfhnumber');
      
      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }
      
      switch (e.which) {
        case 38:
          $this.increment();
          break;
        case 40:
          $this.decrement();
          break;
        default:
      }
      
      return true;
    },
    
    mouseup: function(e) {
      var $this,
          timer,
          interval;
      
      $this = e.data.btn;
      timer = $this.$element.data('timer');
      interval = $this.$element.data('interval');
      
      clearTimeout(timer);
      clearInterval(interval);
    },
    
    btninc: function() {
      var $this,
          timer;
      
      $this = $(this).parent().find('.bfh-number').data('bfhnumber');
      
      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }
      
      $this.increment();
      
      timer = setTimeout(function() {
        var interval;
        interval = setInterval(function() {
          $this.increment();
        }, 80);
        $this.$element.data('interval', interval);
      }, 750);
      $this.$element.data('timer', timer);
      
      $(document).one('mouseup', {btn: $this}, BFHNumber.prototype.mouseup);
      
      return true;
    },
    
    btndec: function() {
      var $this,
          timer;
      
      $this = $(this).parent().find('.bfh-number').data('bfhnumber');
      
      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }
      
      $this.decrement();
      
      timer = setTimeout(function() {
        var interval;
        interval = setInterval(function() {
          $this.decrement();
        }, 80);
        $this.$element.data('interval', interval);
      }, 750);
      $this.$element.data('timer', timer);
      
      $(document).one('mouseup', {btn: $this}, BFHNumber.prototype.mouseup);
      
      return true;
    },
    
    change: function() {
      var $this;

      $this = $(this).data('bfhnumber');

      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }

      $this.formatNumber();

      return true;
    },
    
    increment: function() {
      var value;
      
      value = this.getValue();
      
      value = value + 1;
      
      this.$element.val(value).change();
    },
    
    decrement: function() {
      var value;
      
      value = this.getValue();
      
      value = value - 1;
      
      this.$element.val(value).change();
    },
    
    getValue: function() {
      var value;
      
      value = this.$element.val();
      if (value !== '-1') {
        value = String(value).replace(/\D/g, '');
      }
      if (String(value).length === 0) {
        value = this.options.min;
      }
      
      return parseInt(value);
    },
    
    formatNumber: function() {
      var value,
          maxLength,
          length,
          zero;
      
      value = this.getValue();
      
      if (value > this.options.max) {
        if (this.options.wrap === true) {
          value = this.options.min;
        } else {
          value = this.options.max;
        }
      }
      
      if (value < this.options.min) {
        if (this.options.wrap === true) {
          value = this.options.max;
        } else {
          value = this.options.min;
        }
      }
      
      if (this.options.zeros === true) {
        maxLength = String(this.options.max).length;
        length = String(value).length;
        for (zero=length; zero < maxLength; zero = zero + 1) {
          value = '0' + value;
        }
      }
      
      if (value !== this.$element.val()) {
        this.$element.val(value);
      }
    }

  };

  /* NUMBER PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhnumber;

  $.fn.bfhnumber = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhnumber');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhnumber', (data = new BFHNumber(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhnumber.Constructor = BFHNumber;

  $.fn.bfhnumber.defaults = {
    min: 0,
    max: 9999,
    zeros: false,
    keyboard: true,
    buttons: true,
    wrap: false
  };


  /* NUMBER NO CONFLICT
   * ========================== */

  $.fn.bfhnumber.noConflict = function () {
    $.fn.bfhnumber = old;
    return this;
  };


  /* NUMBER DATA-API
   * ============== */

  $(document).ready( function () {
    $('form input[type="text"].bfh-number, form input[type="number"].bfh-number').each(function () {
      var $number;

      $number = $(this);

      $number.bfhnumber($number.data());
    });
  });


  /* APPLY TO STANDARD NUMBER ELEMENTS
   * =================================== */


}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-phone.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* PHONE CLASS DEFINITION
   * ====================== */

  var BFHPhone = function (element, options) {
    this.options = $.extend({}, $.fn.bfhphone.defaults, options);
    this.$element = $(element);

    if (this.$element.is('input[type="text"]') || this.$element.is('input[type="tel"]')) {
      this.addFormatter();
    }

    if (this.$element.is('span')) {
      this.displayFormatter();
    }
  };

  BFHPhone.prototype = {

    constructor: BFHPhone,

    addFormatter: function() {
      var $country;

      if (this.options.country !== '') {
        $country = $(document).find('#' + this.options.country);

        if ($country.length !== 0) {
          this.options.format = BFHPhoneFormatList[$country.val()];
          $country.on('change', {phone: this}, this.changeCountry);
        } else {
          this.options.format = BFHPhoneFormatList[this.options.country];
        }
      }
      
      this.$element.on('keyup.bfhphone.data-api', BFHPhone.prototype.change);

      this.loadFormatter();
    },

    loadFormatter: function () {
      var formattedNumber;

      formattedNumber = formatNumber(this.options.format, this.$element.val());

      this.$element.val(formattedNumber);
    },

    displayFormatter: function () {
      var formattedNumber;

      if (this.options.country !== '') {
        this.options.format = BFHPhoneFormatList[this.options.country];
      }

      formattedNumber = formatNumber(this.options.format, this.options.number);

      this.$element.html(formattedNumber);
    },

    changeCountry: function (e) {
      var $this,
          $phone;

      $this = $(this);
      $phone = e.data.phone;

      $phone.$element.val(String($phone.$element.val()).replace(/\+\d*/g, ''));
      $phone.options.format = BFHPhoneFormatList[$this.val()];

      $phone.loadFormatter();
    },

    change: function(e) {
      var $this,
          cursorPosition,
          cursorEnd,
          formattedNumber;

      $this = $(this).data('bfhphone');

      if ($this.$element.is('.disabled') || $this.$element.attr('disabled') !== undefined) {
        return true;
      }

      cursorPosition = getCursorPosition($this.$element[0]);

      cursorEnd = false;
      if (cursorPosition === $this.$element.val().length) {
        cursorEnd = true;
      }
      
      if (e.which === 8 && $this.options.format.charAt($this.$element.val().length) !== 'd') {
        $this.$element.val(String($this.$element.val()).substring(0, $this.$element.val().length - 1));
      }

      formattedNumber = formatNumber($this.options.format, $this.$element.val());
      
      if (formattedNumber === $this.$element.val()) {
        return true;
      }
      
      $this.$element.val(formattedNumber);

      if (cursorEnd) {
        cursorPosition = $this.$element.val().length;
      }

      setCursorPosition($this.$element[0], cursorPosition);

      return true;
    }

  };

  function formatNumber(format, number) {
    var formattedNumber,
        indexFormat,
        indexNumber,
        lastCharacter;

    formattedNumber = '';
    number = String(number).replace(/\D/g, '');

    for (indexFormat = 0, indexNumber = 0; indexFormat < format.length; indexFormat = indexFormat + 1) {
      if (/\d/g.test(format.charAt(indexFormat))) {
        if (format.charAt(indexFormat) === number.charAt(indexNumber)) {
          formattedNumber += number.charAt(indexNumber);
          indexNumber = indexNumber + 1;
        } else {
          formattedNumber += format.charAt(indexFormat);
        }
      } else if (format.charAt(indexFormat) !== 'd') {
        if (number.charAt(indexNumber) !== '' || format.charAt(indexFormat) === '+') {
          formattedNumber += format.charAt(indexFormat);
        }
      } else {
        if (number.charAt(indexNumber) === '') {
          formattedNumber += '';
        } else {
          formattedNumber += number.charAt(indexNumber);
          indexNumber = indexNumber + 1;
        }
      }
    }
    
    lastCharacter = format.charAt(formattedNumber.length);
    if (lastCharacter !== 'd') {
      formattedNumber += lastCharacter;
    }

    return formattedNumber;
  }

  function getCursorPosition($element) {
    var position = 0,
        selection;

    if (document.selection) {
      // IE Support
      $element.focus();
      selection = document.selection.createRange();
      selection.moveStart ('character', -$element.value.length);
      position = selection.text.length;
    } else if ($element.selectionStart || $element.selectionStart === 0) {
      position = $element.selectionStart;
    }

    return position;
  }

  function setCursorPosition($element, position) {
    var selection;

    if (document.selection) {
      // IE Support
      $element.focus ();
      selection = document.selection.createRange();
      selection.moveStart ('character', -$element.value.length);
      selection.moveStart ('character', position);
      selection.moveEnd ('character', 0);
      selection.select ();
    } else if ($element.selectionStart || $element.selectionStart === 0) {
      $element.selectionStart = position;
      $element.selectionEnd = position;
      $element.focus ();
    }
  }

  /* PHONE PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhphone;

  $.fn.bfhphone = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhphone');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhphone', (data = new BFHPhone(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhphone.Constructor = BFHPhone;

  $.fn.bfhphone.defaults = {
    format: '',
    number: '',
    country: ''
  };


  /* PHONE NO CONFLICT
   * ========================== */

  $.fn.bfhphone.noConflict = function () {
    $.fn.bfhphone = old;
    return this;
  };


  /* PHONE DATA-API
   * ============== */

  $(document).ready( function () {
    $('form input[type="text"].bfh-phone, form input[type="tel"].bfh-phone, span.bfh-phone').each(function () {
      var $phone;

      $phone = $(this);

      $phone.bfhphone($phone.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-selectbox.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* SELECTBOX CLASS DEFINITION
   * ========================= */

  var toggle = '[data-toggle=bfh-selectbox]',
      BFHSelectBox = function (element, options) {
        this.options = $.extend({}, $.fn.bfhselectbox.defaults, options);
        this.$element = $(element);

        this.initSelectBox();
      };

  BFHSelectBox.prototype = {

    constructor: BFHSelectBox,

    initSelectBox: function () {
      var options;

      options = '';
      this.$element.find('div').each(function() {
        options = options + '<li><a tabindex="-1" href="#" data-option="' + $(this).data('value') + '">' + $(this).html() + '</a></li>';
      });

      this.$element.html(
        '<input type="hidden" name="' + this.options.name + '" value="">' +
		'<a class="bfh-selectbox-toggle ' + this.options.input + '" role="button" data-toggle="bfh-selectbox" href="#">' +
		'<span class="bfh-selectbox-option"></span>' +
		'<span class="' + this.options.icon + ' selectbox-caret"></span>' +
		'</a>' +
		'<div class="bfh-selectbox-options">' +
		'<div role="listbox">' +
		'<ul role="option">' +
		'</ul>' +
		'</div>' +
		'</div>'
      );

      this.$element.find('[role=option]').html(options);

      if (this.options.filter === true) {
        this.$element.find('.bfh-selectbox-options').prepend('<div class="bfh-selectbox-filter-container"><input type="text" class="bfh-selectbox-filter form-control"></div>');
      }

      this.$element.val(this.options.value);

      this.$element
        .on('click.bfhselectbox.data-api touchstart.bfhselectbox.data-api', toggle, BFHSelectBox.prototype.toggle)
		.on('keydown.bfhselectbox.data-api', toggle + ', [role=option]' , BFHSelectBox.prototype.keydown)
		.on('mouseenter.bfhselectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter)
		.on('click.bfhselectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.select)
		.on('click.bfhselectbox.data-api', '.bfh-selectbox-filter', function () { return false; })
		.on('propertychange.bfhselectbox.data-api change.bfhselectbox.data-api input.bfhselectbox.data-api paste.bfhselectbox.data-api', '.bfh-selectbox-filter', BFHSelectBox.prototype.filter);
    },

    toggle: function (e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhselectbox'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhselectbox')
          .find('[role=option] > li > [data-option="' + $parent.val() + '"]').focus();
      }

      return false;
    },

    filter: function() {
      var $this,
          $parent,
          $items;

      $this = $(this);
      $parent = getParent($this);

      $items = $('[role=option] li a', $parent);
      $items
        .hide()
        .filter(function() {
          return ($(this).text().toUpperCase().indexOf($this.val().toUpperCase()) !== -1);
        })
        .show();
    },

    keydown: function (e) {
      var $this,
          $items,
          $parent,
          $subItems,
          isActive,
          index,
          selectedIndex;

      if (!/(38|40|27)/.test(e.keyCode)) {
        return true;
      }

      $this = $(this);

      e.preventDefault();
      e.stopPropagation();

      $parent = getParent($this);
      isActive = $parent.hasClass('open');

      if (!isActive || (isActive && e.keyCode === 27)) {
        if (e.which === 27) {
          $parent.find(toggle).focus();
        }

        return $this.click();
      }

      $items = $('[role=option] li:not(.divider) a:visible', $parent);

      if (!$items.length) {
        return true;
      }

      $('body').off('mouseenter.bfh-selectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter);
      index = $items.index($items.filter(':focus'));

      if (e.keyCode === 38 && index > 0) {
        index = index - 1;
      }

      if (e.keyCode === 40 && index < $items.length - 1) {
        index = index + 1;
      }

      if (!index) {
        index = 0;
      }

      $items.eq(index).focus();
      $('body').on('mouseenter.bfh-selectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter);
    },

    mouseenter: function () {
      var $this;

      $this = $(this);

      $this.focus();
    },

    select: function (e) {
      var $this,
          $parent,
          $span,
          $input;

      $this = $(this);

      e.preventDefault();
      e.stopPropagation();

      if ($this.is('.disabled') || $this.attr('disabled') !== undefined) {
        return true;
      }

      $parent = getParent($this);

      $parent.val($this.data('option'));
      $parent.trigger('change.bfhselectbox');

      clearMenus();
    }

  };

  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhselectbox'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhselectbox');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-selectbox');
  }


  /* SELECTBOX PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhselectbox;

  $.fn.bfhselectbox = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhselectbox');
      options = typeof option === 'object' && option;
      this.type = 'bfhselectbox';

      if (!data) {
        $this.data('bfhselectbox', (data = new BFHSelectBox(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhselectbox.Constructor = BFHSelectBox;

  $.fn.bfhselectbox.defaults = {
    icon: 'caret',
    input: 'form-control',
    name: '',
    value: '',
    filter: false
  };


  /* SELECTBOX NO CONFLICT
   * ========================== */

  $.fn.bfhselectbox.noConflict = function () {
    $.fn.bfhselectbox = old;
    return this;
  };


  /* SELECTBOX VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-selectbox')) {
        return $(el).find('input[type="hidden"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      var $el,
          html;

      if ($(el).hasClass('bfh-selectbox')) {

        $el = $(el);
        if ($el.find('li a[data-option=\'' + val + '\']').length > 0) {
          html = $el.find('li a[data-option=\'' + val + '\']').html();
        } else if ($el.find('li a').length > 0) {
          html = $el.find('li a').eq(0).html();
        } else {
          val = '';
          html = '';
        }

        $el.find('input[type="hidden"]').val(val);
        $el.find('.bfh-selectbox-option').html(html);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* SELECTBOX DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-selectbox').each(function () {
      var $selectbox;

      $selectbox = $(this);

      $selectbox.bfhselectbox($selectbox.data());
    });
  });


  /* APPLY TO STANDARD SELECTBOX ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhselectbox.data-api', clearMenus);

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-slider.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* BFHSLIDER CLASS DEFINITION
   * ========================= */

  var BFHSlider = function (element, options) {
        this.options = $.extend({}, $.fn.bfhslider.defaults, options);
        this.$element = $(element);
        
        this.initSlider();
      };

  BFHSlider.prototype = {

    constructor: BFHSlider,

    initSlider: function() {
      if (this.options.value === '') {
        this.options.value = this.options.min;
      }
      
      this.$element.html(
        '<input type="hidden" name="' + this.options.name + '" value="">' +
        '<div class="bfh-slider-handle"><div class="bfh-slider-value"></div></div>'
      );
      
      this.$element.find('input[type="hidden"]').val(this.options.value);
      this.updateHandle(this.options.value);
      
      this.$element.on('mousedown.bfhslider.data-api', BFHSlider.prototype.mouseDown);
    },
    
    updateHandle: function(val) {
      var positionX,
          width,
          left,
          span;
          
      span = this.options.max - this.options.min;
      width = this.$element.width();
      left = this.$element.position().left;
      
      positionX = Math.round((val - this.options.min) * (width - 20) / span + left);
      
      this.$element.find('.bfh-slider-handle').css('left', positionX + 'px');
      this.$element.find('.bfh-slider-value').text(val);
    },
    
    updateVal: function(positionX) {
      var width,
          left,
          right,
          val,
          span;
      
      span = this.options.max - this.options.min;
      width = this.$element.width();
      left = this.$element.offset().left;
      right = left + width;
      
      if (positionX < left) {
        positionX = left;
      }
      
      if (positionX + 20 > right) {
        positionX = right;
      }
      
      val = (positionX - left) / width;
      val = Math.ceil(val * span + this.options.min);
      
      if (val === this.$element.val()) {
        return true;
      }
      
      this.$element.val(val);
      
      this.$element.trigger('change.bfhslider');
    },
    
    mouseDown: function() {
      var $this;
      
      $this = $(this);
      
      if ($this.is('.disabled') || $this.attr('disabled') !== undefined) {
        return true;
      }
      
      $(document)
        .on('mousemove.bfhslider.data-api', {slider: $this}, BFHSlider.prototype.mouseMove)
        .one('mouseup.bfhslider.data-api', {slider: $this}, BFHSlider.prototype.mouseUp);
    },
    
    mouseMove: function(e) {
      var $this;
      
      $this = e.data.slider;
      
      $this.data('bfhslider').updateVal(e.pageX);
    },
    
    mouseUp: function(e) {
      var $this;
      
      $this = e.data.slider;
      
      $this.data('bfhslider').updateVal(e.pageX);
      
      $(document).off('mousemove.bfhslider.data-api');
    }
  };


  /* SLIDER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhslider;

  $.fn.bfhslider = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhslider');
      options = typeof option === 'object' && option;
      this.type = 'bfhslider';

      if (!data) {
        $this.data('bfhslider', (data = new BFHSlider(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhslider.Constructor = BFHSlider;

  $.fn.bfhslider.defaults = {
    name: '',
    value: '',
    min: 0,
    max: 100
  };


  /* SLIDER NO CONFLICT
   * ========================== */

  $.fn.bfhslider.noConflict = function () {
    $.fn.bfhslider = old;
    return this;
  };


  /* SLIDER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-slider')) {
        return $(el).find('input[type="hidden"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      if ($(el).hasClass('bfh-slider')) {
        $(el).find('input[type="hidden"]').val(val);
        $(el).data('bfhslider').updateHandle(val);
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* SLIDER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-slider').each(function () {
      var $slider;

      $slider = $(this);

      $slider.bfhslider($slider.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-states.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* STATES CLASS DEFINITION
   * ====================== */

  var BFHStates = function (element, options) {
    this.options = $.extend({}, $.fn.bfhstates.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addStates();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapStates();
    }

    if (this.$element.is('span')) {
      this.displayState();
    }
  };

  BFHStates.prototype = {

    constructor: BFHStates,

    addStates: function () {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.val();
          $country.on('change', {state: this}, this.changeCountry);
        }
      }

      this.loadStates(country);
    },

    loadStates: function (country) {
      var value,
          state;

      value = this.options.state;

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (state in BFHStatesList[country]) {
        if (BFHStatesList[country].hasOwnProperty(state)) {
          this.$element.append('<option value="' + BFHStatesList[country][state].code + '">' + BFHStatesList[country][state].name + '</option>');
        }
      }

      this.$element.val(value);
    },

    changeCountry: function (e) {
      var $this,
          $state,
          country;

      $this = $(this);
      $state = e.data.state;
      country = $this.val();

      $state.loadStates(country);
    },

    addBootstrapStates: function() {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.find('input[type="hidden"]').val();
          $country.on('change.bfhselectbox', {state: this}, this.changeBootstrapCountry);
        }
      }

      this.loadBootstrapStates(country);
    },

    loadBootstrapStates: function(country) {
      var $input,
          $toggle,
          $options,
          stateCode,
          stateName,
          state;

      stateCode = this.options.state;
      stateName = '';
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (state in BFHStatesList[country]) {
        if (BFHStatesList[country].hasOwnProperty(state)) {
          $options.append('<li><a tabindex="-1" href="#" data-option="' + BFHStatesList[country][state].code + '">' + BFHStatesList[country][state].name + '</a></li>');

          if (BFHStatesList[country][state].code === stateCode) {
            stateName = BFHStatesList[country][state].name;
          }
        }
      }

      this.$element.val(stateCode);
    },

    changeBootstrapCountry: function (e) {
      var $this,
          $state,
          country;

      $this = $(this);
      $state = e.data.state;
      country = $this.val();

      $state.loadBootstrapStates(country);
    },

    displayState: function () {
      var country,
          stateCode,
          stateName,
          state;

      country = this.options.country;
      stateCode = this.options.state;
      stateName = '';

      for (state in BFHStatesList[country]) {
        if (BFHStatesList[country].hasOwnProperty(state)) {
          if (BFHStatesList[country][state].code === stateCode) {
            stateName = BFHStatesList[country][state].name;
            break;
          }
        }
      }
      this.$element.html(stateName);
    }

  };


  /* STATES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhstates;

  $.fn.bfhstates = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhstates');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhstates', (data = new BFHStates(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhstates.Constructor = BFHStates;

  $.fn.bfhstates.defaults = {
    country: '',
    state: '',
    blank: true
  };


  /* STATES NO CONFLICT
   * ========================== */

  $.fn.bfhstates.noConflict = function () {
    $.fn.bfhstates = old;
    return this;
  };


  /* STATES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-states, span.bfh-states, div.bfh-states').each(function () {
      var $states;

      $states = $(this);

      if ($states.hasClass('bfh-selectbox')) {
        $states.bfhselectbox($states.data());
      }
      $states.bfhstates($states.data());
    });
  });

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-timepicker.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


+function ($) {

  'use strict';


 /* TIMEPICKER CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=bfh-timepicker]',
      BFHTimePicker = function (element, options) {
        this.options = $.extend({}, $.fn.bfhtimepicker.defaults, options);
        this.$element = $(element);

        this.initPopover();
      };

  BFHTimePicker.prototype = {

    constructor: BFHTimePicker,

    setTime: function() {
      var time,
          today,
          timeParts,
          hours,
          minutes,
          mode,
          currentMode;

      time = this.options.time;
      mode = '';
      currentMode = '';
      
      if (time === '' || time === 'now' || time === undefined) {
        today = new Date();

        hours = today.getHours();
        minutes = today.getMinutes();
        
        if (this.options.mode === '12h') {
          if (hours > 12) {
            hours = hours - 12;
            mode = ' ' + BFHTimePickerModes.pm;
            currentMode = 'pm';
          } else {
            mode = ' ' + BFHTimePickerModes.am;
            currentMode = 'am';
          }
        }
        
        if (time === 'now') {
          this.$element.find('.bfh-timepicker-toggle > input[type="text"]').val(formatTime(hours, minutes) + mode);
        }

        this.$element.data('hour', hours);
        this.$element.data('minute', minutes);
        this.$element.data('mode', currentMode);
      } else {
        timeParts = String(time).split(BFHTimePickerDelimiter);
        hours = timeParts[0];
        minutes = timeParts[1];
        
        if (this.options.mode === '12h') {
          timeParts = String(minutes).split(' ');
          minutes = timeParts[0];
          if (timeParts[1] === BFHTimePickerModes.pm) {
            currentMode = 'pm';
          } else {
            currentMode = 'am';
          }
        }
        
        this.$element.find('.bfh-timepicker-toggle > input[type="text"]').val(time);
        this.$element.data('hour', hours);
        this.$element.data('minute', minutes);
        this.$element.data('mode', currentMode);
      }
    },

    initPopover: function() {
      var iconLeft,
          iconRight,
          iconAddon,
          modeAddon,
          modeMax;

      iconLeft = '';
      iconRight = '';
      iconAddon = '';
      if (this.options.icon !== '') {
        if (this.options.align === 'right') {
          iconRight = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        } else {
          iconLeft = '<span class="input-group-addon"><i class="' + this.options.icon + '"></i></span>';
        }
        iconAddon = 'input-group';
      }
      
      modeAddon = '';
      modeMax = '23';
      if (this.options.mode === '12h') {
        modeAddon = '<td>' +
          '<div class="bfh-selectbox" data-input="' + this.options.input + '" data-value="am">' +
          '<div data-value="am">' + BFHTimePickerModes.am + '</div>' +
          '<div data-value="pm">' + BFHTimePickerModes.pm + '</div>' +
          '</div>';
        modeMax = '11';
      }

      this.$element.html(
        '<div class="' + iconAddon + ' bfh-timepicker-toggle" data-toggle="bfh-timepicker">' +
        iconLeft +
        '<input type="text" name="' + this.options.name + '" class="' + this.options.input + '" placeholder="' + this.options.placeholder + '" readonly>' +
        iconRight +
        '</div>' +
        '<div class="bfh-timepicker-popover">' +
        '<table class="table">' +
        '<tbody>' +
        '<tr>' +
        '<td class="hour">' +
        '<input type="text" class="' + this.options.input + ' bfh-number"  data-min="0" data-max="' + modeMax + '" data-zeros="true" data-wrap="true">' +
        '</td>' +
        '<td class="separator">' + BFHTimePickerDelimiter + '</td>' +
        '<td class="minute">' +
        '<input type="text" class="' + this.options.input + ' bfh-number"  data-min="0" data-max="59" data-zeros="true" data-wrap="true">' +
        '</td>' +
        modeAddon +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>'
      );

      this.$element
        .on('click.bfhtimepicker.data-api touchstart.bfhtimepicker.data-api', toggle, BFHTimePicker.prototype.toggle)
        .on('click.bfhtimepicker.data-api touchstart.bfhtimepicker.data-api', '.bfh-timepicker-popover > table', function() { return false; });

      this.$element.find('.bfh-number').each(function () {
        var $number;

        $number = $(this);

        $number.bfhnumber($number.data());
        
        $number.on('change', BFHTimePicker.prototype.change);
      });
      
      this.$element.find('.bfh-selectbox').each(function() {
        var $selectbox;

        $selectbox = $(this);

        $selectbox.bfhselectbox($selectbox.data());
        
        $selectbox.on('change.bfhselectbox', BFHTimePicker.prototype.change);
      });
      
      this.setTime();

      this.updatePopover();
    },

    updatePopover: function() {
      var hour,
          minute,
          mode;

      hour = this.$element.data('hour');
      minute = this.$element.data('minute');
      mode = this.$element.data('mode');

      this.$element.find('.hour input[type=text]').val(hour).change();
      this.$element.find('.minute input[type=text]').val(minute).change();
      this.$element.find('.bfh-selectbox').val(mode);
    },
    
    change: function() {
      var $this,
          $parent,
          $timePicker,
          mode;

      $this = $(this);
      $parent = getParent($this);
      
      $timePicker = $parent.data('bfhtimepicker');
      
      if ($timePicker && $timePicker !== 'undefined') {
        mode = '';
        if ($timePicker.options.mode === '12h') {
          mode = ' ' + BFHTimePickerModes[$parent.find('.bfh-selectbox').val()];
        }
        
        $parent.find('.bfh-timepicker-toggle > input[type="text"]').val($parent.find('.hour input[type=text]').val() + BFHTimePickerDelimiter + $parent.find('.minute input[type=text]').val() + mode);

        $parent.trigger('change.bfhtimepicker');
      }

      return false;
    },

    toggle: function(e) {
      var $this,
          $parent,
          isActive;

      $this = $(this);
      $parent = getParent($this);

      if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
        return true;
      }

      isActive = $parent.hasClass('open');

      clearMenus();

      if (!isActive) {
        $parent.trigger(e = $.Event('show.bfhtimepicker'));

        if (e.isDefaultPrevented()) {
          return true;
        }

        $parent
          .toggleClass('open')
          .trigger('shown.bfhtimepicker');

        $this.focus();
      }

      return false;
    }
  };

  function formatTime(hour, minute) {
    hour = String(hour);
    if (hour.length === 1) {
      hour = '0' + hour;
    }

    minute = String(minute);
    if (minute.length === 1) {
      minute = '0' + minute;
    }

    return hour + BFHTimePickerDelimiter + minute;
  }
  
  function clearMenus() {
    var $parent;

    $(toggle).each(function (e) {
      $parent = getParent($(this));

      if (!$parent.hasClass('open')) {
        return true;
      }

      $parent.trigger(e = $.Event('hide.bfhtimepicker'));

      if (e.isDefaultPrevented()) {
        return true;
      }

      $parent
        .removeClass('open')
        .trigger('hidden.bfhtimepicker');
    });
  }

  function getParent($this) {
    return $this.closest('.bfh-timepicker');
  }


  /* TIMEPICKER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.bfhtimepicker;

  $.fn.bfhtimepicker = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhtimepicker');
      options = typeof option === 'object' && option;
      this.type = 'bfhtimepicker';

      if (!data) {
        $this.data('bfhtimepicker', (data = new BFHTimePicker(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhtimepicker.Constructor = BFHTimePicker;

  $.fn.bfhtimepicker.defaults = {
    icon: 'glyphicon glyphicon-time',
    align: 'left',
    input: 'form-control',
    placeholder: '',
    name: '',
    time: 'now',
    mode: '24h'
  };


  /* TIMEPICKER NO CONFLICT
   * ========================== */

  $.fn.bfhtimepicker.noConflict = function () {
    $.fn.bfhtimepicker = old;
    return this;
  };


  /* TIMEPICKER VALHOOKS
   * ========================== */

  var origHook;
  if ($.valHooks.div){
    origHook = $.valHooks.div;
  }
  $.valHooks.div = {
    get: function(el) {
      if ($(el).hasClass('bfh-timepicker')) {
        return $(el).find('.bfh-timepicker-toggle > input[type="text"]').val();
      } else if (origHook) {
        return origHook.get(el);
      }
    },
    set: function(el, val) {
      var $timepicker;
      if ($(el).hasClass('bfh-timepicker')) {
        $timepicker = $(el).data('bfhtimepicker');
        $timepicker.options.time = val;
        $timepicker.setTime();
        $timepicker.updatePopover();
      } else if (origHook) {
        return origHook.set(el,val);
      }
    }
  };


  /* TIMEPICKER DATA-API
   * ============== */

  $(document).ready( function () {
    $('div.bfh-timepicker').each(function () {
      var $timepicker;

      $timepicker = $(this);

      $timepicker.bfhtimepicker($timepicker.data());
    });
  });


  /* APPLY TO STANDARD TIMEPICKER ELEMENTS
   * =================================== */

  $(document)
    .on('click.bfhtimepicker.data-api', clearMenus);

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-timezones.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

  'use strict';


  /* TIMEZONES CLASS DEFINITION
   * ====================== */

  var BFHTimezones = function (element, options) {
    this.options = $.extend({}, $.fn.bfhtimezones.defaults, options);
    this.$element = $(element);

    if (this.$element.is('select')) {
      this.addTimezones();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapTimezones();
    }
  };

  BFHTimezones.prototype = {

    constructor: BFHTimezones,

    addTimezones: function () {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.val();
          $country.on('change', {timezone: this}, this.changeCountry);
        }
      }

      this.loadTimezones(country);
    },

    loadTimezones: function (country) {
      var value,
          timezone;

      value = this.options.timezone;

      this.$element.html('');

      if (this.options.blank === true) {
        this.$element.append('<option value=""></option>');
      }

      for (timezone in BFHTimezonesList[country]) {
        if (BFHTimezonesList[country].hasOwnProperty(timezone)) {
          this.$element.append('<option value="' + timezone + '">' + BFHTimezonesList[country][timezone] + '</option>');
        }
      }

      this.$element.val(value);
    },

    changeCountry: function (e) {
      var $this,
          $timezone,
          country;

      $this = $(this);
      $timezone = e.data.timezone;
      country = $this.val();

      $timezone.loadTimezones(country);
    },

    addBootstrapTimezones: function() {
      var country,
          $country;

      country = this.options.country;

      if (country !== '') {
        $country = $(document).find('#' + country);

        if ($country.length !== 0) {
          country = $country.find('input[type="hidden"]').val();
          $country.on('change.bfhselectbox', {timezone: this}, this.changeBootstrapCountry);
        }
      }

      this.loadBootstrapTimezones(country);
    },

    loadBootstrapTimezones: function(country) {
      var $input,
          $toggle,
          $options,
          value,
          timezone;

      value = this.options.timezone;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');

      $options.html('');

      if (this.options.blank === true) {
        $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      }

      for (timezone in BFHTimezonesList[country]) {
        if (BFHTimezonesList[country].hasOwnProperty(timezone)) {
          $options.append('<li><a tabindex="-1" href="#" data-option="' + timezone + '">' + BFHTimezonesList[country][timezone] + '</a></li>');
        }
      }

      this.$element.val(value);
    },

    changeBootstrapCountry: function (e) {
      var $this,
          $timezone,
          country;

      $this = $(this);
      $timezone = e.data.timezone;
      country = $this.val();

      $timezone.loadBootstrapTimezones(country);
    }

  };


  /* TIMEZONES PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.bfhtimezones;

  $.fn.bfhtimezones = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;

      $this = $(this);
      data = $this.data('bfhtimezones');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhtimezones', (data = new BFHTimezones(this, options)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.bfhtimezones.Constructor = BFHTimezones;

  $.fn.bfhtimezones.defaults = {
    country: '',
    timezone: '',
    blank: true
  };


  /* TIMEZONES NO CONFLICT
   * ========================== */

  $.fn.bfhtimezones.noConflict = function () {
    $.fn.bfhtimezones = old;
    return this;
  };


  /* TIMEZONES DATA-API
   * ============== */

  $(document).ready( function () {
    $('form select.bfh-timezones, div.bfh-timezones').each(function () {
      var $timezones;

      $timezones = $(this);

      if ($timezones.hasClass('bfh-selectbox')) {
        $timezones.bfhselectbox($timezones.data());
      }
      $timezones.bfhtimezones($timezones.data());
    });
  });

}(window.jQuery);
