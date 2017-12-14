## AutoTable

不需要按钮的使用方法:

* initTable方法
  * 用于初始化表格
  * 参数
    * _id:生成的表格的id
    * pageSize:一页的大小
    * parent:父节点,用$("")选出来的数组,选一个唯一的才能保证安全
    * headContent:表格首部行,传入一个数组
    * operationEnable:是否需要有按钮一列
    * buttonTemplate:按钮模版，模版由AutoTableInnerButton描述



* newRows方法:
  * 用于新增加一行
  * 参数
    * _id:用于标识该行的id
    * data:数据数组，表格会按行填充每一列



不需要按钮的使用方法:

```javascript
var table = Object.create(AutoTable);
table.initTable("mytable",2,$("body"),["列1","列2"],false);
table.newRows("row1",["1","2"]);
table.newRows("row2",["1","2"]);
table.newRows("row3",["1","2"]);
table.displayCurrentPage();
```

需要按钮的使用方法:

```
var table = Object.create(AutoTable);
var deleteButton=Object.create(AutoTableInnerButton);
deleteButton.text="删除"
deleteButton.command=function(){
  //TODO: Anything you want
}
table.initTable("mytable",2,$("body"),["列1","列2"],false);
table.newRows("row1",["1","2"]);
table.newRows("row2",["1","2"]);
table.newRows("row3",["1","2"]);
table.displayCurrentPage();
```



代码写得丑，不要喷我。