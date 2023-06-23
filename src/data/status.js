const { ActivityType } = require("discord.js")

const status = [
    {
        name: 'In Beta',
        type: ActivityType.Playing,
    },
    {
        name: 'In Beta Mode',
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley "
    },
]

module.exports = { status }