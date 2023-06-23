const { devs, test_server } = require("../../../config.json")
const getLocalCommands = require("../../utils/getLocalCommands")

module.exports = async(client, interaction) => {
    if (!interaction.isChatInputCommand()) return

    const localCommands = getLocalCommands()

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)

        if (!commandObject) return

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only Developers are allowed to run this command",
                    ephemeral: true,
                })
                return
            }
        }
        if (commandObject.testOnly) {
            if (!(interaction.guild.id === test_server)) {
                interaction.reply({
                    content: "This command cannot be ran here",
                    ephemeral: true,
                })
                return
            }
        }
        if (commandObject.permissionsRequired) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "Not enough Permissions",
                        ephemeral: true,
                    })

                }
                return
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me
                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I Don't enough Permissions",
                        ephemeral: true,
                    })

                }
                return
            }
        }

        await commandObject.callback(client, interaction)
    } catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }
}