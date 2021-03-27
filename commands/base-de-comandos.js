const { prefix } = require('../config.json') // pega o prefixo padrão para chamada dos comandos deste BOT

const validarPermissoes = (permissoes) => {
  const permissoesValidas = [
    /* Permissões padrões do Discord JS (encontradas na documentação no site do mesmo) */
    'ADMINISTRATOR', // tem implicitamente todas as permissões
    'CREATE_INSTANT_INVITE', // cria convites para a guilda
    'KICK_MEMBERS', // expulsa membros
    'BAN_MEMBERS', // bane membros
    'MANAGE_CHANNELS', // edita e reordena canais
    'MANAGE_GUILD', // edita as informações da guilda, região, etc
    'ADD_REACTIONS', // adiciona reações as mensagens
    'VIEW_AUDIT_LOG', // 
    'PRIORITY_SPEAKER', // tem prioridade de voz
    'STREAM',
    'VIEW_CHANNEL', // ver canal(is)
    'SEND_MESSAGES', // envia mensagens
    'SEND_TTS_MESSAGES', // envia mensagens text-to-speach
    'MANAGE_MESSAGES', // deleta mensagens e reações
    'EMBED_LINKS', // links enviados teram um embed preview
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY', // ver todas as mensagens desde a abertura do servidor
    'MENTION_EVERYONE', // menciona @everyone
    'USE_EXTERNAL_EMOJIS', // permite usar emojis de outros servidores
    'VIEW_GUILD_INSIGHTS',
    'CONNECT', // conecta a um canal de voz
    'SPEAK', // fala num canal de voz
    'MUTE_MEMBERS', // muta membros em qualquer canal de voz
    'DEAFEN_MEMBERS', // ensurdece membros em qualquer canal de voz
    'MOVE_MEMBERS', // move membros entre canais de voz
    'USE_VAD', // usa voice activity detection
    'CHANGE_NICKNAME', // muda apelido
    'MANAGE_NICKNAMES', // muda apelido de outros membros
    'MANAGE_ROLES', // administra cargos
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS' // administra emojis
  ]

  for (const permissao of permissoes) {
    if (!permissoesValidas.includes(permissao)) {
      throw new Error(`Erro! Permissão desconhecida: "${permissao}"`)
    }
  }
}

module.exports = (client, opcoesDoComando) => {

  // Define os valores padrões de cada uma das opções de um comando
  let {
    comandos,
    argsEsperados = '',
    erroDePermissao = 'Você não tem os poderes de um Ninja de Elite para usar este jutsu, parça!',
    argsMin = 0,
    argsMax = null,
    permissoes = [],
    cargosRequeridos = [],
    callback
  } = opcoesDoComando

  // Certifica-se de que o comando e apelidos estão em um array
  if (typeof comandos === 'string') {
    comandos = [comandos]
  }

  console.log(`-\n.:: Registrando comando "${comandos[0]}" ::.`)

  // Certifica-se de que as permissões estão em um array e são todas válidas
  if (permissoes.length) {
    if (typeof permissoes === 'string') {
      permissoes = [permissoes]
    }

    validarPermissoes(permissoes)
  }

  // Listener de mensagens / Detecta mensagens enviadas pelos membros de qualquer canal do server/guilda
  client.on('message', message => {
    // "desencapsula" o objeto 'message', retirando apenas os campos necessários
    const { member, content, guild } = message

    for (const apelido of comandos) {

      // Se por acaso a mensagem de um ninja começar com o prefixo padrão do BOT seguido de qualquer um dos apelidos do comando (definido no array 'comandos')
      if (content.toLowerCase().startsWith(`${prefix}${apelido.toLowerCase()}`)) {
        // Um comando foi chamado
        // toLowerCase: Serve para indiferenciar nome de comandos com letras minúsculas ou maiúsculas


        // Certifica-se de que o membro tem a(s) permissão(ões) necessária(s)
        for (const permissao of permissoes) {
          if (!member.hasPermission(permissoes)) {
            message.reply(erroDePermissao)
            return
          }
        }

        // Certifica-se de que o membro tem o(s) cargo(s) necessário(s)
        for (const cargoRequerido of cargosRequeridos) {
          const cargo = guild.roles.cache.find(cargo => cargo.name === cargosRequeridos)

          if (!cargo || !member.roles.cache.has(cargo.id)) {
            message.reply(`Você deve ter o cargo \"${cargoRequerido}\" para usar este jutsu, parça!`)
            return
          }
        }

        // Divide a mensagem/comando em partes utilizando uma Expressão Regular
        const argumentos = content.split(/[ ]+/)
        // Ex.:
        // mensagem: !add      5    10
        // conteúdo de 'argumentos': ['!add', '5', '10']

        // Remove o nome do comando, na qual é o primeiro elemento do array 'argumentos'
        argumentos.shift()

        // Verifica se após o nome do comando há a quantidade correta de argumentos requerida pelo comando
        if (argumentos.length < argsMin || (
          argsMax !== null && argumentos.length > argsMax
        )) {
          const sintaxeCorreta = `${prefix}${apelido} ${argsEsperados}`
          const msgDeErroDeSintaxe = "Qual é mano, tá tirando?! A sintaxe desse teu comando tá errada ein!\n" + "Faz assim: " + "```\n " + sintaxeCorreta + "\n```"
          message.reply(msgDeErroDeSintaxe)
          return
        }

        // Lida com o código do comando propriamente
        callback(message, argumentos, argumentos.join(' '))

        return
      }
    }


  })
}