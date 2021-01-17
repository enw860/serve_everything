import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "../../style/style.less";
import "../../style/toolkit/tooltip.less";

/*
* @instance
* @desc: Tooltip - use to display tips
* @params: {string} backgroundColor, (Optional) Background color
* @params: {string} color, (Optional) Font color
* @params: {integer} arrowSize, (Optional) Arrow size
*/ 
export default class Tooltip extends Component {
  // input props type check
  static propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    arrowSize: PropTypes.number
  };

  // default props values
  static defaultProps = {
    backgroundColor: "#000000",
    color: "#fafafa",
    arrowSize: 8
  }

  constructor(props) {
    super(props);

    this.state = {
      targetElement: null,
      updatePosition: false,
      show: false,
      value: "",
      top: 0, 
      left: 0,
      direction: ""
    };

    this._proto = {
      tooltipWrapperStyle: () => {
        var {show, top, left} = this.state;
        return {
          position: "absoulte",
          top: top,
          left: left,
          display: !show && "none"
        }
      },

      tooltipArrowStyle: () => {
        var {direction} = this.state;
        var {backgroundColor, arrowSize} = this.props;
        
        direction = direction.split("-");
        if (direction.length !== 2) return {};

        var base = {borderWidth: arrowSize};
        if (direction[0] === "left") {
          base = {...base, left: "100%", borderColor: `transparent transparent transparent ${backgroundColor}`};
        } else if (direction[0] === "right") {
          base = {...base, right: "100%", borderColor: `transparent ${backgroundColor} transparent transparent`};
        } else if (direction[0] === "top") {
          base = {...base, top: "100%", borderColor: `${backgroundColor} transparent transparent transparent`};
        } else if (direction[0] === "bottom") {
          base = {...base, bottom: "100%", borderColor: `transparent transparent ${backgroundColor} transparent`};
        }

        if (direction[0] === "left" || direction[0] === "right") {
          if (direction[1] === "start") {
            base.top = "10px";
          } else if (direction[1] === "middle") {
            base.bottom = "calc(50% - 5px)";
          } else if (direction[1] === "end") {
            base.bottom = "10px";    
          }
        } else if (direction[0] === "top" || direction[0] === "bottom") {
          if (direction[1] === "start") {
            base.left = "10px";
          } else if (direction[1] === "middle") {
            base.right = "calc(50% - 5px)";
          } else if (direction[1] === "end") {
            base.right = "10px";
          }
        } 

        return base;
      },

      tooltipContextStyle: () => {
        var {backgroundColor, color} = this.props;
        return {
          backgroundColor: backgroundColor,
          color: color
        }
      },

      computePosition: (targetElement, direction) => {
        var offset = 8;    
        var { _tooltip } = this.refs;

        var targetRect = targetElement.getBoundingClientRect();
        var tooltipRect = _tooltip.getBoundingClientRect();

        var left = 0, top = 0;
        direction = direction.split("-");
        
        if (direction.length !== 2) return {left, top};

        if (direction[0] === "left") {
          left = targetRect.left - tooltipRect.width - offset;
        } else if (direction[0] === "right") {
          left = targetRect.left + targetRect.width + offset;
        } else if (direction[0] === "top") {
          top = targetRect.top - tooltipRect.height - offset;
        } else if (direction[0] === "bottom") {
          top = targetRect.top + targetRect.height + offset;
        } 

        if (direction[0] === "left" || direction[0] === "right") {
          if (direction[1] === "start") {
            top = targetRect.top;
          } else if (direction[1] === "middle") {
            top = targetRect.top + targetRect.height/2 - tooltipRect.height/2;
          } else if (direction[1] === "end") {
            top = targetRect.top + targetRect.height - tooltipRect.height;            
          }
        } else if (direction[0] === "top" || direction[0] === "bottom") {
          if (direction[1] === "start") {
            left = targetRect.left;
          } else if (direction[1] === "middle") {
            left = targetRect.left + targetRect.width/2 - tooltipRect.width/2;
          } else if (direction[1] === "end") {
            left = targetRect.left + targetRect.width - tooltipRect.width;            
          }
        } 

        return {left, top};
      },

      validatePosition: position => {
        var {_tooltip} = this.refs;
        var tooltipRect = _tooltip.getBoundingClientRect();

        var validLeft = position.left >= 0;
        var vaildTop = position.top >= 0;
        var validRight = position.left + tooltipRect.width <= document.body.clientWidth;
        var validBottom = position.top + tooltipRect.height <= document.body.clientHeight;

        return validLeft && vaildTop && validRight && validBottom;
      },

      flipDirection: direction => {
        var directionOrder = [
          "left-start",  "left-middle",  "left-end", 
          "right-start",  "right-middle",  "right-end", 
          "top-start",  "top-middle",  "top-end", 
          "bottom-start",  "bottom-middle",  "bottom-end"
        ]
        
        var i = directionOrder.indexOf(direction);
        if (i > -1) {
          var nextIndex = (i+1 === directionOrder.length) ? 0 : i+1;
          return directionOrder[nextIndex];
        } else {
          return "";
        }
      }
    };
  }

  // Life cycle method 
  componentDidUpdate(){
    var {updatePosition} = this.state;
    if (updatePosition) {
      this.justifyPosition();
    }
  }

  /**
  * @instance
  * @memberof Tooltip
  * @method justifyPosition
  * @desc Set tooltip shown up position
  */
  justifyPosition(){
    var state = Object.assign({}, this.state);
    var {targetElement, direction} = state;
    var {computePosition, validatePosition, flipDirection} = this._proto;

    var tryLocation = 1;
    var position = computePosition(targetElement, direction);
    while (!validatePosition(position) && tryLocation <= 17) {
      tryLocation += 1;
      direction = flipDirection(direction);
      position = computePosition(targetElement, direction);
    }

    this.setState({
      ...state,
      left: position.left,
      top: position.top,
      updatePosition: false,
      direction: direction
    })
  }

  /**
  * @instance
  * @memberof Tooltip
  * @method show
  * @param {String} target Target DOM element of showing the tooltip 
  * @param {String} msg Content to be shown up, could be other react components | htmls | strings
  * @param {String} location Choose of [left | right | top | bottom] - [start | middle | bottom]
  * @desc Set tooltip show up near the target element
  */
  show(target, msg, location = "right"){
    var state = this.state;
    this.setState({
      ...state,
      targetElement: target,
      value: msg || state.msg,
      show: true,
      updatePosition: true,
      direction: location
    });
  }

  /**
  * @instance
  * @memberof Tooltip
  * @method hide
  * @desc Set tooltip disappear
  */
  hide(){
    var state = this.state;
    this.setState({
      ...state,
      show: false
    })
  }

  render() {
    return (
      <div ref="_tooltip" className="tooltip-wrapper" style={this._proto.tooltipWrapperStyle()}>
        <div className="tooltip-arrow" style={this._proto.tooltipArrowStyle()}></div>
        <div className="tooltip-context" style={this._proto.tooltipContextStyle()}>{this.state.value}</div>
      </div>
    );
  }
}