---
id: "_src_composables_mounteventbustoroom_"
title: "src/composables/mountEventBusToRoom"
sidebar_label: "src/composables/mountEventBusToRoom"
---

[app](../index.md) › [Globals](../globals.md) › ["src/composables/mountEventBusToRoom"](_src_composables_mounteventbustoroom_.md)

## Index

### Functions

* [mountEventBusToRoom](_src_composables_mounteventbustoroom_.md#const-mounteventbustoroom)

## Functions

### `Const` mountEventBusToRoom

▸ **mountEventBusToRoom**(`eventBus`: EventBus, `room`: Room‹GameState›): *void*

*Defined in [packages/app/src/composables/mountEventBusToRoom.ts:14](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/composables/mountEventBusToRoom.ts#L14)*

Adds all the required subscribers to the colyseus state, using
them to trigger events on the EventBus. The VUe and PIXI components
that require synchronised game state can use this event bus to
update their internal states

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eventBus` | EventBus | The EventBus used to sync colyseus, pixi and Vue game states |
`room` | Room‹GameState› | The room the event bus is being mounted to  |

**Returns:** *void*
