var $ = go.GraphObject.make;
var blue = "#0288D1";
var pink = "#B71C1C";
var pinkfill = "#F8BBD0";
var bluefill = "#B3E5FC";
myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
            initialAutoScale: go.Diagram.Uniform,
            initialContentAlignment: go.Spot.Center,
            layout: $(go.LayeredDigraphLayout)
        });//初始化图表布局

//节点模板显示中间的活动名称以及
//有关活动的各种统计信息,所有这些都由边框包围｡
//边框的颜色由节点数据的“.critical”属性决定｡
//某些信息不能作为节点数据的属性
//,但必须计算 - 我们使用转换器函数｡
myDiagram.nodeTemplate =//定义结点模板
    $(go.Node, "Auto",
        $(go.Shape, "Rectangle",  // the border
            { fill: "white", strokeWidth: 2 },
            new go.Binding("fill", "critical", function (b) { return (b ? pinkfill : bluefill ); }),
            new go.Binding("stroke", "critical", function (b) { return (b ? pink : blue); })),
        $(go.Panel, "Table",
            { padding: 0.5 },
            $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: "white", coversSeparators: true }),
            $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
            $(go.TextBlock, // earlyStart
                new go.Binding("text", "earlyStart"),
                { row: 0, column: 0, margin: 5, textAlign: "center" }),
            $(go.TextBlock,//lastTime
                new go.Binding("text", "length"),
                { row: 0, column: 1, margin: 5, textAlign: "center" }),
            $(go.TextBlock,  // earlyFinish
                new go.Binding("text", "",
                    function(d) { return (d.earlyStart + d.length).toFixed(2); }),
                { row: 0, column: 2, margin: 5, textAlign: "center" }),

            $(go.TextBlock,//工作项名称
                new go.Binding("text", "text"),
                { row: 1, column: 0, columnSpan: 3, margin: 5,
                    textAlign: "center", font: "bold 14px sans-serif" }),

            $(go.TextBlock,  // lateStart
                new go.Binding("text", "",
                    function(d) { return (d.lateFinish - d.length).toFixed(2); }),
                { row: 2, column: 0, margin: 5, textAlign: "center" }),
                
            $(go.TextBlock,  // 自由时差
                new go.Binding("text", "",
                    function(d) { return (d.lateFinish - (d.earlyStart + d.length)).toFixed(2); }),
                { row: 2, column: 1, margin: 5, textAlign: "center" }),
            $(go.TextBlock, // lateFinish
                new go.Binding("text", "lateFinish"),
                { row: 2, column: 2, margin: 5, textAlign: "center" })
        )  // end Table Panel
    );  // end Node

//链接数据对象不能直接访问两个节点
//(尽管它确实引用了它们的键:.from和.to)｡
//此转换函数获取数据绑定的GraphObject作为第二个参数｡
//从那里我们可以得到包含链接,然后是Link.fromNode或.toNode,
//然后是它的节点数据,它们具有我们需要的“.critical”属性｡
//
//但请注意,如果我们要动态更改节点数据上的“.critical”属性,
//调用myDiagram.model.updateTargetBindings(nodedata)只会更新节点的颜色｡改变任何链接的外观是不够的｡
function linkColorConverter(linkdata, elt) {
    var link = elt.part;
    if (!link) return blue;
    var f = link.fromNode;
    if (!f || !f.data || !f.data.critical) return blue;
    var t = link.toNode;
    if (!t || !t.data || !t.data.critical) return blue;
    return pink; //当Link.fromNode.data.critical和Link.toNode.data.critical时
}

//仅当两个
//连接的节点都具有“.critical”数据时,链接的颜色(包括其箭头)才为红色; 否则它是蓝色的｡
//这是由绑定转换器函数计算的｡
myDiagram.linkTemplate =
    $(go.Link,
        { toShortLength: 6, toEndSegmentLength: 20 },
        $(go.Shape,
            { strokeWidth: 4 },
            new go.Binding("stroke", "", linkColorConverter)),
        $(go.Shape,  // arrowhead
            { toArrow: "Triangle", stroke: null, scale: 1.5 },
            new go.Binding("fill", "", linkColorConverter))
    );
myDiagram.add(
    $(go.Node, "Auto",
        $(go.Shape, "Rectangle",  // the border
            { fill: bluefill } ),
        $(go.Panel, "Table",
            $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
            $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: bluefill, coversSeparators: true }),
            $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
            $(go.TextBlock, "最早开始",
                { row: 0, column: 0, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "持续时间",
                { row: 0, column: 1, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "最早结束",
                { row: 0, column: 2, margin: 5, textAlign: "center" }),

            $(go.TextBlock, "名称",
                { row: 1, column: 0, columnSpan: 3, margin: 5,
                    textAlign: "center", font: "bold 14px sans-serif" }),

            $(go.TextBlock, "最晚开始",
                { row: 2, column: 0, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "自由",
                { row: 2, column: 1, margin: 5, textAlign: "center" }),
            $(go.TextBlock, "最晚结束",
                { row: 2, column: 2, margin: 5, textAlign: "center" })
        )  // end Table Panel
    ));
