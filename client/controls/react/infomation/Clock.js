import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircleRanger from "./CircleRanger";

import "../../style/style.less";
import "../../style/toolkit/infomational/Timer.less";

/*
* @instance
* @desc: Clock - a componect using to display time
* @params: {date | interger} time, (Optional) Value in ms or in date object
* @params: {interger} timezoneOffset, (Optional) Value in minutes
* @params: {integer} clockSize, (Optional) Size of the clock
* @params: {string} showingSecond, (Optional) Whether showing second arm
* @params: {string} showingDate, (Optional) Whether showing date string
* @params: {string} format, (Optional) With optional fields [dd, hh, mm, ss, ms]
* @params: {integer} mode, (Optional) Mode 0-11
*/
export default class Clock extends Component {
    // input props type check
    static propTypes = {
        time: PropTypes.any,
        timezoneOffset: PropTypes.number,
        clockSize: PropTypes.number,
        showingSecond: PropTypes.bool,
        showingDate: PropTypes.bool,
        format: PropTypes.string,
        mode: PropTypes.number
    };

    // default props values
    static defaultProps = {
        time: 0,
        timezoneOffset: 0,
        clockSize: 150,
        showingSecond: true,
        showingDate: true,
        format: "hh:mm:ss",
        mode: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            time: {},
            mode: this.props.mode
        };

        this._proto = {
            intervalDef: [
                { name: "dd", interval: 24 * 60 * 60 * 1000, minDecimal: 0 },
                { name: "hh", interval: 60 * 60 * 1000, minDecimal: 2 },
                { name: "mm", interval: 60 * 1000, minDecimal: 2 },
                { name: "ss", interval: 1000, minDecimal: 2 },
                { name: "ms", interval: 1, minDecimal: 3 }
            ],

            processTimeValue: () => {
                var { time } = Object.assign({}, this.props);

                if (time instanceof Date) {
                    return time.getTime();
                } else if (typeof (time) === "number") {
                    return time;
                } else {
                    return 0;
                }
            },

            applyTimeOffset: t => {
                var { timezoneOffset } = this.props;
                return t - timezoneOffset * 60 * 1000;
            },

            convertMS: t => {
                var { intervalDef, paddingStr } = this._proto;

                return intervalDef.reduce((timeObj, term) => {
                    // 1 decimal place
                    var interValExcat = Math.floor(t * 10 / term.interval) / 10;
                    var interValInt = Math.floor(interValExcat);

                    t -= interValInt * term.interval;
                    timeObj[term.name] = {
                        value: interValExcat,
                        displayValue: paddingStr(interValInt, term.minDecimal, 0)
                    };
                    return timeObj;
                }, {});
            },

            paddingStr: (val, minLength, padStr) => {
                var val = val + "";
                var padStr = padStr + "";
                var padLength = minLength - val.length;
                return (padLength < 0) ? val : Array(padLength).fill(padStr).join("") + val;
            }
        };
    }

    displayClock(showingSecond = false, showingRanger = false, showingTimeStr = false, showingDate = false) {
        var { time } = this.state;
        var { clockSize } = this.props;
        var seconds = (time.ss && time.ss.value) || 0;

        return (
            <div className="clock-background" style={{ width: clockSize + "px", height: clockSize + "px" }}>
                <div className="clock-center"></div>
                {Object.keys(time).map(term => {
                    if (term === "dd" || term === "ms") return;
                    if (term === "ss" && !showingSecond) return;

                    var curObj = time[term];
                    var base = (term === "hh") ? 12 : 60;
                    var deg = 360 * ((curObj.value % base) / base);

                    return (<div key={term + "_arm"} className={`clock-arm ${term}-arm`} style={{ transform: `rotate(${deg}deg)` }}></div>)
                })}
                {showingRanger && <CircleRanger value={seconds * 100 / 60} radius={clockSize / 2} muteRanger={true} thumbIcon="fa-play" />}
                {showingTimeStr && <div className="time-detail">{this.displayTimeStr(showingDate, "0.7rem")}</div>}
            </div>
        );
    }

    displayTimeStr(showingDate = false, fontSize = "1rem") {
        var { time, value } = this.state;
        var { format } = this.props;

        var date = new Date(value);

        return (
            <div className="VLayout flow-center timestr-wrapper">
                <div className="HLayout flow-center" style={{ fontSize: fontSize }}>{Object.keys(time).reduce((timeStr, term) => {
                    return (timeStr.indexOf(term) > -1) ? timeStr.replace(term, time[term].displayValue) : timeStr;
                }, format)}</div>

                {showingDate && <div className="HLayout flow-center" style={{ fontSize: fontSize }}>{date.toDateString()}</div>}
            </div>
        );
    }

    displayModeHandler() {
        const mode = this.state.mode;

        switch (mode) {
            case 1: return this.displayClock(false, false, false, false)
            case 2: return this.displayClock(true, false, false, false)
            case 3: return this.displayClock(false, true, false, false)
            case 4: return this.displayClock(false, false, true, false)
            case 5: return this.displayClock(false, false, true, true)
            case 6: return this.displayClock(true, false, true, true)
            case 7: return this.displayClock(false, true, true, true)
            case 8: return this.displayClock(true, false, true, false)
            case 9: return this.displayClock(false, true, true, false)
            case 10: return this.displayTimeStr(false)
            case 11: return this.displayTimeStr(true)
            default: return this.displayClock(true, true, true, true)
        }
    }

    // life cycle function
    componentDidMount() {
        this.updateTimeObj()
    }

    // life cycle function
    componentDidUpdate(prevProps) {
        if (this.props.time !== prevProps.time) {
            this.updateTimeObj();
        }
    }

    /**
    * @instance
    * @memberof Clock
    * @method updateTimeObj
    * @desc Update time object
    */
    updateTimeObj() {
        var state = Object.assign({}, this.state);
        var { processTimeValue, applyTimeOffset, convertMS } = this._proto;

        state.value = [
            processTimeValue,
            applyTimeOffset,
        ].reduce((result, func) => func(result), null);
        state.time = convertMS(state.value);

        this.setState(state);
    }

    /**
    * @instance
    * @memberof Clock
    * @method switchMode
    * @desc Switch current mode
    */
    switchMode(mode) {
        var state = Object.assign({}, this.state);
        state.mode = mode;
        this.setState(state);
    }

    render() {
        return (
            <div className="flex-row-center">
                {this.displayModeHandler()}
            </div>
        )
    };
}