---
id: "_src_gameengine_scenes_scenenavigator_.scenenavigator"
title: "SceneNavigator"
sidebar_label: "SceneNavigator"
---

[app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/scenes/SceneNavigator"](../modules/_src_gameengine_scenes_scenenavigator_.md) › [SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)

## Hierarchy

* **SceneNavigator**

## Index

### Constructors

* [constructor](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#constructor)

### Accessors

* [current](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#current)

### Methods

* [push](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#push)
* [replace](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#replace)
* [reset](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#reset)

## Constructors

###  constructor

\+ **new SceneNavigator**(`engine`: [Engine](_src_gameengine_engine_.engine.md)): *[SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:6](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`engine` | [Engine](_src_gameengine_engine_.engine.md) |

**Returns:** *[SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)*

## Accessors

###  current

• **get current**(): *BaseScreen*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:10](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L10)*

**Returns:** *BaseScreen*

## Methods

###  push

▸ **push**(`screen`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:18](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L18)*

Adds a new screen "on top" of the current screen

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`screen` | BaseScreen |   |

**Returns:** *void*

___

###  replace

▸ **replace**(`screen`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:27](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L27)*

Replaces the current top most screen

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`screen` | BaseScreen |   |

**Returns:** *void*

___

###  reset

▸ **reset**(`screen`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:36](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L36)*

Clears the entire navigation stack and replaces with the given screen

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`screen` | BaseScreen |   |

**Returns:** *void*
