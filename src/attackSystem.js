const chalk = require("chalk");

const validMobNames = [
  "Zombie", "Skeleton", "Creeper", "Spider", "Cave Spider",
  "Enderman", "Slime", "Magma Cube", "Blaze", "Witch", "Husk",
  "Drowned", "Stray", "Wither Skeleton", "Ghast", "Phantom",
  "Silverfish", "Shulker", "Guardian", "Elder Guardian",
  "Piglin", "Piglin Brute", "Zoglin", "Vindicator", "Evoker",
  "Pillager", "Ravager", "Warden"
];

module.exports = function startAttacker(bot, settings) {
  if (!settings.hit || !settings.hit.enabled) return;

  let lastTargetName = null;

  function isValidTarget(entity) {
    if (!entity || !entity.position) return false;

    const dist = entity.position.distanceTo(bot.entity.position);
    if (dist > 5) return false;

    const mode = settings.hit.attacked;

    if (mode === "player") {
      return entity.username && entity.username !== bot.username;
    }

    if (mode === "mob") {
      return entity.displayName && validMobNames.includes(entity.displayName);
    }

    if (mode === "both") {
      const isPlayer = entity.username && entity.username !== bot.username;
      const isMob = entity.displayName && validMobNames.includes(entity.displayName);
      return isPlayer || isMob;
    }

    return false;
  }

  setInterval(() => {
    const target = bot.nearestEntity(isValidTarget);

    if (target) {
      bot.attack(target);

      const name = target.username || target.displayName || "unknown";

      if (lastTargetName !== name) {
        console.log(chalk.red(`[ATTACKED] Attacking ${settings.hit.attacked}: ${name}`));
        lastTargetName = name;
      }
    } else {
      lastTargetName = null;
    }
  }, settings.hit.delay || 1000);
};
