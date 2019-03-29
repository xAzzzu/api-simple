const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const articleController = require('./controllers/article');

const authMiddleware = require('./middlewares/auth');
const DataModel = require('./models/DataModel');
DataModel.associate();

module.exports.set = (app) => {
	app.post('/login', authController.login);
	app.post('/register', authController.register);
	app.get('/user', authMiddleware.checkAuth, userController.getUser);

	//Article
	app.get('/article', articleController.getAllArticles);
	app.get('/article/:id', articleController.getArticle);
	app.post('/article', authMiddleware.checkAuth, articleController.addArticle);
	app.patch('/article/:id', authMiddleware.checkAuth, articleController.updateArticle);
};
