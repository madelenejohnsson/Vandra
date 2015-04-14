function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "mapmenu/" + s : s.substring(0, index) + "/mapmenu/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "font",
    style: {
        fontFamily: "Gotham Rounded"
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "btnChange",
    style: {
        font: {
            fontSize: 12
        }
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "mapmenu",
    style: {
        layout: "vertical",
        height: "50dp"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "maptypeView",
    style: {
        layout: "horizontal",
        height: "25dp",
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "selectIconView",
    style: {
        layout: "horizontal",
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "btnView",
    style: {
        layout: "horizontal"
    }
} ];