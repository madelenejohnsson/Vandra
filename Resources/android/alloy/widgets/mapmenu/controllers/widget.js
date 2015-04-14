function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "mapmenu/" + s : s.substring(0, index) + "/mapmenu/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayTrailMarkers() {
        try {
            trailsCollection.fetch({
                query: "SELECT name, pinLon, pinLat, color FROM trailsModel"
            });
            var jsonObj = trailsCollection.toJSON();
            for (var i = 0; i < jsonObj.length; i++) {
                var markerAnnotation = MapModule.createAnnotation({
                    id: jsonObj[i].name,
                    latitude: jsonObj[i].pinLat,
                    longitude: jsonObj[i].pinLon,
                    title: jsonObj[i].name,
                    subtitle: "Läs mer om " + jsonObj[i].name + " här!",
                    rightButton: "/images/arrow.png",
                    name: "trail"
                });
                baseMap.addAnnotation(markerAnnotation);
            }
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - displayTrailMarkers");
        }
    }
    function displayMarkers() {
        try {
            var markerArray = [];
            hotspotCollection.fetch();
            var markersJSON = hotspotCollection.toJSON();
            for (var u = 0; u < markersJSON.length; u++) {
                var marker;
                var marker = MapModule.createAnnotation({
                    id: markersJSON[u].name,
                    latitude: markersJSON[u].xkoord,
                    longitude: markersJSON[u].ykoord,
                    title: markersJSON[u].name,
                    subtitle: "Läs mer om " + markersJSON[u].name + " här!",
                    pincolor: Titanium.Map.ANNOTATION_ORANGE,
                    rightButton: "/images/arrow.png",
                    name: "hotspot"
                });
                markerArray.push(marker);
            }
            baseMap.addAnnotations(markerArray);
            hotspotsNotVisible = false;
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - displayMarkers");
        }
    }
    function displayInfoSpots(type) {
        try {
            var markerArray = [];
            var infospotCollection = getInfospotCollection();
            infospotCollection.fetch({
                query: 'select infospotModel.name, infospotModel.icon, infospotCoordinatesModel.latitude, infospotCoordinatesModel.longitude from infospotCoordinatesModel join infospotModel on infospotCoordinatesModel.infospotID = infospotModel.id WHERE infospotModel.name ="' + type + '"'
            });
            var infoJSON = infospotCollection.toJSON();
            for (var u = 0; u < infoJSON.length; u++) {
                var marker = MapModule.createAnnotation({
                    latitude: infoJSON[u].latitude,
                    longitude: infoJSON[u].longitude,
                    image: "/images/map_" + infoJSON[u].icon
                });
                markerArray.push(marker);
            }
            return markerArray;
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - displayInfoSpots");
        }
    }
    function removeAnnotations() {
        baseMap.removeAllAnnotations();
    }
    function normalMap() {
        baseMap.mapType = MapModule.NORMAL_TYPE;
    }
    function hybridMap() {
        baseMap.mapType = MapModule.HYBRID_TYPE;
    }
    function satelliteMap() {
        baseMap.mapType = MapModule.SATELLITE_TYPE;
    }
    function showWC() {
        baseMap.addAnnotations(displayInfoSpots("wc"));
    }
    function showEldplats() {
        baseMap.addAnnotations(displayInfoSpots("eldplats"));
    }
    function showSnorkelled() {
        baseMap.addAnnotations(displayInfoSpots("snorkelled"));
    }
    function showInformation() {
        baseMap.addAnnotations(displayInfoSpots("information"));
    }
    function showBadplats() {
        baseMap.addAnnotations(displayInfoSpots("badplats"));
    }
    function showRastplats() {
        baseMap.addAnnotations(displayInfoSpots("rastplats"));
    }
    function showTaltplats() {
        baseMap.addAnnotations(displayInfoSpots("taltplats"));
    }
    function showUtkiksplats() {
        baseMap.addAnnotations(displayInfoSpots("utsiktsplats"));
    }
    function showTorrdass() {
        baseMap.addAnnotations(displayInfoSpots("torrdass"));
    }
    var Widget = new (require("alloy/widget"))("mapmenu");
    this.__widgetId = "mapmenu";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Widget.Collections.instance("hotspotModel");
    Widget.Collections.instance("trailsModel");
    Widget.Collections.instance("infospotModel");
    $.__views.mapmenu = Ti.UI.createView({
        layout: "vertical",
        height: "50dp",
        id: "mapmenu"
    });
    $.__views.mapmenu && $.addTopLevelView($.__views.mapmenu);
    $.__views.maptypeView = Ti.UI.createView({
        layout: "horizontal",
        height: "25dp",
        backgroundColor: "white",
        id: "maptypeView"
    });
    $.__views.mapmenu.add($.__views.maptypeView);
    $.__views.btnNormal = Ti.UI.createLabel({
        font: {
            fontSize: 12
        },
        text: "Normal",
        id: "btnNormal"
    });
    $.__views.maptypeView.add($.__views.btnNormal);
    normalMap ? $.__views.btnNormal.addEventListener("click", normalMap) : __defers["$.__views.btnNormal!click!normalMap"] = true;
    $.__views.btnHybrid = Ti.UI.createLabel({
        font: {
            fontSize: 12
        },
        text: "Hybrid",
        id: "btnHybrid"
    });
    $.__views.maptypeView.add($.__views.btnHybrid);
    hybridMap ? $.__views.btnHybrid.addEventListener("click", hybridMap) : __defers["$.__views.btnHybrid!click!hybridMap"] = true;
    $.__views.btnSatellit = Ti.UI.createLabel({
        font: {
            fontSize: 12
        },
        text: "Satellit",
        id: "btnSatellit"
    });
    $.__views.maptypeView.add($.__views.btnSatellit);
    satelliteMap ? $.__views.btnSatellit.addEventListener("click", satelliteMap) : __defers["$.__views.btnSatellit!click!satelliteMap"] = true;
    $.__views.btnShowMarkers = Ti.UI.createLabel({
        font: {
            fontSize: 12
        },
        text: "Visa leder",
        id: "btnShowMarkers"
    });
    $.__views.maptypeView.add($.__views.btnShowMarkers);
    displayTrailMarkers ? $.__views.btnShowMarkers.addEventListener("click", displayTrailMarkers) : __defers["$.__views.btnShowMarkers!click!displayTrailMarkers"] = true;
    $.__views.btnShowHotspots = Ti.UI.createLabel({
        font: {
            fontSize: 12
        },
        text: "Visa Hotspots",
        id: "btnShowHotspots"
    });
    $.__views.maptypeView.add($.__views.btnShowHotspots);
    displayMarkers ? $.__views.btnShowHotspots.addEventListener("click", displayMarkers) : __defers["$.__views.btnShowHotspots!click!displayMarkers"] = true;
    $.__views.selectIconView = Ti.UI.createView({
        layout: "horizontal",
        backgroundColor: "white",
        id: "selectIconView"
    });
    $.__views.mapmenu.add($.__views.selectIconView);
    $.__views.btnShowWC = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowWC",
        backgroundImage: "/images/wc.png"
    });
    $.__views.selectIconView.add($.__views.btnShowWC);
    showWC ? $.__views.btnShowWC.addEventListener("click", showWC) : __defers["$.__views.btnShowWC!click!showWC"] = true;
    $.__views.btnShowEldplats = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowEldplats",
        backgroundImage: "/images/eldplats.png"
    });
    $.__views.selectIconView.add($.__views.btnShowEldplats);
    showEldplats ? $.__views.btnShowEldplats.addEventListener("click", showEldplats) : __defers["$.__views.btnShowEldplats!click!showEldplats"] = true;
    $.__views.btnShowSnorkelled = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowSnorkelled",
        backgroundImage: "/images/snorkelled.png"
    });
    $.__views.selectIconView.add($.__views.btnShowSnorkelled);
    showSnorkelled ? $.__views.btnShowSnorkelled.addEventListener("click", showSnorkelled) : __defers["$.__views.btnShowSnorkelled!click!showSnorkelled"] = true;
    $.__views.btnShowInformation = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowInformation",
        backgroundImage: "/images/information.png"
    });
    $.__views.selectIconView.add($.__views.btnShowInformation);
    showInformation ? $.__views.btnShowInformation.addEventListener("click", showInformation) : __defers["$.__views.btnShowInformation!click!showInformation"] = true;
    $.__views.btnShowBadplats = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowBadplats",
        backgroundImage: "/images/badplats.png"
    });
    $.__views.selectIconView.add($.__views.btnShowBadplats);
    showBadplats ? $.__views.btnShowBadplats.addEventListener("click", showBadplats) : __defers["$.__views.btnShowBadplats!click!showBadplats"] = true;
    $.__views.btnShowRastplats = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowRastplats",
        backgroundImage: "/images/rastplats.png"
    });
    $.__views.selectIconView.add($.__views.btnShowRastplats);
    showRastplats ? $.__views.btnShowRastplats.addEventListener("click", showRastplats) : __defers["$.__views.btnShowRastplats!click!showRastplats"] = true;
    $.__views.btnShowTaltplats = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowTaltplats",
        backgroundImage: "/images/taltplats.png"
    });
    $.__views.selectIconView.add($.__views.btnShowTaltplats);
    showTaltplats ? $.__views.btnShowTaltplats.addEventListener("click", showTaltplats) : __defers["$.__views.btnShowTaltplats!click!showTaltplats"] = true;
    $.__views.btnShowUtsiktsplats = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowUtsiktsplats",
        backgroundImage: "/images/utsiktsplats.png"
    });
    $.__views.selectIconView.add($.__views.btnShowUtsiktsplats);
    showUtkiksplats ? $.__views.btnShowUtsiktsplats.addEventListener("click", showUtkiksplats) : __defers["$.__views.btnShowUtsiktsplats!click!showUtkiksplats"] = true;
    $.__views.btnShowTorrdass = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        id: "btnShowTorrdass",
        backgroundImage: "/images/torrdass.png"
    });
    $.__views.selectIconView.add($.__views.btnShowTorrdass);
    showTorrdass ? $.__views.btnShowTorrdass.addEventListener("click", showTorrdass) : __defers["$.__views.btnShowTorrdass!click!showTorrdass"] = true;
    $.__views.btnClean = Ti.UI.createButton({
        font: {
            fontSize: 12
        },
        title: "Rensa kartan",
        id: "btnClean"
    });
    $.__views.selectIconView.add($.__views.btnClean);
    removeAnnotations ? $.__views.btnClean.addEventListener("click", removeAnnotations) : __defers["$.__views.btnClean!click!removeAnnotations"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var hotspotsNotVisible = true;
    var MapModule = require("ti.map");
    var trailsCollection = getTrailsCollection();
    var hotspotCollection = getHotspotCollection();
    __defers["$.__views.btnNormal!click!normalMap"] && $.__views.btnNormal.addEventListener("click", normalMap);
    __defers["$.__views.btnHybrid!click!hybridMap"] && $.__views.btnHybrid.addEventListener("click", hybridMap);
    __defers["$.__views.btnSatellit!click!satelliteMap"] && $.__views.btnSatellit.addEventListener("click", satelliteMap);
    __defers["$.__views.btnShowMarkers!click!displayTrailMarkers"] && $.__views.btnShowMarkers.addEventListener("click", displayTrailMarkers);
    __defers["$.__views.btnShowHotspots!click!displayMarkers"] && $.__views.btnShowHotspots.addEventListener("click", displayMarkers);
    __defers["$.__views.btnShowWC!click!showWC"] && $.__views.btnShowWC.addEventListener("click", showWC);
    __defers["$.__views.btnShowEldplats!click!showEldplats"] && $.__views.btnShowEldplats.addEventListener("click", showEldplats);
    __defers["$.__views.btnShowSnorkelled!click!showSnorkelled"] && $.__views.btnShowSnorkelled.addEventListener("click", showSnorkelled);
    __defers["$.__views.btnShowInformation!click!showInformation"] && $.__views.btnShowInformation.addEventListener("click", showInformation);
    __defers["$.__views.btnShowBadplats!click!showBadplats"] && $.__views.btnShowBadplats.addEventListener("click", showBadplats);
    __defers["$.__views.btnShowRastplats!click!showRastplats"] && $.__views.btnShowRastplats.addEventListener("click", showRastplats);
    __defers["$.__views.btnShowTaltplats!click!showTaltplats"] && $.__views.btnShowTaltplats.addEventListener("click", showTaltplats);
    __defers["$.__views.btnShowUtsiktsplats!click!showUtkiksplats"] && $.__views.btnShowUtsiktsplats.addEventListener("click", showUtkiksplats);
    __defers["$.__views.btnShowTorrdass!click!showTorrdass"] && $.__views.btnShowTorrdass.addEventListener("click", showTorrdass);
    __defers["$.__views.btnClean!click!removeAnnotations"] && $.__views.btnClean.addEventListener("click", removeAnnotations);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;