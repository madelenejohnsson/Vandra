function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openLink(link) {
        try {
            var webview = Titanium.UI.createWebView({
                url: link
            });
            var window = Titanium.UI.createWindow();
            window.add(webview);
            Alloy.CFG.tabs.activeTab.open(window);
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "infoDetail - openLink");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "infoDetail";
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
    $.__views.infoDetail = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        top: 0,
        height: "100%",
        id: "infoDetail"
    });
    $.__views.infoDetail && $.addTopLevelView($.__views.infoDetail);
    $.__views.__alloyId15 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "white",
        scrollType: "vertical",
        showVerticalScrollIndicator: "true",
        id: "__alloyId15"
    });
    $.__views.infoDetail.add($.__views.__alloyId15);
    $.__views.slideView = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "225dp",
        width: "100%",
        id: "slideView"
    });
    $.__views.__alloyId15.add($.__views.slideView);
    $.__views.infoImg = Ti.UI.createImageView({
        width: "300dp",
        height: "200dp",
        id: "infoImg"
    });
    $.__views.slideView.add($.__views.infoImg);
    $.__views.lblInfoTitle = Ti.UI.createLabel({
        top: 10,
        left: 10,
        right: 10,
        font: {
            fontSize: 16,
            fontFamily: "Gotham Rounded"
        },
        color: "#FF9966",
        id: "lblInfoTitle"
    });
    $.__views.__alloyId15.add($.__views.lblInfoTitle);
    $.__views.lblInfoText = Ti.UI.createLabel({
        top: "5dp",
        left: 10,
        right: 10,
        font: {
            fontSize: 12,
            fontFamily: "Gotham Rounded"
        },
        id: "lblInfoText"
    });
    $.__views.__alloyId15.add($.__views.lblInfoText);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        top: "5dp",
        left: 10,
        right: 10,
        font: {
            fontSize: 12,
            fontFamily: "Gotham Rounded"
        },
        text: "Gå till websida: ",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.lblInfoLink = Ti.UI.createLabel({
        top: "0dp",
        left: "10dp",
        right: 10,
        font: {
            fontSize: 12,
            fontFamily: "Gotham Rounded"
        },
        id: "lblInfoLink"
    });
    $.__views.__alloyId15.add($.__views.lblInfoLink);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    try {
        $.lblInfoTitle.text = args.name || "Title";
        $.lblInfoText.text = args.infoTxt || "Info";
        $.lblInfoLink.text = args.desc || "url";
        $.infoImg.image = "/pics/" + args.img;
        {
            args.id;
        }
        var url = args.link;
        var link = $.lblInfoLink;
        link.addEventListener("click", function() {
            openLink(url);
        });
    } catch (e) {
        newError("Något gick fel när sidan skulle laddas, prova igen!", "infoDetail - load data into labels");
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;