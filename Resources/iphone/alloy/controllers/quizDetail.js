function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openInteractive() {
        var interactiveWin = Alloy.createController("interactive").getView();
        Alloy.CFG.tabs.activeTab.open(interactiveWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "quizDetail";
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
    Alloy.Collections.instance("gameLetterModel");
    $.__views.quizDetail = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        backgroundColor: "#fff3e5",
        id: "quizDetail"
    });
    $.__views.quizDetail && $.addTopLevelView($.__views.quizDetail);
    $.__views.__alloyId49 = Ti.UI.createScrollView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        showHorizontalScrollIndicator: true,
        scrollType: "vertical",
        id: "__alloyId49"
    });
    $.__views.quizDetail.add($.__views.__alloyId49);
    $.__views.spela = Ti.UI.createView({
        layout: "vertical",
        top: "20%",
        id: "spela"
    });
    $.__views.__alloyId49.add($.__views.spela);
    $.__views.lblValkommen = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        left: 10,
        color: "#FF9966",
        text: "Välkommen till Kosterhavets bokstavsjakt!",
        id: "lblValkommen"
    });
    $.__views.spela.add($.__views.lblValkommen);
    $.__views.lblInfoQuiz = Ti.UI.createLabel({
        font: {
            fontSize: 12,
            fontStyle: "italic"
        },
        right: 20,
        left: 10,
        top: 25,
        text: "För att delta i bokstavsjakten ska du starta vid naturum och sedan vandra längst familjeleden. Under vandringen kommer det plinga till när ni närmar er en bokstav och ni kommer få en ledtråd där ni kan htta bokstaven så glöm inte att godkänna Locations. Det finns 8 bokstäver att finna se till och hitta dem alla och klura ut ordet i slutet så får ni en present på naturum. Lycka till!",
        id: "lblInfoQuiz"
    });
    $.__views.spela.add($.__views.lblInfoQuiz);
    $.__views.startInteractive = Ti.UI.createButton({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        top: 20,
        radius: 30,
        title: "Klicka här för att starta bokstavsjakten!",
        id: "startInteractive"
    });
    $.__views.spela.add($.__views.startInteractive);
    openInteractive ? $.__views.startInteractive.addEventListener("click", openInteractive) : __defers["$.__views.startInteractive!click!openInteractive"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openInteractive = openInteractive;
    __defers["$.__views.startInteractive!click!openInteractive"] && $.__views.startInteractive.addEventListener("click", openInteractive);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;