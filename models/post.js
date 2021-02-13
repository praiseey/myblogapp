'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    
    post_title: DataTypes.STRING,
    post_body: DataTypes.STRING,
    AuthorId: DataTypes.INTEGER
  });

  Post.associate = function(models) {
    models.Post.belongsTo(models.Author, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });

    models.Post.belongsToMany(models.Category, {
      as: 'categories',
      through: 'postCategories',
      foreignKey: 'post_id'
    });

    models.Post.hasMany(models.Comment);

  };

  return Post;
};

// Make sure you complete other models fields