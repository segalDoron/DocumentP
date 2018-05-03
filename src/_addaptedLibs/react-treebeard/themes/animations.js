'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    toggle: function toggle(_ref) {
        var toggled = _ref.node.toggled;
        return {
            animation: { rotateZ: toggled ? 90 : 0 },
            duration: 100
        };
    },
    drawer: function drawer() {
        return (/* props */{
                enter: {
                    animation: 'slideDown',
                    duration: 100
                },
                leave: {
                    animation: 'slideUp',
                    duration: 100
                }
            }
        );
    }
};