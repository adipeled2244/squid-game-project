require('dotenv').config();
const app = require('./app');
const http = require('http').createServer(app);
const dbCon = require('./db_connection')
require('./socket/socket')(http);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`listening on port ${port}`);
    dbCon.then(() => {
        console.log('connected to db')
    }).catch(err => {
            console.log('fail to connect db', err.message)
    });
});