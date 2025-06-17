const Vec3 = require("vec3");
const chalk = require("chalk");

module.exports = function startAntiAfk(bot, settings) {
  if (!settings.antiAfk.enabled) return;

  const mode = settings.antiAfk.mode;
  let interval = null;

  console.log(chalk.magentaBright(`[AFK] Anti-AFK Mode: ${mode}`));

  switch (mode) {
    case "circle":
      const radius = 1;
      const speed = 0.1;
      let angle = 0;

      interval = setInterval(() => {
        if (!bot.entity || !bot.entity.position) return;

        const pos = bot.entity.position;
        const target = new Vec3( 
          pos.x + radius * Math.cos(angle),
          pos.y,
          pos.z + radius * Math.sin(angle)
        );

        bot.lookAt(target);
        bot.setControlState("forward", true);

        angle += speed;
        if (angle > Math.PI * 2) angle = 0;
      }, 500);
      break;

    case "jumping":
      interval = setInterval(() => {
        bot.setControlState("jump", true);
        setTimeout(() => bot.setControlState("jump", false), 300);
      }, 4000);
      break;

    case "idle":
      interval = setInterval(() => {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * 0.5;
        bot.look(yaw, pitch, true);
      }, 5000);
      break;

    case "randomWalk":
      const directions = ["forward", "back", "left", "right"];
      let active = null;

      interval = setInterval(() => {
        if (active) bot.setControlState(active, false);

        const next = directions[Math.floor(Math.random() * directions.length)];
        bot.setControlState(next, true);
        active = next;

        setTimeout(() => bot.setControlState(next, false), 1000);
      }, 8000);
      break;

    default:
      console.log(chalk.red(`[AFK] Invalid anti-AFK mode: ${mode}`));
  }

  bot.on("end", () => {
    if (interval) clearInterval(interval);
  });
};
