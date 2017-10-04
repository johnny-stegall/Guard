/******************************************************************************
* An exception thrown because an argument does not meet the contract of a
* method.
******************************************************************************/
class ArgumentError extends Error
{
	/******************************************************************************
	* Creates an instance of ArgumentError.
	*
	* @param {string} parameterName The parameter that is null.
	* @param {string} message The error message.
	******************************************************************************/
	constructor(parameterName, message)
	{
		super(message || `The value of "${parameterName}" is invalid.`);
		
		if (typeof parameterName != "string")
			throw new ArgumentError("parameterName", "parameterName should be a string.");
		else if (!parameterName)
			throw new ArgumentNullError("parameterName");

		this.name = "ArgumentError";
  }
}

export default ArgumentError;