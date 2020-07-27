---
id: "_src_composables_usefpsmonitor_"
title: "src/composables/useFpsMonitor"
sidebar_label: "src/composables/useFpsMonitor"
---

[@pixatore/app](../index.md) › [Globals](../globals.md) › ["src/composables/useFpsMonitor"](_src_composables_usefpsmonitor_.md)

## Index

### Variables

* [fpsKey](_src_composables_usefpsmonitor_.md#const-fpskey)
* [setFpsKey](_src_composables_usefpsmonitor_.md#const-setfpskey)

### Functions

* [provideFpsMonitor](_src_composables_usefpsmonitor_.md#providefpsmonitor)
* [useFpsMonitor](_src_composables_usefpsmonitor_.md#usefpsmonitor)

## Variables

### `Const` fpsKey

• **fpsKey**: *InjectionKey‹Ref‹number››* = Symbol('useFPS::FPS')

*Defined in [packages/app/src/composables/useFpsMonitor.ts:3](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/composables/useFpsMonitor.ts#L3)*

___

### `Const` setFpsKey

• **setFpsKey**: *InjectionKey‹function›* = Symbol('useFPS::setFPS')

*Defined in [packages/app/src/composables/useFpsMonitor.ts:4](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/composables/useFpsMonitor.ts#L4)*

## Functions

###  provideFpsMonitor

▸ **provideFpsMonitor**(): *void*

*Defined in [packages/app/src/composables/useFpsMonitor.ts:6](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/composables/useFpsMonitor.ts#L6)*

**Returns:** *void*

___

###  useFpsMonitor

▸ **useFpsMonitor**(): *object*

*Defined in [packages/app/src/composables/useFpsMonitor.ts:17](https://github.com/will-hart/pixatore/blob/9f2e114/packages/app/src/composables/useFpsMonitor.ts#L17)*

**Returns:** *object*

* **fps**: *Ref‹number›*

* **setFps**(): *function*

  * (`_fps`: number): *void*
