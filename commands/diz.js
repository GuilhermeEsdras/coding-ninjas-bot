module.exports = {
    comandos: ['diz', 'say'],
    argsEsperados: '<texto>',
    erroDePermissao: 'Você precisa ser um Kage ou AMBU pra usar este comando, parça!',
    argsMin: 1,
    permissoes: 'ADMINISTRATOR',
    callback: (message, arguments, text) => {
      const algumaCoisa = arguments.join(" ");
      message.delete();
      message.channel.send(algumaCoisa);
    }
  }