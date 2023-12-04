
const apiRouter = (app) => {
    app.use('/api/v1/users', require('./usersRouter'));
};

module.exports = apiRouter;
