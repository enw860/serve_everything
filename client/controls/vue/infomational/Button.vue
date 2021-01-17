<style lang="less">
@import "../../style/theme/theme.less";

.Button {
  outline: none;
  border: none;
  width: max-content;

  // Size
  &.size-small,
  &.size-normal {
    padding: @margin-sm;

    > *:not(:first-child) {
      margin-left: @margin-sm;
    }
  }

  &.size-large,
  &.size-xlarge {
    padding: @margin-rg;

    > *:not(:first-child) {
      margin-left: @margin-sm;
    }
  }

  // cursoe and role
  &[role="button"] {
    cursor: pointer;

    // interaction
    &:focus,
    &:active {
      outline: 2px solid @primary-060;
      outline-offset: -2px;
    }

    &.disabled {
      background-color: @grey-020 !important;
      color: @grey-050 !important;
      cursor: not-allowed !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }

  &[role="img"] {
    cursor: initial;
  }

  // style themes
  &.btn-primary {
    .setBtnStyle(@primary-060, @primary-070, @primary-080, @white, @white);
  }

  &.btn-success {
    .setBtnStyle(@success-060, @success-070, @success-080, @white, @white);
  }

  &.btn-danger {
    .setBtnStyle(@danger-070, @danger-080, @danger-090, @white, @white);
  }

  &.btn-info {
    .setBtnStyle(@info-040, @info-050, @info-060, @white, @white);
  }

  &.btn-dark {
    .setBtnStyle(@grey-100, @grey-090, @grey-080, @white, @white);
  }

  &.btn-white {
    .setBtnStyle(@white, @grey-010, @grey-020, @grey-100, @grey-100);
  }

  &.btn-transparent {
    .setBtnStyle(transparent, transparent, transparent, @grey-100, @grey-100);
  }
}

// mixin functions
.setBtnStyle(@background, @background-dark, @background-darker, @color, @color-alter) {
  color: @color;
  background-color: @background;

  &[role="button"] {
    &:focus {
      background-color: @background;
    }

    &:hover {
      background-color: @background-dark;
    }

    &:active {
      color: @color-alter;
      background-color: @background-darker;
    }
  }
}
</style>

<template>
  <div
    class="Button HLayout flow-between align-center"
    v-bind:class="[sizeClass, styleClass, isDisabled ? 'disabled':'']"
    :role="isClickable ? 'button':'img'"
    :tabindex="isClickable && !isDisabled ? '0':''"
    :aria-disabled="isClickable && !isClickable"
    :aria-describedby="labelID"
    @click="onclick"
    @keypress="onkeypress"
  >
    <a v-if="!!icon && (iconPosition==='left')" class="fa" v-bind:class="icon"></a>

    <span v-if="!!value">{{value}}</span>

    <a v-if="!!icon && (iconPosition==='right')" class="fa" v-bind:class="icon"></a>
  </div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../utilities";

export default {
  name: "Button",
  data: function() {
    return {
      SIZE: {
        small: "size-small",
        normal: "size-normal",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge"
      },
      STYLE: {
        primary: "btn-primary",
        success: "btn-success",
        danger: "btn-danger",
        info: "btn-info",
        dark: "btn-dark",
        white: "btn-white",
        default: "btn-white",
        transparent: "btn-transparent"
      }
    };
  },
  props: {
    size: {
      type: String,
      default: "default"
    },
    value: {
      type: String,
      default: "Button"
    },
    icon: {
      type: String,
      default: ""
    },
    iconPosition: {
      type: String,
      default: "left"
    },
    btnStyle: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClass: function() {
      return normalizeInput(this.SIZE, this.size);
    },
    styleClass: function() {
      return normalizeInput(this.STYLE, this.btnStyle);
    },
    hasIcon: function() {
      return !!this.icon;
    },
    isDisabled: function() {
      return this.$parent.isDisabled || this.disabled;
    },
    isClickable: function() {
      return !!this._events.click;
    },
    labelID: function() {
      if (!this.controlID) {
        this.controlID = generateComponentID(this.$options.name);
      }
      return this.controlID;
    }
  },
  methods: {
    onclick: function(event) {
      !this.isDisabled && !!this._events.click && this.$emit("click", event);
    },
    onkeypress: function(event) {
      if ([13, 32].some(code => code === (event.keyCode || event.which))) {
        this.onclick(event);
      }
    }
  }
};
</script>