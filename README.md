# Comet Spaceways Server

Comet Spaceways Server is a backend API used to test the ongoing development of Comet Spaceways, a gamified space-themed website that mimics both the appearance and functionality of a typical airline website. The current application is an Express REST API backed by MongoDB. It exposes user and spacepass data to the frontend; it is not a complete authentication service and does not currently issue login tokens or sessions.

[Comet Spaceways front end repository](https://github.com/zombicat79/Comet-Spaceways)
[Comet Spaceways site in production](https://cometspaceways.zombiecat.dev/)

## Project versions

There are two implementations in this repository:

- **Current implementation (repository root):** Express 5 API using Mongoose and a remote MongoDB connection. It provides user and spacepass routes.
- **Legacy implementation (`legacy/`):** earlier Express API backed by JSON files in `legacy/db/collections/`. It also includes destinations, flights, and races routes. Run it separately from the current API.

Both servers use port `3000` and the API prefix `/cometspaceways/api/v1`, so run only one at a time unless you change a server's port.

## Current API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/cometspaceways/api/v1` | API status message |
| `GET`, `POST` | `/cometspaceways/api/v1/users` | List users or create a user |
| `GET` | `/cometspaceways/api/v1/users/average-characteristics` | Calculate averages for user attributes |
| `GET`, `POST` | `/cometspaceways/api/v1/users/:identifier` | Look up a user by ID or username (`POST` is also wired to the lookup handler) |
| `PATCH` | `/cometspaceways/api/v1/users/:identifier` | Update a user by MongoDB ID |
| `DELETE` | `/cometspaceways/api/v1/users/:identifier` | Delete a user by MongoDB ID |
| `GET`, `POST` | `/cometspaceways/api/v1/spacepasses` | List spacepasses or create one |
| `GET` | `/cometspaceways/api/v1/spacepasses/:identifier` | Look up a spacepass by pass number or owner ID |

Responses are JSON, generally shaped as `{ "status": "...", "data": ... }`. The API accepts JSON request bodies. CORS is currently configured for `http://localhost:5173`.

The user model includes profile, game-characteristic, inventory, and flight/quest fields, with an optional reference to a spacepass. Spacepasses track their owner, pass number, category, status, and issue/expiry details.

Username lookups currently compare a password from the request body with the stored password. This is not a secure sign-in flow; do not treat the API as production-ready authentication.

## Repository structure

```text
.
├── app.js                         # Express app, middleware, and route mounting
├── server.js                      # HTTP server and MongoDB connection
├── src/
│   ├── controllers/               # User and spacepass request handlers
│   ├── models/                    # Mongoose User and Spacepass models
│   └── routes/                    # User and spacepass route definitions
├── legacy/
│   ├── app.js, server.js          # Separate JSON-file-backed API
│   ├── src/controllers/           # Legacy route handlers
│   ├── src/models/                # Legacy JSON field lists
│   └── db/
│       ├── collections/           # JSON data files
│       └── reset-db.js            # Legacy data reset utility
├── package.json                   # Current implementation scripts/dependencies
└── README.md
```

## Run the current API

Requirements: Node.js and access to a MongoDB deployment.

1. Install the root dependencies:

   ```sh
   npm install
   ```

2. Create a root `.env` file with the MongoDB URI and password:

   ```dotenv
   REMOTE_DB_CONNECTION=mongodb+srv://<database-user>:{{PASSWORD}}@<cluster>/<database>?retryWrites=true&w=majority
   REMOTE_DB_PWD=<database-password>
   ```

   `REMOTE_DB_CONNECTION` must contain the literal `{{PASSWORD}}` marker; `server.js` replaces it with `REMOTE_DB_PWD`. Keep credentials out of version control.

3. Start the server:

   ```sh
   npm start
   ```

   The server listens on port `3000`. The `start` script sets `NODE_ENV=production`, which is currently the only mode in which `server.js` attempts to connect to MongoDB.

The root `npm run dev` script starts the server with nodemon and `NODE_ENV=development`, but the current server code does not connect to MongoDB in that mode. Database-backed routes therefore require the production-mode startup unless the connection behavior is changed.

## Run the legacy API

The legacy server uses JSON files rather than MongoDB and has its own dependencies and scripts:

```sh
cd legacy
npm install
npm run dev
```

It also listens on port `3000`. Its routes cover users, spacepasses, destinations, flights, and races. Data is stored under `legacy/db/collections/`.

Legacy reset scripts are destructive and replace the selected collection contents with empty arrays. From `legacy/`:

```sh
npm run reset:db
npm run reset:users
npm run reset:destinations
npm run reset:flights
npm run reset:races
```

`reset:db` clears every JSON collection. The other scripts clear only their named collection. These commands apply only to the legacy JSON data; they do not affect MongoDB.
