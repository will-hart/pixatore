---
id: "_src_gameengine_entitylinks_playerentitylink_.playerentitylink"
title: "PlayerEntityLink"
sidebar_label: "PlayerEntityLink"
---

[app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/entityLinks/PlayerEntityLink"](../modules/_src_gameengine_entitylinks_playerentitylink_.md) › [PlayerEntityLink](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md)

## Hierarchy

* [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md)‹Player, [SpriteDrawable](_src_gameengine_drawables_spritedrawable_.spritedrawable.md)›

  ↳ **PlayerEntityLink**

## Index

### Constructors

* [constructor](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#constructor)

### Properties

* [collection](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#protected-collection)
* [engine](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#protected-engine)
* [parent](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#protected-parent)

### Methods

* [addDrawable](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#protected-adddrawable)
* [createEntity](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#createentity)
* [removeEntity](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#removeentity)
* [subscribe](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#subscribe)
* [updateEntity](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md#updateentity)

## Constructors

###  constructor

\+ **new PlayerEntityLink**(`engine`: [Engine](_src_gameengine_engine_.engine.md), `parent`: [GroupDrawable](_src_gameengine_drawables_groupdrawable_.groupdrawable.md)): *[PlayerEntityLink](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md)*

*Inherited from [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[constructor](_src_gameengine_entitylinks_entitylink_.entitylink.md#constructor)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:14](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`engine` | [Engine](_src_gameengine_engine_.engine.md) |
`parent` | [GroupDrawable](_src_gameengine_drawables_groupdrawable_.groupdrawable.md) |

**Returns:** *[PlayerEntityLink](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md)*

## Properties

### `Protected` collection

• **collection**: *Map‹string, [SpriteDrawable](_src_gameengine_drawables_spritedrawable_.spritedrawable.md)›* = new Map&lt;string, TDrawable&gt;()

*Inherited from [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[collection](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-collection)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:14](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L14)*

Contains the mapping between entity ID and drawable

___

### `Protected` engine

• **engine**: *[Engine](_src_gameengine_engine_.engine.md)*

*Inherited from [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[engine](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-engine)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:16](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L16)*

___

### `Protected` parent

• **parent**: *[GroupDrawable](_src_gameengine_drawables_groupdrawable_.groupdrawable.md)*

*Inherited from [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[parent](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-parent)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:16](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L16)*

## Methods

### `Protected` addDrawable

▸ **addDrawable**(`entity`: Player, `drawable`: [SpriteDrawable](_src_gameengine_drawables_spritedrawable_.spritedrawable.md)): *void*

*Inherited from [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[addDrawable](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-adddrawable)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:28](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | Player |
`drawable` | [SpriteDrawable](_src_gameengine_drawables_spritedrawable_.spritedrawable.md) |

**Returns:** *void*

___

###  createEntity

▸ **createEntity**(`entity`: Player): *void*

*Overrides [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[createEntity](_src_gameengine_entitylinks_entitylink_.entitylink.md#abstract-createentity)*

*Defined in [packages/app/src/gameEngine/entityLinks/PlayerEntityLink.ts:16](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/PlayerEntityLink.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | Player |

**Returns:** *void*

___

###  removeEntity

▸ **removeEntity**(`entity`: Player): *void*

*Inherited from [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[removeEntity](_src_gameengine_entitylinks_entitylink_.entitylink.md#removeentity)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:33](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | Player |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`bus`: EventBus): *void*

*Overrides [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[subscribe](_src_gameengine_entitylinks_entitylink_.entitylink.md#abstract-subscribe)*

*Defined in [packages/app/src/gameEngine/entityLinks/PlayerEntityLink.ts:10](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/PlayerEntityLink.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`bus` | EventBus |

**Returns:** *void*

___

###  updateEntity

▸ **updateEntity**(`entity`: Player): *void*

*Overrides [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md).[updateEntity](_src_gameengine_entitylinks_entitylink_.entitylink.md#abstract-updateentity)*

*Defined in [packages/app/src/gameEngine/entityLinks/PlayerEntityLink.ts:24](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/entityLinks/PlayerEntityLink.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | Player |

**Returns:** *void*
