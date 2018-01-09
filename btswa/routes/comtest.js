
var express = require('express');
var router = express.Router();
var CompermUtil=require('../utils/compermutil');
var BtspwdCheck=require('../utils/btspwdcheck');
var binfilePath = '/res/bts_default_20170914.bin';
/* GET users listing. */
router.get('/', function (req, res, next) {
    addNewPwdTask(res);
    // res.send("yes");
});

module.exports = router;
var test1 = [
    "Liyh",
    "0620",
    "Play",
    "$$",
    "o"
];

function addNewPwdTask(response) {
    var comperm=Object.create(CompermUtil);
    comperm.init(test1,test1.length,3);
    var btspwdcheck=Object.create(BtspwdCheck);
    btspwdcheck.init(binfilePath);
    comperm.getEach(function (permArr) {
        let pwd=permArr.join('');
        let obj= btspwdcheck.decryptBts(pwd);
        console.log(obj.code+":"+pwd);
        if(obj.code==0){
            comperm.result=pwd;
            comperm.canloop=false;
            console.log(comperm.getinfo());
            response.send(comperm.getinfo());
        }

    });
    response.send(comperm.getinfo());
}