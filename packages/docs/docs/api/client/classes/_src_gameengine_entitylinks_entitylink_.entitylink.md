---
id: "_src_gameengine_entitylinks_entitylink_.entitylink"
title: "EntityLink"
sidebar_label: "EntityLink"
---

[@pixatore/app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/entityLinks/EntityLink"](../modules/_src_gameengine_entitylinks_entitylink_.md) › [EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md)

A collection of drawable objects that is synchronised with Colyseus game state

## Type parameters

▪ **TEntity**: *object*

▪ **TDrawable**: *[SpriteDrawable](_src_gameengine_drawables_spritedrawable_.spritedrawable.md)*

## Hierarchy

* **EntityLink**

  ↳ [PlayerEntityLink](_src_gameengine_entitylinks_playerentitylink_.playerentitylink.md)

## Index

### Constructors

* [constructor](_src_gameengine_entitylinks_entitylink_.entitylink.md#constructor)

### Properties

* [collection](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-collection)
* [engine](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-engine)
* [parent](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-parent)

### Methods

* [addDrawable](_src_gameengine_entitylinks_entitylink_.entitylink.md#protected-adddrawable)
* [createEntity](_src_gameengine_entitylinks_entitylink_.entitylink.md#abstract-createentity)
* [removeEntity](_src_gameengine_entitylinks_entitylink_.entitylink.md#removeentity)
* [subscribe](_src_gameengine_entitylinks_entitylink_.entitylink.md#abstract-subscribe)
* [updateEntity](_src_gameengine_entitylinks_entitylink_.entitylink.md#abstract-updateentity)

## Constructors

###  constructor

\+ **new EntityLink**(`engine`: [Engine](_src_gameengine_engine_.engine.md), `parent`: [GroupDrawable](_src_gameengine_drawables_groupdrawable_.groupdrawable.md)): *[EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:14](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`engine` | [Engine](_src_gameengine_engine_.engine.md) |
`parent` | [GroupDrawable](_src_gameengine_drawables_groupdrawable_.groupdrawable.md) |

**Returns:** *[EntityLink](_src_gameengine_entitylinks_entitylink_.entitylink.md)*

## Properties

### `Protected` collection

• **collection**: *Map‹string, TDrawable›* = new Map&lt;string, TDrawable&gt;()

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:14](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L14)*

Contains the mapping between entity ID and drawable

___

### `Protected` engine

• **engine**: *[Engine](_src_gameengine_engine_.engine.md)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:16](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L16)*

___

### `Protected` parent

• **parent**: *[GroupDrawable](_src_gameengine_drawables_groupdrawable_.groupdrawable.md)*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:16](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L16)*

## Methods

### `Protected` addDrawable

▸ **addDrawable**(`entity`: TEntity, `drawable`: TDrawable): *void*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:28](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | TEntity |
`drawable` | TDrawable |

**Returns:** *void*

___

### `Abstract` createEntity

▸ **createEntity**(`entity`: TEntity): *void*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:24](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | TEntity |

**Returns:** *void*

___

###  removeEntity

▸ **removeEntity**(`entity`: TEntity): *void*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:33](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | TEntity |

**Returns:** *void*

___

### `Abstract` subscribe

▸ **subscribe**(`bus`: EventBus): *void*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:22](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L22)*

Subscribes to events required to keep this EntityLink up to date

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bus` | EventBus |   |

**Returns:** *void*

___

### `Abstract` updateEntity

▸ **updateEntity**(`entity`: TEntity): *void*

*Defined in [packages/app/src/gameEngine/entityLinks/EntityLink.ts:26](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/gameEngine/entityLinks/EntityLink.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`entity` | TEntity |

**Returns:** *void*
