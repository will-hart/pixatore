---
id: "_src_gameengine_spritestorage_.spritestorage"
title: "SpriteStorage"
sidebar_label: "SpriteStorage"
---

[app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/SpriteStorage"](../modules/_src_gameengine_spritestorage_.md) › [SpriteStorage](_src_gameengine_spritestorage_.spritestorage.md)

## Hierarchy

* **SpriteStorage**

## Index

### Constructors

* [constructor](_src_gameengine_spritestorage_.spritestorage.md#constructor)

### Properties

* [lastLoaded](_src_gameengine_spritestorage_.spritestorage.md#lastloaded)
* [loadingComplete](_src_gameengine_spritestorage_.spritestorage.md#loadingcomplete)
* [progress](_src_gameengine_spritestorage_.spritestorage.md#progress)

### Methods

* [getSprite](_src_gameengine_spritestorage_.spritestorage.md#getsprite)

## Constructors

###  constructor

\+ **new SpriteStorage**(`app`: Application, `_onLoadingCompleteCallback?`: undefined | function): *[SpriteStorage](_src_gameengine_spritestorage_.spritestorage.md)*

*Defined in [packages/app/src/gameEngine/SpriteStorage.ts:8](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/SpriteStorage.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`app` | Application |
`_onLoadingCompleteCallback?` | undefined &#124; function |

**Returns:** *[SpriteStorage](_src_gameengine_spritestorage_.spritestorage.md)*

## Properties

###  lastLoaded

• **lastLoaded**: *string* = ""

*Defined in [packages/app/src/gameEngine/SpriteStorage.ts:6](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/SpriteStorage.ts#L6)*

___

###  loadingComplete

• **loadingComplete**: *boolean* = false

*Defined in [packages/app/src/gameEngine/SpriteStorage.ts:8](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/SpriteStorage.ts#L8)*

___

###  progress

• **progress**: *number* = 0

*Defined in [packages/app/src/gameEngine/SpriteStorage.ts:7](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/SpriteStorage.ts#L7)*

## Methods

###  getSprite

▸ **getSprite**(`key`: [SpriteKey](../enums/_src_gameengine_spritemap_.spritekey.md)): *Sprite | null*

*Defined in [packages/app/src/gameEngine/SpriteStorage.ts:32](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/SpriteStorage.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | [SpriteKey](../enums/_src_gameengine_spritemap_.spritekey.md) |

**Returns:** *Sprite | null*
