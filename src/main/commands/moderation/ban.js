const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const config = require("../../../config.json");


// command definition
const name = "ban";
const desc = "bans a user from the server"

module.exports = {
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(desc)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false)
        .addUserOption(option => option.setName("user").setDescription("the selected user").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("the reason of the ban").setRequired(true))
        .addBooleanOption(option => option.setName("announce").setDescription("whether or not to announce the ban")),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const ephemeral = interaction.options.getBoolean('announce');


        await interaction.guild.members.getUser(user).send(`You've been permanently banned from cozy for ${reason}. You will no longer be able to access the Discord or Minecraft server. You can appeal at https://multiryzz.com/appeal.`)
        await interaction.guild.members.ban(user);
        let message;
        if (ephemeral) {
            message = `${user} has been permanently banned for ${reason}.`
            await interaction.reply({
                content: message,
                ephemeral: false
            })
            if (config.welcome.leave.ban_message === true) {
                await interaction.guild.channel(config.welcome.leave.channel).send(`${user} has been banned.`);
            }
        } else {
            await interaction.reply({
                content: message,
                ephemeral: true
            })
        }
    },
};