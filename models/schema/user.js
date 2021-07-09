const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sexualOrientation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    passion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lookingFor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
