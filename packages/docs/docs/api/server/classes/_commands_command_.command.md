---
id: "_commands_command_.command"
title: "Command"
sidebar_label: "Command"
---

[server](../index.md) › [Globals](../globals.md) › ["commands/Command"](../modules/_commands_command_.md) › [Command](_commands_command_.command.md)

## Type parameters

▪ **State**

▪ **Payload**

## Hierarchy

* **Command**

  ↳ [OnCreateCommand](_commands_lobbycommands_.oncreatecommand.md)

  ↳ [OnGameStartCommand](_commands_lobbycommands_.ongamestartcommand.md)

  ↳ [OnJoinCommand](_commands_lobbycommands_.onjoincommand.md)

  ↳ [OnLeaveCommand](_commands_lobbycommands_.onleavecommand.md)

  ↳ [OnPlayerReadyCommand](_commands_lobbycommands_.onplayerreadycommand.md)

## Index

### Properties

* [clock](_commands_command_.command.md#clock)
* [payload](_commands_command_.command.md#payload)
* [room](_commands_command_.command.md#room)
* [state](_commands_command_.command.md#state)

### Methods

* [delay](_commands_command_.command.md#protected-delay)
* [execute](_commands_command_.command.md#abstract-execute)
* [setPayload](_commands_command_.command.md#setpayload)
* [validate](_commands_command_.command.md#optional-validate)

## Properties

###  clock

• **clock**: *Room["clock"]*

*Defined in [packages/server/src/commands/Command.ts:14](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L14)*

___

###  payload

• **payload**: *Payload*

*Defined in [packages/server/src/commands/Command.ts:10](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L10)*

___

###  room

• **room**: *Room‹State›*

*Defined in [packages/server/src/commands/Command.ts:12](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L12)*

___

###  state

• **state**: *State*

*Defined in [packages/server/src/commands/Command.ts:13](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L13)*

## Methods

### `Protected` delay

▸ **delay**(`milliseconds`: number): *Promise‹unknown›*

*Defined in [packages/server/src/commands/Command.ts:31](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L31)*

Delay the execution by `milliseconds`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`milliseconds` | number |   |

**Returns:** *Promise‹unknown›*

___

### `Abstract` execute

▸ **execute**(`payload`: this["payload"]): *Promise‹void | Array‹[Command](_commands_command_.command.md)››*

*Defined in [packages/server/src/commands/Command.ts:23](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | this["payload"] |

**Returns:** *Promise‹void | Array‹[Command](_commands_command_.command.md)››*

___

###  setPayload

▸ **setPayload**(`payload`: this["payload"]): *this*

*Defined in [packages/server/src/commands/Command.ts:16](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | this["payload"] |

**Returns:** *this*

___

### `Optional` validate

▸ **validate**(`payload`: this["payload"]): *boolean*

*Defined in [packages/server/src/commands/Command.ts:21](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/commands/Command.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | this["payload"] |

**Returns:** *boolean*
