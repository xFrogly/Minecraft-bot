const { GoalBlock } = require("mineflayer-pathfinder").goals;
const { pathfinder } = require("mineflayer-pathfinder");
const Vec3 = require("vec3");
const chalk = require("chalk");

module.exports = function startMovement(bot, settings) {
  if (!settings.moveTo || !settings.moveTo.enabled) return;

  bot.loadPlugin(pathfinder);

  const targetPos = new Vec3(
    settings.moveTo.position.x,
    settings.moveTo.position.y,
    settings.moveTo.position.z
  );

  bot.once("spawn", () => {
    console.log(chalk.green(`[MOVE] Moving to position (${targetPos.x}, ${targetPos.y}, ${targetPos.z})`));
    bot.pathfinder.setGoal(new GoalBlock(targetPos.x, targetPos.y, targetPos.z));
  });

  if (settings.moveTo.jump) {
    setInterval(() => {
      if (bot.entity.velocity.y === 0) {
        bot.setControlState("jump", true);
        setTimeout(() => bot.setControlState("jump", false), 200);
      }
    }, 5000);
  }

  if (settings.moveTo.swim) {
    bot.on("physicsTick", () => {
      if (bot.isInWater) {
        bot.setControlState("jump", true); 
      } else {
        bot.setControlState("jump", false);
      }
    });
  }
};
