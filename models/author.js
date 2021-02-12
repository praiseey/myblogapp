'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
    }},
    role: DataTypes.STRING,
    username: DataTypes.STRING,

  });

  Author.associate = function(models) {
    models.Author.hasMany(models.Post);
  };

  return Author;
};
 