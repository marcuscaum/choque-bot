const Discord = require('discord.js');
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

const playSong = async (message, song) => {
  const connection = await enterChannel(message)
  const dispatcher = connection.playFile(song);

  dispatcher.on('error', console.log)
  dispatcher.on('end', () => message.member.voiceChannel.leave());
}  

client.on('message', message => {
  if (!message.guild) return;

  if (message.content === '/vaza') {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
    }
  }

  if (message.content === '/renan') {
    playSong(message, './sounds/renan/adulto_esquisito.ogg');
  }
});

client.login('NDMxODg5MjE3Nzk1MTI5MzU1.DalbBA.GgsuNeRCXvYVobpgKUywXUeJzcs');