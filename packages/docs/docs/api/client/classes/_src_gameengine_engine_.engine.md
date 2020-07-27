---
id: "_src_gameengine_engine_.engine"
title: "Engine"
sidebar_label: "Engine"
---

[@pixatore/app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/Engine"](../modules/_src_gameengine_engine_.md) › [Engine](_src_gameengine_engine_.engine.md)

## Hierarchy

* **Engine**

## Index

### Constructors

* [constructor](_src_gameengine_engine_.engine.md#constructor)

### Properties

* [app](_src_gameengine_engine_.engine.md#private-app)
* [debouncedResize](_src_gameengine_engine_.engine.md#private-debouncedresize)
* [input](_src_gameengine_engine_.engine.md#input)
* [navigator](_src_gameengine_engine_.engine.md#navigator)
* [playerLink](_src_gameengine_engine_.engine.md#private-playerlink)
* [sprites](_src_gameengine_engine_.engine.md#sprites)
* [viewport](_src_gameengine_engine_.engine.md#private-viewport)

### Accessors

* [height](_src_gameengine_engine_.engine.md#height)
* [root](_src_gameengine_engine_.engine.md#root)
* [ticker](_src_gameengine_engine_.engine.md#ticker)
* [width](_src_gameengine_engine_.engine.md#width)

### Methods

* [doResize](_src_gameengine_engine_.engine.md#private-doresize)
* [loop](_src_gameengine_engine_.engine.md#loop)
* [mount](_src_gameengine_engine_.engine.md#mount)
* [onLoaded](_src_gameengine_engine_.engine.md#private-onloaded)
* [resize](_src_gameengine_engine_.engine.md#resize)
* [subscribe](_src_gameengine_engine_.engine.md#subscribe)

## Constructors

###  constructor

\+ **new Engine**(): *[Engine](_src_gameengine_engine_.engine.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:39](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L39)*

**Returns:** *[Engine](_src_gameengine_engine_.engine.md)*

## Properties

### `Private` app

• **app**: *Application*

*Defined in [packages/app/src/gameEngine/Engine.ts:12](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L12)*

___

### `Private` debouncedResize

• **debouncedResize**: *function*

*Defined in [packages/app/src/gameEngine/Engine.ts:23](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L23)*

#### Type declaration:

▸ (`width`: number, `height`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`height` | number |

___

###  input

• **input**: *[InputManager](_src_gameengine_inputmanager_.inputmanager.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:18](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L18)*

___

###  navigator

• **navigator**: *[SceneNavigator](_src_gameengine_scenes_scenenavigator_.scenenavigator.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:17](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L17)*

___

### `Private` playerLink

• **playerLink**: *[PlayerEntityLink](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:21](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L21)*

___

###  sprites

• **sprites**: *[SpriteStorage](_src_gameengine_spritestorage_.spritestorage.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:16](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L16)*

___

### `Private` viewport

• **viewport**: *[GroupDrawable](_src_gameengine_drawables_groupdrawable_.groupdrawable.md)*

*Defined in [packages/app/src/gameEngine/Engine.ts:13](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L13)*

## Accessors

###  height

• **get height**(): *number*

*Defined in [packages/app/src/gameEngine/Engine.ts:29](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L29)*

**Returns:** *number*

___

###  root

• **get root**(): *Container*

*Defined in [packages/app/src/gameEngine/Engine.ts:37](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L37)*

**Returns:** *Container*

___

###  ticker

• **get ticker**(): *Ticker*

*Defined in [packages/app/src/gameEngine/Engine.ts:33](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L33)*

**Returns:** *Ticker*

___

###  width

• **get width**(): *number*

*Defined in [packages/app/src/gameEngine/Engine.ts:25](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L25)*

**Returns:** *number*

## Methods

### `Private` doResize

▸ **doResize**(`width`: number, `height`: number): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:89](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`height` | number |

**Returns:** *void*

___

###  loop

▸ **loop**(): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:74](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L74)*

**Returns:** *void*

___

###  mount

▸ **mount**(`parent`: HTMLElement | null): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:62](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | HTMLElement &#124; null |

**Returns:** *void*

___

### `Private` onLoaded

▸ **onLoaded**(): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:70](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L70)*

**Returns:** *void*

___

###  resize

▸ **resize**(`width`: number, `height`: number): *void*

*Defined in [packages/app/src/gameEngine/Engine.ts:85](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L85)*

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

*Defined in [packages/app/src/gameEngine/Engine.ts:100](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/Engine.ts#L100)*

Subscribes the game engine to the event bus, used to keep the Colyseus, vue and PIXI game states in sync

**Parameters:**

Name | Type |
------ | ------ |
`bus` | EventBus |

**Returns:** *void*
