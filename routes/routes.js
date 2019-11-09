const userRoutes = require('./products');

const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('welcome to a crud node js app');
    });

    userRoutes(app, fs);
};


module.exports = appRouter;
