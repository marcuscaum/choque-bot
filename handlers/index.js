const fs = require('fs');
const sample = require('lodash.sample');
const util = require('util');
const Analytics = require('analytics-node');

const client = new Analytics(process.env.SEGMENT_KEY);


const enterChannel = message => {
  if (message.member.voiceChannel) {
    client.identify({
      userId: toString(message.guild),
    });
    return message.member.voiceChannel.join();
  }

  return message.reply('Entra em uma sala de audio, otário!');
}

const checkCommand = (message, command) => message.content === `/choque ${command}`;

const playSound = async (message, sound) => {
  const connection = await enterChannel(message);
  const dispatcher = connection.playFile(sound);

  dispatcher
    .on('end', () => {
      client.track({
        userId: toString(message.member.user.id),
        event: 'Played sound',
        properties: {
          sound,
        }
      });
    })
    .on('error', console.log);
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
