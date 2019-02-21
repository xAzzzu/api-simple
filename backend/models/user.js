'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
      User.hasMany(models.Order, {foreignKey: 'user_id'});
  };
  return User;
};