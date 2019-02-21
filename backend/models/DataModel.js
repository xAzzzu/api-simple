const Sequelize = require('sequelize');
const sequelize = require('../db');
const Users = require('./user');
const User = Users(sequelize, Sequelize.DataTypes);
const Articles = require('./article');
const Article = Articles(sequelize, Sequelize.DataTypes);

class DataModel {
    static associate(){
        const models = {
            User,
            Article
        };
        User.associate(models);
        Article.associate(models);
    }

    static models() {
        return {
            User,
            Article
        }
    }
}

module.exports = DataModel;