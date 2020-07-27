---
id: "_src_composables_usegameengine_"
title: "src/composables/useGameEngine"
sidebar_label: "src/composables/useGameEngine"
---

[app](../index.md) › [Globals](../globals.md) › ["src/composables/useGameEngine"](_src_composables_usegameengine_.md)

## Index

### Variables

* [key](_src_composables_usegameengine_.md#const-key)

### Functions

* [provideEngine](_src_composables_usegameengine_.md#provideengine)
* [useEngine](_src_composables_usegameengine_.md#useengine)
* [useEngineWithScene](_src_composables_usegameengine_.md#useenginewithscene)

## Variables

### `Const` key

• **key**: *InjectionKey‹[Engine](../classes/_src_gameengine_engine_.engine.md)›* = Symbol('useGameEngine::Engine')

*Defined in [packages/app/src/composables/useGameEngine.ts:5](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useGameEngine.ts#L5)*

## Functions

###  provideEngine

▸ **provideEngine**(): *void*

*Defined in [packages/app/src/composables/useGameEngine.ts:7](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useGameEngine.ts#L7)*

**Returns:** *void*

___

###  useEngine

▸ **useEngine**(): *[Engine](../classes/_src_gameengine_engine_.engine.md)*

*Defined in [packages/app/src/composables/useGameEngine.ts:13](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useGameEngine.ts#L13)*

**Returns:** *[Engine](../classes/_src_gameengine_engine_.engine.md)*

___

###  useEngineWithScene

▸ **useEngineWithScene**‹**T**›(`type`: object): *object*

*Defined in [packages/app/src/composables/useGameEngine.ts:23](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useGameEngine.ts#L23)*

**Type parameters:**

▪ **T**: *[BaseScene](../classes/_src_gameengine_scenes_basescene_.basescene.md)*

**Parameters:**

▪ **type**: *object*

Name | Type |
------ | ------ |
`constructor` |  |

**Returns:** *object*

* **engine**: *[Engine](../classes/_src_gameengine_engine_.engine.md)*

* **scene**: *T*
