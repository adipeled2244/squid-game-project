const express = require("express");
const { usersRouter } = require("./routers/userRouter");
const { playersResultsRouter } = require("./routers/playerResultRouter");
const { gamesDetailsRouter } = require("./routers/gamesDetailsRouter");
const { authRouter } = require("./routers/authRouter");
const winston = require('winston');
const moment=require('moment');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

app.use(corsConfig);


const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'logs/dev.log' }),
    ],
});



app.use('/', (req, res,next) => {
    logger.info(` ${req.method} |  ${req.url}  | ${ moment()}  `);
    next();
});






app.use('/api/auth',authRouter);

app.use('/api/gamesDetails', gamesDetailsRouter);
app.use('/api/playersResults', playersResultsRouter);
app.use('/api/users', usersRouter);


app.use(express.static(path.join(__dirname,"../frontend/build") ));
app.get("*",(req,res) => {
  app.use((req,res) => res.sendFile(path.join(__dirname,"../../frontend/build/index.html")));
});

app.use((req, res) => {
    res.status(404).json({error: `Page not found`});
});


// app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app;
