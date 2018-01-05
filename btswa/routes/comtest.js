var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var a = getArrsMN(pwdseed,pwdseed.length, 5);
    for (var i = 0; i < a.length; i++) {
        console.log(a[i]);
    }
    res.send('comtest');
});
module.exports = router;
var test1 = [
    "Liyh",
    "liyh",
    "Shmily",
    "shmily",
    "God",
    "god"
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
    "Shmily",
    "shmily",
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
    "$$",
    "$$",
    "@@",
    "@@",
    "**",
    "&&"
];


var getArrsMN = function (oarr,m, n) {
    var allres=new Array();
    let flagarr = getFlagArrs(m, n);
    for (var inx = 0; inx < flagarr.length; inx++) {
        let narr = new Array();
        for(let i=0;i<m;i++){
            if((flagarr[inx])[i]==1){
                narr.push(oarr[i]);
            }
        }
        var comb=perm(narr);
        allres= allres.concat(comb);
    }
    return allres;
}

/**
 * 获得从m中取n的所有组合
 */
var getFlagArrs = function (m, n) {
    if (!n || n < 1) {
        return [];
    }
    var resultArrs = [],
        flagArr = [],
        isEnd = false,
        i, j, leftCnt;
    for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0;
    }
    resultArrs.push(flagArr.concat());
    while (!isEnd) {
        leftCnt = 0;
        for (i = 0; i < m - 1; i++) {
            if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
                for (j = 0; j < i; j++) {
                    flagArr[j] = j < leftCnt ? 1 : 0;
                }
                flagArr[i] = 0;
                flagArr[i + 1] = 1;
                var aTmp = flagArr.concat();
                resultArrs.push(aTmp);
                if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                    isEnd = true;
                }
                break;
            }
            flagArr[i] == 1 && leftCnt++;
        }
    }
    return resultArrs;
}

function seek(index, n) {
    var flag = false, m = n; //flag为找到位置排列的标志，m保存正在搜索哪个位置
    do {
        index[n]++;
        if (index[n] == index.length) //已无位置可用
            index[n--] = -1; //重置当前位置，回退到上一个位置
        else if (!(function () {
                for (var i = 0; i < n; i++)
                    if (index[i] == index[n]) return true;
                return false;
            })()) //该位置未被选择
            if (m == n) //当前位置搜索完成
                flag = true;
            else
                n++;
    } while (!flag && n >= 0)
    return flag;
}

function perm(arr) {
    var permres = new Array();
    var index = new Array(arr.length);
    for (var i = 0; i < index.length; i++)
        index[i] = -1;
    for (i = 0; i < index.length - 1; i++)
        seek(index, i);
    while (seek(index, index.length - 1)) {
        var temp = [];
        for (i = 0; i < index.length; i++)
            temp.push(arr[index[i]]);
        console.log(temp);
        permres.push(temp);
    }
    return permres;
}