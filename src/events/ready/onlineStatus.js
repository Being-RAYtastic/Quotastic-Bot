const status = require("../../data/status")

module.exports = (client) => {
    console.log(`${client.user.tag} is online`)      // *You can use "username" or "id" also instead of "tag"

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length)
        client.user.setActivity(status[random])
    }, 60000);

}