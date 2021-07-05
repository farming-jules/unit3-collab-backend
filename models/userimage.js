'use strict';
const { Model } = require('sequelize');
const UserImageSchema = require('./schema/user_image')

module.exports = (sequelize, DataTypes) => {
  class UserImage extends Model {
    static associate(models) {
      UserImage.User = this.belongsTo(models.User)
    }
  };

  const { tableAttributes } = UserImageSchema(sequelize, DataTypes)
  UserImage.init(tableAttributes, {
    sequelize,
    modelName: 'UserImage',
  });
  return UserImage;
};