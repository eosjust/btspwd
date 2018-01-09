
function run() {
    
}
function initWorker(pwdseed,pwdnum,binpath) {

}
process.on('message', function (m) {
//接收主进程发送过来的消息
    try{
        if(m.method=="initWorker"){
            console.log("initWorker");
            console.log(m.binpath);
            initWorker(m.pwdseed,m.pwdnum,m.binpath);
            var message=new Object();
            message.method='initWorkerSuccess';
            process.send(message);
        }
    }catch (ex){

    }
});