
layui.use(['form','layer','table'],function(){
    var form = layui.form;
    var layer = layui.layer;
    var table = layui.table;
    var $ = layui.$;
    var Submit = document.getElementById("submit"),
        input_proname = document.getElementById("proname"),
        input_num = document.getElementById("num"),
        input_descript = document.getElementById("descript");
    var proList = document.querySelectorAll(".main .layui-table-box table.content tbody")[0];
    var select_pro = document.getElementById("select_pro");
    var add_pro_form = document.getElementById("add_pro_form")
    var i = -1;
    var bui = document.getElementById("bui");
    var myDiagramDiv = document.getElementById("myDiagramDiv");
    /******************************************点击提交 并生成工程列表*************************************/
    Submit.onclick = function(){
        if(!attrOnly(proArr,num)){
            let msg = '编号已存在'
            layer.alert(`创建失败,失败信息：${msg}`,{icon: 2})
        }else if (input_proname.value.length == "" || input_num.value == "" ) {
            msg = 0
            layer.alert(`创建失败,失败信息：${msg}`,{icon: 2})
        }else{//每次点击都生成一个project对象
            ++i;
            project = new Project(i,input_proname.value,input_num.value,input_descript.value)
            msg = 1;
            input_proname.value = "";
            input_num.value = "";
            input_descript.value="";
            //将生成的对象push到数组里
            proArr.push(project)
            layer.alert(`创建成功${msg}`,{icon: 1})
            //生成的对象渲染到页面的工程列表里
            var proname_str = `<tr><td><div>${project.proname}</div></td>`,
                num_str = `<td><div>${project.num}</div></td>`,
                descript_str = `<td><div>${project.descript}</div></td>`;
                del_str = `<td><div><a class="edit layui-btn layui-btn-xs">编辑</a><a class="layui-btn layui-btn-danger layui-btn-xs del" lay-event="del" >删除</a></div></td></tr>`;
            var str = proname_str + num_str + descript_str + del_str;
            proList.innerHTML += str;
            //与此同时 把生成的工程对象数据 渲染到添加项目页面的select下拉选框去
            var s_str = `<option>${project.proname}</option>`;
            select_pro.innerHTML += s_str;
            form.render()
            /*******************************************删除工程***********************************************/
            var del = document.querySelectorAll("#add_pro_form .del");
            //从工程列表删除的同时从下拉列表删除（重新渲染下拉列表）
            for (let i = 0; i < del.length; i++) {
                var list = add_pro_form.querySelectorAll("tbody tr")
                del[i].onclick = function(){
                    layer.open({
                        content:"确认删除？",
                        yes:function(index, layero){
                            //从select下拉选框中删除
                            var option = select_pro.getElementsByTagName("option");
                            if (proArr[i].proname == option[i+1].value) {
                                option[i+1].parentNode.removeChild(option[i+1])
                                form.render('select')
                            }
                            proArr.remove(i);
                            list[i+1].parentNode.removeChild(list[i+1])
                            console.log(list);
                            layer.close(index);
                            console.log(proArr);
                        }
                    })
                }
            }
            /******************************************修改工程*****************************************************/
            var edit = document.querySelectorAll('#add_pro_form .edit');
            for (let i = 0; i < edit.length; i++) {
                edit[i].onclick = function(){
                    layer.open({
                        type:1,
                        title:"修改工程",
                        area: ['420px','300px'],
                        content:$("#edit_main").html(),
                        success:function () {
                            form.render();
                        },
                    });
                    form.on("submit(save)", function (data) {
                        console.log(data);
                        data.field.inum = fn();
                        form.render()
                        layer.closeAll();
                    });
                }
                    
            }
            var options = select_pro.getElementsByTagName("option");
            var add_div = document.querySelectorAll(".main .add_div")[0];
            for (let i = 1; i < options.length; i++) {
                //用户选择工程
                form.on('select(proname)', function(data){
                    var itemsArray = [];
                    var T=[];
                    var ve=[];
                    var vl=[];
                    var vef=[];
                    var vf=[];
                    var vlf=[];
                    //选择了工程以后才允许添加项目
                    if (data.value == options[i].value){
                        //找到对应的工程
                        for(var j=0;j<proArr.length;j++ ){
                            if(proArr[j].proname == data.value){
                                if(proArr.items){
                                    itemsArray = proArr[j].items;
                                }
                                break;
                            }
                        }
                        var div = document.createElement("div");
                        var dom1 = `<div class="layui-table-box" >
                        <div class="layui-table-header">
                            <table cellspacing="0" cellpadding="0" border="0" class="layui-table" >
                            <thead>
                                <tr>
                                <th>
                                    <div class="layui-table-cell" align="center">
                                    <span>编号</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="layui-table-cell" align="center">
                                    <span>名称</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="layui-table-cell" align="center">
                                    <span>描述</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="layui-table-cell" align="center">
                                    <span>持续时间</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="layui-table-cell" align="center">
                                    <span>紧前工作</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="layui-table-cell" align="center">
                                    <span>紧后工作</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="layui-table-cell" align="center">
                                    <span>操作</span>
                                    </div>
                                </th>
                                </tr>
                            </thead>
                            </table>
                        </div>
                        <table cellspacing="0" cellpadding="0" border="0" class="layui-table">
                        <tbody id="protable">
                        </tbody>
                        </table></div>`;
                        div.innerHTML = dom1;
                        add_div.appendChild(div)
                        $('#add').on('click',function(){
                            layer.open({
                                type:1,
                                title:`当前工程  ${data.value}`,
                                area: ['600px','500px'],
                                content:$("#add-main").html(),
                                success:function () {
                                    form.render();
                                },
                            });
                            //用户点击添加项目提交的按钮
                            form.on("submit(*)",function(data){
                                data.field.inum = fn();
                                i = new item(data.field.itemname,data.field.inum,data.field.itemdescript,data.field.last,data.field.pre,itemsArray);
                                itemsArray.push(i)//往项目数组中push新建项目
                                proArr[j].items = itemsArray;//赋值给items属性
                                console.log(itemsArray)
                                var pre_Arr = document.getElementById("pre");
                                pre_Arr.innerHTML = '<option value="">请选择紧前工作</option>';
                                form.render()
                                for (let i = 0; i < itemsArray.length; i++) {
                                    var t = itemsArray[i].iname;
                                    str = `<option>${t}</option>`;
                                    pre_Arr.innerHTML += str;
                                    form.render()
                                }
                                console.log(`inum是：${data.field.inum }`)
                                layer.closeAll();
                                //生成的对象渲染到页面的工程列表里
                                var num = `<tr><td><div  class = 'inum'>${i.inum}</div></td>`,
                                name = `<td><div>${data.field.itemname}</div></td>`,
                                descript = `<td><div>${data.field.itemdescript}</div></td>`;
                                last = `<td><div>${data.field.last}</div></td>`;
                                pre = `<td><div>--</div></td>`;
                                next = `<td><div>--</div></td>`;
                                ctrl = `<td><div><a class="layui-btn layui-btn-danger layui-btn-xs del">删除</a></div></td></tr>`;
                                var str = num + name + descript + last + pre + next + ctrl;
                                protable.innerHTML += str;
                                var btn_del = document.querySelectorAll('#protable .del');
                                var inums = document.querySelectorAll('#protable .inum');
                                var trs = document.querySelectorAll("#protable tr");
                                for (let i = 0; i < btn_del.length; i++) {
                                    btn_del[i].onclick = function(){
                                        console.log(inums[i].innerHTML);
                                        console.log(itemsArray[i].node);
                                            if(itemsArray[i].node.inumber!= undefined ){
                                                console.log(itemsArray[i].node);
                                                layer.alert("无法删除！");
                                            }
                                            else{
                                                var currpre=itemsArray[i].pre;
                                                var curritem=itemsArray.splice(i,1);
                                                protable.removeChild(trs[i]);
                                                console.log(pre_Arr.lastElementChild );
                                                pre_Arr.removeChild(pre_Arr.lastElementChild)
                                                form.render();
                                                console.log(proArr[j]);
                                                
                                                if(currpre){
                                                    for(var j=0;j<currpre.length;j++){
                                                        var p=itemsArray[currpre[j]-1].node;
                                                        if(p.inumber==curritem[0].inum){
                                                            itemsArray[currpre[j]-1].node=itemsArray[currpre[j]-1].node.next;
                                                        }
                                                        else{
                                                            while(p.next.inumber!=curritem[0].inum){
                                                                p=p.next;
                                                            }
                                                            p=p.next.next;
                                                        }
                                                    }
                                                }
                                            }
                                            console.log(itemsArray);
                                    }
                                }
                            })
                            //用户点击生成按钮
                            bui.onclick = function(){
                                var cnt=0;
                                for(var i=0;i<itemsArray.length;i++){
                                    if ( itemsArray[i].node.inumber==undefined){
                                        cnt++;
                                    }
                                }
                                console.log(itemsArray);
                                if (cnt>0&&cnt<2){               
                                    TopSort(T,ve,itemsArray,vl);
                                    CriticalPath(T,ve,itemsArray,vl);
                                    alltime(itemsArray,ve,vl,vef,vlf,vf)
                                    // proArr[proArr.index].items=itemsArray;
                                    layer.alert ("创建成功！");
                                    var finish = document.getElementById("finish");
                                    var finish_lis = document.getElementById("finish_lis");
                                    var temp;
                                    for (j=0;j<proArr.length;j++){
                                        if(data.value==proArr[j].proname){
                                            temp = proArr[j].index;
                                            break;
                                        }
                                    }
                                    var proname = `<tr><td><div>${proArr[temp].proname}</div></td>`,
                                        pronum = `<td><div>${proArr[temp].num}</div></td>`,
                                        prodes = `<td><div>${proArr[temp].descript}</div></td>`,
                                        ctrl = `<td><div><a class="edit layui-btn layui-btn-xs">编辑</a><a class="layui-btn layui-btn-danger layui-btn-xs look">看图</a></div></td></tr>`;
                                    var str = proname + pronum + prodes + ctrl;
                                    finish_lis.innerHTML += str;
                                }else{
                                    layer.alert ("error");
                                }
                                function nodeArr(key,text,length,earlyStart,lateFinish,critical){
                                    this.key = key,
                                    this.text = text,
                                    this.length = length,
                                    this.earlyStart = earlyStart,
                                    this.lateFinish = lateFinish,
                                    this.critical = critical
                                }
                                function link(from,to) {
                                    this.from = from,
                                    this.to = to
                                }
                                    //定义关键路径的TF
                                var critical=[];
                                function TF(critical,vf,itemsArray){
                                    for(i=0;i<itemsArray.length;i++){
                                        if(vf[i] == 0){
                                            critical[i]= true;
                                        }
                                        else{
                                            critical[i]= false;
                                        }
                                    }
                                }
                                TF(critical,vf,itemsArray);
                                //点击看图按钮生成图
                                var btn_look = document.querySelectorAll("#finish_lis .look");
                                console.log(box.style.display)
                                for(var i=0;i<btn_look.length;i++){
                                    btn_look[i].onclick = function () {
                                        console.log(1)
                                        var nodeDataArray = [];
                                        for (i = 0; i < itemsArray.length; i++) {
                                            var t = i +1;
                                            var node_arr = new nodeArr(t,itemsArray[i].iname,Number(itemsArray[i].last),ve[i],vlf[i],critical[i]);
                                            nodeDataArray.push(node_arr)
                                        }
                                        var linkDataArray = [];
                                        for (i = 0; i < itemsArray.length; i++) {
                                            var a = new link(i + 1,itemsArray[i].node.inumber)
                                            linkDataArray.push(a)
                                            var p = itemsArray[i].node.next;
                                            console.log(p,itemsArray[i].node.next);

                                            while (p) {
                                                t = new link(i+1,p.inumber)
                                                linkDataArray.push(t)
                                                p = p.next;
                                            }
                                        }
                                        myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
                                        box.style.display = "block";
                                        console.log(box.style.display)
                                    }
                                }
                                box.onclick = function (e) {
                                    box.style.display = "none";
                                    e.stopImmediatePropagation();
                                }
                            }

                        })
                    }
                }); 
            }
        }

    }

})



