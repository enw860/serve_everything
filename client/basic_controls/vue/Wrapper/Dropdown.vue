<style lang="less">
@import "../../style/theme/theme.less";

.DropDown {
  margin: @margin-sm;

  &.expand > .DropDownBtn:after {
    transform: rotate(180deg);
  }

  .DropDownBtn {
    position: relative;
    border: 0;
    margin: 0;
    padding: 0 @margin-xl 0 @margin-rg;
    background: transparent;
    width: 100%;
    height: 40px;
    outline: 2px solid transparent;
    outline-offset: -2px;
    font-size: inherit;

    &:focus,
    &:active {
      outline-color: @primary-060;
    }

    &:hover {
      background-color: transparent;
    }

    &.dark-style {
      color: @white;
    }

    &:after {
      content: "\f0d7";

      top: 0;
      right: 0;
      position: absolute;

      height: 100%;
      width: @margin-xl;

      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;

      background-color: transparent;
      transition: transform 100ms cubic-bezier(0.2, 0, 0.38, 0.9);
    }
  }

  &.expand > .DropdownContent {
    -webkit-animation: expand 100ms forwards;
    animation: expand 100ms forwards;
  }

  .DropdownContent {
    overflow: hidden;
    transition: all 100ms cubic-bezier(0.2, 0, 0.38, 0.9);
    transform-origin: top;
    -webkit-animation: collaspe 100ms forwards;
    animation: collaspe 100ms forwards;

    .contentPanel {
      padding: @margin-sm @margin-rg;
    }
  }

  &.size-small .DropDownBtn {
    height: 35px;
  }

  &.size-normal .DropDownBtn {
    height: 40px;
  }

  &.size-large .DropDownBtn {
    height: 45px;
  }

  &.size-xlarge .DropDownBtn {
    height: 55px;
  }

  @-webkit-keyframes expand {
    0% {
      height: 0;
      transform: scaleY(0);
    }

    100% {
      display: flex;
      height: 100%;
      transform: scaleY(1);
    }
  }

  @keyframes expand {
    0% {
      height: 0;
      transform: scaleY(0);
    }

    100% {
      display: flex;
      height: 100%;
      transform: scaleY(1);
    }
  }

  @-webkit-keyframes collaspe {
    0% {
      height: 100%;
      transform: scaleY(1);
    }

    100% {
      height: 0;
      transform: scaleY(0);
    }
  }

  @keyframes collaspe {
    0% {
      height: 100%;
      transform: scaleY(1);
    }

    100% {
      height: 0;
      transform: scaleY(0);
    }
  }
}
</style>

<template>
  <div class="DropDown VLayout" v-bind:class="[dropDownSize, isExpanded ? 'expand' : '']">
    <button
      class="DropDownBtn HLayout align-center"
      v-bind:class="dropDownColorStyle"
      @click="toggleDropDown"
    >{{title}}</button>
    <div
      class="DropdownContent VLayout"
      v-bind:class="isExpanded ? '':'hide'"
      :aria-hidden="!isExpanded"
      :aria-expanded="isExpanded"
    >
      <div class="contentPanel">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../utilities";

export default {
  name: "Dropdown",
  data: function() {
    return {
      isExpanded: this.expanded,
      INPUTSIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge"
      },
      COLORSTYLE: {
        default: "",
        dark: "dark-style"
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "Title"
    },
    expanded: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ""
    },
    colorStyle: {
      type: String,
      default: "default"
    }
  },
  computed: {
    dropDownSize: function() {
      return this.size
        ? normalizeInput(this.INPUTSIZE, this.size)
        : normalizeInput(this.INPUTSIZE, "default");
    },
    dropDownColorStyle: function() {
      return normalizeInput(this.COLORSTYLE, this.colorStyle);
    }
  },
  methods: {
    toggleDropDown: function(event) {
      if (this.isExpanded) {
        this.collaspeDropDown(event);
      } else {
        this.expandDropDown(event);
      }
    },
    expandDropDown: function(event) {
      this.isExpanded = true;
      !!this._events.expand && this.$emit("expand", event);
    },
    collaspeDropDown: function(event) {
      this.isExpanded = false;
      !!this._events.collaspe && this.$emit("collaspe", event);
    }
  }
};
</script>