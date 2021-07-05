const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserImage', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserImages',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "UserImages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
