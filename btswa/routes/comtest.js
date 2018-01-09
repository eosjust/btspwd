
var express = require('express');
var router = express.Router();
var CompermUtil=require('../utils/compermutil');
var BtspwdCheck=require('../utils/btspwdcheck');
var exec = require("child_process").exec;
var taskArray=new Array();
/* GET users listing. */
router.get('/', function (req, res, next) {
    exec("ls -lah",function(){
        addNewPwdTask();
    });
    res.send("yes");
});
router.get('/getinfo', function (req, res, next) {
    var str="";
    for(let i=0;i<taskArray.length;i++){
        str+=(taskArray[i].getinfo()+"\n");
    }
    res.send(str);
});
router.get('/test', function (req, res, next) {
    var str="aaa";
    res.send(str);
});
module.exports = router;
var test1 = [
    "Liyh",
    "0620",
    "Play",
    "$$",
    "god",
    "God",
    "money"
];
var pwdseed1 = [
    "Liyh",
    "liyh",
    "Shmily",
    "shmily",
    "God",
    "god",
    "Play",
    "play",
    "Story",
    "story",
    "money",
    "fun",
    "1991",
    "0620",
    "1202",
    "$$",
    "@@",
];

var pwdseed = [
    "Liyh",
    "liyh",
    "Good",
    "good",
    "God",
    "god",
    "Play",
    "play",
    "Story",
    "story",
    "Money",
    "money",
    "fun",
    "1991",
    "0620",
    "06",
    "20",
    "1202",
    "5358",
    "979",
    "$",
    "$",
    "@",
    "@"
];


function addNewPwdTask() {
    var comperm=Object.create(CompermUtil);
    comperm.init(pwdseed,pwdseed.length,5);
    taskArray.push(comperm);
    var btspwdcheck=Object.create(BtspwdCheck);

    // btspwdcheck.init('/Users/liyunhan/Downloads/bts_default_20171024.bin');
    btspwdcheck.init('/Users/liyunhan/workspace/bts_default_20170914.bin');
    comperm.getEach(function (permArr) {
        let pwd=permArr.join('');
        let obj= btspwdcheck.decryptBts(pwd);
        console.log(obj.code+":"+pwd);
        if(obj.code==0){
            comperm.result=pwd;
            comperm.canloop=false;
            console.log(comperm.getinfo());
        }
    });
}