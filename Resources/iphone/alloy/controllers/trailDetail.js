function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function zoomMapTrail() {
        var trail = {
            id: args.id,
            title: args.title,
            color: args.color,
            zoomlat: args.zoomlat,
            zoomlon: args.zoomlon
        };
        var mapDetail = Alloy.createController("mapDetail", trail).getView();
        Alloy.CFG.tabs.activeTab.open(mapDetail);
    }
    function selectTrailPics() {
        try {
            var mediaCollection = Alloy.Collections.mediaModel;
            mediaCollection.fetch({
                query: 'SELECT * from mediaModel where trail_id="' + trailId + '"'
            });
            var jsonMedia = mediaCollection.toJSON();
            for (var i = 0; i < jsonMedia.length; i++) {
                var img_view = Ti.UI.createView({
                    backgroundImage: "/pics/" + jsonMedia[i].filename,
                    height: "200dp",
                    width: "300dp",
                    top: "0dp"
                });
                var lblImgTxt = Ti.UI.createLabel({
                    left: "5dp",
                    top: "0dp",
                    text: jsonMedia[i].img_txt,
                    color: "white",
                    font: {
                        fontSize: 12,
                        fontStyle: "italic",
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                        fontFamily: "Gotham Rounded"
                    }
                });
                var backgroundView = Ti.UI.createView({
                    layout: "vertical",
                    backgroundColor: "black",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE
                });
                backgroundView.add(img_view);
                backgroundView.add(lblImgTxt);
                $.slideShowTrails.addView(backgroundView);
            }
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - selectTrailPics");
        }
    }
    function showHotspots() {
        try {
            var tableViewData = [];
            var rows = getHotspotData();
            for (var i = 0; i < rows.length; i++) {
                var row = Ti.UI.createTableViewRow({
                    id: rows[i].name,
                    layout: "horizontal",
                    height: "80dp",
                    top: "0dp",
                    hasChild: true
                });
                var img = Ti.UI.createImageView({
                    height: "70dp",
                    width: "110dp",
                    image: "/pics/" + rows[i].cover_pic,
                    left: "5dp",
                    top: "5dp"
                });
                var labelView = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    backgroundColor: "white",
                    layout: "vertical"
                });
                var lblName = Ti.UI.createLabel({
                    color: "#FF9966",
                    left: "5dp",
                    font: {
                        fontSize: 14,
                        fontFamily: "Gotham Rounded"
                    },
                    text: rows[i].name
                });
                var lblDesc = Ti.UI.createLabel({
                    left: "5dp",
                    top: "0dp",
                    font: {
                        fontSize: 10,
                        fontFamily: "Gotham Rounded"
                    },
                    text: "Läs mer om " + rows[i].name + " här!"
                });
                labelView.add(lblName);
                labelView.add(lblDesc);
                row.add(img);
                row.add(labelView);
                tableViewData.push(row);
            }
            $.hotspotTable.data = tableViewData;
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showHotspots");
        }
    }
    function getHotspotData() {
        try {
            var id = trailId;
            var hotstrailCollection = Alloy.Collections.hotspotModel;
            hotstrailCollection.fetch({
                query: 'SELECT hotspotModel.name, hotspotModel.cover_pic from hotspotModel join hotspot_trailsModel on hotspotModel.id = hotspot_trailsModel.hotspotID where trailsID ="' + id + '"'
            });
            var jsonObj = hotstrailCollection.toJSON();
            return jsonObj;
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - getHotspotData");
        }
    }
    function showHotspot(e) {
        try {
            var name = e.rowData.id;
            var hotspotCollection = Alloy.Collections.hotspotModel;
            hotspotCollection.fetch({
                query: 'SELECT id, infoTxt from hotspotModel where name = "' + name + '"'
            });
            var jsonObj = hotspotCollection.toJSON();
            var txt = jsonObj[0].infoTxt;
            var idnr = jsonObj[0].id;
            var hotspotTxt = {
                title: name,
                infoTxt: txt,
                id: idnr
            };
            var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
            Alloy.CFG.tabs.activeTab.open(hotspotDetail);
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showHotspot");
        }
    }
    function showIcons() {
        try {
            var selectedIcons = getIcons();
            for (var i = 0; i < selectedIcons.length; i++) {
                var covericon = Ti.UI.createImageView({
                    height: "25dp",
                    width: "25dp",
                    left: "0dp",
                    top: "10dp",
                    image: "/images/" + selectedIcons[i].icon
                });
                $.iconrow.add(covericon);
            }
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showIcons");
        }
    }
    function getIcons() {
        try {
            var id = trailId;
            var infotrailCollection = Alloy.Collections.infospotModel;
            infotrailCollection.fetch({
                query: 'SELECT icon from infospotModel join infospot_trailsModel on infospot_trailsModel.infospotID = infospotModel.id where trailsID ="' + id + '"'
            });
            var infoTrails = infotrailCollection.toJSON();
            return infoTrails;
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - getIcons");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "trailDetail";
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
    Alloy.Collections.instance("mediaModel");
    Alloy.Collections.instance("hotspotModel");
    Alloy.Collections.instance("infospotModel");
    $.__views.hikeDetailWin = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        navBarHidden: "false",
        top: 0,
        id: "hikeDetailWin"
    });
    $.__views.hikeDetailWin && $.addTopLevelView($.__views.hikeDetailWin);
    $.__views.__alloyId56 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "white",
        scrollType: "vertical",
        id: "__alloyId56"
    });
    $.__views.hikeDetailWin.add($.__views.__alloyId56);
    $.__views.slideView = Ti.UI.createView({
        backgroundColor: "#000000",
        height: Titanium.UI.SIZE,
        width: "100%",
        layout: "vertical",
        id: "slideView"
    });
    $.__views.__alloyId56.add($.__views.slideView);
    var __alloyId57 = [];
    $.__views.slideShowTrails = Ti.UI.createScrollableView({
        top: "10dp",
        width: "296dp",
        height: "235dp",
        backgroundColor: "black",
        views: __alloyId57,
        id: "slideShowTrails",
        scrollType: "horizontal",
        showPagingControl: "true"
    });
    $.__views.slideView.add($.__views.slideShowTrails);
    $.__views.horizontalView = Ti.UI.createView({
        layout: "horizontal",
        height: "40dp",
        width: "100%",
        id: "horizontalView"
    });
    $.__views.__alloyId56.add($.__views.horizontalView);
    $.__views.iconrow = Ti.UI.createView({
        layout: "horizontal",
        height: "40dp",
        left: "10dp",
        width: "47%",
        id: "iconrow"
    });
    $.__views.horizontalView.add($.__views.iconrow);
    $.__views.btnView = Ti.UI.createView({
        width: "47%",
        height: "40dp",
        right: 0,
        id: "btnView"
    });
    $.__views.horizontalView.add($.__views.btnView);
    $.__views.btnTrailOnMap = Ti.UI.createButton({
        right: 0,
        width: Titanium.UI.SIZE,
        title: "Visa leden på kartan!",
        id: "btnTrailOnMap"
    });
    $.__views.btnView.add($.__views.btnTrailOnMap);
    zoomMapTrail ? $.__views.btnTrailOnMap.addEventListener("click", zoomMapTrail) : __defers["$.__views.btnTrailOnMap!click!zoomMapTrail"] = true;
    $.__views.__alloyId58 = Ti.UI.createView({
        layout: "vertical",
        right: "10dp",
        top: "5dp",
        height: Titanium.UI.SIZE,
        fontFamily: "Gotham Rounded",
        id: "__alloyId58"
    });
    $.__views.__alloyId56.add($.__views.__alloyId58);
    $.__views.lblTrailName = Ti.UI.createLabel({
        left: "15dp",
        font: {
            fontSize: 16,
            fontFamily: "Gotham Rounded"
        },
        color: "#FF9966",
        id: "lblTrailName"
    });
    $.__views.__alloyId58.add($.__views.lblTrailName);
    $.__views.lblTrailArea = Ti.UI.createLabel({
        left: "15dp",
        font: {
            fontSize: 12,
            fontFamily: "Gotham Rounded"
        },
        id: "lblTrailArea"
    });
    $.__views.__alloyId58.add($.__views.lblTrailArea);
    $.__views.lblTrailLength = Ti.UI.createLabel({
        left: "15dp",
        font: {
            fontSize: 12,
            fontStyle: "Italic",
            fontFamily: "Gotham Rounded"
        },
        top: "10dp",
        id: "lblTrailLength"
    });
    $.__views.__alloyId58.add($.__views.lblTrailLength);
    $.__views.lblTrailInfo = Ti.UI.createLabel({
        left: "15dp",
        font: {
            fontSize: 12,
            fontFamily: "Gotham Rounded"
        },
        top: "10dp",
        id: "lblTrailInfo"
    });
    $.__views.__alloyId58.add($.__views.lblTrailInfo);
    $.__views.lblLangsVagen = Ti.UI.createLabel({
        left: "10dp",
        font: {
            fontSize: 13,
            fontFamily: "Gotham Rounded"
        },
        top: "10dp",
        text: "Det här kan du se längs vägen:",
        id: "lblLangsVagen"
    });
    $.__views.__alloyId56.add($.__views.lblLangsVagen);
    $.__views.trail_hotspotView = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "white",
        borderColor: "#e8e8e8",
        borderWidth: "1dp",
        top: 0,
        height: Titanium.UI.SIZE,
        id: "trail_hotspotView"
    });
    $.__views.__alloyId56.add($.__views.trail_hotspotView);
    $.__views.hotspotTable = Ti.UI.createTableView({
        height: Titanium.UI.SIZE,
        footerTitle: "",
        id: "hotspotTable"
    });
    $.__views.trail_hotspotView.add($.__views.hotspotTable);
    showHotspot ? $.__views.hotspotTable.addEventListener("click", showHotspot) : __defers["$.__views.hotspotTable!click!showHotspot"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    try {
        $.hikeDetailWin.title = args.title;
        $.lblTrailName.text = args.title || "Default Name";
        $.lblTrailLength.text = args.length + " kilometer" || "Default Length";
        $.lblTrailArea.text = args.area || "Default Color";
        $.lblTrailInfo.text = args.infoTxt || "Default infoText";
        var trailId = args.id;
        globalTrailID = trailId;
    } catch (e) {
        newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - set labels");
    }
    selectTrailPics();
    showHotspots();
    showIcons();
    __defers["$.__views.btnTrailOnMap!click!zoomMapTrail"] && $.__views.btnTrailOnMap.addEventListener("click", zoomMapTrail);
    __defers["$.__views.hotspotTable!click!showHotspot"] && $.__views.hotspotTable.addEventListener("click", showHotspot);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;