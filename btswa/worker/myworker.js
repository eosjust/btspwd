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