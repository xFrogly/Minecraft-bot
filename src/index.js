const mineflayer = require("mineflayer");
const chalk = require("chalk");
const settings = require("./settings");
const startAntiAfk = require("./antiAfk");
const attackNearby = require('./attackSystem');
const startMovement = require("./movement");

function createBot() {
  const bot = mineflayer.createBot({
    host: settings.server.host,
    port: settings.server.port,
    username: settings.bot.username,
    password: settings.bot.password,
    version: settings.server.version,
    auth: settings.bot.premium ? "microsoft" : "offline"
  });

  bot.once("spawn", () => {
    console.log(chalk.green("[+] Bot connected and spawned"));

    if (settings.antiAfk.enabled) {
      startAntiAfk(bot, settings);
    }

    if (settings.autoMessages.enabled) {
      let index = 0;
      setInterval(() => {
        if (!settings.autoMessages.repeat && index >= settings.autoMessages.messages.length) return;
        bot.chat(settings.autoMessages.messages[index % settings.autoMessages.messages.length]);
        index++;
      }, settings.autoMessages.repeatDelay);
    }

    if (settings.chatLogger.enabled) {
      bot.on("chat", (username, message) => {
        console.log(chalk.gray(`[Chat] ${username}: ${message}`));
      });
    }
    
    startMovement(bot, settings);
    attackNearby(bot, settings);
  });

  bot.on("end", () => {
    console.log(chalk.yellow("[!] Disconnected from server."));
    if (settings.reconnect.enabled) {
      console.log(chalk.cyan(`[~] Reconnecting in ${settings.reconnect.delay}ms...`));
      setTimeout(() => createBot(), settings.reconnect.delay);
    }
  });

  bot.on("error", err => {
    console.log(chalk.red(`[!] Error: ${err.message}`));
  });
}

createBot();
