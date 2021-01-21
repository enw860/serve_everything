import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from "./Clock";

import "../../style/toolkit/timer.less";
import "../../style/style.less";

/*
* @instance
* @desc: Stopwatch - a stop watch this record time in ms and have a lap list
* @params: {string} format, (Optional) With optional fields [dd, hh, mm, ss, ms]
* @params: {integer} refreshRate, (Optional) Indicates the rate to refresh the stopwatch 
* @params: {boolean} hideControls, (Optional) Indicates showing the control buttons or not
*/
export default class Stopwatch extends Component {
    // input props type check
    static propTypes = {
        format: PropTypes.string,
        refreshRate: PropTypes.number,
        hideControls: PropTypes.bool,
    };

    // default props values
    static defaultProps = {
        format: "dd Days hh:mm:ss.ms",
        refreshRate: 100,
        hideControls: false,
    }

    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            active: false,
            records: {
                intervalStartTime: null,
                actualTime: 0,
                timeOffset: 0,
                lapList: [],
            },
            buttons: {
                start: { name: "Start", visible: !props.hideControls },
                stop: { name: "Stop", visible: false },
                reset: { name: "Reset", visible: !props.hideControls },
                lap: { name: "Lap", visible: !props.hideControls }
            }
        };

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.lap = this.lap.bind(this);

        this._proto = {
            refreshRate: this.props.refreshRate,

            run: () => {
                this.interval = setInterval(() => {
                    var state = Object.assign({}, this.state);

                    if (state.active) {
                        state.records.actualTime = new Date() - state.records.intervalStartTime;
                        this.setState(state);
                    }
                }, this._proto.refreshRate);
            }
        };
    }

    displayControl() {
        var { buttons } = this.state;
        var showControls = Object.keys(buttons).reduce((show, val) => show || buttons[val].visible, false);

        return showControls && (
            <div className="HLayout flow-between stopwatch-control-set" style={{ width: "100%" }}>
                {Object.keys(buttons).map(key => {
                    return buttons[key].visible && <button key={"btn_" + key} onClick={this[key]}>{buttons[key].name}</button>
                })}
            </div>
        )
    }

    displayLapList() {
        var { lapList } = this.state.records;

        if (!lapList || lapList.length < 1) return;

        return (
            <div className="VLayout stopwatch-lap-list-wrapper">
                <div className="HLayout flow-left timer-caption-XL">Lap List</div>
                <ol type="2" className="VLayout flow-left stopwatch-lap-list">
                    {lapList.map((lap, index) => {
                        return (
                            <li className="HLayout flow-left" key={"lap" + index}>
                                <Clock time={lap} format={this.props.format} mode={10} />
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }

    // life cycle function
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /**
    * @instance
    * @memberof Stopwatch
    * @method start
    * @desc Start recoding time
    */
    start() {
        var state = Object.assign({}, this.state);

        if (this.interval) return;

        state.active = true;
        state.records.intervalStartTime = new Date();

        if (this.isButtonVisible("start")) {
            state.buttons.start.visible = false;
            state.buttons.stop.visible = true;
        }

        this.setState(state);

        this._proto.run()
    }

    /**
    * @instance
    * @memberof Stopwatch
    * @method stop
    * @desc Stop recoding time
    */
    stop() {
        var state = Object.assign({}, this.state);
        if (!state.active) return;

        clearInterval(this.interval);
        this.interval = null;

        state.active = false;
        state.records.timeOffset = state.records.timeOffset + state.records.actualTime;
        state.records.actualTime = 0;

        if (this.isButtonVisible("stop")) {
            state.buttons.start.visible = true;
            state.buttons.stop.visible = false;
        }

        this.setState(state);
    }

    /**
    * @instance
    * @memberof Stopwatch
    * @method reset
    * @desc Reset current stopwatch
    */
    reset() {
        var state = Object.assign({}, this.state);
        if (!state.active && !state.records.intervalStartTime) return;

        clearInterval(this.interval);
        this.interval = null;

        state.active = false;
        state.records.actualTime = 0;
        state.records.timeOffset = 0;
        state.records.intervalStartTime = null;
        state.records.lapList = [];

        if (this.isButtonVisible("stop")) {
            state.buttons.start.visible = true;
            state.buttons.stop.visible = false;
        }

        this.setState(state);
    }

    /**
    * @instance
    * @memberof Stopwatch
    * @method lap
    * @desc Setting up a lap on calling
    */
    lap() {
        var state = Object.assign({}, this.state);
        if (!this.interval) return;

        state.records.lapList.push(state.records.actualTime + state.records.timeOffset);
        this.setState(state);
    }

    /**
    * @instance
    * @memberof Stopwatch
    * @method getTimeRecords
    * @desc Get an object of current records {total_in_ms, lap_list}
    */
    getTimeRecords() {
        var state = Object.assign({}, this.state);

        return {
            total: state.records.timeOffset + state.records.actualTime,
            lap_list: state.records.lapList
        }
    }

    /**
    * @instance
    * @memberof Stopwatch
    * @method setButtonVisible
    * @param {String} buttonName Button name with option of "start" | "stop" | "lap" | "reset"
    * @param {Boolean} visibility True for setting target button visible, and set button to invisible on false
    * @desc Setting visibility of choosen button
    */
    setButtonVisible(buttonName, visibility) {
        var state = Object.assign({}, this.state);
        var btn = state.buttons[buttonName];

        if (btn) {
            btn.visible = visibility;
            this.setState(state);
        }
    }

    /**
    * @instance
    * @memberof Stopwatch
    * @method isButtonVisible
    * @param {String} buttonName Button name with option of "start" | "stop" | "lap" | "reset"
    * @returns {Boolean} Whether the button is visible
    * @desc Get visibility of choosen button
    */
    isButtonVisible(buttonName) {
        var state = this.state;
        var btn = state.buttons[buttonName];
        return !!btn && btn.visible;
    }

    render() {
        return (
            <div className="VLayout flow-center stopwatch-wrapper">
                <Clock time={this.getTimeRecords().total} clockSize={200} format={this.props.format} mode={9} />
                {this.displayControl()}
                {this.displayLapList()}
            </div>
        );
    }
}