import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from "./Clock";

import "../../style/style.less";

/*
* @instance
* @desc: CurrentTime - Display current time
* @params: {string} format, (Optional) With optional fields [dd, hh, mm, ss, ms]
* @params: {integer} refreshRate, (Optional) Indicates the rate to refresh the stopwatch 
* @params: {integer} mode, (Optional) mode 0-11
*/
export default class CurrentTime extends Component {
    // input props type check
    static propTypes = {
        format: PropTypes.string,
        mode: PropTypes.number,
        refreshRate: PropTypes.number
    };

    // default props values
    static defaultProps = {
        format: "hh:mm:ss",
        refreshRate: 1000,
        mode: 0
    }

    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            time: new Date(),
            timezoneOffset: new Date().getTimezoneOffset()
        };

        this._proto = {
            run: () => {
                this.interval = setInterval(() => {
                    var state = Object.assign({}, this.state);
                    state.time = new Date();
                    this.setState(state);
                }, this.props.refreshRate);
            }
        };
    }

    // life cycle function
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        !this.interval && this._proto.run();
        return (
            <div className="HLayout flow-center">
                <Clock time={this.state.time} timezoneOffset={this.state.timezoneOffset} clockSize={200} format={this.props.format} mode={this.props.mode} />
            </div>
        );
    }
}