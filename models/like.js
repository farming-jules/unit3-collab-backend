'use strict';
const { Model } = require('sequelize');
const LikeSchema = require('./schema/like')

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.Owner = this.belongsTo(models.User, { as: 'Owner', foreignKey: 'OwnerId' })
      Like.Target = this.belongsTo(models.User, { as: 'Target', foreignKey: 'TargetId' })
    }
  };

  const { tableAttributes } = LikeSchema(sequelize, DataTypes)
  Like.init(tableAttributes, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};