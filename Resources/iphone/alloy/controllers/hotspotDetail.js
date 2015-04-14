function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setPics() {
        try {
            selectHotspotPics();
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - setPics");
        }
    }
    function selectHotspotPics() {
        try {
            Ti.API.info("id : " + hotspotId);
            var mediaCollection = getMediaCollection();
            mediaCollection.fetch({
                query: 'SELECT * FROM mediaModel WHERE hotspot_id = "' + hotspotId + '"'
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
                $.slideShowHotspotDetail.addView(backgroundView);
            }
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - selectHotspotPics");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hotspotDetail";
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
    Alloy.Collections.instance("mediaModel");
    $.__views.hotspotDetail = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        top: 0,
        height: "100%",
        id: "hotspotDetail"
    });
    $.__views.hotspotDetail && $.addTopLevelView($.__views.hotspotDetail);
    $.__views.__alloyId8 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "white",
        scrollType: "vertical",
        id: "__alloyId8"
    });
    $.__views.hotspotDetail.add($.__views.__alloyId8);
    $.__views.slideView = Ti.UI.createView({
        backgroundColor: "#000000",
        height: Titanium.UI.SIZE,
        width: "100%",
        layout: "vertical",
        id: "slideView"
    });
    $.__views.__alloyId8.add($.__views.slideView);
    var __alloyId9 = [];
    $.__views.slideShowHotspotDetail = Ti.UI.createScrollableView({
        top: "10dp",
        width: "300dp",
        height: "235dp",
        backgroundColor: "black",
        views: __alloyId9,
        id: "slideShowHotspotDetail",
        showPagingControl: "true"
    });
    $.__views.slideView.add($.__views.slideShowHotspotDetail);
    $.__views.lblHotspotName = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: 14,
            fontFamily: "Gotham Rounded"
        },
        id: "lblHotspotName"
    });
    $.__views.__alloyId8.add($.__views.lblHotspotName);
    $.__views.lblHotspotInfoTxt = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: 12,
            fontFamily: "Gotham Rounded"
        },
        id: "lblHotspotInfoTxt"
    });
    $.__views.__alloyId8.add($.__views.lblHotspotInfoTxt);
    $.__views.lblTest = Ti.UI.createLabel({
        left: 10,
        font: {
            fontSize: 12,
            fontFamily: "Gotham Rounded"
        },
        id: "lblTest"
    });
    $.__views.__alloyId8.add($.__views.lblTest);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.lblHotspotName.text = args.title || "Name";
    $.lblHotspotInfoTxt.text = args.infoTxt || "Info";
    var hotspotId = args.id || "Id";
    args.filename || "filename";
    setPics();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;