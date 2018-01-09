var express = require('express');
var router = express.Router();
var fork = require('child_process').fork;
/* GET users listing. */
router.get('/', function (req, res, next) {
    var work1 = fork(process.cwd()+'/worker/myworker.js');
    work1.on('message', function (message) {
        if (message.method == 'initWorkerSuccess') {
            res.send("work run");
            // work1.send({method: 'run'});
        }
        if (message.method == 'progress') {
            console.log("progress");
        }
    });
    var message=new Object();
    message.method='initWorker';
    message.pwdseed=null;
    message.pwdnum=null;
    message.binpath=null;
    work1.send(message);
});

module.exports = router;
