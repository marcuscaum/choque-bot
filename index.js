const Discord = require('discord.js');
const fs = require('fs');
const sample = require('lodash.sample');
const util = require('util');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const enterChannel = message => {
  if (message.member.voiceChannel) {
    return message.member.voiceChannel.join();
  } 

  return message.reply('Entra em uma sala de aúdio, otário!');
}

const checkCommand = (message, command) => message.content === `/choque ${command}`;

const playSound = async (message, song) => {
  const connection = await enterChannel(message)
  const dispatcher = connection.playFile(song);

  dispatcher.on('error', console.log);
}  

const playRandomSoundFromList = async (message, member) => {
  if (!checkCommand(message, member)) return;

  const readdir = util.promisify(fs.readdir);
  const soundList = await readdir(`./sounds/${member}/`);

  playSound(
    message,
    `./sounds/${member}/${sample(soundList)}`
  );
}

const playSpecificSound = ({ message, command, sound, customCheck }) => {
  if(!customCheck && !checkCommand(message, command)) return;

  playSound(
    message,
    `./sounds/${sound}`
  );
}

const helpCommand = message => {
  if (!checkCommand(message, 'help')) return;

  message.channel.send(
    'Comandos disponíveis: \n----------------- \n'+
    'maurilio \nrogerinho \njulinho \nrenan \nboa-noite \nachou-errado \nvaza (tira o bot do canal)'
  );
}

const leaveChannelListener = message => {
  if (!checkCommand(message, 'vaza') || !message.member.voiceChannel) return;

  message.member.voiceChannel.leave();
}

const miranha = message => {
  if(!(message.content.includes('/miranha'))) return;
  
  if(message.content.includes('mary-jane')) {
    playSpecificSound({
      message,
      sound: './miranha/mary-jane.mp3',
      customCheck: true
    });
  }

  if(message.content.includes('eu-pago')) {
    playSpecificSound({
      message,
      sound: './miranha/eu-pago.mp3',
      customCheck: true
    });
  }
  
  if(message.content.includes('cheguei')) {
    playSpecificSound({
      message,
      sound: './miranha/cheguei.mp3',
      customCheck: true
    });
  }
  
  if(message.content.includes('singaro')) {
    playSpecificSound({
      message,
      sound: './miranha/singaro.mp3',
      customCheck: true
    });
  }
}

client.on('message', async message => {
  if (!message.guild) return;

  leaveChannelListener(message);
  helpCommand(message);
  miranha(message);
  
  playRandomSoundFromList(message, 'renan');
  playRandomSoundFromList(message, 'julinho');
  playRandomSoundFromList(message, 'maurilio');
  playRandomSoundFromList(message, 'rogerinho');

  playSpecificSound({
    message,
    command: 'boa-noite',
    sound: './maurilio/amantes_de_cinema.ogg',
  });

  playSpecificSound({
    message,
    command: 'achou-errado',
    sound: './rogerinho/acho-errado.ogg',
  });
});

client.login(process.env.DISCORD_TOKEN);
