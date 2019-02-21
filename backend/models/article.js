'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    authorId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Article.associate = function(models) {
      Article.belongsTo(models.User, {as: 'author'})
  };
  return Article;
};