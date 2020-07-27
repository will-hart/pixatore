---
id: "_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue"
title: "IUseClientRoomQueriesReturnValue"
sidebar_label: "IUseClientRoomQueriesReturnValue"
---

[app](../index.md) › [Globals](../globals.md) › ["src/composables/useClientRoomQueries"](../modules/_src_composables_useclientroomqueries_.md) › [IUseClientRoomQueriesReturnValue](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md)

## Hierarchy

* **IUseClientRoomQueriesReturnValue**

## Index

### Properties

* [createGame](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#creategame)
* [getRoomList](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#getroomlist)
* [joinGame](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#joingame)
* [lastRoom](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#lastroom)
* [lastSession](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#lastsession)
* [lobbyStatus](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#lobbystatus)
* [reconnect](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#reconnect)
* [roomList](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#roomlist)
* [roomListLoading](_src_composables_useclientroomqueries_.iuseclientroomqueriesreturnvalue.md#roomlistloading)

## Properties

###  createGame

• **createGame**: *function*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:19](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L19)*

#### Type declaration:

▸ (`client`: Client): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |

___

###  getRoomList

• **getRoomList**: *function*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:13](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L13)*

#### Type declaration:

▸ (`client`: Client): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |

___

###  joinGame

• **joinGame**: *function*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:18](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L18)*

#### Type declaration:

▸ (`client`: Client, `roomId`: string): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`roomId` | string |

___

###  lastRoom

• **lastRoom**: *Ref‹string | null›*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:15](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L15)*

___

###  lastSession

• **lastSession**: *Ref‹string | null›*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:16](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L16)*

___

###  lobbyStatus

• **lobbyStatus**: *Ref‹[LobbyConnectionStatus](../modules/_src_gameengine_scenes_serverbrowserscene_.md#lobbyconnectionstatus)›*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:17](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L17)*

___

###  reconnect

• **reconnect**: *function*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:20](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L20)*

#### Type declaration:

▸ (`client`: Client, `roomId`: string, `sessionId`: string): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`roomId` | string |
`sessionId` | string |

___

###  roomList

• **roomList**: *Ref‹RoomAvailable‹GameState›[]›*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:12](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L12)*

___

###  roomListLoading

• **roomListLoading**: *Ref‹boolean›*

*Defined in [packages/app/src/composables/useClientRoomQueries.ts:14](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/app/src/composables/useClientRoomQueries.ts#L14)*
