const userRouter = require("../modules/users/userRoutes");

module.exports = function(app){
    app.use('/api',userRouter);

}