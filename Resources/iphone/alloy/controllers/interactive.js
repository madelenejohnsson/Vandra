function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openNextQuestion() {
        try {} catch (e) {
            newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - openQuiz");
        }
    }
    function getClue(id) {
        var clueCollection = Alloy.Collections.gameLetterModel;
        clueCollection.fetch({
            query: 'SELECT infoText from gameLetterModel where id ="' + id + '"'
        });
        var jsonObj = clueCollection.toJSON();
        var txt = jsonObj[0].infoText;
        var returnclue = JSON.stringify(txt);
        return returnclue;
    }
    function showAlert() {
        var dialog;
        $.lblSavedLetters.text = "";
        dialog = Ti.UI.createAlertDialog({
            title: getClue(1),
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "OK", "stäng" ]
        });
        dialog.addEventListener("click", function(e) {
            if ("" == e.text) {
                alert("Fyll i den bokstav du hittat");
                dialog.show();
            }
            if (e.text.length > 1) {
                alert("Du får enbart fylla i en bokstav");
                dialog.show();
            } else {
                lettersArray.push(e.text);
                for (var i = 0; i < lettersArray.length; i++) $.lblSavedLetters.text += lettersArray[i];
            }
        });
        dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "interactive";
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
    $.__views.quizQuestion = Ti.UI.createWindow({
        backgroundColor: "#fff3e5",
        layout: "vertical",
        id: "quizQuestion"
    });
    $.__views.quizQuestion && $.addTopLevelView($.__views.quizQuestion);
    $.__views.__alloyId24 = Ti.UI.createScrollView({
        scrollType: "vertical",
        id: "__alloyId24"
    });
    $.__views.quizQuestion.add($.__views.__alloyId24);
    $.__views.ViewClue = Ti.UI.createView({
        layout: "vertical",
        id: "ViewClue"
    });
    $.__views.__alloyId24.add($.__views.ViewClue);
    $.__views.lblClue = Ti.UI.createLabel({
        layout: "vertical",
        right: 20,
        left: 20,
        top: 30,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "lblClue"
    });
    $.__views.ViewClue.add($.__views.lblClue);
    $.__views.btnNext = Ti.UI.createButton({
        title: "Nästa fråga",
        id: "btnNext"
    });
    $.__views.ViewClue.add($.__views.btnNext);
    getClue ? $.__views.btnNext.addEventListener("click", getClue) : __defers["$.__views.btnNext!click!getClue"] = true;
    $.__views.ViewChooseLetter = Ti.UI.createView({
        layout: "vertical",
        top: 200,
        id: "ViewChooseLetter"
    });
    $.__views.__alloyId24.add($.__views.ViewChooseLetter);
    $.__views.lblInfo = Ti.UI.createLabel({
        font: {
            fontSize: 12,
            fontStyle: "italic"
        },
        right: 20,
        left: 20,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: 25,
        text: "Nedan kan du se de bokstäver du hittat än så länge:",
        id: "lblInfo"
    });
    $.__views.ViewChooseLetter.add($.__views.lblInfo);
    $.__views.lblSavedLetters = Ti.UI.createLabel({
        id: "lblSavedLetters"
    });
    $.__views.ViewChooseLetter.add($.__views.lblSavedLetters);
    $.__views.word = Ti.UI.createTextField({
        borderColor: "#000",
        width: 100,
        height: 60,
        id: "word"
    });
    $.__views.ViewChooseLetter.add($.__views.word);
    $.__views.btnCheckWord = Ti.UI.createButton({
        title: "Rätta!",
        id: "btnCheckWord"
    });
    $.__views.ViewChooseLetter.add($.__views.btnCheckWord);
    showAlert ? $.__views.btnCheckWord.addEventListener("click", showAlert) : __defers["$.__views.btnCheckWord!click!showAlert"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openNextQuestion = openNextQuestion;
    __defers["$.__views.btnNext!click!getClue"] && $.__views.btnNext.addEventListener("click", getClue);
    __defers["$.__views.btnCheckWord!click!showAlert"] && $.__views.btnCheckWord.addEventListener("click", showAlert);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;