const Discord = require("discord.js");

module.exports = {
  comandos: 'ping',
  argsMin: 0,
  argsMax: 0,
  callback: (message, arguments, text) => {
    const ping = new Discord.MessageEmbed()
    .setTitle('Pong!')
    .setDescription(`🏓\`${Date.now() - message.createdTimestamp}\``);

    message.reply('opaaa', ping)
  }
}