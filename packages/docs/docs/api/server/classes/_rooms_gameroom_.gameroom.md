---
id: "_rooms_gameroom_.gameroom"
title: "GameRoom"
sidebar_label: "GameRoom"
---

[server](../index.md) › [Globals](../globals.md) › ["rooms/GameRoom"](../modules/_rooms_gameroom_.md) › [GameRoom](_rooms_gameroom_.gameroom.md)

## Type parameters

▪ **Metadata**

## Hierarchy

* Room‹GameState›

  ↳ **GameRoom**

## Index

### Constructors

* [constructor](_rooms_gameroom_.gameroom.md#constructor)

### Properties

* [_events](_rooms_gameroom_.gameroom.md#_events)
* [autoDispose](_rooms_gameroom_.gameroom.md#autodispose)
* [clients](_rooms_gameroom_.gameroom.md#clients)
* [clock](_rooms_gameroom_.gameroom.md#clock)
* [internalState](_rooms_gameroom_.gameroom.md#internalstate)
* [listing](_rooms_gameroom_.gameroom.md#listing)
* [maxClients](_rooms_gameroom_.gameroom.md#maxclients)
* [patchRate](_rooms_gameroom_.gameroom.md#patchrate)
* [presence](_rooms_gameroom_.gameroom.md#presence)
* [reconnections](_rooms_gameroom_.gameroom.md#protected-reconnections)
* [reservedSeatTimeouts](_rooms_gameroom_.gameroom.md#protected-reservedseattimeouts)
* [reservedSeats](_rooms_gameroom_.gameroom.md#protected-reservedseats)
* [roomId](_rooms_gameroom_.gameroom.md#roomid)
* [roomName](_rooms_gameroom_.gameroom.md#roomname)
* [seatReservationTime](_rooms_gameroom_.gameroom.md#protected-seatreservationtime)
* [state](_rooms_gameroom_.gameroom.md#state)
* [id](_rooms_gameroom_.gameroom.md#static-id)

### Accessors

* [locked](_rooms_gameroom_.gameroom.md#locked)
* [metadata](_rooms_gameroom_.gameroom.md#metadata)

### Methods

* [_onJoin](_rooms_gameroom_.gameroom.md#_onjoin)
* [allowReconnection](_rooms_gameroom_.gameroom.md#allowreconnection)
* [broadcast](_rooms_gameroom_.gameroom.md#broadcast)
* [disconnect](_rooms_gameroom_.gameroom.md#disconnect)
* [hasReachedMaxClients](_rooms_gameroom_.gameroom.md#hasreachedmaxclients)
* [hasReservedSeat](_rooms_gameroom_.gameroom.md#hasreservedseat)
* [lock](_rooms_gameroom_.gameroom.md#lock)
* [onAuth](_rooms_gameroom_.gameroom.md#onauth)
* [onCreate](_rooms_gameroom_.gameroom.md#oncreate)
* [onDispose](_rooms_gameroom_.gameroom.md#ondispose)
* [onJoin](_rooms_gameroom_.gameroom.md#onjoin)
* [onLeave](_rooms_gameroom_.gameroom.md#onleave)
* [onMessage](_rooms_gameroom_.gameroom.md#onmessage)
* [resetAutoDisposeTimeout](_rooms_gameroom_.gameroom.md#protected-resetautodisposetimeout)
* [send](_rooms_gameroom_.gameroom.md#send)
* [setMetadata](_rooms_gameroom_.gameroom.md#setmetadata)
* [setPatchRate](_rooms_gameroom_.gameroom.md#setpatchrate)
* [setPrivate](_rooms_gameroom_.gameroom.md#setprivate)
* [setSeatReservationTime](_rooms_gameroom_.gameroom.md#setseatreservationtime)
* [setSimulationInterval](_rooms_gameroom_.gameroom.md#setsimulationinterval)
* [setState](_rooms_gameroom_.gameroom.md#setstate)
* [unlock](_rooms_gameroom_.gameroom.md#unlock)

## Constructors

###  constructor

\+ **new GameRoom**(`presence?`: Presence): *[GameRoom](_rooms_gameroom_.gameroom.md)*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[constructor](_rooms_gameroom_.gameroom.md#constructor)*

Defined in node_modules/colyseus/lib/Room.d.ts:55

**Parameters:**

Name | Type |
------ | ------ |
`presence?` | Presence |

**Returns:** *[GameRoom](_rooms_gameroom_.gameroom.md)*

## Properties

###  _events

• **_events**: *EventEmitter*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[_events](_rooms_gameroom_.gameroom.md#_events)*

Defined in node_modules/colyseus/lib/Room.d.ts:36

**`internal`** 

___

###  autoDispose

• **autoDispose**: *boolean*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[autoDispose](_rooms_gameroom_.gameroom.md#autodispose)*

Defined in node_modules/colyseus/lib/Room.d.ts:30

___

###  clients

• **clients**: *Client[]*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[clients](_rooms_gameroom_.gameroom.md#clients)*

Defined in node_modules/colyseus/lib/Room.d.ts:33

___

###  clock

• **clock**: *Clock*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[clock](_rooms_gameroom_.gameroom.md#clock)*

Defined in node_modules/colyseus/lib/Room.d.ts:25

___

###  internalState

• **internalState**: *RoomInternalState*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[internalState](_rooms_gameroom_.gameroom.md#internalstate)*

Defined in node_modules/colyseus/lib/Room.d.ts:34

___

###  listing

• **listing**: *RoomListingData‹Metadata›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[listing](_rooms_gameroom_.gameroom.md#listing)*

Defined in node_modules/colyseus/lib/Room.d.ts:24

___

###  maxClients

• **maxClients**: *number*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[maxClients](_rooms_gameroom_.gameroom.md#maxclients)*

Defined in node_modules/colyseus/lib/Room.d.ts:28

___

###  patchRate

• **patchRate**: *number*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[patchRate](_rooms_gameroom_.gameroom.md#patchrate)*

Defined in node_modules/colyseus/lib/Room.d.ts:29

___

###  presence

• **presence**: *Presence*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[presence](_rooms_gameroom_.gameroom.md#presence)*

Defined in node_modules/colyseus/lib/Room.d.ts:32

___

### `Protected` reconnections

• **reconnections**: *object*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[reconnections](_rooms_gameroom_.gameroom.md#protected-reconnections)*

Defined in node_modules/colyseus/lib/Room.d.ts:44

#### Type declaration:

* \[ **sessionId**: *string*\]: Deferred

___

### `Protected` reservedSeatTimeouts

• **reservedSeatTimeouts**: *object*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[reservedSeatTimeouts](_rooms_gameroom_.gameroom.md#protected-reservedseattimeouts)*

Defined in node_modules/colyseus/lib/Room.d.ts:41

#### Type declaration:

* \[ **sessionId**: *string*\]: Timer

___

### `Protected` reservedSeats

• **reservedSeats**: *object*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[reservedSeats](_rooms_gameroom_.gameroom.md#protected-reservedseats)*

Defined in node_modules/colyseus/lib/Room.d.ts:38

#### Type declaration:

* \[ **sessionId**: *string*\]: any

___

###  roomId

• **roomId**: *string*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[roomId](_rooms_gameroom_.gameroom.md#roomid)*

Defined in node_modules/colyseus/lib/Room.d.ts:26

___

###  roomName

• **roomName**: *string*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[roomName](_rooms_gameroom_.gameroom.md#roomname)*

Defined in node_modules/colyseus/lib/Room.d.ts:27

___

### `Protected` seatReservationTime

• **seatReservationTime**: *number*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[seatReservationTime](_rooms_gameroom_.gameroom.md#protected-seatreservationtime)*

Defined in node_modules/colyseus/lib/Room.d.ts:37

___

###  state

• **state**: *GameState*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[state](_rooms_gameroom_.gameroom.md#state)*

Defined in node_modules/colyseus/lib/Room.d.ts:31

___

### `Static` id

▪ **id**: *string* = Constants.GAME_ROOM_NAME

*Defined in [packages/server/src/rooms/GameRoom.ts:13](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/rooms/GameRoom.ts#L13)*

## Accessors

###  locked

• **get locked**(): *boolean*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[locked](_rooms_gameroom_.gameroom.md#locked)*

Defined in node_modules/colyseus/lib/Room.d.ts:22

**Returns:** *boolean*

___

###  metadata

• **get metadata**(): *Metadata*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[metadata](_rooms_gameroom_.gameroom.md#metadata)*

Defined in node_modules/colyseus/lib/Room.d.ts:23

**Returns:** *Metadata*

## Methods

###  _onJoin

▸ **_onJoin**(`client`: Client, `req?`: IncomingMessage): *Promise‹void›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[_onJoin](_rooms_gameroom_.gameroom.md#_onjoin)*

Defined in node_modules/colyseus/lib/Room.d.ts:79

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`req?` | IncomingMessage |

**Returns:** *Promise‹void›*

___

###  allowReconnection

▸ **allowReconnection**(`previousClient`: Client, `seconds?`: number): *Deferred*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[allowReconnection](_rooms_gameroom_.gameroom.md#allowreconnection)*

Defined in node_modules/colyseus/lib/Room.d.ts:80

**Parameters:**

Name | Type |
------ | ------ |
`previousClient` | Client |
`seconds?` | number |

**Returns:** *Deferred*

___

###  broadcast

▸ **broadcast**(`type`: string | number, `message?`: any, `options?`: IBroadcastOptions): *any*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[broadcast](_rooms_gameroom_.gameroom.md#broadcast)*

Defined in node_modules/colyseus/lib/Room.d.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; number |
`message?` | any |
`options?` | IBroadcastOptions |

**Returns:** *any*

▸ **broadcast**‹**T**›(`message`: T, `options?`: IBroadcastOptions): *any*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[broadcast](_rooms_gameroom_.gameroom.md#broadcast)*

Defined in node_modules/colyseus/lib/Room.d.ts:75

**Type parameters:**

▪ **T**: *Schema*

**Parameters:**

Name | Type |
------ | ------ |
`message` | T |
`options?` | IBroadcastOptions |

**Returns:** *any*

___

###  disconnect

▸ **disconnect**(): *Promise‹any›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[disconnect](_rooms_gameroom_.gameroom.md#disconnect)*

Defined in node_modules/colyseus/lib/Room.d.ts:78

**Returns:** *Promise‹any›*

___

###  hasReachedMaxClients

▸ **hasReachedMaxClients**(): *boolean*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[hasReachedMaxClients](_rooms_gameroom_.gameroom.md#hasreachedmaxclients)*

Defined in node_modules/colyseus/lib/Room.d.ts:62

**Returns:** *boolean*

___

###  hasReservedSeat

▸ **hasReservedSeat**(`sessionId`: string): *boolean*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[hasReservedSeat](_rooms_gameroom_.gameroom.md#hasreservedseat)*

Defined in node_modules/colyseus/lib/Room.d.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`sessionId` | string |

**Returns:** *boolean*

___

###  lock

▸ **lock**(): *Promise‹void›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[lock](_rooms_gameroom_.gameroom.md#lock)*

Defined in node_modules/colyseus/lib/Room.d.ts:70

**Returns:** *Promise‹void›*

___

###  onAuth

▸ **onAuth**(`client`: Client, `options`: any, `request?`: IncomingMessage): *any | Promise‹any›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[onAuth](_rooms_gameroom_.gameroom.md#onauth)*

Defined in node_modules/colyseus/lib/Room.d.ts:61

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`options` | any |
`request?` | IncomingMessage |

**Returns:** *any | Promise‹any›*

___

###  onCreate

▸ **onCreate**(`options`: RoomOptions): *void*

*Overrides void*

*Defined in [packages/server/src/rooms/GameRoom.ts:16](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/rooms/GameRoom.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | RoomOptions |

**Returns:** *void*

___

###  onDispose

▸ **onDispose**(): *void*

*Overrides void*

*Defined in [packages/server/src/rooms/GameRoom.ts:51](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/rooms/GameRoom.ts#L51)*

**Returns:** *void*

___

###  onJoin

▸ **onJoin**(`client`: Client, `options`: RoomOptions): *void*

*Overrides void*

*Defined in [packages/server/src/rooms/GameRoom.ts:37](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/rooms/GameRoom.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`options` | RoomOptions |

**Returns:** *void*

___

###  onLeave

▸ **onLeave**(`client`: Client, `consented`: boolean): *Promise‹void›*

*Overrides void*

*Defined in [packages/server/src/rooms/GameRoom.ts:44](https://github.com/will-hart/pixatore/blob/5d54977/packages/server/src/rooms/GameRoom.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`consented` | boolean |

**Returns:** *Promise‹void›*

___

###  onMessage

▸ **onMessage**‹**T**›(`messageType`: "*", `callback`: function): *any*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[onMessage](_rooms_gameroom_.gameroom.md#onmessage)*

Defined in node_modules/colyseus/lib/Room.d.ts:76

**Type parameters:**

▪ **T**

**Parameters:**

▪ **messageType**: *"*"*

▪ **callback**: *function*

▸ (`client`: Client, `type`: string | number, `message`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`type` | string &#124; number |
`message` | T |

**Returns:** *any*

▸ **onMessage**‹**T**›(`messageType`: string | number, `callback`: function): *any*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[onMessage](_rooms_gameroom_.gameroom.md#onmessage)*

Defined in node_modules/colyseus/lib/Room.d.ts:77

**Type parameters:**

▪ **T**

**Parameters:**

▪ **messageType**: *string | number*

▪ **callback**: *function*

▸ (`client`: Client, `message`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`message` | T |

**Returns:** *any*

___

### `Protected` resetAutoDisposeTimeout

▸ **resetAutoDisposeTimeout**(`timeoutInSeconds?`: number): *void*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[resetAutoDisposeTimeout](_rooms_gameroom_.gameroom.md#protected-resetautodisposetimeout)*

Defined in node_modules/colyseus/lib/Room.d.ts:81

**Parameters:**

Name | Type |
------ | ------ |
`timeoutInSeconds?` | number |

**Returns:** *void*

___

###  send

▸ **send**(`client`: Client, `type`: string | number, `message`: any, `options?`: ISendOptions): *void*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[send](_rooms_gameroom_.gameroom.md#send)*

Defined in node_modules/colyseus/lib/Room.d.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`type` | string &#124; number |
`message` | any |
`options?` | ISendOptions |

**Returns:** *void*

▸ **send**(`client`: Client, `message`: Schema, `options?`: ISendOptions): *void*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[send](_rooms_gameroom_.gameroom.md#send)*

Defined in node_modules/colyseus/lib/Room.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`client` | Client |
`message` | Schema |
`options?` | ISendOptions |

**Returns:** *void*

___

###  setMetadata

▸ **setMetadata**(`meta`: Partial‹Metadata›): *Promise‹void›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[setMetadata](_rooms_gameroom_.gameroom.md#setmetadata)*

Defined in node_modules/colyseus/lib/Room.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`meta` | Partial‹Metadata› |

**Returns:** *Promise‹void›*

___

###  setPatchRate

▸ **setPatchRate**(`milliseconds`: number): *void*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[setPatchRate](_rooms_gameroom_.gameroom.md#setpatchrate)*

Defined in node_modules/colyseus/lib/Room.d.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`milliseconds` | number |

**Returns:** *void*

___

###  setPrivate

▸ **setPrivate**(`bool?`: boolean): *Promise‹void›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[setPrivate](_rooms_gameroom_.gameroom.md#setprivate)*

Defined in node_modules/colyseus/lib/Room.d.ts:69

**Parameters:**

Name | Type |
------ | ------ |
`bool?` | boolean |

**Returns:** *Promise‹void›*

___

###  setSeatReservationTime

▸ **setSeatReservationTime**(`seconds`: number): *this*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[setSeatReservationTime](_rooms_gameroom_.gameroom.md#setseatreservationtime)*

Defined in node_modules/colyseus/lib/Room.d.ts:63

**Parameters:**

Name | Type |
------ | ------ |
`seconds` | number |

**Returns:** *this*

___

###  setSimulationInterval

▸ **setSimulationInterval**(`callback`: SimulationCallback, `delay?`: number): *void*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[setSimulationInterval](_rooms_gameroom_.gameroom.md#setsimulationinterval)*

Defined in node_modules/colyseus/lib/Room.d.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`callback` | SimulationCallback |
`delay?` | number |

**Returns:** *void*

___

###  setState

▸ **setState**(`newState`: GameState): *void*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[setState](_rooms_gameroom_.gameroom.md#setstate)*

Defined in node_modules/colyseus/lib/Room.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`newState` | GameState |

**Returns:** *void*

___

###  unlock

▸ **unlock**(): *Promise‹void›*

*Inherited from [GameRoom](_rooms_gameroom_.gameroom.md).[unlock](_rooms_gameroom_.gameroom.md#unlock)*

Defined in node_modules/colyseus/lib/Room.d.ts:71

**Returns:** *Promise‹void›*
