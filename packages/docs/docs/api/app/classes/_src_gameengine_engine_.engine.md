---
id: "_src_gameengine_engine_.engine"
title: "Engine"
sidebar_label: "Engine"
---

[app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/Engine"](../modules/_src_gameengine_engine_.md) › [Engine](_src_gameengine_engine_.engine.md)

## Hierarchy

* **Engine**

## Index

### Constructors

* [constructor](_src_gameengine_engine_.engine.md#constructor)

### Properties

* [input](_src_gameengine_engine_.engine.md#input)
* [navigator](_src_gameengine_engine_.engine.md#navigator)
* [sprites](_src_gameengine_engine_.engine.md#sprites)

### Accessors

* [height](_src_gameengine_engine_.engine.md#height)
* [root](_src_gameengine_engine_.engine.md#root)
* [ticker](_src_gameengine_engine_.engine.md#ticker)
* [width](_src_gameengine_engine_.engine.md#width)

### Methods

* [loop](_src_gameengine_engine_.engine.md#loop)
* [mount](_src_gameengine_engine_.engine.md#mount)
* [resize](_src_gameengine_engine_.engine.md#resize)
* [subscribe](_src_gameengine_engine_.engine.md#subscribe)

## Constructors

###  constructor

\+ **new Engine**(): *[Engine](_src_gameengine_engine_.engine.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:39](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L39)*

**Returns:** *[Engine](_src_gameengine_engine_.engine.md)*

## Properties

###  input

• **input**: *[InputManager](_src_gameengine_inputmanager_.inputmanager.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:18](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L18)*

___

###  navigator

• **navigator**: *[SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:17](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L17)*

___

###  sprites

• **sprites**: *[SpriteStorage](_src_gameengine_spritestorage_.spritestorage.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:16](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L16)*

## Accessors

###  height

• **get height**(): *number*

*Defined in [packages/app/src/gameEngine/Engine.ts:29](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L29)*

**Returns:** *number*

___

###  root

• **get root**(): *Container*

*Defined in [packages/app/src/gameEngine/Engine.ts:37](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L37)*

**Returns:** *Container*

___

###  ticker

• **get ticker**(): *Ticker*

*Defined in [packages/app/src/gameEngine/Engine.ts:33](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L33)*

**Returns:** *Ticker*

___

###  width

• **get width**(): *number*

*Defined in [packages/app/src/gameEngine/Engine.ts:25](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L25)*

**Returns:** *number*

## Methods

###  loop

▸ **loop**(): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:74](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L74)*

**Returns:** *void*

___

###  mount

▸ **mount**(`parent`: HTMLElement | null): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:62](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | HTMLElement &#124; null |

**Returns:** *void*

___

###  resize

▸ **resize**(`width`: number, `height`: number): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:85](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L85)*

Resizes and scales the canvas

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`width` | number | The width to scale the element to |
`height` | number | The height to scale the element to  |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`bus`: EventBus): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:100](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/gameEngine/Engine.ts#L100)*

Subscribes the game engine to the event bus, used to keep the Colyseus, vue and PIXI game states in sync

**Parameters:**

Name | Type |
------ | ------ |
`bus` | EventBus |

**Returns:** *void*
