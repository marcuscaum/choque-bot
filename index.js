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

  dispatcher.on('error', console.log)
  // dispatcher.on('end', () => message.member.voiceChannel.leave());
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

const playSpecificSound = (message, command, sound) => {
  if(!checkCommand(message, command)) return;

  playSound(
    message,
    `./sounds/${sound}`
  );
}

const leaveChannelListener = message => {
  if (!checkCommand(message, 'vaza') || !message.member.voiceChannel) return;

  message.member.voiceChannel.leave();
}

client.on('message', async message => {
  if (!message.guild) return;

  leaveChannelListener(message);

  playRandomSoundFromList(message, 'renan');
  playRandomSoundFromList(message, 'julinho');
  playRandomSoundFromList(message, 'maurilio');
  playRandomSoundFromList(message, 'rogerinho');

  playSpecificSound(message, 'boa-noite', './maurilio/amantes_de_cinema.ogg');
});

client.login(process.env.DISCORD_TOKEN);