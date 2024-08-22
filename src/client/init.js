import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
config();

const bot = new Client({intents: [GatewayIntentBits.Guilds]});


bot.once(Events.ClientReady, readyClient => {
    console.log(`logged in: ${bot.user.tag}`);
})

function init() {
    bot.login(process.env.TOKEN);
}

export { init, bot }