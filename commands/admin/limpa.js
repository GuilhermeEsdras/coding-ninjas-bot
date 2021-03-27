const Discord = require("discord.js");

module.exports = {
  comandos: ['limpa', 'clear'],
  erroDePermissao: 'Você precisa ser um Kage ou AMBU pra usar este comando, parça!',
  permissoes: 'ADMINISTRATOR',
  callback: (message, arguments, text) => {

    message.channel.messages.fetch().then((results) => {
      // console.log(results)
      const miliSegs = 1000
      const segs = 10
      const segundos = miliSegs * segs

      message.channel.bulkDelete(results).then((messages) => {
        const sucessoEmbed = new Discord.MessageEmbed()
        .setTitle('Sucesso!')
        .setThumbnail('https://raw.githubusercontent.com/GuilhermeEsdras/coding-ninjas-bot/main/images/renders/chibi_anko.png')
        .setDescription(`✅ Limpei com sucesso *${messages.size}* mensagens deste canal. \n *Essa mensagem também será apagada em ${segs} segundos...*`)
        message.reply('então...', sucessoEmbed).then(msg => {
          msg.delete({ timeout: segundos })
        })
      }).catch((err) => {
        console.log(err)
        const erroEmbed = new Discord.MessageEmbed()
        .setTitle('Ops!')
        .setDescription('❌ Houve um erro ao limpar as mensagens deste canal...\n\n Eis um motivo:')
        .addFields(
          { name: 'Limite de dias', value: 'Mensagens com mais de 14 dias de idade não podem ser apagadas!' },
          { name: '\u200B', value: `\n *Essa mensagem será apagada em ${segs} segundos...*` }
        )
        return message.reply('então...', erroEmbed).then(msg => {
          msg.delete({ timeout: segundos })
        })
      })
    })

  }
}