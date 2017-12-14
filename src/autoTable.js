var AutoTableInnerButton = {
    text: undefined,
    command: undefined
};

var AutoTable = {
    id: "",
    rows: 0,
    cols: 0,
    pageSize: 0,
    pagesLen: 0,
    curPage: 0,
    tableNode: undefined,
    tableHead: undefined,
    tableBody: undefined,
    tableRows: undefined,
    nextButton: undefined,
    preButton: undefined,
    pagesSpan: undefined,
    parent: undefined,
    operationEnable: undefined,
    buttonsTemplate: undefined,

    initTable: function (id, pageSize, parent, headContent, operationEnable, buttonsTemplate) {
        this.id = id;
        this.rows = 0;
        this.cols = headContent.length;
        this.parent = parent;
        this.pageSize = pageSize;

        this.tableNode = document.createElement("table");
        this.tableHead = document.createElement("thead");
        this.tableBody = document.createElement("tbody");
        this.parent.append(this.tableNode);
        this.tableNode.append(this.tableHead);
        this.tableNode.append(this.tableBody);
        this.tableNode.id = this.id;
        this.operationEnable = operationEnable;
        this.buttonsTemplate = buttonsTemplate;

        $(this.tableNode).addClass("table table-bordered table-striped");
        var headTR = document.createElement("tr");
        for (var j = 0; j < headContent.length; j++) {
            var th = document.createElement("th");
            headTR.append(th);
            th.innerHTML = headContent[j];
        }

        if (this.operationEnable == true) {
            this.cols++;
            var th = document.createElement("th");
            headTR.append(th);
            th.innerHTML = "Operation";
        }


        this.tableHead.append(headTR);
        this.tableRows = $(this.tableBody).find("tr");
        this.rows = this.tableRows.length;
        this.pagesLen = Math.floor(this.rows / this.pageSize);
        if (this.rows % this.pageSize != 0)
            this.pagesLen++;
        this.curPage = 0;

        var preButton = document.createElement("button");
        var pagesSpan = document.createElement("span");
        var nextButton = document.createElement("button");
        $(parent).append(preButton);
        $(parent).append(pagesSpan);
        $(parent).append(nextButton);

        $(pagesSpan).text("cur/max");
        this.preButton = preButton;
        this.pagesSpan = pagesSpan;
        this.nextButton = nextButton;
        $(this.preButton).addClass("btn btn-outline-primary");
        $(this.nextButton).addClass("btn btn-outline-primary");
        $(this.preButton).text("上一页");
        $(this.nextButton).text("下一页");
        var thisTable = this;
        $(preButton).click(function () {
            thisTable.onPrePage();
        });
        $(nextButton).click(function () {
            thisTable.onNextPage();
        });
        this.setCurrentPage();
    },
    newRows: function (id, data) {
        var tr = document.createElement("tr");

        for (var i = 0; i < data.length; i++) {
            var td = document.createElement("td");
            td.innerHTML = data[i];
            tr.append(td);
        }
        tr.id = id;
        if (this.operationEnable) {
            var operation = document.createElement("td");
            for (var i = 0; i < this.buttonsTemplate.length; i++) {
                var button = document.createElement("button");
                $(button).addClass("btn btn-outline-primary");
                $(button).text(this.buttonsTemplate[i].text);
                $(button).click(this.buttonsTemplate[i].command);
                operation.append(button);
            }
            tr.append(operation);
        }

        $(tr).hide();
        this.tableBody.append(tr);
        this.tableRows[this.rows] = tr;
        this.rows++;
        this.tableRows.length = this.rows;
        this.pagesLen = Math.floor(this.rows / this.pageSize);
        if (this.rows % this.pageSize != 0)
            this.pagesLen++;


        this.setCurrentPage();
    },
    displayCurrentPage: function () {
        var begin = this.curPage * this.pageSize;
        var end = Math.min(begin + this.pageSize, this.rows);
        for (var i = begin; i < end; i++) {
            $(this.tableRows[i]).show();
        }
    },
    hideCurrentPage: function () {
        var begin = this.curPage * this.pageSize;
        var end = Math.min(begin + this.pageSize, this.rows);
        for (var i = begin; i < end; i++) {
            $(this.tableRows[i]).hide();
        }
    },
    onNextPage: function () {
        if (this.curPage + 1 != this.pagesLen) {
            this.hideCurrentPage();
            this.curPage++;
            this.displayCurrentPage();
            this.setCurrentPage();
        } else {
            alert("没有下一页了")
        }
    },
    onPrePage: function () {
        if (this.curPage > 0) {
            this.hideCurrentPage();
            this.curPage--;
            this.displayCurrentPage();
            this.setCurrentPage();
        } else {
            alert("已经到头了")
        }
    },
    setCurrentPage: function () {
        $(this.pagesSpan).text((this.curPage + 1) + "/" + this.pagesLen);
    },
    updateTable: function () {
        this.rows = $(this.tableRows).length;
        this.pagesLen = Math.floor(this.rows / this.pageSize);
        if (this.rows % this.pageSize != 0)
            this.pagesLen++;
        if (this.curPage == this.pagesLen)
            this.curPage--;
        this.displayCurrentPage();
        this.setCurrentPage();
    },
    deleteRow:function(index){
        $(this.tableRows[index - 1]).remove();
        this.tableRows.splice(index - 1, 1)
        this.updateTable();
    }
};


