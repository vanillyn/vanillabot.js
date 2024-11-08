import {vb} from "../init.js";
import {Events} from "discord.js";

vb.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`${interaction.commandName} does not exist`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'there was an error with this command', ephemeral: true });
        } else {
            await interaction.reply({ content: 'there was an error with this command', ephemeral: true });
        }
    }
});