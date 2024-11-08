import {Client, GatewayIntentBits} from "discord.js";
import {handle} from "./handle.js";

export const vb =  new Client({intents: [GatewayIntentBits.Guilds]})

export const commands = [];
export function init(token) {
    handle("commands", "command");
    handle("events", "event");
    handle("init.d", "event");
    vb.login(token);
}




