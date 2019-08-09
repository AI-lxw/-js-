var proArr = new Array();
function Project(index,proname,num,descript,items){//工程名称 编号 描述 项目
    this.index=index;
    this.proname=proname;
    this.num=num;
    this.descript=descript;
    this.items=items;
}
function item(iname,inum,idescript,last,pre,itemsArray){//项目 名称 编号 描述 持续时间 紧前工作 紧后工作
    this.iname=iname;
    this.inum=getinum(itemsArray);
    this.idescript =idescript;
    this.last=last;
    this.indegree=pre.length;
    this.pre=findinum(pre,itemsArray);
    this.insert=insert(this.inum,pre,itemsArray);
    this.node=new node;
}
function node(inum){
    this.inumber=inum;
    this.next=null;
}//弧结点
function findinum(pre,itemsArray){//找紧前项目编号
    if (pre){
        for (var i=0;i<pre.length;i++){
            for (var j=0;j<itemsArray.length;j++){
                if(itemsArray[j].iname==pre[i]){
                    pre[i]=itemsArray[j].inum;
                    break;
                }
            }
        }
    }
    return pre;
}
function insert(inum,pre,itemsArray){
    if( pre ){ //如果有紧前工作
        for(var i=0;i<pre.length;i++){
            if(itemsArray[(pre[i]-1)].node.inumber){
                var currnode=itemsArray[(pre[i]-1)].node;
                while(currnode.next!=null){
                    currnode=currnode.next;
                }
                var currnextarc=new	node(inum);
                currnode.next=currnextarc;
            }
            else {
                var currnextarc=new	node(inum);
                itemsArray[(pre[i]-1)].node=currnextarc;
            }
        }
    }
}//插入弧结点
function drop(){
    ditem=itemsArray.pop();//删除最后一个项目
    if( ditem.pre ){ //如果有紧前工作
        for(var i=0;i<ditem.pre.length;i++){
            var currnode=itemsArray[pre[i]].next;
            while(currnode.next!=null){
                currnode=currnode.next;
            }
            currnode=null;//删除紧后工作结点
        }
    }
}

function getinum(itemsArray){
    if(itemsArray.length){
        var gitem=itemsArray[itemsArray.length-1].inum+1;
    }
    else gitem=1;
    return gitem;
}