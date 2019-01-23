'use strict';

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Ripple = /** @class */ (function (_super) {
    __extends(Ripple, _super);
    function Ripple(props) {
        var _this = _super.call(this, props) || this;
        _this.showEvents = ['mousedown', 'mousemove', 'touchstart', 'touchmove'];
        _this.hideEvents = ['animationend', 'mouseup', 'touchend'];
        _this.state = {
            hidden: true,
            animating: false,
            animation: 'rippleFadeIn',
            drag: false,
            removeOnMouseUp: false,
            x: 0,
            y: 0
        };
        _this.showRipple = _this.showRipple.bind(_this);
        _this.hideRipple = _this.hideRipple.bind(_this);
        return _this;
    }
    Ripple.prototype.getPointer = function () {
        var _a = this.props, scope = _a.scope, children = _a.children;
        return children ? this.pointer : scope;
    };
    Ripple.prototype.injectKeyFrames = function () {
        var newStyleSheet = document.createElement('style');
        var keyframes = "@keyframes rippleFadeIn {\n      from {\n        transform: scale(0.8);\n        opacity: 0.2;\n      }\n      to {\n        transform: scale(1);\n        opacity: 0.6;\n      }\n    }\n\n    @keyframes fadeOut {\n      from {\n        transform: scale(1);\n        opacity: 0.6;\n      }\n      to {\n        transform: scale(1);\n        opacity: 0.2;\n      }\n    }\n    ";
        newStyleSheet.innerHTML = keyframes;
        document.body.prepend(newStyleSheet);
    };
    Ripple.prototype.componentDidMount = function () {
        this.injectKeyFrames();
        this.addEventListener();
    };
    Ripple.prototype.componentWillUnmount = function () {
        this.removeEventListener();
    };
    Ripple.prototype.addEventListener = function () {
        var _this = this;
        var pointer = this.getPointer();
        this.showEvents.forEach(function (event) { return pointer.addEventListener(event, _this.showRipple); });
        this.hideEvents.forEach(function (event) { return pointer.addEventListener(event, _this.hideRipple); });
    };
    Ripple.prototype.removeEventListener = function () {
        var _this = this;
        var pointer = this.getPointer();
        this.showEvents.forEach(function (event) { return pointer.removeEventListener(event, _this.showRipple); });
        this.hideEvents.forEach(function (event) { return pointer.removeEventListener(event, _this.hideRipple); });
    };
    Ripple.prototype.showRipple = function (e) {
        var _a = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e, pageX = _a.pageX, pageY = _a.pageY;
        if (e.type === 'mousemove' || e.type === 'touchmove') {
            this.state.drag && this.setState({ x: pageX, y: pageY });
        }
        else {
            this.setState({ drag: true, animating: true, hidden: false, animation: 'rippleFadeIn', x: pageX, y: pageY });
        }
    };
    Ripple.prototype.hideRipple = function (e) {
        if (e.type === 'animationend' && e.animationName === 'rippleFadeIn' && !this.state.drag) {
            this.setState({ hidden: false, drag: false, animating: true, animation: 'fadeOut' });
        }
        else if (e.type === 'animationend' && e.animationName === 'fadeOut') {
            this.setState({ hidden: true, animating: false, animation: 'rippleFadeIn', removeOnMouseUp: false });
        }
        else if ((e.type === 'mouseup' || e.type === 'touchend') && !this.state.animating) {
            this.setState({ hidden: true, drag: false, animating: false });
        }
        else if (e.type === 'animationend' && e.animationName === 'rippleFadeIn' && this.state.drag) {
            this.setState({ removeOnMouseUp: true });
        }
        else if ((e.type === 'mouseup' || e.type === 'touchend') && this.state.removeOnMouseUp) {
            this.setState({ hidden: false, drag: false, animating: true, animation: 'fadeOut' });
        }
        else if (e.type === 'mouseup' || e.type === 'touchend') {
            this.setState({ drag: false });
        }
    };
    Ripple.prototype.render = function () {
        var _this = this;
        var _a = this.state, hidden = _a.hidden, x = _a.x, y = _a.y, animation = _a.animation;
        var _b = this.props, children = _b.children, size = _b.size, colour = _b.colour;
        var style = {
            display: hidden ? 'none' : 'block',
            top: y,
            left: x,
            position: 'absolute',
            width: size,
            height: size,
            background: "rgba(" + colour[0] + "," + colour[1] + "," + colour[2] + ",0.1)",
            textAlign: 'center',
            marginTop: -(size / 2),
            marginLeft: -(size / 2),
            zIndex: 999,
            borderRadius: '100%',
            border: "1.5px solid rgba(" + colour[0] + "," + colour[1] + "," + colour[2] + ",0.8)",
            animationName: animation,
            animationTimingFunction: 'ease-out',
            animationDuration: animation === 'rippleFadeIn' ? '0.1s' : '0.1s',
            animationDelay: '0.0s',
            animationIterationCount: 1,
            animationDirection: 'normal',
            animationFillMode: 'forwards',
            pointerEvents: 'none'
        };
        return (React.createElement("div", { ref: function (elem) { return _this.pointer = elem; } },
            React.createElement("span", { style: style }),
            children));
    };
    Ripple.defaultProps = {
        size: 50,
        colour: [135, 206, 250],
        scope: window
    };
    return Ripple;
}(React.Component));

module.exports = Ripple;
