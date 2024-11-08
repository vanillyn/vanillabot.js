const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const config = require("../../../config.json")


// command definition
const name = "appeal";
const desc = "officially appeals a ban"


module.exports = {
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(desc)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false)
        .addUserOption(option => option.setName("user").setDescription("the selected user").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("the reason of the appeal").setRequired(true))
        .addBooleanOption(option => option.setName("announce").setDescription("whether or not to announce the appeal")),
    async execute(interaction) {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const ephemeral = interaction.options.getBoolean('announce');

        await interaction.guild.members.ban(user);
        let message;
        if (ephemeral) {
            message = `${user} has been unbanned: ${reason}.`
            await interaction.reply({
                content: message,
                ephemeral: false
            })
            if (config.welcome.leave.ban_message === true) {
                await interaction.guild.channel(config.welcome.leave.channel).send(`${user} has been unbanned and can re-join.`);
            }
        } else {
            await interaction.reply({
                content: message,
                ephemeral: true
            })
        }
    },
};