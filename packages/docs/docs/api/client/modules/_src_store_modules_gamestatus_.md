---
id: "_src_store_modules_gamestatus_"
title: "src/store/modules/gameStatus"
sidebar_label: "src/store/modules/gameStatus"
---

[@pixatore/app](../index.md) › [Globals](../globals.md) › ["src/store/modules/gameStatus"](_src_store_modules_gamestatus_.md)

## Index

### Variables

* [getters](_src_store_modules_gamestatus_.md#const-getters)

### Object literals

* [actions](_src_store_modules_gamestatus_.md#const-actions)
* [gameStatus](_src_store_modules_gamestatus_.md#const-gamestatus)
* [mutations](_src_store_modules_gamestatus_.md#const-mutations)
* [state](_src_store_modules_gamestatus_.md#const-state)

## Variables

### `Const` getters

• **getters**: *object*

*Defined in [packages/app/src/store/modules/gameStatus.ts:8](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L8)*

#### Type declaration:

## Object literals

### `Const` actions

### ▪ **actions**: *object*

*Defined in [packages/app/src/store/modules/gameStatus.ts:16](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L16)*

###  setFps

▸ **setFps**(`__namedParameters`: object, `fps`: number): *void*

*Defined in [packages/app/src/store/modules/gameStatus.ts:17](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L17)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`commit` | Commit |

▪ **fps**: *number*

**Returns:** *void*

___

### `Const` gameStatus

### ▪ **gameStatus**: *object*

*Defined in [packages/app/src/store/modules/gameStatus.ts:22](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L22)*

###  actions

• **actions**: *ActionTree‹[GameStatusModuleState](../interfaces/_src_store_types_.gamestatusmodulestate.md), [AppState](../interfaces/_src_store_types_.appstate.md)›*

*Defined in [packages/app/src/store/modules/gameStatus.ts:25](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L25)*

###  getters

• **getters**: *object*

*Defined in [packages/app/src/store/modules/gameStatus.ts:26](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L26)*

#### Type declaration:

###  mutations

• **mutations**: *MutationTree‹[GameStatusModuleState](../interfaces/_src_store_types_.gamestatusmodulestate.md)›*

*Defined in [packages/app/src/store/modules/gameStatus.ts:27](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L27)*

###  namespaced

• **namespaced**: *true* = true

*Defined in [packages/app/src/store/modules/gameStatus.ts:23](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L23)*

###  state

• **state**: *[GameStatusModuleState](../interfaces/_src_store_types_.gamestatusmodulestate.md)*

*Defined in [packages/app/src/store/modules/gameStatus.ts:24](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L24)*

___

### `Const` mutations

### ▪ **mutations**: *object*

*Defined in [packages/app/src/store/modules/gameStatus.ts:10](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L10)*

###  setFps

▸ **setFps**(`state`: [GameStatusModuleState](../interfaces/_src_store_types_.gamestatusmodulestate.md), `fps`: number): *void*

*Defined in [packages/app/src/store/modules/gameStatus.ts:11](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`state` | [GameStatusModuleState](../interfaces/_src_store_types_.gamestatusmodulestate.md) |
`fps` | number |

**Returns:** *void*

___

### `Const` state

### ▪ **state**: *object*

*Defined in [packages/app/src/store/modules/gameStatus.ts:4](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L4)*

###  current

• **current**: *number* = 0

*Defined in [packages/app/src/store/modules/gameStatus.ts:5](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/modules/gameStatus.ts#L5)*
