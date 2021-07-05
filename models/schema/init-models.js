var DataTypes = require("sequelize").DataTypes;
var _AuthenticityToken = require("./authenticity_token");
var _Like = require("./like");
var _SequelizeMetum = require("./sequelize_metum");
var _UserImage = require("./user_image");
var _User = require("./user");

function initModels(sequelize) {
  var AuthenticityToken = _AuthenticityToken(sequelize, DataTypes);
  var Like = _Like(sequelize, DataTypes);
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var UserImage = _UserImage(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    AuthenticityToken,
    Like,
    SequelizeMetum,
    UserImage,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
