const chalk = require('chalk');
const express = require('express')
const app = express();
const path = require('path')

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + "/public")))

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, "index.html"))
})

app.listen(PORT, function() {
    console.log(`${chalk.yellowBright('[SERVER CONNECTION]')} Connected on port: ${PORT}`)
})

require('../adv')
