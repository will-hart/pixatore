---
id: "_index_"
title: "index"
sidebar_label: "index"
---

[server](../index.md) › [Globals](../globals.md) › ["index"](_index_.md)

## Index

### Variables

* [app](_index_.md#const-app)
* [gameServer](_index_.md#const-gameserver)
* [port](_index_.md#const-port)
* [server](_index_.md#const-server)

## Variables

### `Const` app

• **app**: *Express‹›* = express()

*Defined in [packages/server/src/index.ts:11](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/index.ts#L11)*

___

### `Const` gameServer

• **gameServer**: *Server‹›* = new Server({
  server,
})

*Defined in [packages/server/src/index.ts:17](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/index.ts#L17)*

___

### `Const` port

• **port**: *number* = Number(process.env.PORT || 2567)

*Defined in [packages/server/src/index.ts:10](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/index.ts#L10)*

___

### `Const` server

• **server**: *Server‹›* = http.createServer(app)

*Defined in [packages/server/src/index.ts:16](https://github.com/will-hart/pixatore/blob/dc2c2e8/packages/server/src/index.ts#L16)*
