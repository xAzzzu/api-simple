const sequelize = require('../db');
const Article = require('../models/DataModel').models().Article;

const addArticle = article => Article.create(article);
const updateArticle = (article, id) => Article.update(article, {where: {id}});

const getArticle = (id) => {
    return Article.findById(id)
        .then(sequelize.getValues);
}

const getAllArticles = () => {
    return Article.findAll()
        .then(sequelize.getValues);
}

module.exports = {
	addArticle,
	getAllArticles,
    getArticle,
    updateArticle
}
