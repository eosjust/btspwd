const bitsharesjs = require('bitsharesjs');
const lzma = require('lzma');
const PrivateKey = bitsharesjs.PrivateKey;
const PublicKey = bitsharesjs.PublicKey;
const Decompress = lzma.decompress;
const Aes = bitsharesjs.Aes;

const fs = require('fs');

var BtsPwdCheck = {
    binfilePath: "",
    binfileBuffer: null,
    init:function (filePath) {
        this.binfilePath=filePath;
        this.binfileBuffer = fs.readFileSync(filePath);
        if (!Buffer.isBuffer(this.binfileBuffer))
            this.binfileBuffer = new Buffer(this.binfileBuffer, "binary");
    },
    decryptBts: function (pwd) {
        return decryptBtsWallet(pwd,this.binfileBuffer);
    }
};
function decryptBtsWallet(pwd, fileBuffer) {
    var privateKey = PrivateKey.fromSeed(pwd || '');
    var obj = new Object();
    let publicKey;
    try {
        publicKey = PublicKey.fromBuffer(fileBuffer.slice(0, 33));
    } catch (e) {
        obj.code = -2;
        return obj;
    }
    fileBuffer = fileBuffer.slice(33);
    try {
        fileBuffer = Aes.decrypt_with_checksum(
            privateKey, publicKey, null/*nonce*/, fileBuffer);
        // Decompress(fileBuffer, wallet_string => {
        //     try {
        //         let wallet_object = JSON.parse(wallet_string);
        //         console.log(wallet_object);
        //     } catch (error) {
        //
        //     }
        // });
        obj.code = 0;
        obj.msg = pwd;
        return obj;
    } catch (error) {
        obj.code = -3;
        return obj;
    }
}
module.exports = BtsPwdCheck;