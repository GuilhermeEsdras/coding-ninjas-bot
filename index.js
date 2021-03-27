/*-------------------------------------*/
/* .:: Discord JS + outros pacotes ::. */
/*-------------------------------------*/
const Discord = require("discord.js"); 
const iruka = new Discord.Client();
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
/*-------------------------------------*/


/*---------------------------------*/
/* .:: JSONs (Dados / Configs) ::. */
/*---------------------------------*/
const cargos = require("./data/cargos"); // IDs + Emojis dos cargos
const canais = require("./data/canais"); // IDs dos canais
const images = require("./data/images"); // Link das imagens
const config = require("./config.json"); // Prefix
/*---------------------------------*/


/*--------------------*/
/* .:: Minhas Libs ::.*/
/*--------------------*/
const geradorDeStatus = require('./tasks/statuses');
/*--------------------*/


/*---------------------------------------------------------*/
/* .:: Primeira ação que o Iruka realiza ao se conectar ::. */
/*---------------------------------------------------------*/
iruka.on('ready', () => {
  console.log('O Iruka está acordado!');

  geradorDeStatus(iruka); // inicia gerador de status aleatórios

  /* --------------------------------------------- */
  /* .:: Leitor de Base de Comandos automática ::. */
  /* --------------------------------------------- */
  const arquivoBaseDeComandos = 'base-de-comandos.js'
  const baseDeComandos = require(`./commands/${arquivoBaseDeComandos}`)
  const lerComandos = dir => {
    const arquivos = fs.readdirSync(path.join(__dirname, dir))
    for (const arquivo of arquivos) {
      const stat = fs.lstatSync(path.join(__dirname, dir, arquivo))
      if (stat.isDirectory()) {
        lerComandos(path.join(dir, arquivo))
      } else if (arquivo !== arquivoBaseDeComandos) {
        const opcao = require(path.join(__dirname, dir, arquivo))
        baseDeComandos(iruka, opcao)
        console.log(arquivo, opcao)
      }
    }
  }
  lerComandos('commands')
  /* --------------------------------------------- */
});
// final do iruka.on('ready')
/*---------------------------------------------------------*/


/* .:: "Liga"/executa de fato o BOT / Faz login no BOT utilizando o TOKEN ::. */
iruka.login(process.env.TOKEN);

// const tempTOKEN = require("./tempTOKEN")
// iruka.login(tempTOKEN.TOKEN)