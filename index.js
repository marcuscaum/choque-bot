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

const { checkIdleAndRemoveFromChannel } = require('./handlers');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("presenceUpdate", () => {
  console.log('rogerinho nao para', client.user.presence.status);
  checkIdleAndRemoveFromChannel(client);
});

client.on('message', message => {
  if (!message.guild) return;
  client.setStatusOnline();
  
  setTimeout(() => { client.setStatusIdle(); }, 10000);

  leaveChannel(message);
  help(message);
  miranha(message);
  choque(client, message);
  clear(message);
});

client.login(process.env.DISCORD_TOKEN);
