---
id: "_eventbus_eventbus_.eventbus"
title: "EventBus"
sidebar_label: "EventBus"
---

[@pixatore/shared](../index.md) › [Globals](../globals.md) › ["eventBus/eventBus"](../modules/_eventbus_eventbus_.md) › [EventBus](_eventbus_eventbus_.eventbus.md)

## Hierarchy

* EventBus

  ↳ **EventBus**

## Index

### Properties

* [emitter](_eventbus_eventbus_.eventbus.md#emitter)

### Methods

* [onGameStatusChange](_eventbus_eventbus_.eventbus.md#ongamestatuschange)
* [onPlayerAdd](_eventbus_eventbus_.eventbus.md#onplayeradd)
* [onPlayerRemove](_eventbus_eventbus_.eventbus.md#onplayerremove)
* [onPlayerUpdate](_eventbus_eventbus_.eventbus.md#onplayerupdate)
* [publish](_eventbus_eventbus_.eventbus.md#publish)
* [subscribe](_eventbus_eventbus_.eventbus.md#subscribe)

## Properties

###  emitter

• **emitter**: *EventEmitter*

*Inherited from [EventBus](_eventbus_eventbus_.eventbus.md).[emitter](_eventbus_eventbus_.eventbus.md#emitter)*

Defined in node_modules/ts-bus/EventBus.d.ts:18

## Methods

###  onGameStatusChange

▸ **onGameStatusChange**(`handler`: function): *function*

*Defined in [packages/shared/src/eventBus/eventBus.ts:7](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/eventBus.ts#L7)*

**Parameters:**

▪ **handler**: *function*

▸ (`current`: [GameStatus](../enums/_types_index_.gamestatus.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`current` | [GameStatus](../enums/_types_index_.gamestatus.md) |

**Returns:** *function*

▸ (): *void*

___

###  onPlayerAdd

▸ **onPlayerAdd**(`handler`: function): *function*

*Defined in [packages/shared/src/eventBus/eventBus.ts:17](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/eventBus.ts#L17)*

**Parameters:**

▪ **handler**: *function*

▸ (`Player`: [Player](_state_entities_player_.player.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`Player` | [Player](_state_entities_player_.player.md) |

**Returns:** *function*

▸ (): *void*

___

###  onPlayerRemove

▸ **onPlayerRemove**(`handler`: function): *function*

*Defined in [packages/shared/src/eventBus/eventBus.ts:27](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/eventBus.ts#L27)*

**Parameters:**

▪ **handler**: *function*

▸ (`Player`: [Player](_state_entities_player_.player.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`Player` | [Player](_state_entities_player_.player.md) |

**Returns:** *function*

▸ (): *void*

___

###  onPlayerUpdate

▸ **onPlayerUpdate**(`handler`: function): *function*

*Defined in [packages/shared/src/eventBus/eventBus.ts:38](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/eventBus.ts#L38)*

**Parameters:**

▪ **handler**: *function*

▸ (`Player`: [Player](_state_entities_player_.player.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`Player` | [Player](_state_entities_player_.player.md) |

**Returns:** *function*

▸ (): *void*

___

###  publish

▸ **publish**‹**T**›(`event`: T, `meta?`: any): *void*

*Inherited from [EventBus](_eventbus_eventbus_.eventbus.md).[publish](_eventbus_eventbus_.eventbus.md#publish)*

Defined in node_modules/ts-bus/EventBus.d.ts:19

**Type parameters:**

▪ **T**: *BusEvent*

**Parameters:**

Name | Type |
------ | ------ |
`event` | T |
`meta?` | any |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**‹**T**›(`subscription`: string, `handler`: function): *function*

*Inherited from [EventBus](_eventbus_eventbus_.eventbus.md).[subscribe](_eventbus_eventbus_.eventbus.md#subscribe)*

Defined in node_modules/ts-bus/EventBus.d.ts:20

**Type parameters:**

▪ **T**: *BusEvent*

**Parameters:**

▪ **subscription**: *string*

▪ **handler**: *function*

▸ (`e`: BusEvent): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | BusEvent |

**Returns:** *function*

▸ (): *void*

▸ **subscribe**‹**T**›(`subscription`: EventCreatorFn‹T›, `handler`: function): *function*

*Inherited from [EventBus](_eventbus_eventbus_.eventbus.md).[subscribe](_eventbus_eventbus_.eventbus.md#subscribe)*

Defined in node_modules/ts-bus/EventBus.d.ts:21

**Type parameters:**

▪ **T**: *BusEvent*

**Parameters:**

▪ **subscription**: *EventCreatorFn‹T›*

▪ **handler**: *function*

▸ (`e`: ReturnType‹typeof subscription›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | ReturnType‹typeof subscription› |

**Returns:** *function*

▸ (): *void*

▸ **subscribe**‹**T**›(`subscription`: PredicateFn‹T›, `handler`: function): *function*

*Inherited from [EventBus](_eventbus_eventbus_.eventbus.md).[subscribe](_eventbus_eventbus_.eventbus.md#subscribe)*

Defined in node_modules/ts-bus/EventBus.d.ts:22

**Type parameters:**

▪ **T**: *BusEvent*

**Parameters:**

▪ **subscription**: *PredicateFn‹T›*

▪ **handler**: *function*

▸ (`e`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | T |

**Returns:** *function*

▸ (): *void*

▸ **subscribe**‹**T**›(`subscription`: T["type"], `handler`: function): *function*

*Inherited from [EventBus](_eventbus_eventbus_.eventbus.md).[subscribe](_eventbus_eventbus_.eventbus.md#subscribe)*

Defined in node_modules/ts-bus/EventBus.d.ts:23

**Type parameters:**

▪ **T**: *object*

**Parameters:**

▪ **subscription**: *T["type"]*

▪ **handler**: *function*

▸ (`e`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | T |

**Returns:** *function*

▸ (): *void*
