# Getting Started

The easiest way to get started with Pixatore is to use the github template and
click the "Use this template" button to create your own repository based on the
template. Clone the repository locally and away you go. You can also clone, fork
or download the repository.

## Branches

- `stable` contains the released version of the repository
- `develop` contains the current "bleeding edge" release
- `feature/*` contains current features being worked on. These features will be
  merged into `develop` before a new release merges them into `stable`.

Once you have a copy of the repo locally, you need to install dependencies.
Navigate to the root directory of the repo and type

## Installing dependencies

Pixatore uses a monorepo approach (using yarn workspaces) with the following
`packages`:

- `app` containing application code
- `server` containing server code, and
- `shared` containing common code used in both the client and server.

Dependecies should be installed before starting with:

```bash
yarn
```

## Running the development server and client

The development server and client can be run with:

```bash
yarn dev
```

The client application will then open (a tauri window). The application can also
be run in the browser for easier debugging (especially on Windows) by visiting
`http://localhost:8080`.

> The client is currently set up to hot reload, however the server does not.
> After making changes to the server the `dev` process should be stopped and
> restarted.
