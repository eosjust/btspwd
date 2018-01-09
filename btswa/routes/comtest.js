
var express = require('express');
var router = express.Router();
var CompermUtil=require('../utils/compermutil');
var BtspwdCheck=require('../utils/btspwdcheck');
const binfilePath = '/Users/liyunhan/Documents/bts_default.bin';
/* GET users listing. */
router.get('/', function (req, res, next) {
    addNewPwdTask(res);
    res.send("yes");
});

module.exports = router;

function addNewPwdTask(response) {

    var btspwdcheck=Object.create(BtspwdCheck);
    btspwdcheck.init(binfilePath);
    btspwdcheck.decryptBts("Liyh0620$$god");
}