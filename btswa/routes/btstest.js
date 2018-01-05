var express = require('express');
var router = express.Router();

const bitsharesjs = require('bitsharesjs');
const PrivateKey = bitsharesjs.PrivateKey;
const PublicKey = bitsharesjs.PublicKey;
const Aes = bitsharesjs.Aes;
const decompress = require('lzma').decompress;
const fs = require('fs');

// const binfilePath = '/Users/liyunhan/workspace/bts_default_20170914.bin';
const binfilePath = '/Users/liyunhan/Downloads/bts_default_20171024.bin';
const password = 'Liyh0620$$god';


/* GET users listing. */
router.get('/',async function (req, res, next) {
    res.send("haha");
    //var resp= await testPwd(password);
    //res.send(resp);
});

module.exports = router;



var decryptBts=function (pwd,path) {
    return new Promise((resolve, reject) => {
        var backup_buffer= fs.readFileSync(binfilePath);
        var privateKey = PrivateKey.fromSeed(pwd || '');
        // var backup_wif=privateKey.toWif();
        if (!Buffer.isBuffer(backup_buffer))
            backup_buffer = new Buffer(backup_buffer, "binary");

        // let private_key = PrivateKey.fromWif(backup_wif);
        let public_key;
        try {
            var xxbuf=backup_buffer.slice(0, 33);
            public_key = PublicKey.fromBuffer(backup_buffer.slice(0, 33));
        } catch (e) {
            resolve("-2");
        }
        backup_buffer = backup_buffer.slice(33);
        try {
            backup_buffer = Aes.decrypt_with_checksum(
                privateKey, public_key, null/*nonce*/, backup_buffer);
        } catch (error) {
            resolve("-3");
        }
        try {
            decompress(backup_buffer, wallet_string => {
                try {
                    let wallet_object = JSON.parse(wallet_string);
                    resolve(wallet_string);
                } catch (error) {
                    resolve("-4");
                }
            });
        } catch (error) {
            resolve("-5");
        }
        // fs.readFile(binfilePath, function (err, backup_buffer) {
        //
        //
        // });
    });
}

var testPwd=async function (pwd) {
    let res;
    for(var i=0;i<100;i++){
        res=await decryptBts(pwd,binfilePath);
    }
    return res;
}
