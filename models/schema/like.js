const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Like', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    OwnerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TargetId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Likes',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Likes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
