require('dotenv').config()
const FACTS_APIKEY = process.env.FACTS_APIKEY

const request = require('request');
const { EmbedBuilder } = require('discord.js');

const limit = 1
let fact;
request.get({
    url: 'https://api.api-ninjas.com/v1/facts?limit=' + limit,
    headers: {
        'X-Api-Key': FACTS_APIKEY
    },
}, function (error, response, body) {
    try {
        if (error) return console.error('FACTS_API Request failed:', error);
        else if (response.statusCode != 200) return console.error('FACTS_API Error:', response.statusCode, body.toString('utf8'));
        else {
            const parsedBody = JSON.parse(body)
            fact = parsedBody[0].fact
            // console.log(fact)
        }
    } catch (e) {
        console.log(`Some error occurred in FACTS_API: ${e}`)
    }


});

module.exports = {
    name: 'fact',
    description: 'Gives random Fact',
    // devOnly: boolean,
    // testOnly: boolean,
    // options: [],
    // deleted: true,

    callback: (client, interaction) => {
        // interaction.reply(fact)

        const embed = new EmbedBuilder()
            .setTitle(fact)
            .setDescription("Random Facts")
            .setColor('Blue')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

        interaction.reply({ embeds: [embed] })
    }
}