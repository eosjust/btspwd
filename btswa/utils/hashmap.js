var HashMap={
    //定义长度
    length:0,
    //创建一个对象
    obj:new Object(),

    /**
     * 判断Map是否为空
     */
    isEmpty:function () {
        return (this.length == 0);
    },
    /**
     * 判断对象中是否包含给定Key
     */
    containsKey:function (key) {
        return (key in this.obj);
    },
    /**
     * 判断对象中是否包含给定的Value
     */
    containsValue:function (value) {
        for (var key in this.obj) {
            if (this.obj[key] == value) {
                return true;
            }
        }
        return false;
    },

    /**
     *向map中添加数据
     */
    put : function (key, value) {
        if (!this.containsKey(key)) {
            this.length++;
        }
        this.obj[key] = value;
    },

    /**
     * 根据给定的Key获得Value
     */
    get : function (key) {
        return this.containsKey(key) ? this.obj[key] : null;
    },

    /**
     * 根据给定的Key删除一个值
     */
    remove : function (key) {
        if (this.containsKey(key) && (delete this.obj[key])) {
            this.length--;
        }
    },

    /**
     * 获得Map中的所有Value
     */
    values : function () {
        var _values = new Array();
        for (var key in this.obj) {
            _values.push(this.obj[key]);
        }
        return _values;
    },

    /**
     * 获得Map中的所有Key
     */
    keySet : function () {
        var _keys = new Array();
        for (var key in this.obj) {
            _keys.push(key);
        }
        return _keys;
    },

    /**
     * 获得Map的长度
     */
    size : function () {
        return this.length;
    },

    /**
     * 清空Map
     */
    clear : function () {
        this.length = 0;
        this.obj = new Object();
    }
}

module.exports = HashMap;