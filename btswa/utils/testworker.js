var CompermUtil=require('../utils/compermutil');
var BtspwdCheck=require('../utils/btspwdcheck');
var comperm=Object.create(CompermUtil);
var btspwdcheck=Object.create(BtspwdCheck);

function initWorker(pwdseed,pwdnum,binpath) {
    comperm.init(pwdseed,pwdseed.length,pwdnum);
    btspwdcheck.init(binpath);
}
function worker() {
    var progress=0;
    comperm.getEach(function (permArr) {
        let pwd=permArr.join('');
        let obj= btspwdcheck.decryptBts(pwd);
        // console.log(obj.code+":"+pwd);
        progress+=1;
        if(progress>100){
            progress=0;
            process.send({method:"progress",time:comperm.startTime,obj:comperm.getinfo()});
        }
        if(obj.code==0){
            comperm.result=pwd;
            comperm.canloop=false;
            console.log(comperm.getinfo());
            process.send({method:"progress",time:comperm.startTime,obj:comperm.getinfo()});
        }
    });
}
process.on('message', function (m) {
//接收主进程发送过来的消息
    try{
        if(m.method=="initWorker"){
            console.log("initWorker");
            console.log(m.binpath);
            initWorker(m.pwdseed,m.pwdnum,m.binpath);
            console.log(comperm.getinfo());
            var message=new Object();
            message.method='getWorker';
            message.obj=comperm;
            process.send(message);
        }
    }catch (ex){

    }
});
process.on('message', function (m) {
//接收主进程发送过来的消息
    try{
        if(m.method=="run"){
            console.log("run method detect");
            setTimeout(function () {
                worker();
            },2000);
        }
    }catch (ex){

    }
});