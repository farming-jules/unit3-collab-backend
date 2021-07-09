'use strict';
const { Model } = require('sequelize');
const UserSchema = require('./schema/user')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.UserImages = this.hasMany(models.UserImage, { onDelete: 'CASCADE', hook: true })
      User.OwnerLikes = this.hasMany(models.Like, { foreignKey: 'OwnerId', onDelete: 'CASCADE', hook: true })
      User.TargetLikes = this.hasMany(models.Like, { foreignKey: 'TargetId', onDelete: 'CASCADE', hook: true })
      User.AuthenticityTokens = this.hasMany(models.AuthenticityToken, { onDelete: 'CASCADE', hook: true })
    }
  };

  const { tableAttributes } = UserSchema(sequelize, DataTypes)
  User.init( tableAttributes, {
    sequelize,
    modelName: 'User',
  });
  return User;
};