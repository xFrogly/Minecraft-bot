module.exports = {
  // Bot account settings
  bot: {
    username: "xyz",       // Username of the Minecraft bot account
    premium: true          // Set to true if using a Mojang/Microsoft premium account
  },

  // Minecraft server connection settings
  server: {
    host: "localhost",     // IP of the server
    port: 25565,           // Server port (default is 25565)
    version: "1.21.4"      // Minecraft version to connect with
  },

  // Auto-reconnect settings
  reconnect: {
    enabled: true,         // Whether the bot should reconnect after getting kicked/disconnected
    delay: 5000            // Delay in milliseconds before attempting reconnection
  },

  // Chat logging configuration
  chatLogger: {
    enabled: true          // Log chat messages from the server if enabled
  },

  // Anti-AFK system to prevent bot from being kicked for inactivity
  antiAfk: {
    enabled: true,         // Enable or disable anti-AFK
    mode: "jumping"        // Options: "circle", "jumping", "idle", "randomWalk"
  },

  // Automatic messages sent by the bot at intervals
  autoMessages: {
    enabled: true,         // Enable sending automatic messages
    repeat: true,          // Repeat the messages continuously
    repeatDelay: 60000,    // Time delay between messages in milliseconds
    messages: [            // List of messages to send
      "Still here!",
      "Bot AFK",
      "Monitoring server..."
    ]
  },

  // Auto-attack settings
  hit: {
    enabled: true,         // Enable or disable attacking entities
    delay: 1000,           // Delay in milliseconds between each attack
    attacked: "mob"        // Who to attack: "player", "mob", or "both"
  },

  // Move bot to a specific location on spawn
  moveTo: {
    enabled: true,         // Enable auto movement to a target position
    position: {
      x: 325,              // X-coordinate of the destination
      y: 64,               // Y-coordinate (height)
      z: 477               // Z-coordinate
    },
    jump: true,            // Allow jumping during movement
    swim: true             // Allow swimming if water is encountered
  }
};
