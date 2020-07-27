---
id: "_src_router_index_"
title: "src/router/index"
sidebar_label: "src/router/index"
---

[app](../index.md) › [Globals](../globals.md) › ["src/router/index"](_src_router_index_.md)

## Index

### Variables

* [router](_src_router_index_.md#const-router)
* [routes](_src_router_index_.md#const-routes)

## Variables

### `Const` router

• **router**: *Router* = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

*Defined in [packages/app/src/router/index.ts:30](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/router/index.ts#L30)*

___

### `Const` routes

• **routes**: *RouteRecordRaw[]* = [
  {
    path: '/',
    name: 'Loading View',
    component: () =&gt;
      import(/* webpackChunkName: "splash" */ '../views/LoadingView.vue'),
  },
  {
    path: '/browser',
    name: 'Server Browser',
    component: () =&gt;
      import(/* webpackChunkName: "lobby" */ '../views/ServerBrowserView.vue'),
  },
  {
    path: '/lobby/:id',
    name: 'Lobby',
    component: () =&gt;
      import(/* webpackChunkName: "lobby" */ '../views/LobbyView.vue'),
  },
  {
    path: '/game',
    name: 'Game',
    component: () =&gt;
      import(/* webpackChunkName: "game" */ '../views/GameView.vue'),
  },
]

*Defined in [packages/app/src/router/index.ts:3](https://github.com/will-hart/pixatore/blob/5d54977/packages/app/src/router/index.ts#L3)*
