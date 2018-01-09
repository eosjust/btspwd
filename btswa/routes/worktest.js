var express = require('express');
var router = express.Router();
var fork = require('child_process').fork;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('yes');
});

module.exports = router;
