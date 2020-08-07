"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnPlayerReadyCommand = exports.OnLeaveCommand = exports.OnJoinCommand = exports.OnGameStartCommand = exports.OnCreateCommand = void 0;
const Command_1 = require("./Command");
const game_1 = require("@pixatore/game");
class OnCreateCommand extends Command_1.Command {
    async execute({ options }) {
        this.room.maxClients = game_1.Constants.MAX_PLAYERS;
        this.room.setMetadata({
            playerName: options.playerName,
            roomName: options.roomName,
        });
        this.room.setState(new game_1.State.GameState());
    }
}
exports.OnCreateCommand = OnCreateCommand;
class OnGameStartCommand extends Command_1.Command {
    async execute(_payload) {
        if (this.state.status.current !== game_1.Types.GameStatus.lobby) {
            console.log(`[::OnGameStart] ignoring as game status is ${this.state.status}`);
            return;
        }
        if (Array.from(this.state.players.values()).some((p) => !p.ready || !p.connected)) {
            console.log(`[::OnGameStart] ignoring as not all players are connected/ready`);
            return;
        }
        this.state.status.current = game_1.Types.GameStatus.playing;
    }
}
exports.OnGameStartCommand = OnGameStartCommand;
class OnJoinCommand extends Command_1.Command {
    async execute({ sessionId }) {
        if (this.state.players.get(sessionId))
            return;
        const availableSlots = [1, 2, 3, 4];
        const usedSlots = Array.from(this.state.players.values()).map((player) => player.slot);
        const slotNumber = availableSlots.find((slotId) => !usedSlots.includes(slotId));
        if (!slotNumber) {
            throw new Error(`No slots available for player ${sessionId}`);
        }
        const player = new game_1.Entities.Player(sessionId, slotNumber);
        this.state.players.set(sessionId, player);
    }
}
exports.OnJoinCommand = OnJoinCommand;
class OnLeaveCommand extends Command_1.Command {
    async execute({ client, consented }) {
        const player = this.state.players.get(client.sessionId);
        const wasReady = player.ready;
        player.connected = false;
        player.ready = false;
        if (consented) {
            this.state.players.delete(client.sessionId);
            console.log(`[PLAYER ${client.sessionId}|${player.slot}] disconnected manually, removing from state`);
            return;
        }
        console.log(`[PLAYER ${client.sessionId}|${player.slot}] disconnected, waiting for reconnection`);
        try {
            await this.room.allowReconnection(client, 30);
            player.connected = true;
            player.ready = wasReady;
            console.log(`[PLAYER ${client.sessionId}|${player.slot}] reconnected`);
        }
        catch (err) {
            console.log(`[PLAYER ${client.sessionId}|${player.slot}] failed to reconnect, removing from state`);
            console.error(err);
            this.state.players.delete(client.sessionId);
        }
    }
}
exports.OnLeaveCommand = OnLeaveCommand;
class OnPlayerReadyCommand extends Command_1.Command {
    async execute({ sessionId, isReady }) {
        if (this.state.status.current !== game_1.Types.GameStatus.lobby) {
            console.log(`[::OnPlayerReady] skipping ready message for player ${sessionId} as the game is not in the lobby`);
            return;
        }
        console.log(`[::OnPlayerReady] setting ${sessionId} ready state to '${isReady}'`);
        const player = this.state.players.get(sessionId);
        if (!player)
            return;
        player.ready = isReady;
    }
}
exports.OnPlayerReadyCommand = OnPlayerReadyCommand;
