module.exports = {
  bot: {
    username: "xyz",
    premium: true
  },
  server: {
    host: "jallal150.aternos.me",
    port: 25565,
    version: "1.21.1"
  },
  reconnect: {
    enabled: true,
    delay: 5000
  },
  chatLogger: {
    enabled: true
  },
  antiAfk: {
    enabled: true,
    mode: "jumping" // "circle", "jumping", "idle", "randomWalk"
  },
  autoMessages: {
    enabled: true,
    repeat: true,
    repeatDelay: 60000,
    messages: ["Still here!", "Bot AFK", "Monitoring server..."]
  },
  hit: {
    enabled: true,
    delay: 1000,
    attacked: "mob" // options: "player", "mob", "both"
  },

  moveTo: {
    enabled: true,
    position: {
      x: 325,
      y: 64,
      z: 477
  },
    jump: true,
    swim: true
  }
};
