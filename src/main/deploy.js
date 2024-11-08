import {commands} from "./init.js";
import {REST, Routes} from "discord.js";
import {handle} from "./handle.js";

const req = new REST().setToken(process.env.VB_TOKEN);
(async () => {
    try {
        console.info("deploying commands");
        handle("commands", "command")
        const data = await req.put(
            Routes.applicationCommands(process.env.VB_ID),
            { body: commands },
        );

        console.info(`finished deploying ${data.length} commands`);

    } catch (error) {
        console.error(error);
    }
})();