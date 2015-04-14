var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "gameLetterModel",
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

model = Alloy.M("gameLetterModel", exports.definition, []);

collection = Alloy.C("gameLetterModel", exports.definition, model);

exports.Model = model;

exports.Collection = collection;