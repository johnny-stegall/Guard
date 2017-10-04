import {Guard, ArgumentError} from "./Guard.js";
import test from "ava";

test("Assert Condition", t =>
{
	// Act
	Guard.assertCondition(13 % 2 == 1, "testParameter", "Value must be even.");

	// Assert
	t.pass();
});

test("Assert Condition Fails", t =>
{
	// Act & Assert
	t.throws(() => Guard.assertCondition(13 % 2 == 0, "testParameter", "Value must be odd."), {instanceOf: ArgumentError});
});

test("Assert Condition Valid Arguments", t =>
{
	// Act & Assert
	t.throws(() => Guard.assertCondition(13 == 13, "", null), {instanceOf: ArgumentError});
	t.throws(() => Guard.assertCondition(13 == 13), {instanceOf: ReferenceError});
	t.throws(() => Guard.assertCondition(13 == 13, "parameter", ""), {instanceOf: ArgumentError});
	t.throws(() => Guard.assertCondition(13 == 13, "parameter", null), {instanceOf: ReferenceError});
});

test("Assert Not Empty String", t =>
{
	// Arrange
	const NOT_EMPTY = "This string isn't empty.";

	// Act
	Guard.assertNotEmpty(NOT_EMPTY, "testParameter");

	// Assert
	t.pass();
});

test("Assert Not Empty String Fails", t =>
{
	// Act & Assert
	t.throws(() => Guard.assertNotEmpty("", "testParameter"), {instanceOf: ArgumentError});
});

test("Assert Not Empty Array", t =>
{
	// Arrange
	const notEmpty = ["This array isn't empty."];

	// Act
	Guard.assertNotEmpty(notEmpty, "parameter");

	// Assert
	t.pass();
});

test("Assert Not Empty Array Fails", t =>
{
	// Arrange
	const EMPTY_ARRAY = [];

	// Act & Assert
	t.throws(() => Guard.assertNotEmpty(EMPTY_ARRAY, "parameter") , {instanceOf: ArgumentError});
});

test("Assert Not Empty Object", t =>
{
	// Arrange
	const notEmpty = { text: "This object isn't empty." };

	// Act
	Guard.assertNotEmpty(notEmpty, "parameter");

	// Assert
	t.pass();
});

test("Assert Not Empty Object Fails", t =>
{
	// Arrange
	const EMPTY_OBJECT = {};

	// Act & Assert
	t.throws(() =>
	{
		Guard.assertNotEmpty(EMPTY_OBJECT, "parameter");
	}, {instanceOf: ArgumentError});
});

test("Assert Not Empty Valid Arguments", t =>
{
	// Arrange
	const NOT_EMPTY = "This string isn't empty.";
	const IS_NULL = null;

	// Act & Assert
	t.throws(() => Guard.assertNotEmpty(NOT_EMPTY, ""), {instanceOf: ArgumentError});
	t.throws(() => Guard.assertNotEmpty(NOT_EMPTY, null), {instanceOf: ReferenceError});
	t.throws(() => Guard.assertNotEmpty(IS_NULL, null), {instanceOf: ReferenceError});
});

test("Assert Not Null", t =>
{
	// Arrange
	const testObject = { id: 1 };
	const isEmpty = {};

	// Act
	Guard.assertNotNull(testObject, "testParameter");
	Guard.assertNotNull(isEmpty, "testParameter");

	// Assert
	t.pass();
});

test("Assert Not Null Fails", t =>
{
	// Arrange
	const isNull = null;

	// Act & Assert
	t.throws(() => Guard.assertNotNull(isNull, "testParameter"), {instanceOf: ReferenceError});
});

test("Assert Not Null Valid Arguments", t =>
{
	// Arrange
	let IS_NULL = null;

	// Act & Assert
	t.throws(() => Guard.assertNotNull(IS_NULL, null), {instanceOf: ReferenceError});
});

test("Assert Type", t =>
{
	// Arrange
	const LUCKY = 13;
	const UNLUCKY = "Friday the 13th";
	const OBJECT = {};
	const ARRAY = [];
	const FUNCTION = () => {};
	const REGEX = /[0-9]+/g;
	const BOOL = false;
	
	// Act
	Guard.assertType(LUCKY, Number, "LUCKY");
	Guard.assertType(UNLUCKY, String, "UNLUCKY");
	Guard.assertType(OBJECT, Object, "OBJECT");
	Guard.assertType(ARRAY, Array, "ARRAY");
	Guard.assertType(FUNCTION, Function, "FUNCTION");
	Guard.assertType(REGEX, RegExp, "REGEX");
	Guard.assertType(BOOL, Boolean, "BOOL");
	
	// Assert
	t.pass();
});

test("Assert Type Fails", t =>
{
	// Arrange
	const LUCKY = false;
	
	// Act & Assert
	t.throws(() => Guard.assertType(LUCKY, Number, "testParameter"), {instanceOf: TypeError});
});

test("Assert Type Valid Arguments", t =>
{
	// Arrange
	const LUCKY = 13;
	
	// Act & Assert
	t.throws(() => Guard.assertType(LUCKY, Number, ""), {instanceOf: ArgumentError});
	t.throws(() => Guard.assertType(LUCKY, Number, null), {instanceOf: ReferenceError});
	t.throws(() => Guard.assertType(LUCKY, "Number", "testParameter"), {instanceOf: TypeError});
	t.throws(() => Guard.assertType(LUCKY, null, "testParameter"), {instanceOf: TypeError});
});

test("Assert Enum", t =>
{
	// Arrange
	const FROZEN = Object.freeze(
	{
		Valid: 0,
		Invalid: -1,
		Test: "test"
	});
		
	// Act
	Guard.assertEnum("Invalid", FROZEN, "FROZEN");
	Guard.assertEnum(-1, FROZEN, "FROZEN");
	Guard.assertEnum("test", FROZEN, "FROZEN");
	Guard.assertEnum(FROZEN.Test, FROZEN, "FROZEN");

	// Assert
	t.pass();
});

test("Assert Enum Fails", t =>
{
	// Arrange
	const FROZEN = Object.freeze(
	{
		Valid: 0,
		Invalid: -1,
		Test: "test"
	});
		
	// Act & Assert
	t.throws(() => Guard.assertEnum(1, FROZEN, "FROZEN"), {instanceOf: RangeError});
	t.throws(() => Guard.assertEnum("TeST", FROZEN, "FROZEN"), {instanceOf: RangeError});
});

test("Assert Enum Valid Arguments", t =>
{
	// Arrange
	const FROZEN = Object.freeze(
	{
		Valid: 0,
		Invalid: -1,
		Test: "test"
	});
	const NOT_FROZEN = 
	{
		Valid: 0,
		Invalid: -1,
		Test: "test"
	};
		
	// Act & Assert
	t.throws(() => Guard.assertEnum(null, FROZEN, "FROZEN"), {instanceOf: ReferenceError});
	t.throws(() => Guard.assertEnum(0, [], "FROZEN"), {instanceOf: TypeError});
	t.throws(() => Guard.assertEnum(0, FROZEN, ""), {instanceOf: ArgumentError});
	t.throws(() => Guard.assertEnum(0, FROZEN, null), {instanceOf: ReferenceError});
	t.throws(() => Guard.assertEnum(0, FROZEN), {instanceOf: ReferenceError});
	t.throws(() => Guard.assertEnum(0, NOT_FROZEN, "FROZEN"), {instanceOf: TypeError});
});
