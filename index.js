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

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

const enterChannel = message => {
  if (message.member.voiceChannel) {
    return message.member.voiceChannel.join();
  } 

  return message.reply('Entra em uma sala de aúdio, otário!');
}

const playSound = async (message, song) => {
  const connection = await enterChannel(message)
  const dispatcher = connection.playFile(song);

  dispatcher.on('error', console.log)
  // dispatcher.on('end', () => message.member.voiceChannel.leave());
}  

const playSoundCommand = async (message, member) => {
  if (message.content === `/${member}`) {
    const readdir = util.promisify(fs.readdir);
    const soundList = await readdir(`./sounds/${member}/`);

    playSound(
      message,
      `./sounds/${member}/${sample(soundList)}`
    );
  }
}

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content === '/vaza') {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
    }
  }

  playSoundCommand(message, 'renan');
  playSoundCommand(message, 'julinho');


});

client.login(process.env.DISCORD_TOKEN);