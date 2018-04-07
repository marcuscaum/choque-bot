const fs = require('fs');
const sample = require('lodash.sample');
const util = require('util');

const enterChannel = message => {
  if (message.member.voiceChannel) {
    return message.member.voiceChannel.join();
  }

  return message.reply('Entra em uma sala de aúdio, otário!');
}

const checkCommand = (message, command) => message.content === `/choque ${command}`;

const playSound = async (message, song) => {
  const connection = await enterChannel(message);
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
  if (!customCheck && !checkCommand(message, command)) return;

  playSound(
    message,
    `./sounds/${sound}`
  );
}


module.exports = {
  playSound,
  playSpecificSound,
  playRandomSoundFromList,
  enterChannel,
  checkCommand,
};
