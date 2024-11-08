const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const config = require("../../../config.json");


// command definition
const name = "kick";
const desc = "kicks a user from the server"

module.exports = {
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(desc)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false)
        .addUserOption(option => option.setName("user").setDescription("the selected user").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("the reason of the kick").setRequired(true))
        .addBooleanOption(option => option.setName("announce").setDescription("whether or not to announce the kick")),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const ephemeral = interaction.options.getBoolean('announce');


        await interaction.guild.members.getUser(user).send(`You've been kicked from cozy for ${reason}. You can rejoin the Discord or Minecraft server when you feel you're ready.`)
        await interaction.guild.members.kick(user);
        let message;
        if (ephemeral) {
            message = `${user} has been kicked for ${reason}.`
            await interaction.reply({
                content: message,
                ephemeral: false
            })
            if (config.welcome.leave.ban_message === true) {
                await interaction.guild.channel(config.welcome.leave.channel).send(`${user} has been kicked. They can rejoin.`);
            }
        } else {
            await interaction.reply({
                content: message,
                ephemeral: true
            })
        }
    },
};