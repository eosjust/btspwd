var express = require('express');
var router = express.Router();

const bitsharesjs = require('bitsharesjs');
const lzma = require('lzma');
const PrivateKey = bitsharesjs.PrivateKey;
const PublicKey = bitsharesjs.PublicKey;
const Decompress = lzma.decompress;
const Aes = bitsharesjs.Aes;

const fs = require('fs');

const binfilePath = '/Users/liyunhan/workspace/bts_default_20170914.bin';
//const binfilePath = '/Users/liyunhan/Downloads/bts_default_20171024.bin';
const password = 'Shmily0620$$god';

var pwdseed = [
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
    "Money",
    "money",
    "fun",
    "1991",
    "0620",
    "1202",
    "5358",
    "$$",
    "$$",
    "@@",
    "@@",
    "**",
    "&&"
];


/* GET users listing. */
router.get('/', function (req, res, next) {
    //res.send("haha");
    var resp = testPwd(password);
    res.send(resp);
});

module.exports = router;

var decryptBtsWallet = function (pwd, fileBuffer) {
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
        obj.code = 0;
        obj.msg = pwd;
        return obj;
    } catch (error) {
        obj.code = -3;
        return obj;
    }
}

var decryptBts = function () {
    var backup_buffer = fs.readFileSync(binfilePath);
    if (!Buffer.isBuffer(backup_buffer))
        backup_buffer = new Buffer(backup_buffer, "binary");
    for (var i = 0; i < 100000; i++) {
        let obj = decryptBtsWallet(getRandPwd(), backup_buffer);
        if (obj.code == 0) {
            return obj.msg;
        }
    }
    return "没有";
}

var testPwd = function () {
    return decryptBts();
}

function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

function getRandPwd() {
    let size=getRandomNum(1,10);
    let pwd="";
    for(var i=0;i<size;i++){
        var inx=getRandomNum(0,pwdseed.length-1);
        pwd+=pwdseed[inx];
    }
    console.log(pwd);
    return pwd;
}
