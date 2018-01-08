var CompermUtil = {
    m: 0,
    n: 0,
    hasinit: false,
    current: 0,
    total: 0,
    result: "",
    oriArr: null,
    flagArr: null,
    startTime: null,
    canloop:true,
    init: function (oriArr, m, n) {
        this.startTime = new Date();
        this.oriArr = oriArr;
        this.m = m;
        this.n = n;
        this.flagArr = getFlagArrs(m, n);
        this.total=this.flagArr.length*factorial(n);
    },
    getEach: function (callback) {
        for (let i = 0; i < this.flagArr.length; i++) {
            let narr = new Array();
            for(let j=0;j<this.m;j++){
                if((this.flagArr[i])[j]==1){
                    narr.push(this.oriArr[j]);
                }
            }
            let permArr=perm(narr);
            for(let k=0;k<permArr.length;k++){
                if(this.canloop){
                    callback(permArr[k]);
                    this.current+=1;
                }
            }
        }
    },
    getinfo: function () {
        var str =
            "m:" + this.m +","+
            "n:" + this.n +","+
            "current:" + this.current +","+
            "total:" + this.total +","+
            "result:" + this.result;
        return str;
    }

};

function getFlagArrs(m, n) {
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
        permres.push(temp);
    }
    return permres;
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
function factorial (num) {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        for (var i = num - 1; i >= 1; i--) {
            num *= i;
        }
    }
    return num;
};
module.exports = CompermUtil;