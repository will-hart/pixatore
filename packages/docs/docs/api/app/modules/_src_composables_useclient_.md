---
id: "_src_composables_useclient_"
title: "src/composables/useClient"
sidebar_label: "src/composables/useClient"
---

[app](../index.md) › [Globals](../globals.md) › ["src/composables/useClient"](_src_composables_useclient_.md)

## Index

### Variables

* [key](_src_composables_useclient_.md#const-key)

### Functions

* [provideClient](_src_composables_useclient_.md#provideclient)
* [useClient](_src_composables_useclient_.md#useclient)

## Variables

### `Const` key

• **key**: *InjectionKey‹Ref‹Client | null››* = Symbol('useClient::Client')

*Defined in [packages/app/src/composables/useClient.ts:4](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClient.ts#L4)*

## Functions

###  provideClient

▸ **provideClient**(): *void*

*Defined in [packages/app/src/composables/useClient.ts:6](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClient.ts#L6)*

**Returns:** *void*

___

###  useClient

▸ **useClient**(): *object*

*Defined in [packages/app/src/composables/useClient.ts:12](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClient.ts#L12)*

**Returns:** *object*

* **client**: *Ref‹Client | null›*

* **setClient**(): *function*

  * (`uri`: string): *void*
