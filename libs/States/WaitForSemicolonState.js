var State = require('./State.js');

var WaitForSemicolonState = function WaitForSemicolonState(stringsParser) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._ignored = [' ', '\n', '\t', '\r'];
};

WaitForSemicolonState.prototype = {
    handle:function handle(c, callback) {
        var InitState = require('./InitState.js');

        var IgnoreAction = require('../Actions/IgnoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (c === ';') {
            callback(null, new ChangeStateAction(new InitState(self._stringsParser)));
        } else if (self._ignored.indexOf(c) >= 0) {
            callback(null, new IgnoreAction());
        } else {
            callback('Character must be ";" or whitespaces (\\n,\\r,\\t, )');
        }
    }
};

module.exports = WaitForSemicolonState;
