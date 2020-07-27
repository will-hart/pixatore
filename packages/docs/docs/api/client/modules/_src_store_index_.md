---
id: "_src_store_index_"
title: "src/store/index"
sidebar_label: "src/store/index"
---

[@pixatore/app](../index.md) › [Globals](../globals.md) › ["src/store/index"](_src_store_index_.md)

## Index

### Variables

* [debug](_src_store_index_.md#const-debug)
* [store](_src_store_index_.md#const-store)

## Variables

### `Const` debug

• **debug**: *boolean* = process?.env?.NODE_ENV && process.env.NODE_ENV !== 'production'

*Defined in [packages/app/src/store/index.ts:6](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/index.ts#L6)*

___

### `Const` store

• **store**: *Store‹[AppState](../interfaces/_src_store_types_.appstate.md)›* = createStore({
  modules: {
    [StoreNamespaces.gameStatus]: gameStatus,
  },
  strict: debug,
})

*Defined in [packages/app/src/store/index.ts:8](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/store/index.ts#L8)*
