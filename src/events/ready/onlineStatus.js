// const status = require("../../data/status")
const { ActivityType } = require("discord.js")
module.exports = (client) => {
    console.log(`${client.user.tag} is online`)      // *You can use "username" or "id" also instead of "tag"

    /*
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length)
        client.user.setActivity(status[random])
    }, 1000);
    */
    client.user.setActivity({
        name: 'Motivational Thoughts',
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley "
    })

}