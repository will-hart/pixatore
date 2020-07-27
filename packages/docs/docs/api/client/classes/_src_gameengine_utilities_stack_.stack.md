---
id: "_src_gameengine_utilities_stack_.stack"
title: "Stack"
sidebar_label: "Stack"
---

[@pixatore/app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/utilities/Stack"](../modules/_src_gameengine_utilities_stack_.md) › [Stack](_src_gameengine_utilities_stack_.stack.md)

## Type parameters

▪ **T**

## Hierarchy

* [Array](_src_gameengine_utilities_stack_.stack.md#static-array)‹T›

  ↳ **Stack**

## Indexable

* \[ **n**: *number*\]: T

## Index

### Properties

* [length](_src_gameengine_utilities_stack_.stack.md#length)
* [Array](_src_gameengine_utilities_stack_.stack.md#static-array)

### Methods

* [[Symbol.iterator]](_src_gameengine_utilities_stack_.stack.md#[symbol.iterator])
* [[Symbol.unscopables]](_src_gameengine_utilities_stack_.stack.md#[symbol.unscopables])
* [clear](_src_gameengine_utilities_stack_.stack.md#clear)
* [concat](_src_gameengine_utilities_stack_.stack.md#concat)
* [copyWithin](_src_gameengine_utilities_stack_.stack.md#copywithin)
* [dequeue](_src_gameengine_utilities_stack_.stack.md#dequeue)
* [enqueue](_src_gameengine_utilities_stack_.stack.md#enqueue)
* [entries](_src_gameengine_utilities_stack_.stack.md#entries)
* [every](_src_gameengine_utilities_stack_.stack.md#every)
* [fill](_src_gameengine_utilities_stack_.stack.md#fill)
* [filter](_src_gameengine_utilities_stack_.stack.md#filter)
* [find](_src_gameengine_utilities_stack_.stack.md#find)
* [findIndex](_src_gameengine_utilities_stack_.stack.md#findindex)
* [flat](_src_gameengine_utilities_stack_.stack.md#flat)
* [flatMap](_src_gameengine_utilities_stack_.stack.md#flatmap)
* [forEach](_src_gameengine_utilities_stack_.stack.md#foreach)
* [includes](_src_gameengine_utilities_stack_.stack.md#includes)
* [indexOf](_src_gameengine_utilities_stack_.stack.md#indexof)
* [join](_src_gameengine_utilities_stack_.stack.md#join)
* [keys](_src_gameengine_utilities_stack_.stack.md#keys)
* [lastIndexOf](_src_gameengine_utilities_stack_.stack.md#lastindexof)
* [map](_src_gameengine_utilities_stack_.stack.md#map)
* [peek](_src_gameengine_utilities_stack_.stack.md#peek)
* [pop](_src_gameengine_utilities_stack_.stack.md#pop)
* [push](_src_gameengine_utilities_stack_.stack.md#push)
* [reduce](_src_gameengine_utilities_stack_.stack.md#reduce)
* [reduceRight](_src_gameengine_utilities_stack_.stack.md#reduceright)
* [reverse](_src_gameengine_utilities_stack_.stack.md#reverse)
* [shift](_src_gameengine_utilities_stack_.stack.md#shift)
* [slice](_src_gameengine_utilities_stack_.stack.md#slice)
* [some](_src_gameengine_utilities_stack_.stack.md#some)
* [sort](_src_gameengine_utilities_stack_.stack.md#sort)
* [splice](_src_gameengine_utilities_stack_.stack.md#splice)
* [toLocaleString](_src_gameengine_utilities_stack_.stack.md#tolocalestring)
* [toString](_src_gameengine_utilities_stack_.stack.md#tostring)
* [unshift](_src_gameengine_utilities_stack_.stack.md#unshift)
* [values](_src_gameengine_utilities_stack_.stack.md#values)

## Properties

###  length

• **length**: *number*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[length](_src_gameengine_utilities_stack_.stack.md#length)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1215

Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.

___

### `Static` Array

▪ **Array**: *ArrayConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1385

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *IterableIterator‹T›*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[[Symbol.iterator]](_src_gameengine_utilities_stack_.stack.md#[symbol.iterator])*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:60

Iterator

**Returns:** *IterableIterator‹T›*

___

###  [Symbol.unscopables]

▸ **[Symbol.unscopables]**(): *object*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[[Symbol.unscopables]](_src_gameengine_utilities_stack_.stack.md#[symbol.unscopables])*

Defined in node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:94

Returns an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

**Returns:** *object*

* **copyWithin**: *boolean*

* **entries**: *boolean*

* **fill**: *boolean*

* **find**: *boolean*

* **findIndex**: *boolean*

* **keys**: *boolean*

* **values**: *boolean*

___

###  clear

▸ **clear**(): *void*

*Defined in [packages/app/src/gameEngine/utilities/Stack.ts:17](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/utilities/Stack.ts#L17)*

**Returns:** *void*

___

###  concat

▸ **concat**(...`items`: ConcatArray‹T›[]): *T[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[concat](_src_gameengine_utilities_stack_.stack.md#concat)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1237

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | ConcatArray‹T›[] | Additional items to add to the end of array1.  |

**Returns:** *T[]*

▸ **concat**(...`items`: T | ConcatArray‹T›[]): *T[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[concat](_src_gameengine_utilities_stack_.stack.md#concat)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1242

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | T &#124; ConcatArray‹T›[] | Additional items to add to the end of array1.  |

**Returns:** *T[]*

___

###  copyWithin

▸ **copyWithin**(`target`: number, `start`: number, `end?`: undefined | number): *this*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[copyWithin](_src_gameengine_utilities_stack_.stack.md#copywithin)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:64

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | number | If target is negative, it is treated as length+target where length is the length of the array. |
`start` | number | If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. |
`end?` | undefined &#124; number | If not specified, length of the this object is used as its default value.  |

**Returns:** *this*

___

###  dequeue

▸ **dequeue**(): *T*

*Defined in [packages/app/src/gameEngine/utilities/Stack.ts:7](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/utilities/Stack.ts#L7)*

**Returns:** *T*

___

###  enqueue

▸ **enqueue**(`item`: T): *T*

*Defined in [packages/app/src/gameEngine/utilities/Stack.ts:2](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/utilities/Stack.ts#L2)*

**Parameters:**

Name | Type |
------ | ------ |
`item` | T |

**Returns:** *T*

___

###  entries

▸ **entries**(): *IterableIterator‹[number, T]›*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[entries](_src_gameengine_utilities_stack_.stack.md#entries)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:65

Returns an iterable of key, value pairs for every entry in the array

**Returns:** *IterableIterator‹[number, T]›*

___

###  every

▸ **every**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[every](_src_gameengine_utilities_stack_.stack.md#every)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1310

Determines whether all the members of an array satisfy the specified test.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The every method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value false, or until the end of the array.

▸ (`value`: T, `index`: number, `array`: T[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`array` | T[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  fill

▸ **fill**(`value`: T, `start?`: undefined | number, `end?`: undefined | number): *this*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[fill](_src_gameengine_utilities_stack_.stack.md#fill)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:53

Returns the this object after filling the section identified by start and end with value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | T | value to fill array section with |
`start?` | undefined &#124; number | index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
`end?` | undefined &#124; number | index to stop filling the array at. If end is negative, it is treated as length+end.  |

**Returns:** *this*

___

###  filter

▸ **filter**‹**S**›(`callbackfn`: function, `thisArg?`: any): *S[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[filter](_src_gameengine_utilities_stack_.stack.md#filter)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1337

Returns the elements of an array that meet the condition specified in a callback function.

**Type parameters:**

▪ **S**: *T*

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: T, `index`: number, `array`: T[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`array` | T[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *S[]*

▸ **filter**(`callbackfn`: function, `thisArg?`: any): *T[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[filter](_src_gameengine_utilities_stack_.stack.md#filter)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1343

Returns the elements of an array that meet the condition specified in a callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: T, `index`: number, `array`: T[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`array` | T[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *T[]*

___

###  find

▸ **find**‹**S**›(`predicate`: function, `thisArg?`: any): *S | undefined*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[find](_src_gameengine_utilities_stack_.stack.md#find)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:31

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

**Type parameters:**

▪ **S**: *T*

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

▸ (`this`: void, `value`: T, `index`: number, `obj`: T[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`this` | void |
`value` | T |
`index` | number |
`obj` | T[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *S | undefined*

▸ **find**(`predicate`: function, `thisArg?`: any): *T | undefined*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[find](_src_gameengine_utilities_stack_.stack.md#find)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:32

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: T, `index`: number, `obj`: T[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`obj` | T[] |

▪`Optional`  **thisArg**: *any*

**Returns:** *T | undefined*

___

###  findIndex

▸ **findIndex**(`predicate`: function, `thisArg?`: any): *number*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[findIndex](_src_gameengine_utilities_stack_.stack.md#findindex)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:43

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

▸ (`value`: T, `index`: number, `obj`: T[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`obj` | T[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *number*

___

###  flat

▸ **flat**‹**A**, **D**›(`this`: A, `depth?`: D): *FlatArray‹A, D›[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[flat](_src_gameengine_utilities_stack_.stack.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:81

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **A**

▪ **D**: *number*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | A | - |
`depth?` | D | The maximum recursion depth  |

**Returns:** *FlatArray‹A, D›[]*

___

###  flatMap

▸ **flatMap**‹**U**, **This**›(`callback`: function, `thisArg?`: This): *U[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[flatMap](_src_gameengine_utilities_stack_.stack.md#flatmap)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:70

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

**Type parameters:**

▪ **U**

▪ **This**

**Parameters:**

▪ **callback**: *function*

A function that accepts up to three arguments. The flatMap method calls the
callback function one time for each element in the array.

▸ (`this`: This, `value`: T, `index`: number, `array`: T[]): *U | ReadonlyArray‹U›*

**Parameters:**

Name | Type |
------ | ------ |
`this` | This |
`value` | T |
`index` | number |
`array` | T[] |

▪`Optional`  **thisArg**: *This*

An object to which the this keyword can refer in the callback function. If
thisArg is omitted, undefined is used as the this value.

**Returns:** *U[]*

___

###  forEach

▸ **forEach**(`callbackfn`: function, `thisArg?`: any): *void*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[forEach](_src_gameengine_utilities_stack_.stack.md#foreach)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1325

Performs the specified action for each element in an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.

▸ (`value`: T, `index`: number, `array`: T[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`array` | T[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *void*

___

###  includes

▸ **includes**(`searchElement`: T, `fromIndex?`: undefined | number): *boolean*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[includes](_src_gameengine_utilities_stack_.stack.md#includes)*

Defined in node_modules/typescript/lib/lib.es2016.array.include.d.ts:27

Determines whether an array includes a certain element, returning true or false as appropriate.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | T | The element to search for. |
`fromIndex?` | undefined &#124; number | The position in this array at which to begin searching for searchElement.  |

**Returns:** *boolean*

___

###  indexOf

▸ **indexOf**(`searchElement`: T, `fromIndex?`: undefined | number): *number*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[indexOf](_src_gameengine_utilities_stack_.stack.md#indexof)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1295

Returns the index of the first occurrence of a value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | T | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.  |

**Returns:** *number*

___

###  join

▸ **join**(`separator?`: undefined | string): *string*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[join](_src_gameengine_utilities_stack_.stack.md#join)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1247

Adds all the elements of an array separated by the specified separator string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`separator?` | undefined &#124; string | A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.  |

**Returns:** *string*

___

###  keys

▸ **keys**(): *IterableIterator‹number›*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[keys](_src_gameengine_utilities_stack_.stack.md#keys)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:70

Returns an iterable of keys in the array

**Returns:** *IterableIterator‹number›*

___

###  lastIndexOf

▸ **lastIndexOf**(`searchElement`: T, `fromIndex?`: undefined | number): *number*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[lastIndexOf](_src_gameengine_utilities_stack_.stack.md#lastindexof)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1301

Returns the index of the last occurrence of a specified value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | T | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.  |

**Returns:** *number*

___

###  map

▸ **map**‹**U**›(`callbackfn`: function, `thisArg?`: any): *U[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[map](_src_gameengine_utilities_stack_.stack.md#map)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1331

Calls a defined callback function on each element of an array, and returns an array that contains the results.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

▸ (`value`: T, `index`: number, `array`: T[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`array` | T[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *U[]*

___

###  peek

▸ **peek**(): *T*

*Defined in [packages/app/src/gameEngine/utilities/Stack.ts:13](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/utilities/Stack.ts#L13)*

**Returns:** *T*

___

###  pop

▸ **pop**(): *T | undefined*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[pop](_src_gameengine_utilities_stack_.stack.md#pop)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1227

Removes the last element from an array and returns it.

**Returns:** *T | undefined*

___

###  push

▸ **push**(...`items`: T[]): *number*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[push](_src_gameengine_utilities_stack_.stack.md#push)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1232

Appends new elements to an array, and returns the new length of the array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | T[] | New elements of the Array.  |

**Returns:** *number*

___

###  reduce

▸ **reduce**(`callbackfn`: function): *T*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[reduce](_src_gameengine_utilities_stack_.stack.md#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1349

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: T, `currentValue`: T, `currentIndex`: number, `array`: T[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | T |
`currentValue` | T |
`currentIndex` | number |
`array` | T[] |

**Returns:** *T*

▸ **reduce**(`callbackfn`: function, `initialValue`: T): *T*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[reduce](_src_gameengine_utilities_stack_.stack.md#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1350

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: T, `currentValue`: T, `currentIndex`: number, `array`: T[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | T |
`currentValue` | T |
`currentIndex` | number |
`array` | T[] |

▪ **initialValue**: *T*

**Returns:** *T*

▸ **reduce**‹**U**›(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[reduce](_src_gameengine_utilities_stack_.stack.md#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1356

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: T, `currentIndex`: number, `array`: T[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | T |
`currentIndex` | number |
`array` | T[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reduceRight

▸ **reduceRight**(`callbackfn`: function): *T*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[reduceRight](_src_gameengine_utilities_stack_.stack.md#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1362

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: T, `currentValue`: T, `currentIndex`: number, `array`: T[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | T |
`currentValue` | T |
`currentIndex` | number |
`array` | T[] |

**Returns:** *T*

▸ **reduceRight**(`callbackfn`: function, `initialValue`: T): *T*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[reduceRight](_src_gameengine_utilities_stack_.stack.md#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1363

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: T, `currentValue`: T, `currentIndex`: number, `array`: T[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | T |
`currentValue` | T |
`currentIndex` | number |
`array` | T[] |

▪ **initialValue**: *T*

**Returns:** *T*

▸ **reduceRight**‹**U**›(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[reduceRight](_src_gameengine_utilities_stack_.stack.md#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1369

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: T, `currentIndex`: number, `array`: T[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | T |
`currentIndex` | number |
`array` | T[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reverse

▸ **reverse**(): *T[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[reverse](_src_gameengine_utilities_stack_.stack.md#reverse)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1251

Reverses the elements in an Array.

**Returns:** *T[]*

___

###  shift

▸ **shift**(): *T | undefined*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[shift](_src_gameengine_utilities_stack_.stack.md#shift)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1255

Removes the first element from an array and returns it.

**Returns:** *T | undefined*

___

###  slice

▸ **slice**(`start?`: undefined | number, `end?`: undefined | number): *T[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[slice](_src_gameengine_utilities_stack_.stack.md#slice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1261

Returns a section of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start?` | undefined &#124; number | The beginning of the specified portion of the array. |
`end?` | undefined &#124; number | The end of the specified portion of the array. This is exclusive of the element at the index 'end'.  |

**Returns:** *T[]*

___

###  some

▸ **some**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[some](_src_gameengine_utilities_stack_.stack.md#some)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1319

Determines whether the specified callback function returns true for any element of an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The some method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value true, or until the end of the array.

▸ (`value`: T, `index`: number, `array`: T[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`index` | number |
`array` | T[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  sort

▸ **sort**(`compareFn?`: undefined | function): *this*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[sort](_src_gameengine_utilities_stack_.stack.md#sort)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1271

Sorts an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compareFn?` | undefined &#124; function | Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order. ```ts [11,2,22,1].sort((a, b) =&gt; a - b) ```  |

**Returns:** *this*

___

###  splice

▸ **splice**(`start`: number, `deleteCount?`: undefined | number): *T[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[splice](_src_gameengine_utilities_stack_.stack.md#splice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1277

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount?` | undefined &#124; number | The number of elements to remove.  |

**Returns:** *T[]*

▸ **splice**(`start`: number, `deleteCount`: number, ...`items`: T[]): *T[]*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[splice](_src_gameengine_utilities_stack_.stack.md#splice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1284

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount` | number | The number of elements to remove. |
`...items` | T[] | Elements to insert into the array in place of the deleted elements.  |

**Returns:** *T[]*

___

###  toLocaleString

▸ **toLocaleString**(): *string*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[toLocaleString](_src_gameengine_utilities_stack_.stack.md#tolocalestring)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1223

Returns a string representation of an array. The elements are converted to string using their toLocalString methods.

**Returns:** *string*

___

###  toString

▸ **toString**(): *string*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[toString](_src_gameengine_utilities_stack_.stack.md#tostring)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1219

Returns a string representation of an array.

**Returns:** *string*

___

###  unshift

▸ **unshift**(...`items`: T[]): *number*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[unshift](_src_gameengine_utilities_stack_.stack.md#unshift)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1289

Inserts new elements at the start of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | T[] | Elements to insert at the start of the Array.  |

**Returns:** *number*

___

###  values

▸ **values**(): *IterableIterator‹T›*

*Inherited from [Stack](_src_gameengine_utilities_stack_.stack.md).[values](_src_gameengine_utilities_stack_.stack.md#values)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:75

Returns an iterable of values in the array

**Returns:** *IterableIterator‹T›*
