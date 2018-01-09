var express = require('express');
var router = express.Router();
var binfilePath = '/res/bts_default_20170914.bin';
const fs = require('fs');
var abc = "aaa";
/* GET users listing. */
router.get('/', function (req, res, next) {
    abc = "bbb";
    var backup_buffer= fs.readFileSync(binfilePath);
    if(backup_buffer){
        res.send('has file');
    }else{
        res.send('has not');
    }
});
router.get('/a', function (req, res, next) {
    res.send(abc);
});
module.exports = router;
