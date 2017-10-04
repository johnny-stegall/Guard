import ArgumentError from "./ArgumentError.js";

/******************************************************************************
* Provides parameter checking, enforces code contracts and helps reduce the
* number of unit tests that need to be written.
******************************************************************************/
class Guard
{
	/****************************************************************************
	* Ensures the values meets the specified condition.
	*
	* @param {boolean} condition The condition that must be true.
	* @param {string} parameterName The parameter name.
	* @param {string} message A message describing the error.
	****************************************************************************/
	static assertCondition(condition, parameterName, message)
	{
		Guard.assertNotNull(condition, "condition");
		Guard.assertNotEmpty(parameterName, "parameterName");
		Guard.assertNotEmpty(message, "message");
		Guard.assertType(condition, Boolean, "condition");
		Guard.assertType(parameterName, String, "parameterName");
		Guard.assertType(message, String, "message");

		if (!condition)
			throw new ArgumentError(parameterName, message);
	}

	/****************************************************************************
	* Ensures the value is valid for the given enumeration (object). Also
	* ensures the enum object is frozen to be a valid enum.
	*
	* @param {any} value The value to test.
	* @param {object} enumObject The object emulating an enumeration.
	* @param {string} enumName The name of the enum.
	****************************************************************************/
	static assertEnum(value, enumObject, enumName)
	{
		Guard.assertNotNull(value, "value");
		Guard.assertNotNull(enumObject, "enumObject");
		Guard.assertNotEmpty(enumName, "enumName");
		Guard.assertType(enumObject, Object, "enumObject");
		Guard.assertType(enumName, String, "enumName");

		if (!Object.isFrozen(enumObject))
			throw new TypeError("Specified enum object isn't frozen.");

		if (Object.keys(enumObject).indexOf(value) < 0 && Object.values(enumObject).indexOf(value) < 0)
			throw new RangeError(`${value} is not a valid value of ${enumName}.`);
	}

	/****************************************************************************
	* Ensures the value is not empty.
	*
	* @param {any} value The value to test.
	* @param {string} parameterName The parameter name.
	****************************************************************************/
	static assertNotEmpty(value, parameterName)
	{
		if (parameterName == null)
			throw new ReferenceError(`${parameterName} is not defined.`);

		Guard.assertType(parameterName, String, "parameterName");

		if (parameterName.length < 1)
			throw new ArgumentError("parameterName");

		Guard.assertNotNull(value, parameterName);

		if ((typeof value === "string" || value instanceof String) && value.length < 1)
			throw new ArgumentError(parameterName);
		else if (Array.isArray(value) && value.length < 1)
			throw new ArgumentError(parameterName);
		else if ((typeof value === "object" || value instanceof Object) && Object.keys(value).length < 1)
			throw new ArgumentError(parameterName);
	}

	/****************************************************************************
	* Ensures the value is not null.
	*
	* @param {any} value The value to test.
	* @param {string} parameterName The parameter name.
	****************************************************************************/
	static assertNotNull(value, parameterName)
	{
		if (parameterName == null)
			throw new ReferenceError(`${parameterName} is not defined.`);
			
		Guard.assertType(parameterName, String, "parameterName");

		if (parameterName.length < 1)
			throw new ArgumentError("parameterName");

		if (value === null || typeof value === "undefined")
			throw new ReferenceError(`${parameterName} is not defined.`);
	}

	/****************************************************************************
	* Ensures the value is the desired type. This also works with primitives:
	* both instanceof and typeof operators are used for comparison.
	*
	* @param {any} value The value to test.
	* @param {type} type The desired type.
	* @param {string} parameterName The parameter name.
	****************************************************************************/
	static assertType(value, type, parameterName)
	{
		if (!(type instanceof Function))
			throw new TypeError("type must be a constructor (even for primitives).");
		else if (parameterName === null)
			throw new ReferenceError(`${parameterName} is not defined.`);
		else if (!(typeof parameterName === "string"))
			throw new TypeError("parameterName must be a string.");
		else if (parameterName.length < 1)
			throw new ArgumentError("parameterName");

		if (type.name === "Boolean")
		{
			if (typeof value != "boolean" && !(value instanceof Boolean))
				throw new TypeError(`${parameterName} is not of expected type: ${type.name}.`);
		}
		else if (type.name === "Number")
		{
			if (typeof value != "number" && !(value instanceof Number))
				throw new TypeError(`${parameterName} is not of expected type: ${type.name}.`);
		}
		else if (type.name === "Object")
		{
			if (typeof value != "object" && !(value instanceof Object))
				throw new TypeError(`${parameterName} is not of expected type: ${type.name}.`);
		}
		else if (type.name === "String")
		{
			if (typeof value != "string" && !(value instanceof String))
				throw new TypeError(`${parameterName} is not of expected type: ${type.name}.`);
		}
		else if (!(value instanceof type))
			throw new TypeError(`${parameterName} is not of expected type: ${type.name}.`);
	}
}

export 
{
	Guard,
	ArgumentError
};