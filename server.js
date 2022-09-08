const express = require('express')
var path = require('path'); 
const Server = require('./build/server')
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public'))) 

app.get('/', (req, res) => {
    Server.default(req, res)
});



app.listen(4242);
