const userRoutes = require("./user.routes");
const conversationRoutes = require("./conversations.routes");

const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(conversationRoutes);
};

module.exports = apiRoutes;
