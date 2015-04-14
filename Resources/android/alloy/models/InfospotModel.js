var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "InfospotModel",
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

model = Alloy.M("infospotModel", exports.definition, []);

collection = Alloy.C("infospotModel", exports.definition, model);

exports.Model = model;

exports.Collection = collection;