var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "hotspot_trailsModel",
            db_file: "/dbKostervandring.sqlite"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("hotspot_trailsModel", exports.definition, []);

collection = Alloy.C("hotspot_trailsModel", exports.definition, model);

exports.Model = model;

exports.Collection = collection;