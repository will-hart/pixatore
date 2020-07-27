---
id: "_state_entities_status_.status"
title: "Status"
sidebar_label: "Status"
---

[shared](../index.md) › [Globals](../globals.md) › ["state/entities/Status"](../modules/_state_entities_status_.md) › [Status](_state_entities_status_.status.md)

## Hierarchy

* Schema

  ↳ **Status**

## Index

### Constructors

* [constructor](_state_entities_status_.status.md#constructor)

### Properties

* [$changes](_state_entities_status_.status.md#protected-changes)
* [$listeners](_state_entities_status_.status.md#protected-listeners)
* [current](_state_entities_status_.status.md#current)
* [_context](_state_entities_status_.status.md#static-_context)
* [_definition](_state_entities_status_.status.md#static-_definition)
* [_typeid](_state_entities_status_.status.md#static-_typeid)

### Accessors

* [_definition](_state_entities_status_.status.md#protected-_definition)

### Methods

* [applyFilters](_state_entities_status_.status.md#applyfilters)
* [assign](_state_entities_status_.status.md#assign)
* [clone](_state_entities_status_.status.md#clone)
* [decode](_state_entities_status_.status.md#decode)
* [deleteByIndex](_state_entities_status_.status.md#protected-deletebyindex)
* [discardAllChanges](_state_entities_status_.status.md#discardallchanges)
* [encode](_state_entities_status_.status.md#encode)
* [encodeAll](_state_entities_status_.status.md#encodeall)
* [getByIndex](_state_entities_status_.status.md#protected-getbyindex)
* [listen](_state_entities_status_.status.md#listen)
* [onChange](_state_entities_status_.status.md#optional-onchange)
* [onRemove](_state_entities_status_.status.md#optional-onremove)
* [toJSON](_state_entities_status_.status.md#tojson)
* [triggerAll](_state_entities_status_.status.md#triggerall)
* [is](_state_entities_status_.status.md#static-is)
* [onError](_state_entities_status_.status.md#static-onerror)

## Constructors

###  constructor

\+ **new Status**(...`args`: any[]): *[Status](_state_entities_status_.status.md)*

*Inherited from [Status](_state_entities_status_.status.md).[constructor](_state_entities_status_.status.md#constructor)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *[Status](_state_entities_status_.status.md)*

## Properties

### `Protected` $changes

• **$changes**: *ChangeTree*

*Inherited from [Position](_state_components_position_.position.md).[$changes](_state_components_position_.position.md#protected-changes)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:30

___

### `Protected` $listeners

• **$listeners**: *object*

*Inherited from [Position](_state_components_position_.position.md).[$listeners](_state_components_position_.position.md#protected-listeners)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:31

#### Type declaration:

* \[ **field**: *string*\]: EventEmitter‹function›

___

###  current

• **current**: *[GameStatus](../enums/_types_index_.gamestatus.md)* = GameStatus.lobby

*Defined in [packages/shared/src/state/entities/Status.ts:6](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/shared/src/state/entities/Status.ts#L6)*

___

### `Static` _context

▪ **_context**: *Context*

*Inherited from [Position](_state_components_position_.position.md).[_context](_state_components_position_.position.md#static-_context)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:26

___

### `Static` _definition

▪ **_definition**: *SchemaDefinition*

*Inherited from [Position](_state_components_position_.position.md).[_definition](_state_components_position_.position.md#static-_definition)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:27

___

### `Static` _typeid

▪ **_typeid**: *number*

*Inherited from [Position](_state_components_position_.position.md).[_typeid](_state_components_position_.position.md#static-_typeid)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:25

## Accessors

### `Protected` _definition

• **get _definition**(): *SchemaDefinition*

*Inherited from [Position](_state_components_position_.position.md).[_definition](_state_components_position_.position.md#static-_definition)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:40

**Returns:** *SchemaDefinition*

## Methods

###  applyFilters

▸ **applyFilters**(`client`: Client, `encodeAll?`: undefined | false | true): *number[]*

*Inherited from [Position](_state_components_position_.position.md).[applyFilters](_state_components_position_.position.md#applyfilters)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:45

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`encodeAll?` | undefined &#124; false &#124; true |

**Returns:** *number[]*

___

###  assign

▸ **assign**(`props`: object): *this*

*Inherited from [Position](_state_components_position_.position.md).[assign](_state_components_position_.position.md#assign)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`props` | object |

**Returns:** *this*

___

###  clone

▸ **clone**(): *this*

*Inherited from [Position](_state_components_position_.position.md).[clone](_state_components_position_.position.md#clone)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:46

**Returns:** *this*

___

###  decode

▸ **decode**(`bytes`: number[], `it?`: decode.Iterator, `ref?`: Ref, `allChanges?`: Map‹number, DataChange[]›): *Map‹number, DataChange‹any›[]›*

*Inherited from [Position](_state_components_position_.position.md).[decode](_state_components_position_.position.md#decode)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`bytes` | number[] |
`it?` | decode.Iterator |
`ref?` | Ref |
`allChanges?` | Map‹number, DataChange[]› |

**Returns:** *Map‹number, DataChange‹any›[]›*

___

### `Protected` deleteByIndex

▸ **deleteByIndex**(`index`: number): *void*

*Inherited from [Position](_state_components_position_.position.md).[deleteByIndex](_state_components_position_.position.md#protected-deletebyindex)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:51

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *void*

___

###  discardAllChanges

▸ **discardAllChanges**(): *void*

*Inherited from [Position](_state_components_position_.position.md).[discardAllChanges](_state_components_position_.position.md#discardallchanges)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:49

**Returns:** *void*

___

###  encode

▸ **encode**(`encodeAll?`: undefined | false | true, `bytes?`: number[], `useFilters?`: undefined | false | true): *number[]*

*Inherited from [Position](_state_components_position_.position.md).[encode](_state_components_position_.position.md#encode)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`encodeAll?` | undefined &#124; false &#124; true |
`bytes?` | number[] |
`useFilters?` | undefined &#124; false &#124; true |

**Returns:** *number[]*

___

###  encodeAll

▸ **encodeAll**(`useFilters?`: undefined | false | true): *number[]*

*Inherited from [Position](_state_components_position_.position.md).[encodeAll](_state_components_position_.position.md#encodeall)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`useFilters?` | undefined &#124; false &#124; true |

**Returns:** *number[]*

___

### `Protected` getByIndex

▸ **getByIndex**(`index`: number): *any*

*Inherited from [Position](_state_components_position_.position.md).[getByIndex](_state_components_position_.position.md#protected-getbyindex)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:50

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *any*

___

###  listen

▸ **listen**‹**K**›(`attr`: K, `callback`: function): *function*

*Inherited from [Position](_state_components_position_.position.md).[listen](_state_components_position_.position.md#listen)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:41

**Type parameters:**

▪ **K**: *NonFunctionPropNames‹this›*

**Parameters:**

▪ **attr**: *K*

▪ **callback**: *function*

▸ (`value`: this[K], `previousValue`: this[K]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | this[K] |
`previousValue` | this[K] |

**Returns:** *function*

▸ (): *void*

___

### `Optional` onChange

▸ **onChange**(`changes`: DataChange[]): *any*

*Inherited from [Position](_state_components_position_.position.md).[onChange](_state_components_position_.position.md#optional-onchange)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`changes` | DataChange[] |

**Returns:** *any*

___

### `Optional` onRemove

▸ **onRemove**(): *any*

*Inherited from [Position](_state_components_position_.position.md).[onRemove](_state_components_position_.position.md#optional-onremove)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:35

**Returns:** *any*

___

###  toJSON

▸ **toJSON**(): *object*

*Inherited from [Position](_state_components_position_.position.md).[toJSON](_state_components_position_.position.md#tojson)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:48

**Returns:** *object*

___

###  triggerAll

▸ **triggerAll**(): *void*

*Inherited from [Position](_state_components_position_.position.md).[triggerAll](_state_components_position_.position.md#triggerall)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:47

**Returns:** *void*

___

### `Static` is

▸ **is**(`type`: DefinitionType): *boolean*

*Inherited from [Position](_state_components_position_.position.md).[is](_state_components_position_.position.md#static-is)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`type` | DefinitionType |

**Returns:** *boolean*

___

### `Static` onError

▸ **onError**(`e`: any): *void*

*Inherited from [Position](_state_components_position_.position.md).[onError](_state_components_position_.position.md#static-onerror)*

Defined in node_modules/@colyseus/schema/lib/Schema.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*