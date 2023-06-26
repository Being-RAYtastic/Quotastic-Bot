const { test_server, client_id} = require("../../../config.json")
const areCommandsDifferent = require("../../utils/areCommandsDifferent")
const getApplicationCommands = require("../../utils/getApplicationCommands")
const getLocalCommands = require("../../utils/getLocalCommands")


module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands()
        const applicationCommands = await getApplicationCommands(client, test_server)

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand

            const existingCommand = await applicationCommands.cache.find((cmd) => {
                cmd.name === name
            })

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id)
                    console.log(`🗑️Deleted command: ${name}`)
                    continue
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    })
                    console.log(`✏️ Edited Command: ${name}`)

                }
            } else {
                if (localCommand.deleted) {
                    console.log(`🚫 Skipping registering command ${name} as it's set to delete`)
                    continue
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                })
                console.log(`👍 Command registered successfully: ${name}`)
            }
        }
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }

}