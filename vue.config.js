const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: "wss://0.0.0.0:443/ws", // Fix WebSocket issue in GitHub Codespaces
      overlay: false, // Disable WebSocket error overlay
    },
  },
});
