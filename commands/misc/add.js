module.exports = {
    comandos: ['add', 'addition'],
    argsEsperados: '<num1> <num2>',
    erroDePermissao: 'Você precisa ser um Kage ou AMBU pra usar este comando, parça!',
    argsMin: 2,
    argsMax: 2,
    permissoes: 'ADMINISTRATOR',
    callback: (message, arguments, text) => {
      console.log(arguments)
  
      const num1 = +arguments[0]
      const num2 = +arguments[1]
  
      message.reply(`A soma desses dois números é **${num1 + num2}**`)
  
    }
  }