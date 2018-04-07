const {
  playSpecificSound,
  playRandomSoundFromList,
  checkCommand,
} = require('../handlers');

const help = message => {
  if (!checkCommand(message, 'help')) return;

  message.channel.send(
    'Comandos disponíveis: \n----------------- \n' +
    'maurilio \nrogerinho \njulinho \nrenan \nboa-noite \nachou-errado \nvaza (tira o bot do canal)'
  );
}

const leaveChannel = message => {
  if (!checkCommand(message, 'vaza') || !message.member.voiceChannel) return;

  message.member.voiceChannel.leave();
}

const miranha = message => {
  if (!(message.content.includes('/miranha'))) return;

  if (message.content.includes('mary-jane')) {
    playSpecificSound({
      message,
      sound: './miranha/mary-jane.mp3',
      customCheck: true
    });
  }

  if (message.content.includes('eu-pago')) {
    playSpecificSound({
      message,
      sound: './miranha/eu-pago.mp3',
      customCheck: true
    });
  }

  if (message.content.includes('cheguei')) {
    playSpecificSound({
      message,
      sound: './miranha/cheguei.mp3',
      customCheck: true
    });
  }

  if (message.content.includes('singaro')) {
    playSpecificSound({
      message,
      sound: './miranha/singaro.mp3',
      customCheck: true
    });
  }
}

const choque = message => {
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
}

module.exports = {
  help,
  leaveChannel,
  miranha,
  choque,
};
