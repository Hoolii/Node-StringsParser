var State = require('./State.js');

/**
 *
 * @param stringsParser
 * @param key
 * @constructor
 */
function MultiCommentState(stringsParser, key) {
    State.apply(this);

    this._stringsParser = stringsParser;
    this._key = key || '';
}

MultiCommentState.prototype = {
    /**
     * Character handler
     *
     * @param c
     * @param callback
     */
    handle:function handle(c, callback) {
        var WaitForSlashState = require('./WaitForSlashState.js');

        var StoreAction = require('../Actions/StoreAction.js'),
            ChangeStateAction = require('../Actions/ChangeStateAction.js');

        var self = this;

        if (c === '*') {
            callback(null, new ChangeStateAction(new WaitForSlashState(self._stringsParser, self._key, c)));
        } else {
            callback(null, new StoreAction(c, self));
        }
    }
};

module.exports = MultiCommentState;
