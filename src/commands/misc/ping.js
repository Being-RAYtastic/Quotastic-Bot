module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: boolean,
    // testOnly: boolean,
    // options: Object[],
    // deleted: boolean

    callback: (client, interaction) => {
        // interaction.reply(`Pong! I am not sleeping..\nLatency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        interaction.reply(`Pong! I am not sleeping..\n${client.ws.ping}ms`)
    }
}