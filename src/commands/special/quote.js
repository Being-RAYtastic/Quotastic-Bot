require('dotenv').config()
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const request = require('request');
const capitalizeFirstLetter = require('../../utils/capitalizeFirstLetter');

const categoryList = [
    "success",
    "knowledge",
    "love",
    "intelligence",
    "life",
    "alone",
    "art",
    "attitude",
    "amazing",
    "dreams",
    "inspirational",
    "imagination",
    "hope",
    "humour",
    "funny",
    "freedom",
    "experience",
]

module.exports = {
    name: 'quote',
    description: 'sends a random quote',
    // devOnly: true,
    // testOnly: true,
    options: [
        {
            name: "category",
            description: "Choose a quote category",
            type: ApplicationCommandOptionType.String,
            choices: categoryList.map((e) => { return { name: e.toLowerCase(), value: e.toLowerCase() } }),
        }
    ],
    // deleted: boolean,


    callback: (client, interaction) => {
        try {
            const category = interaction.options.getString('category')
            // console.log(category)
            request.get({

                url: category !== null ? `https://api.api-ninjas.com/v1/quotes?category=${category}` : `https://api.api-ninjas.com/v1/quotes?`,
                headers: {
                    'X-Api-Key': process.env.APININJA_APIKEY
                },
            }, function (error, response, body) {
                if (error) return console.error('Request failed:', error);
                else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
                else {
                    const parsedBody = JSON.parse(body)
                    const quote = parsedBody[0].quote
                    const author = parsedBody[0].author
                    const categoryType = parsedBody[0].category
                    // console.log(parsedBody)

                    // Will reply to user “”
                    const embed = new EmbedBuilder()
                        .setTitle(`“${quote}”`)
                        // .setDescription(`~ ${author}`)
                        .addFields(
                            {
                                name: `- ${author}`,
                                value: ' ',
                                inline: true,
                            },
                            {
                                name: " ",
                                value: `Category: ${capitalizeFirstLetter(categoryType)}`,
                                inline: true,
                            }
                        )
                        .setColor('DarkBlue')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

                    interaction.reply({ embeds: [embed] })
                }
            })
        } catch (e) {
            console.log(`Some Error occurred in quotes.js: ${e}`)
        }


    }
}