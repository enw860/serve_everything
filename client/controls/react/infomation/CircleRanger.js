import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import "../../style/toolkit/ranger.less";
import "../../style/style.less";

/*
* @instance
* @desc: CircleRanger - a componect using to display percentage in a circle
* @params: {integer} minRange: (Optional) Minium range value
* @params: {integer} maxRange: (Optional)  Minium range value
* @params: {integer} radius, (Optional) Radius of the circle ranger
* @params: {string} borderColor, (Optional) Border color
* @params: {integer} borderWidth, (Optional) Border width
* @params: {integer} thumbRadius, (Optional) Thumb radius
* @params: {string} thumbColor, (Optional) Thumb bckground color
* @params: {string} thumbIcon, (Optional) Thumb Icon
* @params: {boolean} muteRanger, (Optional) Disable dragging effect on the thumb
* @params: {boolean} hideThumb, (Optional) Not showing thumb
*/
export default class CircleRanger extends Component {
    // input props type check
    static propTypes = {
        minRange: PropTypes.number,
        maxRange: PropTypes.number,
        value: PropTypes.number,
        radius: PropTypes.number,
        borderColor: PropTypes.string,
        borderWidth: PropTypes.number,
        thumbRadius: PropTypes.number,
        thumbColor: PropTypes.string,
        thumbIcon: PropTypes.string,
        muteRanger: PropTypes.bool,
        hideThumb: PropTypes.bool
    };

    // default props values
    static defaultProps = {
        minRange: 0,
        maxRange: 100,
        value: 0,
        radius: 100,
        borderColor: "#000000",
        borderWidth: 2,
        thumbRadius: 6,
        thumbColor: "#000000",
        thumbIcon: "fa-circle",
        muteRanger: false,
        hideThumb: false
    }

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.onHold = false;

        this.rangerDown = this.rangerDown.bind(this);
        this.rangerRelease = this.rangerRelease.bind(this);
        this.dragRangerHandler = this.dragRangerHandler.bind(this);

