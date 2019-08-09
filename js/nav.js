// 侧边导航部分
(function(){

    var navList = document.querySelectorAll(".layui-nav-itemed .layui-nav-child dd"),
        main = document.getElementsByClassName("layui-body");
    var index = 0;
    for (var i = 0; i < navList.length; i++) {
        navList[i].index = i;
        navList[i].onclick = function(){
            main[index].classList.remove("active");
            index = this.index;
            main[index].classList.add("active");
        }

    }
})()