const articleService = require('../services/article');

function getAllArticles(req, res){
    return articleService.getAllArticles()
        .then(data => res.send(data));
}

function getArticle(req, res){
    return articleService.getArticle(req.user.id)
        .then(data => res.send(data));
}

function updateArticle(req, res) {
    if (req.body.content !== undefined) {
        return articleService.updateArticle({content: req.body.content}, req.params.id)
            .then(() => res.send({success: true}));

    } else {
        res.status(500).send({message: 'Missing Parameters content!'});
    }
}

function addArticle(req, res) {
    if (req.body.content !== undefined ) {
        return articleService.addArticle({content: req.body.content, authorId: req.user.id})
            .then(() => res.send({success: true}));
    } else {
        res.status(500).send({message: 'Missing Parameters content!'});
    }
}

module.exports = {
    getArticle,
    getAllArticles,
    addArticle,
    updateArticle
}
