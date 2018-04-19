var express = require('express');
const path = require('path')
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('hello world')
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

module.exports = router;
