require('dotenv').config()
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const request = require('request');
const capitalizeFirstLetter = require('../../utils/capitalizeFirstLetter');

const categoryList = [
    "art-literature",
    "language",
    "science-nature",
    "general",
    "food-drink",
    "people-places",
    "geography",
    "history-holidays",
    "entertainment",
    "toys-games",
    "music",
    "mathematics",
    "religion-mythology",
    "sports-leisure",
]
// console.log((categoryList[0].toLowerCase()).replace(/-/g, ""))
module.exports = {
    name: 'trivia',
    description: 'Sends a random trivia question',
    // devOnly: true,
    // testOnly: true,
    options: [
        {
            name: "category",
            description: "Choose a Trivia category",
            type: ApplicationCommandOptionType.String,
            choices: categoryList.map((e) => { return { name: e.toLowerCase(), value: (e.toLowerCase()).replace(/-/g, "") } }),
        }
    ],
    // deleted: boolean,


    callback: (client, interaction) => {
        try {
            const category = interaction.options.getString('category')
            // console.log(category)
            request.get({

                url: category !== null ? `https://api.api-ninjas.com/v1/trivia?category=${category}` : `https://api.api-ninjas.com/v1/trivia?`,
                headers: {
                    'X-Api-Key': process.env.APININJA_APIKEY
                },
            }, function (error, response, body) {
                if (error) return console.error('Request failed:', error);
                else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
                else {
                    const parsedBody = JSON.parse(body)
                    const triviaQuestion = parsedBody[0].question
                    const triviaAnswer = parsedBody[0].answer
                    const categoryType = parsedBody[0].category
                    // console.log(parsedBody)

                    // Will reply to user “”
                    const embed = new EmbedBuilder()
                        .setTitle(`Trivia - ${categoryType}`)
                        .setDescription(`**${triviaQuestion}**`)
                        .addFields(
                            {
                                name: `Answer: `,
                                value: `||${triviaAnswer}||`,
                                inline: true,
                            },
                            // {
                            //     name: " ",
                            //     value: `Category: ${capitalizeFirstLetter(categoryType)}`,
                            //     inline: true,
                            // }
                        )
                        .setColor('NotQuiteBlack')   // * You can add custom color by writing '0xhexcod'  #HEXCODES

                    interaction.reply({ embeds: [embed] })
                }
            })
        } catch (e) {
            console.log(`Some Error occurred in trivia.js: ${e}`)
        }


    }
}