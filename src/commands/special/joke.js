require('dotenv').config()
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const request = require('request');

const limit =  1
module.exports = {
    name: 'joke',
    description: 'Sends a random Joke',
    // devOnly: true,
    testOnly: true,
    // deleted: boolean,

    callback: (client, interaction) => {
        try {
            request.get({

                url: `https://api.api-ninjas.com/v1/jokes?limit=${limit}`,
                headers: {
                    'X-Api-Key': process.env.APININJA_APIKEY
                },
            }, function (error, response, body) {
                if (error) return console.error('Request failed:', error);
                else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
                else {
                    const parsedBody = JSON.parse(body)
                    const joke = parsedBody[0].joke
                    // console.log(parsedBody)

                    // Will reply to user “”
                    const embed = new EmbedBuilder()
                        .setTitle(`${joke}`)
                        .setDescription(`Random Joke`)
                        .setColor('Gold')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

                    interaction.reply({ embeds: [embed] })
                }
            })
        } catch (e) {
            console.log(`Some Error occurred in joke.js: ${e}`)
        }


    }
}