const sequelize = require('../db');
const Article = require('../models/DataModel').models().Article;
const User = require('../models/DataModel').models().User;

const addArticle = article => Article.create(article);
const updateArticle = (article, id) => Article.update(article, {where: {id}});

const getArticle = (id) => {
    return Article.findOne({ where: {id: id}, include: [{model: User, as: 'author'}] })
        .then(sequelize.getValues);
}

const getAllArticles = () => {
    return Article.findAll({include: [{model: User, as: 'author'}] })
        .then(sequelize.getValues);
}

module.exports = {
	addArticle,
	getAllArticles,
    getArticle,
    updateArticle
}