        this._proto = {
            circlePathDef: [
                { min: -1, max: 101, inRangeAction: val => ["50% 50%", "50% 0%"], outRangeAction: () => [] },
                { min: 0, max: 12.5, inRangeAction: val => [`${50 + val * 100 / 25}% 0%`], outRangeAction: () => ["100% 0%"] },
                { min: 12.5, max: 37.5, inRangeAction: val => [`100% ${(val - 12.5) * 100 / 25}%`], outRangeAction: () => ["100% 100%"] },
                { min: 37.5, max: 62.5, inRangeAction: val => [`${100 - (val - 37.5) * 100 / 25}% 100%`], outRangeAction: () => ["0% 100%"] },
                { min: 62.5, max: 87.5, inRangeAction: val => [`0% ${100 - (val - 62.5) * 100 / 25}%`], outRangeAction: () => ["0% 0%"] },
                { min: 87.5, max: 100, inRangeAction: val => [`${(val - 87.5) * 100 / 25}% 0%`], outRangeAction: () => [] }
            ],

            buildCircleTrack: val => {
                if (val === 100) return "";

                val = val % 100;
                var { circlePathDef } = this._proto;

                var ploygonPoints = circlePathDef.reduce((points, term) => {
                    var point = (val >= term.max) ? term.outRangeAction() : (val <= term.min) ? [] : term.inRangeAction(val);
                    return point ? [...points, ...point] : points;
                }, []);

                return `polygon(${ploygonPoints.join(", ")})`;
            },

            buildTrackStyle: () => {
                var { value } = this.state;
                var { radius, borderColor, borderWidth } = this.props;
                var { buildCircleTrack } = this._proto;

                return {
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    borderRadius: "100%",
                    border: `${borderWidth}px solid ${borderColor}`,
                    clipPath: buildCircleTrack(value),
                    zIndex: 1
                };
            },

            buildThumbTrackStyle: () => {
                var { value } = this.state;
                var { radius, borderWidth, thumbRadius } = this.props;

                return {
                    left: `${radius - thumbRadius}px`,
                    width: `${thumbRadius * 2}px`,
                    height: `${radius + thumbRadius}px`,
                    top: `${0 - thumbRadius}px`,
                    transform: `rotate(${360 * value * 0.01}deg)`,
                    position: "absolute",
                    transformOrigin: "bottom center",
                    zIndex: 2
                }
            },

            buildThumbStyle: () => {
                var { thumbRadius, thumbColor } = this.props;

                return {
                    width: `${thumbRadius * 2}px`,
                    height: `${thumbRadius * 2}px`,
                    fontSize: "0.7rem",
                    color: thumbColor
                };
            },

            module: v => {
                return Math.sqrt(v.map(val => val * val).reduce((sum, val) => sum + val, 0));
            },

            dotProduct: (u, v) => {
                if (u.length !== v.length) return;

                return Array(u.length).fill(0).reduce((sum, val, index) => {
                    return sum + u[index] * v[index];
                }, 0);
            },

            radiusBetweenVectors: (u, v) => {
                if (u.length !== v.length) return;

                var { module, dotProduct } = this._proto;
                return Math.acos(dotProduct(u, v) / (module(u) * module(v)));
            },

            computeVector: (org, ref) => {
                if (org.length !== ref.length) return;
                return org.map((val, index) => val - ref[index]);
            },

            getPoints: e => {
                var { _slider_wrapper } = this.refs;
                var { top, left, width, height } = _slider_wrapper.getBoundingClientRect();

                var center = [left + width / 2, top + height / 2];
                var start = [left + width / 2, top];
                var cursor = [e.clientX, e.clientY];

                return [center, start, cursor];
            },

            radiusToPercentageInCircle: (r, cond) => {
                var tempPercentage = 100 * r / (2 * Math.PI);
                return cond ? 100 - tempPercentage : tempPercentage;
            },

            checkValueRange: val => {
                var { minRange, maxRange } = this.props;
                return val > maxRange ? maxRange : val < minRange ? minRange : val;
            }
        };
    }

    // life cycle function, call on every updating on props
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            var state = Object.assign({}, this.state);
            state.value = this.props.value;
            this.setState(state);
        }
    }

    /**
    * @instance
    * @memberof CircleRanger
    * @method dragRangerHandler
    * @desc Change percentage on drag the ranger
    */
    dragRangerHandler(e) {
        var { getPoints, computeVector, radiusToPercentageInCircle, radiusBetweenVectors, checkValueRange } = this._proto;

        var [center, start, cursor] = getPoints(e);

        var u = computeVector(center, start);
        var v = computeVector(center, cursor);

        var radius = radiusBetweenVectors(u, v);
        var value = radiusToPercentageInCircle(radius, start[0] > cursor[0]);

        this.setState({
            ...this.state,
            value: checkValueRange(value)
        })
    }

    /**
    * @instance
    * @memberof CircleRanger
    * @method rangerDown
    * @desc Listening on ranger down event
    */
    rangerDown() {
        if (this.props.muteRanger) return;

        if (!this.onHold) {
            this.onHold = true;
            document.addEventListener('mousemove', this.dragRangerHandler);
        }
    }

    /**
    * @instance
    * @memberof CircleRanger
    * @method rangerRelease
    * @desc Release dragging the ranger
    */
    rangerRelease() {
        if (this.props.muteRanger) return;

        if (this.onHold) {
            this.onHold = false;
            document.removeEventListener('mousemove', this.dragRangerHandler);
        }
    }

    /**
    * @instance
    * @memberof CircleRanger
    * @method getPercentage
    * @desc Output the ranger selected percentage
    */
    getPercentage() {
        return this.state.value;
    }

    render() {
        var { thumbIcon, hideThumb, muteRanger } = this.props;

        return (
            <div className="HLayout flow-center align-center">
                <div ref="_slider_wrapper" style={this._proto.buildTrackStyle()}></div>
                {!hideThumb && <div className="VLayout flow-between" style={this._proto.buildThumbTrackStyle()} onMouseDown={this.rangerDown} onMouseUp={this.rangerRelease}>
                    <div className={"HLayout flow-center align-center" + muteRanger ? "" : "ranger-thumb"} style={this._proto.buildThumbStyle()}>
                        <i className={`fa fa-xs ${thumbIcon}`} />
                    </div>
                </div>}
            </div>
        )
    }
}
