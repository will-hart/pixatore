---
id: "_src_gameengine_scenes_scenenavigator_.scenenavigator"
title: "SceneNavigator"
sidebar_label: "SceneNavigator"
---

[@pixatore/app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/scenes/SceneNavigator"](../modules/_src_gameengine_scenes_scenenavigator_.md) › [SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)

## Hierarchy

* **SceneNavigator**

## Index

### Constructors

* [constructor](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#constructor)

### Properties

* [engine](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#private-engine)
* [screens](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#private-screens)

### Accessors

* [current](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#current)

### Methods

* [push](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#push)
* [register](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#private-register)
* [replace](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#replace)
* [reset](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#reset)
* [unregister](_src_gameengine_scenes_scenenavigator_.scenenavigator.md#private-unregister)

## Constructors

###  constructor

\+ **new SceneNavigator**(`engine`: [Engine](_src_gameengine_engine_.engine.md)): *[SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:6](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`engine` | [Engine](_src_gameengine_engine_.engine.md) |

**Returns:** *[SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)*

## Properties

### `Private` engine

• **engine**: *[Engine](_src_gameengine_engine_.engine.md)*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:8](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L8)*

___

### `Private` screens

• **screens**: *[Stack](_src_gameengine_utilities_stack_.stack.md)‹BaseScreen›* = new Stack&lt;BaseScreen&gt;()

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:6](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L6)*

## Accessors

###  current

• **get current**(): *BaseScreen*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:10](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L10)*

**Returns:** *BaseScreen*

## Methods

###  push

▸ **push**(`screen`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:18](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L18)*

Adds a new screen "on top" of the current screen

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`screen` | BaseScreen |   |

**Returns:** *void*

___

### `Private` register

▸ **register**(`screen`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:42](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`screen` | BaseScreen |

**Returns:** *void*

___

###  replace

▸ **replace**(`screen`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:27](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L27)*

Replaces the current top most screen

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`screen` | BaseScreen |   |

**Returns:** *void*

___

###  reset

▸ **reset**(`screen`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:36](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L36)*

Clears the entire navigation stack and replaces with the given screen

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`screen` | BaseScreen |   |

**Returns:** *void*

___

### `Private` unregister

▸ **unregister**(`screen?`: BaseScreen): *void*

*Defined in [packages/app/src/gameEngine/scenes/SceneNavigator.ts:47](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/scenes/SceneNavigator.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`screen?` | BaseScreen |

**Returns:** *void*
