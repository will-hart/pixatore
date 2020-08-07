"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const colyseus_1 = require("colyseus");
const Command_1 = require("../commands/Command"); // @colyseus/command
const game_1 = require("@pixatore/game");
const LobbyCommands_1 = require("../commands/LobbyCommands");
class GameRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this._dispatcher = new Command_1.Dispatcher(this);
    }
    onCreate(options) {
        this.onMessage(game_1.Types.MessageTypes.START_GAME, (client) => {
            this._dispatcher.dispatch(new LobbyCommands_1.OnGameStartCommand(), {});
        });
        this.onMessage(game_1.Types.MessageTypes.PLAYER_READY, (client, message) => {
            this._dispatcher.dispatch(new LobbyCommands_1.OnPlayerReadyCommand(), {
                sessionId: client.sessionId,
                isReady: message.isReady,
            });
        });
        this.onMessage('*', (_client, type, message) => console.log(`[MESSAGE::${type}] ${message}`));
        this._dispatcher.dispatch(new LobbyCommands_1.OnCreateCommand(), {
            options,
        });
    }
    onJoin(client, options) {
        this._dispatcher.dispatch(new LobbyCommands_1.OnJoinCommand(), {
            sessionId: client.sessionId,
        });
    }
    // Use of "allowReconnection" makes command pattern tricky
    async onLeave(client, consented) {
        await this._dispatcher.dispatch(new LobbyCommands_1.OnLeaveCommand(), {
            client,
            consented,
        });
    }
    onDispose() { }
}
exports.GameRoom = GameRoom;
GameRoom.id = game_1.Constants.GAME_ROOM_NAME;
