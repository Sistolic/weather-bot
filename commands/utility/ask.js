const { SlashCommandBuilder } = require('discord.js');
const { getWeather } = require('../../weather-app.js');

const wait = require('timers/promises').setTimeout;

function getCity(input) {
  var input = input.replace("?", "").split(" ");
  var idx = input.findLastIndex(element => element === 'in');
  
  if (idx+1 < input.length) return ( input.slice(idx + 1) ).join(" ");
}

module.exports = {
  cooldowns: 10,
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the Bot for the weather')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('Make a question')
        .setRequired(true)
    ),
  async execute(interaction) {
    const input = interaction.options.getString('input');
    try {
      var city = await getCity(input);
      const { temp, description } = await getWeather(city);

      await interaction.deferReply();
      await wait(4_000);

      await interaction.editReply(`${description}`);
      await interaction.followUp(`Current temperature in ${city} is ${temp}°C`);

    } catch (error) { console.log(error); }
  },

};