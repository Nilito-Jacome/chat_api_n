"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participants.belongsTo(models.Users, { 
        foreignKey: "userId" 
      });
      Participants.belongsTo(models.Conversations, {
        foreignKey: "conversationId",
      });
    }
  }
  Participants.init(
    {
      userId: DataTypes.INTEGER,
      conversationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Participants",
      timestamps: false,
    }
  );
  return Participants;
};
