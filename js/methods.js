//封装删除数组指定下标元素的方法 使用Array.remove(下标)
Array.prototype.remove=function(obj){
    for(var i =0;i <this.length;i++){
        var temp = this[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <this.length;j++){
                this[j]=this[j+1];
            }
            this.length = this.length-1;
        }
    }
};
function Stack(){//建栈
    var items = [];     //用来保存栈里的元素
    this.push = function (element) { //添加新元素到栈顶
        items.push(element);
    }
    this.pop = function () {//移除栈顶的元素，同时返回被移除的元素
        return items.pop();
    }
    this.peek = function () { //返回栈顶的元素，不对栈做任何修改
        return items[items.length-1];
    }
    this.isEmpty = function () { //如果栈里没有任何元素就返回true，否则false
        return items.length == 0;
    }
    this.size = function () {//返回栈里的元素个数,类似于数组的length属性
        return items.length;
    }
    this.clear = function () {//移除栈里的所有元素
        items = [];
    }

    this.print = function () {
        console.log(items.toString());
    }
}
//封装判断数组中某个对象下面的属性是否重复的方法
function attrOnly(array, attr){//第一个参数 数组 第二个参数 属性值
    var first;
    if(array.length>0){
        //获取第一个元素的对应的属性
        first = array[0][attr];
        //都跟第一个元素做比对，只要有一个不对应，那说明不是唯一属性值了
        return array.every(function(item){
            return item[attr] == first;
        });
    }
    return true;
}
//生成编号序列栈
var stack = new Stack();
stack = [];
for (let i = 50; i > 0; i--) {
    stack.push(i)

}

var stack = new Stack();
stack = [];
for (let i = 50; i > 0; i--) {
    stack.push(i)

}
function fn (){
    stack.pop();
}