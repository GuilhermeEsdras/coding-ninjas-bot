module.exports = async (client) => {
    setInterval(() => {
      console.log('Procurando o que fazer');
      numAleatorio = Math.floor(Math.random() * 3);
      if (numAleatorio == 0) {
        client.user.setPresence({
          activity: {
            name: 'um intruso na vala',
            type: 'PLAYING'
          },
          status: 'dnd'
        }).catch(console.error);
      } else if (numAleatorio == 1) {
        client.user.setPresence({
          activity: {
            name: 'um forasteiro fora da vila',
            type: 'WATCHING'
          },
          status: 'idle'
        }).catch(console.error);
      } else {
        client.user.setPresence({
          activity: {
            name: 'um expulso chorar pra entrar',
            type: 'LISTENING'
          },
          status: 'online'
        }).catch(console.error);
      }
      console.log(`Atividade ${numAleatorio} escolhida`);
    }, 30000)
  }