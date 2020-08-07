"use strict";
/**
 * This file is adapted from Command.ts at @colyseus/command
 *
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = exports.Command = void 0;
class Command {
    setPayload(payload) {
        this.payload = payload;
        return this;
    }
    /**
     * Delay the execution by `milliseconds`
     * @param milliseconds
     */
    delay(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
exports.Command = Command;
class Dispatcher {
    constructor(room) {
        this.stopped = false;
        this.room = room;
    }
    stop() {
        this.stopped = true;
    }
    async dispatch(command, payload) {
        if (this.stopped) {
            console.log('dispatcher stopped');
            return;
        }
        command.room = this.room;
        command.state = this.room.state;
        command.clock = this.room.clock;
        if (payload) {
            command.setPayload(payload);
        }
        if (!command.validate || command.validate(command.payload)) {
            const result = (await command.execute(command.payload));
            if (!result)
                return;
            await Promise.all(this.getNextCommands(result).map(this.dispatch));
        }
    }
    // | Array<Promise<Command[] | void>>
    getNextCommands(nextCommands) {
        return Array.isArray(nextCommands) ? nextCommands : [];
    }
}
exports.Dispatcher = Dispatcher;
