function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function toMap() {
        var mapWind = Alloy.createController("map").getView();
        $.mapWin.add(mapWind);
    }
    function toQuiz() {
        var quizDetail = Alloy.createController("quizDetail").getView();
        $.quizWin.add(quizDetail);
    }
    function toTrails() {
        var trails = Alloy.createController("trails").getView();
        $.hikeWin.add(trails);
    }
    function toInfo() {
        var info = Alloy.createController("infoList").getView();
        $.infoWin.add(info);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    Alloy.Collections.instance("hotspotModel");
    var __alloyId12 = [];
    $.__views.koster = Ti.UI.createWindow({
        layout: "vertical",
        height: "100%",
        id: "koster",
        backgroundImage: "/pics/front.png",
        navBarHidden: "true"
    });
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "transparent",
        height: "93%",
        id: "__alloyId13"
    });
    $.__views.koster.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createImageView({
        top: "20dp",
        center: "50%",
        height: "90dp",
        width: Titanium.UI.SIZE,
        image: "/pics/kosterhavet_logga.png",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.koster = Ti.UI.createTab({
        window: $.__views.koster,
        id: "koster",
        title: "Hem",
        icon: "/images/kosterStarMenu.png"
    });
    __alloyId12.push($.__views.koster);
    $.__views.hikeWin = Ti.UI.createWindow({
        id: "hikeWin",
        title: "Vandringsleder"
    });
    toTrails ? $.__views.hikeWin.addEventListener("open", toTrails) : __defers["$.__views.hikeWin!open!toTrails"] = true;
    $.__views.hikeTab = Ti.UI.createTab({
        window: $.__views.hikeWin,
        id: "hikeTab",
        title: "Vandra",
        icon: "/images/hikeMenu.png"
    });
    __alloyId12.push($.__views.hikeTab);
    $.__views.mapWin = Ti.UI.createWindow({
        id: "mapWin",
        navBarHidden: "true"
    });
    toMap ? $.__views.mapWin.addEventListener("open", toMap) : __defers["$.__views.mapWin!open!toMap"] = true;
    $.__views.maptab = Ti.UI.createTab({
        window: $.__views.mapWin,
        id: "maptab",
        title: "Karta",
        icon: "/images/mapMenu.png"
    });
    __alloyId12.push($.__views.maptab);
    $.__views.quizWin = Ti.UI.createWindow({
        id: "quizWin"
    });
    toQuiz ? $.__views.quizWin.addEventListener("open", toQuiz) : __defers["$.__views.quizWin!open!toQuiz"] = true;
    $.__views.quiz = Ti.UI.createTab({
        window: $.__views.quizWin,
        id: "quiz",
        title: "Quiz",
        icon: "/images/quizMenu.png"
    });
    __alloyId12.push($.__views.quiz);
    $.__views.infoWin = Ti.UI.createWindow({
        id: "infoWin",
        title: "Information"
    });
    toInfo ? $.__views.infoWin.addEventListener("open", toInfo) : __defers["$.__views.infoWin!open!toInfo"] = true;
    $.__views.info = Ti.UI.createTab({
        window: $.__views.infoWin,
        id: "info",
        title: "Info",
        icon: "/images/infoMenu.png"
    });
    __alloyId12.push($.__views.info);
    $.__views.tabs = Ti.UI.createTabGroup({
        tabs: __alloyId12,
        id: "tabs",
        backgroundColor: "#fff",
        height: "100%",
        tintColor: "#FF9966"
    });
    $.__views.tabs && $.addTopLevelView($.__views.tabs);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabs.open();
    Alloy.CFG.tabs = $.tabs;
    exports.toQuiz = toQuiz;
    __defers["$.__views.hikeWin!open!toTrails"] && $.__views.hikeWin.addEventListener("open", toTrails);
    __defers["$.__views.mapWin!open!toMap"] && $.__views.mapWin.addEventListener("open", toMap);
    __defers["$.__views.quizWin!open!toQuiz"] && $.__views.quizWin.addEventListener("open", toQuiz);
    __defers["$.__views.infoWin!open!toInfo"] && $.__views.infoWin.addEventListener("open", toInfo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;