'use strict';
const { Model } = require('sequelize');
const UserSchema = require('./schema/user')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.UserImages = this.hasMany(models.UserImage)
      User.OwnerLikes = this.hasMany(models.Like, { foreignKey: 'OwnerId' })
      User.TargetLikes = this.hasMany(models.Like, { foreignKey: 'TargetId' })
      User.AuthenticityTokens = this.hasMany(models.AuthenticityToken)    }
  };

  const { tableAttributes } = UserSchema(sequelize, DataTypes)
  User.init( tableAttributes, {
    sequelize,
    modelName: 'User',
  });
  return User;
};