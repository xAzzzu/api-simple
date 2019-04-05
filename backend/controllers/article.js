const articleService = require('../services/article');

function getAllArticles(req, res){
    return articleService.getAllArticles()
        .then(data => res.send(data));
}

function getArticle(req, res){
    return articleService.getArticle(req.params.id)
        .then(data => res.send(data));
}

function deleteArticle(req, res){
    return articleService.deleteArticle(req.params.id)
        .then(data => res.send({success: true}));
}


function updateArticle(req, res) {
    if (req.body.content !== undefined && req.body.title !== undefined) {
        return articleService.updateArticle({content: req.body.content, title: req.body.title}, req.params.id)
            .then(() => res.send({success: true}));

    } else {
        res.status(500).send({message: 'Missing Parameters content!'});
    }
}

function addArticle(req, res) {
    if (req.body.content !== undefined && req.body.title !== undefined) {
        return articleService.addArticle({content: req.body.content, title: req.body.title, authorId: req.user.id})
            .then(() => res.send({success: true}));
    } else {
        res.status(500).send({message: 'Missing Parameters content!'});
    }
}

module.exports = {
    getArticle,
    getAllArticles,
    addArticle,
    updateArticle,
    deleteArticle
}
