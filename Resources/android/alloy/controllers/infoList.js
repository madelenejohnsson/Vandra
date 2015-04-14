function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setRowData() {
        try {
            var tableViewData = [];
            var rows = infoCollection.toJSON();
            for (var i = 0; i < rows.length; i++) {
                var row = Ti.UI.createTableViewRow({
                    id: i + 1,
                    layout: "horizontal",
                    height: "80dp",
                    top: 0,
                    hasChild: true
                });
                var labelView = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    backgroundColor: "white",
                    layout: "vertical"
                });
                var coverimg = Ti.UI.createImageView({
                    height: "70dp",
                    width: "110dp",
                    left: "5dp",
                    image: "/pics/" + rows[i].cover_img,
                    top: "5dp"
                });
                var lblName = Ti.UI.createLabel({
                    left: 10,
                    top: "2dp",
                    color: "#FF9966",
                    font: {
                        fontSize: 13,
                        fontWeight: "bold",
                        fontFamily: "Gotham Rounded"
                    },
                    text: rows[i].name
                });
                var lblDesc = Ti.UI.createLabel({
                    left: "10dp",
                    top: "2dp",
                    font: {
                        fontSize: 10,
                        fontFamily: "Gotham Rounded"
                    },
                    text: rows[i].desc
                });
                labelView.add(lblName);
                labelView.add(lblDesc);
                row.add(coverimg);
                row.add(labelView);
                tableViewData.push(row);
            }
            $.table.data = tableViewData;
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - setRowData");
        }
    }
    function getInfoDetails(e) {
        try {
            var id = e.rowData.id;
            infoCollection.fetch({
                query: 'SELECT * from infoModel where id = "' + id + '"'
            });
            var jsonObj = infoCollection.toJSON();
            var infoText = {
                name: jsonObj[0].name,
                infoTxt: jsonObj[0].infoTxt,
                id: id,
                img: jsonObj[0].cover_img,
                link: jsonObj[0].url,
                desc: jsonObj[0].desc
            };
            var infoDetail = Alloy.createController("infoDetail", infoText).getView();
            Alloy.CFG.tabs.activeTab.open(infoDetail);
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - getInfoDetails");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "infoList";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("infoModel");
    $.__views.infoList = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        id: "infoList"
    });
    $.__views.infoList && $.addTopLevelView($.__views.infoList);
    $.__views.__alloyId19 = Ti.UI.createScrollView({
        layout: "vertical",
        width: Titanium.UI.FILL,
        top: 0,
        scrollType: "vertical",
        id: "__alloyId19"
    });
    $.__views.infoList.add($.__views.__alloyId19);
    var __alloyId20 = [];
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        layout: "vertical",
        backgroundColor: "#fff3e5",
        height: "90dp",
        width: Ti.UI.FILL,
        right: 10,
        id: "__alloyId21"
    });
    __alloyId20.push($.__views.__alloyId21);
    getInfoDetails ? $.__views.__alloyId21.addEventListener("click", getInfoDetails) : __defers["$.__views.__alloyId21!click!getInfoDetails"] = true;
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId20,
        id: "table"
    });
    $.__views.__alloyId19.add($.__views.table);
    getInfoDetails ? $.__views.table.addEventListener("click", getInfoDetails) : __defers["$.__views.table!click!getInfoDetails"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    try {
        var infoCollection = getInfoCollection();
        infoCollection.fetch();
    } catch (e) {
        newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - create infoCollection");
    }
    setRowData();
    __defers["$.__views.__alloyId21!click!getInfoDetails"] && $.__views.__alloyId21.addEventListener("click", getInfoDetails);
    __defers["$.__views.table!click!getInfoDetails"] && $.__views.table.addEventListener("click", getInfoDetails);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;