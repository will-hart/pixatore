---
id: "_commands_command_.dispatcher"
title: "Dispatcher"
sidebar_label: "Dispatcher"
---

[server](../index.md) › [Globals](../globals.md) › ["commands/Command"](../modules/_commands_command_.md) › [Dispatcher](_commands_command_.dispatcher.md)

## Hierarchy

* **Dispatcher**

## Index

### Constructors

* [constructor](_commands_command_.dispatcher.md#constructor)

### Properties

* [room](_commands_command_.dispatcher.md#room)
* [stopped](_commands_command_.dispatcher.md#stopped)

### Methods

* [dispatch](_commands_command_.dispatcher.md#dispatch)
* [stop](_commands_command_.dispatcher.md#stop)

## Constructors

###  constructor

\+ **new Dispatcher**(`room`: any): *[Dispatcher](_commands_command_.dispatcher.md)*

*Defined in [packages/server/src/commands/Command.ts:38](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/commands/Command.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`room` | any |

**Returns:** *[Dispatcher](_commands_command_.dispatcher.md)*

## Properties

###  room

• **room**: *Room*

*Defined in [packages/server/src/commands/Command.ts:37](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/commands/Command.ts#L37)*

___

###  stopped

• **stopped**: *boolean* = false

*Defined in [packages/server/src/commands/Command.ts:38](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/commands/Command.ts#L38)*

## Methods

###  dispatch

▸ **dispatch**‹**T**›(`command`: T, `payload?`: T["payload"]): *Promise‹void›*

*Defined in [packages/server/src/commands/Command.ts:48](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/commands/Command.ts#L48)*

**Type parameters:**

▪ **T**: *[Command](_commands_command_.command.md)*

**Parameters:**

Name | Type |
------ | ------ |
`command` | T |
`payload?` | T["payload"] |

**Returns:** *Promise‹void›*

___

###  stop

▸ **stop**(): *void*

*Defined in [packages/server/src/commands/Command.ts:44](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/commands/Command.ts#L44)*

**Returns:** *void*
