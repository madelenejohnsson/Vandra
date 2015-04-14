function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setRoutes() {
        try {
            trailsCollection.fetch({
                query: "SELECT id, name, color FROM trailsModel"
            });
            var jsonObj = trailsCollection.toJSON();
            for (var i = 0; i < jsonObj.length; i++) {
                var file = getFile(jsonObj[i].id);
                for (var u = 0; u < file.length; u++) createMapRoutes(file[u].filename, jsonObj[i].name, jsonObj[i].color);
            }
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - getInfoDetails");
        }
    }
    function getFile(id) {
        try {
            jsonFileCollection.fetch({
                query: 'SELECT filename FROM jsonFilesModel WHERE trailID ="' + id + '"'
            });
            var filename = jsonFileCollection.toJSON();
            return filename;
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - getFile");
        }
    }
    function createMapRoutes(file, name, color) {
        try {
            var routes = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/routes/" + file).read().text;
            var parsedRoute = JSON.parse(routes);
            var geoArray = [];
            geoArray.push(parsedRoute);
            for (var u = 0; u < geoArray.length; u++) {
                var coords = geoArray[0].features[0].geometry.paths[u];
                var points = new Array();
                for (var i = 0; i < coords.length; i++) {
                    var c = {
                        latitude: coords[i][1],
                        longitude: coords[i][0]
                    };
                    points.push(c);
                }
                var route = {
                    name: name,
                    points: points,
                    color: color,
                    width: 2
                };
                baseMap.addRoute(MapModule.createRoute(route));
            }
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - createMapRoutes");
        }
    }
    function showMap() {
        try {
            baseMap = MapModule.createView({
                userLocation: true,
                mapType: MapModule.HYBRID_TYPE,
                animate: true,
                region: {
                    latitude: 58.893539,
                    longitude: 11.012579,
                    latitudeDelta: .08,
                    longitudeDelta: .08
                },
                height: "90%",
                width: Ti.UI.FILL
            });
            $.mapView.add(baseMap);
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "Map - showMap");
        }
    }
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
                    rightButton: "/pins/arrow.png",
                    name: "trail",
                    font: {
                        fontFamily: "Gotham Rounded"
                    }
                });
                baseMap.addAnnotation(markerAnnotation);
            }
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - displayTrailMarkers");
        }
    }
    function showTrail(myId) {
        try {
            trailsCollection.fetch({
                query: 'SELECT * FROM trailsModel where name ="' + myId + '"'
            });
            var jsonObjTr = trailsCollection.toJSON();
            var args = {
                id: jsonObjTr[0].id,
                title: myId,
                length: jsonObjTr[0].length,
                infoTxt: jsonObjTr[0].infoTxt,
                area: jsonObjTr[0].area,
                color: jsonObjTr[0].color,
                zoomlat: jsonObjTr[0].zoomLat,
                zoomlon: jsonObjTr[0].zoomLon
            };
            var trailDetail = Alloy.createController("trailDetail", args).getView();
            Alloy.CFG.tabs.activeTab.open(trailDetail);
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - showTrail");
        }
    }
    function showHotspot(myId) {
        try {
            hotspotCollection.fetch({
                query: 'SELECT id, infoTxt FROM hotspotModel where name = "' + myId + '"'
            });
            var jsonObjHot = hotspotCollection.toJSON();
            var hotspotTxt = {
                title: myId,
                infoTxt: jsonObjHot[0].infoTxt,
                id: jsonObjHot[0].id
            };
            var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
            Alloy.CFG.tabs.activeTab.open(hotspotDetail);
        } catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "map - showHotspot");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
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
    Alloy.Collections.instance("hotspotModel");
    Alloy.Collections.instance("coordinates");
    Alloy.Collections.instance("trailsModel");
    Alloy.Collections.instance("jsonFilesModel");
    Alloy.Collections.instance("infospotModel");
    $.__views.map = Ti.UI.createView({
        layout: "vertical",
        id: "map"
    });
    $.__views.map && $.addTopLevelView($.__views.map);
    $.__views.mapView = Ti.UI.createView({
        height: "90%",
        width: "100%",
        id: "mapView"
    });
    $.__views.map.add($.__views.mapView);
    $.__views.__alloyId35 = Alloy.createWidget("mapmenu", "widget", {
        id: "__alloyId35",
        __parentSymbol: $.__views.map
    });
    $.__views.__alloyId35.setParent($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.name;
    args.color;
    args.zoomlat;
    var MapModule = require("ti.map");
    var trailsCollection = getTrailsCollection();
    var hotspotCollection = getHotspotCollection();
    var jsonFileCollection = getJSONfiles();
    showMap();
    setRoutes();
    displayTrailMarkers();
    baseMap.addEventListener("click", function(evt) {
        "rightButton" == evt.clicksource && ("hotspot" == evt.annotation.name ? showHotspot(evt.annotation.id) : showTrail(evt.annotation.id));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;