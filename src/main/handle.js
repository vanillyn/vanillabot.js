import {Collection} from "discord.js";
import fs from "fs";
import path from "path";
import {commands, vb} from "./init.js";




export function handle(dir, type) {
    vb.commands = new Collection();
    const mainPath = path.join(__dirname, dir);
    const cmdPath = fs.readdirSync(mainPath);
    if (!dir) {
        return console.error("no path provided")
    } else if (type === "command") {
        console.info(`loading commands in ${dir}`)
        for (const folder of cmdPath) {
            const commandFiles = fs.readdirSync(path.join(mainPath, folder)).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(path.join(mainPath, folder), file);
                const command = require(filePath);
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    console.info(`pushed ${filePath}`)
                    commands.push(command.data.toJSON());
                     vb.commands.set(command.data.name, command);
                } else {
                    return console.warn(`${filePath} seems to be missing a data property.`);
                }
            }
        }
    } else if (type === "event") {
        const eventFiles = fs.readdirSync(mainPath).filter(file => file.endsWith('.js'));
        console.info(`loading events in ${dir}`)
        for (const file of eventFiles) {
            const filePath = path.join(mainPath, file);
            const event = require(filePath);
            if (event.once) {
                 vb.once(event.name, (...args) => event.execute(...args));
            } else {
                 vb.on(event.name, (...args) => event.execute(...args));
            }
        }
    } else {
        return console.error("unknown type")
    }

}


