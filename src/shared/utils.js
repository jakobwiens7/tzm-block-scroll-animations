/**
 * External dependencies
 */
import { isEmpty, isObject, identity, mapValues, pickBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { createInterpolateElement } from '@wordpress/element';


/**
 * Utility function to check if an object has any nested value.
 *
 * @param {object} 	obj		The object to check.
 *
 * @return {boolean}		True if any child value is truthy, otherwise false.
 */
export function hasNestedValue( object ) {
	if ( ! object || typeof object !== 'object' ) return false; // Return false for null, undefined, or non-objects

	return Object.values( object ).some( ( value ) => {
		if ( typeof value === 'object' && value !== null ) {
			// Recursive call for nested objects
			return hasNestedValue( value );
		}
		return !! value; // Check if the value is truthy
	} );
}

/**
 * Removed empty nodes from nested objects.
 *
 * @param {Object} object
 *
 * @return {Object} Object cleaned from empty nodes.
 */
export function cleanEmptyObject( object ) {
	if ( ! isObject( object ) || Array.isArray( object ) ) return object;

	// Custom filter function to exclude only null, undefined, false and empty string values
	const isNotEmptyValue = ( value ) =>
		value !== null &&
		value !== undefined &&
		value !== '' &&
		value !== false;

	const cleanedNestedObjects = pickBy(
		mapValues( object, cleanEmptyObject ),
		//identity
		isNotEmptyValue
	);
	return isEmpty( cleanedNestedObjects ) ? undefined : cleanedNestedObjects;
}

/**
 * Determines whether an object contains an animation-related value.
 *
 * @param {Object} object - The object to inspect.
 * @param {string} [axis=''] - The axis suffix to check (e.g., 'X', 'Y', 'Z').
 *
 * @returns {boolean} - Returns `true` if any relevant property contains a truthy value, otherwise `false`.
 */
export function hasAnimationValue( object, axis = '' ) {
	if ( ! object ) return;

	return [
		object?.[ `start${ axis }` ],
		object?.[ `end${ axis }` ],
		...Object.values( object?.responsive ?? {} ).flatMap( ( res ) => [
			res[ `start${ axis }` ],
			res[ `end${ axis }` ],
		] ),
	].some( ( value ) => !! value );
}



/**
 * Thin wrapper around `createInterpolateElement` to interpolate React elements into a translation string.
 *
 * @param {string} string - The translation string containing placeholders or HTML-like tags where elements should be inserted.
 * @param {Object|Array<React.ReactNode>} elements - A mapping or list of React nodes to substitute for placeholders in the string.
 *                                                    When an object is provided, keys correspond to placeholder names/tags.
 * @returns {React.ReactNode} The resulting React node (or array of nodes) with the provided elements interpolated.
 */
export function textWithElements( string, elements ) {
    return createInterpolateElement( string, elements );
}
