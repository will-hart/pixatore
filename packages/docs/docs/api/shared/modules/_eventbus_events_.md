---
id: "_eventbus_events_"
title: "eventBus/events"
sidebar_label: "eventBus/events"
---

[@pixatore/shared](../index.md) › [Globals](../globals.md) › ["eventBus/events"](_eventbus_events_.md)

## Index

### Enumerations

* [EventTypes](../enums/_eventbus_events_.eventtypes.md)

### Interfaces

* [ActorMoveArgs](../interfaces/_eventbus_events_.actormoveargs.md)
* [PlayerEventArgs](../interfaces/_eventbus_events_.playereventargs.md)

### Variables

* [onActorMove](_eventbus_events_.md#const-onactormove)
* [onGameStatusChanged](_eventbus_events_.md#const-ongamestatuschanged)
* [onPlayerAddEvent](_eventbus_events_.md#const-onplayeraddevent)
* [onPlayerRemoveEvent](_eventbus_events_.md#const-onplayerremoveevent)
* [onPlayerUpdateEvent](_eventbus_events_.md#const-onplayerupdateevent)

## Variables

### `Const` onActorMove

• **onActorMove**: *object* = createEventDefinition&lt;ActorMoveArgs&gt;()(
  EventTypes.ON_ACTOR_MOVE,
)

*Defined in [packages/shared/src/eventBus/events.ts:24](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/events.ts#L24)*

#### Type declaration:

▸ (`payload`: P): *object*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | P |

* **payload**: *P*

* **type**: *T*

* **eventType**: *T*

* **toString**(): *T*

___

### `Const` onGameStatusChanged

• **onGameStatusChanged**: *object* = createEventDefinition&lt;{
  current: Types.GameStatus
}&gt;()(EventTypes.ON_GAME_STATUS_CHANGED)

*Defined in [packages/shared/src/eventBus/events.ts:40](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/events.ts#L40)*

#### Type declaration:

▸ (`payload`: P): *object*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | P |

* **payload**: *P*

* **type**: *T*

* **eventType**: *T*

* **toString**(): *T*

___

### `Const` onPlayerAddEvent

• **onPlayerAddEvent**: *object* = createEventDefinition&lt;PlayerEventArgs&gt;()(
  EventTypes.ON_PLAYER_ADD,
)

*Defined in [packages/shared/src/eventBus/events.ts:28](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/events.ts#L28)*

#### Type declaration:

▸ (`payload`: P): *object*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | P |

* **payload**: *P*

* **type**: *T*

* **eventType**: *T*

* **toString**(): *T*

___

### `Const` onPlayerRemoveEvent

• **onPlayerRemoveEvent**: *object* = createEventDefinition&lt;PlayerEventArgs&gt;()(
  EventTypes.ON_PLAYER_REMOVE,
)

*Defined in [packages/shared/src/eventBus/events.ts:32](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/events.ts#L32)*

#### Type declaration:

▸ (`payload`: P): *object*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | P |

* **payload**: *P*

* **type**: *T*

* **eventType**: *T*

* **toString**(): *T*

___

### `Const` onPlayerUpdateEvent

• **onPlayerUpdateEvent**: *object* = createEventDefinition&lt;PlayerEventArgs&gt;()(
  EventTypes.ON_PLAYER_UPDATE,
)

*Defined in [packages/shared/src/eventBus/events.ts:36](https://github.com/will-hart/pixatore/blob/9f2e114/packages/shared/src/eventBus/events.ts#L36)*

#### Type declaration:

▸ (`payload`: P): *object*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | P |

* **payload**: *P*

* **type**: *T*

* **eventType**: *T*

* **toString**(): *T*
