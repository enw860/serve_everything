<style lang="less">
@import "../../style/theme/theme.less";

.Toggle {
  position: relative;
  margin: @margin-sm;

  &.disabled {
    > .toggle-wrapper {
      cursor: not-allowed !important;

      .toggle-pill {
        background-color: @grey-010 !important;

        > .toggle-toggler {
          background-color: @grey-030 !important;
        }
      }

      .toggle-label {
        color: @grey-030 !important;
      }

      &:focus > .toggle-pill {
        box-shadow: none !important;
      }
    }
  }

  > .toggle-wrapper {
    cursor: pointer;
    outline: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: min-content;

    &:focus > .toggle-pill {
      box-shadow: 0 0 0 1px @white, 0 0 0 3px @primary-060;
    }

    &.size-small {
      .setToggleSize(16px);
    }

    &.size-normal {
      .setToggleSize(24px);
    }

    &.size-large {
      .setToggleSize(36px);
    }

    &.size-xlarge {
      .setToggleSize(48px);
    }

    &.toggle-primary {
      .toggle-pill.active {
        background-color: @primary-060;
      }
    }

    &.toggle-danger {
      .toggle-pill.active {
        background-color: @danger-060;
      }
    }

    &.toggle-success {
      .toggle-pill.active {
        background-color: @success-060;
      }
    }

    &.toggle-info {
      .toggle-pill.active {
        background-color: @info-060;
      }
    }

    .toggle-pill {
      border-radius: 9999px;
      display: flex;
      align-items: center;
      position: absolute;
      background-color: @grey-030;
      transition: background-color 70ms cubic-bezier(0.2, 0, 1, 0.9);

      .toggle-toggler {
        border-radius: 50%;
        position: absolute;
        background-color: @white;
        transition: left 70ms cubic-bezier(0.2, 0, 1, 0.9);
      }
    }

    .toggle-label {
      font-size: inherit;
      white-space: nowrap;
    }
  }

  // mixin functions
  .setToggleSize(@height) {
    .toggle-pill {
      width: 2 * @height;
      min-width: 2 * @height;
      height: @height;
      min-height: @height;

      .toggle-toggler {
        left: 2px;
        width: @height - 2 * 2px;
        min-width: @height - 2 * 2px;
        height: @height - 2 * 2px;
        min-height: @height - 2 * 2px;
      }

      &.active .toggle-toggler {
        left: (2 - 1) * @height + 2px;
      }

      & + .toggle-label {
        margin-left: 2 * @height + @margin-sm;
      }
    }
  }
}
</style>

<template>
  <div class="Toggle" v-bind:class="isDisabled ? 'disabled' : ''">
    <div
      :aria-describedby="describedby"
      class="toggle-wrapper"
      v-bind:class="[sizeClass, styleClass]"
      tabindex="0"
      @click="onToggle"
      @keypress="onKeyPress"
    >
      <div class="toggle-pill" v-bind:class="currentState ? 'active':''">
        <div class="toggle-toggler"></div>
      </div>
      <div class="toggle-label">
        <div class="toggle-label-on" v-bind:class="currentState ? '':'hide'">
          <span v-if="isTextType">{{onLabel}}</span>
          <a v-else class="fa" v-bind:class="onLabel"></a>
        </div>
        <div class="toggle-label-off" v-bind:class="!currentState ? '':'hide'">
          <span v-if="isTextType">{{offLabel}}</span>
          <a v-else class="fa" v-bind:class="offLabel"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../utilities";

export default {
  name: "Toggle",
  data: function() {
    return {
      currentState: this.state,
      LABELTYPE: {
        text: "TEXT",
        icon: "ICON"
      },
      SIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge"
      },
      STYLE: {
        primary: "toggle-primary",
        success: "toggle-success",
        danger: "toggle-danger",
        info: "toggle-info",
        default: "toggle-primary"
      }
    };
  },
  props: {
    state: {
      type: Boolean,
      default: false
    },
    onLabel: {
      type: String,
      default: "On"
    },
    offLabel: {
      type: String,
      default: "Off"
    },
    labelType: {
      type: String,
      default: "text"
    },
    size: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    toggleStyle: {
      type: String,
      default: "default"
    }
  },
  computed: {
    sizeClass: function() {
      return normalizeInput(this.SIZE, this.size);
    },
    styleClass: function() {
      return normalizeInput(this.STYLE, this.toggleStyle);
    },
    isTextType: function() {
      return normalizeInput(this.LABELTYPE, this.labelType) === "TEXT";
    },
    isDisabled: function() {
      return this.$parent.isDisabled || this.disabled;
    },
    describedby: function() {
      return this.$parent.labelID || "";
    }
  },
  methods: {
    onToggle: function(event) {
      this.currentState = !this.currentState;
      event.target.checked = this.currentState;
      !this.isDisabled && !!this._events.toggle && this.$emit("toggle", event);
    },
    onKeyPress: function(event) {
      if ([13, 32].some(code => code === (event.keyCode || event.which))) {
        this.onToggle(event);
      }
    },
    getState: function() {
      return this.currentState;
    }
  }
};
</script>