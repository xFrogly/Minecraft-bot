const path = require("path");

let currentSettings = loadSettings();

function loadSettings() {
  const settingsPath = path.resolve(__dirname, "settings.js");
  delete require.cache[settingsPath];
  return require(settingsPath);
}

function getSettings() {
  return currentSettings;
}

function watchSettings(callback) {
  setInterval(() => {
    const newSettings = loadSettings();
    if (JSON.stringify(newSettings) !== JSON.stringify(currentSettings)) {
      currentSettings = newSettings;
      console.log("\x1b[36m[Settings] Reloaded from file without restart.\x1b[0m");
      callback(newSettings);
    }
  }, 10000);
}

module.exports = {
  getSettings,
  watchSettings
};
