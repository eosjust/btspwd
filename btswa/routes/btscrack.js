var express = require('express');
var hashmap=require('../utils/hashmap');
var fork = require('child_process').fork;
var router = express.Router();
const fs = require('fs');
var path = require('path');
var coderootdir=path.dirname(__dirname);
var binfilePath = coderootdir+'/public/res/bts_default_20170914.bin';

var pwdseeds = [
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
var taskMap = Object.create(hashmap);

router.get('/', function (req, res, next) {
    var num=req.query.num;
    if(!num){
        num=6;
    }
    var work1 = fork(coderootdir+'/utils/testworker.js');
    work1.on('message', function (m) {//接收工作进程计算结果
        if (m.method == 'getWorker') {
            res.send("work run");
            work1.send({method: 'run'});
        }
        if (m.method == 'progress') {
            taskMap.put(m.time, m.obj);
            console.log(m.obj);
        }
    });
    //
    var message=new Object();
    message.method='initWorker';
    message.pwdseed=pwdseeds;
    message.pwdnum=num;
    message.binpath=binfilePath;
    work1.send(message);

});

router.get('/getinfo', function (req, res, next) {

    let str = "result:"+"\r\n<br>";
    let keyarr = taskMap.keySet();
    for (let i = 0; i < keyarr.length; i++) {
        let key = keyarr[i];
        let value = taskMap.get(key);
        var localtime = new Date();
        localtime.setTime(key);
        str += (localtime.toLocaleString() + ":" + value + ";\r\n<br>");
    }
    res.send(str);
});
router.get('/hasfile', function (req, res, next) {
    res.send(coderootdir);
});

module.exports = router;
