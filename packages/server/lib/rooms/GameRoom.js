"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const colyseus_1 = require("colyseus");
const shared_1 = require("@pixatore/shared");
class GameRoom extends colyseus_1.Room {
    onCreate(options) {
        this.maxClients = shared_1.Constants.MAX_PLAYERS;
        this.setMetadata({
            playerName: options.playerName,
            roomName: options.roomName,
        });
        this.onMessage('*', (_client, type, contents) => console.log(`[MESSAGE::${type}] ${contents}`));
        this.setState(new shared_1.State.GameState());
    }
    onJoin(client, options) {
        if (this.state.players[client.sessionId])
            return;
        this.state.players[client.sessionId] = new shared_1.Entities.Player(client.sessionId);
    }
    async onLeave(client, consented) {
        this.state.players[client.sessionId].connected = false;
        if (consented) {
            delete this.state.players[client.sessionId];
            return;
        }
        const reconnection = this.allowReconnection(client);
        try {
            await Promise.any([
                // reject in 30s
                new Promise(() => setTimeout(() => reconnection.reject(), 30000)),
                // or reconnect
                reconnection,
            ]);
        }
        catch (err) {
            delete this.state.players[client.sessionId];
        }
    }
    onDispose() { }
}
exports.GameRoom = GameRoom;
GameRoom.id = shared_1.Constants.GAME_ROOM_NAME;
