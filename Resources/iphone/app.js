function getHotspotCollection() {
    var hotspotCollection = Alloy.Collections.hotspotModel;
    return hotspotCollection;
}

function getMediaCollection() {
    var mediaCollection = Alloy.Collections.mediaModel;
    return mediaCollection;
}

function getTrailsCollection() {
    var trailCollection = Alloy.Collections.trailsModel;
    return trailCollection;
}

function getInfoCollection() {
    var infoCollection = Alloy.Collections.infoModel;
    return infoCollection;
}

function getJSONfiles() {
    var jsonFileCollection = Alloy.Collections.jsonFilesModel;
    return jsonFileCollection;
}

function getInfospotCollection() {
    var infospotCollection = Alloy.Collections.infospotModel;
    return infospotCollection;
}

function newError(errorMsg, pageName) {
    try {
        var er = new Error(errorMsg);
        er.myObject = pageName;
        throw er;
    } catch (e) {
        alert("Error:[" + e.message + "] has occured on " + e.myObject + " page.");
    }
}

function showDialog() {
    var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: [ "OK", "Cancel" ],
        message: "Gå till nästa fråga?",
        title: "Bokstav i närheten!"
    });
    dialog.addEventListener("click", function(e) {
        if (e.index === e.source.cancel) ; else {
            var interactiveWin = Alloy.createController("interactive").getView();
            Alloy.CFG.tabs.activeTab.open(interactiveWin);
        }
    });
    dialog.show();
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var baseMap;

var gLat = 0;

var gLon = 0;

var lettersArray = [];

var word = "KOSTERHAVET";

var globalTrailID = 0;

Alloy.createController("index");