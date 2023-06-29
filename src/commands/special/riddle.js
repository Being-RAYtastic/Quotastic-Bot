require('dotenv').config()
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const request = require('request');

module.exports = {
    name: 'riddle',
    description: 'Solve random Riddles',
    // devOnly: true,
    // testOnly: true,
    // deleted: boolean,

    callback: (client, interaction) => {
        try {
            request.get({

                url: `https://api.api-ninjas.com/v1/riddles`,
                headers: {
                    'X-Api-Key': process.env.APININJA_APIKEY
                },
            }, function (error, response, body) {
                if (error) return console.error('Request failed:', error);
                else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
                else {
                    const parsedBody = JSON.parse(body)
                    const riddleTitle = parsedBody[0].title
                    const riddleQuestion = parsedBody[0].question
                    const riddleAnswer = parsedBody[0].answer
                    // console.log(parsedBody)

                    // Will reply to user “”
                    const embed = new EmbedBuilder()
                        .setTitle(`${riddleTitle}`)
                        .setDescription(`${riddleQuestion}`)
                        .addFields([
                            {
                                name: `Answer: `,
                                value: `||${riddleAnswer}||`,
                                inline: true,
                            },
                        ])
                        .setColor('Blurple')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

                    interaction.reply({ embeds: [embed] })
                }
            })
        } catch (e) {
            console.log(`Some Error occurred in riddle.js: ${e}`)
        }


    }
}