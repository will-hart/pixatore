---
id: "_src_gameengine_inputmanager_.inputmanager"
title: "InputManager"
sidebar_label: "InputManager"
---

[app](../index.md) › [Globals](../globals.md) › ["src/gameEngine/InputManager"](../modules/_src_gameengine_inputmanager_.md) › [InputManager](_src_gameengine_inputmanager_.inputmanager.md)

## Hierarchy

* **InputManager**

## Index

### Accessors

* [anyKeyDown](_src_gameengine_inputmanager_.inputmanager.md#anykeydown)
* [anyKeyHeld](_src_gameengine_inputmanager_.inputmanager.md#anykeyheld)
* [anyKeyUp](_src_gameengine_inputmanager_.inputmanager.md#anykeyup)
* [keysDown](_src_gameengine_inputmanager_.inputmanager.md#keysdown)
* [keysHeld](_src_gameengine_inputmanager_.inputmanager.md#keysheld)
* [keysUp](_src_gameengine_inputmanager_.inputmanager.md#keysup)

### Methods

* [endFrame](_src_gameengine_inputmanager_.inputmanager.md#endframe)
* [heldFor](_src_gameengine_inputmanager_.inputmanager.md#heldfor)
* [isDown](_src_gameengine_inputmanager_.inputmanager.md#isdown)
* [isHeld](_src_gameengine_inputmanager_.inputmanager.md#isheld)
* [isUp](_src_gameengine_inputmanager_.inputmanager.md#isup)
* [reset](_src_gameengine_inputmanager_.inputmanager.md#reset)
* [subscribe](_src_gameengine_inputmanager_.inputmanager.md#subscribe)
* [unsubscribe](_src_gameengine_inputmanager_.inputmanager.md#unsubscribe)

## Accessors

###  anyKeyDown

• **get anyKeyDown**(): *boolean*

*Defined in [packages/app/src/gameEngine/InputManager.ts:29](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L29)*

**Returns:** *boolean*

___

###  anyKeyHeld

• **get anyKeyHeld**(): *boolean*

*Defined in [packages/app/src/gameEngine/InputManager.ts:39](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L39)*

**Returns:** *boolean*

___

###  anyKeyUp

• **get anyKeyUp**(): *boolean*

*Defined in [packages/app/src/gameEngine/InputManager.ts:47](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L47)*

**Returns:** *boolean*

___

###  keysDown

• **get keysDown**(): *string[]*

*Defined in [packages/app/src/gameEngine/InputManager.ts:32](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L32)*

**Returns:** *string[]*

___

###  keysHeld

• **get keysHeld**(): *string[]*

*Defined in [packages/app/src/gameEngine/InputManager.ts:42](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L42)*

**Returns:** *string[]*

___

###  keysUp

• **get keysUp**(): *string[]*

*Defined in [packages/app/src/gameEngine/InputManager.ts:50](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L50)*

**Returns:** *string[]*

## Methods

###  endFrame

▸ **endFrame**(): *void*

*Defined in [packages/app/src/gameEngine/InputManager.ts:16](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L16)*

**Returns:** *void*

___

###  heldFor

▸ **heldFor**(`key`: string): *number*

*Defined in [packages/app/src/gameEngine/InputManager.ts:37](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *number*

___

###  isDown

▸ **isDown**(`key`: string): *boolean*

*Defined in [packages/app/src/gameEngine/InputManager.ts:27](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

###  isHeld

▸ **isHeld**(`key`: string): *boolean*

*Defined in [packages/app/src/gameEngine/InputManager.ts:36](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

###  isUp

▸ **isUp**(`key`: string): *boolean*

*Defined in [packages/app/src/gameEngine/InputManager.ts:46](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

###  reset

▸ **reset**(): *void*

*Defined in [packages/app/src/gameEngine/InputManager.ts:21](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L21)*

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(): *void*

*Defined in [packages/app/src/gameEngine/InputManager.ts:6](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L6)*

**Returns:** *void*

___

###  unsubscribe

▸ **unsubscribe**(): *void*

*Defined in [packages/app/src/gameEngine/InputManager.ts:11](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/gameEngine/InputManager.ts#L11)*

**Returns:** *void*
