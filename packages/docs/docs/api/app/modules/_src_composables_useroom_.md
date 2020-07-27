---
id: "_src_composables_useroom_"
title: "src/composables/useRoom"
sidebar_label: "src/composables/useRoom"
---

[app](../index.md) › [Globals](../globals.md) › ["src/composables/useRoom"](_src_composables_useroom_.md)

## Index

### Variables

* [key](_src_composables_useroom_.md#const-key)

### Functions

* [provideRoom](_src_composables_useroom_.md#provideroom)
* [useRoom](_src_composables_useroom_.md#useroom)

## Variables

### `Const` key

• **key**: *InjectionKey‹Ref‹Room‹GameState› | null››* = Symbol(
  'useRoom::Room',
)

*Defined in [packages/app/src/composables/useRoom.ts:5](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/composables/useRoom.ts#L5)*

## Functions

###  provideRoom

▸ **provideRoom**(): *void*

*Defined in [packages/app/src/composables/useRoom.ts:9](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/composables/useRoom.ts#L9)*

**Returns:** *void*

___

###  useRoom

▸ **useRoom**(): *object*

*Defined in [packages/app/src/composables/useRoom.ts:15](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/composables/useRoom.ts#L15)*

**Returns:** *object*

* **room**: *Ref‹Room‹GameState› | null›*

* **setRoom**(): *function*

  * (`_room`: Room‹GameState›): *void*
