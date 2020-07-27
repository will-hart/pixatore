---
id: "_commands_lobbycommands_.onplayerreadycommand"
title: "OnPlayerReadyCommand"
sidebar_label: "OnPlayerReadyCommand"
---

[server](../index.md) › [Globals](../globals.md) › ["commands/LobbyCommands"](../modules/_commands_lobbycommands_.md) › [OnPlayerReadyCommand](_commands_lobbycommands_.onplayerreadycommand.md)

## Hierarchy

* [Command](_commands_command_.command.md)‹GameState, object›

  ↳ **OnPlayerReadyCommand**

## Index

### Properties

* [clock](_commands_lobbycommands_.onplayerreadycommand.md#clock)
* [payload](_commands_lobbycommands_.onplayerreadycommand.md#payload)
* [room](_commands_lobbycommands_.onplayerreadycommand.md#room)
* [state](_commands_lobbycommands_.onplayerreadycommand.md#state)

### Methods

* [delay](_commands_lobbycommands_.onplayerreadycommand.md#protected-delay)
* [execute](_commands_lobbycommands_.onplayerreadycommand.md#execute)
* [setPayload](_commands_lobbycommands_.onplayerreadycommand.md#setpayload)
* [validate](_commands_lobbycommands_.onplayerreadycommand.md#optional-validate)

## Properties

###  clock

• **clock**: *Room["clock"]*

*Inherited from [Command](_commands_command_.command.md).[clock](_commands_command_.command.md#clock)*

*Defined in [packages/server/src/commands/Command.ts:14](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L14)*

___

###  payload

• **payload**: *object*

*Inherited from [Command](_commands_command_.command.md).[payload](_commands_command_.command.md#payload)*

*Defined in [packages/server/src/commands/Command.ts:10](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L10)*

#### Type declaration:

* **isReady**: *boolean*

* **sessionId**: *string*

___

###  room

• **room**: *Room‹GameState›*

*Inherited from [Command](_commands_command_.command.md).[room](_commands_command_.command.md#room)*

*Defined in [packages/server/src/commands/Command.ts:12](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L12)*

___

###  state

• **state**: *GameState*

*Inherited from [Command](_commands_command_.command.md).[state](_commands_command_.command.md#state)*

*Defined in [packages/server/src/commands/Command.ts:13](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L13)*

## Methods

### `Protected` delay

▸ **delay**(`milliseconds`: number): *Promise‹unknown›*

*Inherited from [Command](_commands_command_.command.md).[delay](_commands_command_.command.md#protected-delay)*

*Defined in [packages/server/src/commands/Command.ts:31](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L31)*

Delay the execution by `milliseconds`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`milliseconds` | number |   |

**Returns:** *Promise‹unknown›*

___

###  execute

▸ **execute**(`__namedParameters`: object): *Promise‹void›*

*Overrides [Command](_commands_command_.command.md).[execute](_commands_command_.command.md#abstract-execute)*

*Defined in [packages/server/src/commands/LobbyCommands.ts:117](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/LobbyCommands.ts#L117)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`isReady` | boolean |
`sessionId` | string |

**Returns:** *Promise‹void›*

___

###  setPayload

▸ **setPayload**(`payload`: this["payload"]): *this*

*Inherited from [Command](_commands_command_.command.md).[setPayload](_commands_command_.command.md#setpayload)*

*Defined in [packages/server/src/commands/Command.ts:16](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | this["payload"] |

**Returns:** *this*

___

### `Optional` validate

▸ **validate**(`payload`: this["payload"]): *boolean*

*Inherited from [Command](_commands_command_.command.md).[validate](_commands_command_.command.md#optional-validate)*

*Defined in [packages/server/src/commands/Command.ts:21](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | this["payload"] |

**Returns:** *boolean*
