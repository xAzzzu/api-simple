const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const articleController = require('./controllers/article');

const authMiddleware = require('./middlewares/auth');

module.exports.set = (app) => {
	app.post('/login', authController.login);
	app.post('/register', authController.register);
	app.get('/user', authMiddleware.checkAuth, userController.getUser);

	//Article
	app.get('/article', authMiddleware.checkAuth, articleController.getAllArticles);
	app.get('/article/:id', authMiddleware.checkAuth, articleController.getArticle);
	app.post('/article/', authMiddleware.checkAuth, articleController.addArticle);
	app.patch('/article/:id', authMiddleware.checkAuth, articleController.updateArticle);
};
