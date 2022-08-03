module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "test.com",
        win: {
          icon: "public/logo.ico",
        },
      },
      nodeIntegration: true,
    },
  },
};
