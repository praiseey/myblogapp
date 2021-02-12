'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    body: DataTypes.STRING,
    PostId: DataTypes.INTEGER
  });

  Comment.associate = function (models) {
    models.Comment.belongsTo(models.Post, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    };

  return Comment;
};

