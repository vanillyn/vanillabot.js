import {vb} from "../init.js";
import {Events} from "discord.js";

vb.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});