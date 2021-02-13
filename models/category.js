'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
  
    name: DataTypes.STRING
  });

  Category.associate = function(models) {
    models.Category.belongsToMany(models.Post, {
      as: 'posts',
      through: 'postCategories',
      foreignKey: 'category_id'
    });
  };
  
  return Category;
};

