if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const Discord = require('discord.js');
const client = new Discord.Client();

const {
  help,
  leaveChannel,
  miranha,
  choque,
  clear,
} = require('./commands');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.guild) return;

  leaveChannel(message);
  help(message);
  miranha(message);
  choque(client, message);
  clear(message);
});

client.login(process.env.DISCORD_TOKEN);
