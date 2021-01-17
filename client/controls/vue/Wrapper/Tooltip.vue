<style lang="less">
@import "../../style/theme/theme.less";

.Tooltip {
  position: relative;
  width: max-content;

  > .tooltipContent {
    position: absolute;
    background-color: @black;
    border-radius: 5px;
    z-index: 10;

    .tooltipText {
      padding: @margin-sm;
      color: @white;
      font-size: inherit;
      width: max-content;
      max-width: 350px;
      max-height: 250px;
      word-break: break-word;
      overflow: hidden;
    }

    &:after {
      content: "";
      display: block;
      border: 8px solid transparent;
      position: absolute;
      width: 0;
      height: 0;
    }
  }

  .m-top {
    bottom: 100%;
    margin-bottom: @margin-rg;

    &:after {
      top: 100%;
      border-top-color: @black;
    }
  }

  .m-bottom {
    top: 100%;
    margin-top: @margin-rg;

    &:after {
      bottom: 100%;
      border-bottom-color: @black;
    }
  }

  .m-top,
  .m-bottom {
    &.s-start {
      left: 0;

      &:after {
        left: @margin-rg;
      }
    }

    &.s-center {
      left: 50%;
      transform: translateX(-50%);

      &:after {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &.s-end {
      right: 0;

      &:after {
        right: @margin-rg;
      }
    }
  }

  .m-left {
    right: 100%;
    margin-right: @margin-rg;

    &:after {
      left: 100%;
      border-left-color: @black;
    }
  }

  .m-right {
    left: 100%;
    margin-left: @margin-rg;

    &:after {
      right: 100%;
      border-right-color: @black;
    }
  }

  .m-left,
  .m-right {
    &.s-start {
      top: 0;

      &:after {
        top: @margin-sm;
      }
    }

    &.s-center {
      top: 50%;
      transform: translateY(-50%);

      &:after {
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &.s-end {
      bottom: 0;

      &:after {
        bottom: @margin-sm;
      }
    }
  }
}
</style>

<template>
  <div
    class="Tooltip"
    v-bind:class="tooltipSize"
    @mouseenter="hoverToggle"
    @mouseleave="hoverToggle"
  >
    <slot name="content"></slot>
    <div
      :id="labelID"
      :aria-hidden="isVisible"
      role="tooltip"
      class="tooltipContent"
      v-bind:class="[sClass, mClass, isVisible ? 'show' : 'hide']"
    >
      <div class="tooltipText">{{value}}</div>
    </div>
  </div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../utilities";

export default {
  name: "Tooltip",
  data: function() {
    return {
      isVisible: false,
      INPUTSIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge"
      },
      MPOS: {
        top: "m-top",
        bottom: "m-bottom",
        left: "m-left",
        right: "m-right"
      },
      SPOS: {
        start: "s-start",
        center: "s-center",
        end: "s-end"
      }
    };
  },
  props: {
    value: {
      type: String,
      default: "Tooltip"
    },
    mPosition: {
      type: String,
      default: "top"
    },
    sPosition: {
      type: String,
      default: "start"
    },
    size: {
      type: String,
      default: ""
    },
    displayOnHover: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tooltipSize: function() {
      return this.size
        ? normalizeInput(this.INPUTSIZE, this.size)
        : this.$parent.labelSize
        ? ""
        : normalizeInput(this.INPUTSIZE, "default");
    },
    mClass: function() {
      return normalizeInput(this.MPOS, this.mPosition);
    },
    sClass: function() {
      return normalizeInput(this.SPOS, this.sPosition);
    },
    labelID: function() {
      if (!this.controlID) {
        this.controlID = generateComponentID(this.$options.name);
      }
      return this.controlID;
    }
  },
  methods: {
    hoverToggle: function(event) {
      if (this.displayOnHover) {
        this.toggleTooltip(event);
      }
    },
    toggleTooltip: function(event) {
      if (this.isVisible) {
        this.hideTooltip(event);
      } else {
        this.showTooltip(event);
      }
    },
    showTooltip: function(event) {
      this.isVisible = true;
      !!this._events.show && this.$emit("show", event);
    },
    hideTooltip: function(event) {
      this.isVisible = false;
      !!this._events.hide && this.$emit("hide", event);
    }
  }
};
</script>