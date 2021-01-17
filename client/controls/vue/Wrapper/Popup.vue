<style lang="less">
@import "../../style/theme/theme.less";

.Popup {
  position: relative;
  width: max-content;

  .popupContent {
    position: absolute;
    top: 100%;
    background-color: @grey-010;
    padding: @margin-sm 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    max-width: 450px;
    min-width: 150px;
    margin-top: 4px;

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }

    .action {
      width: 100%;
      word-break: break-all;
      word-break: break-word;

      & > div[role="button"] {
        cursor: pointer;
        padding: @margin-sm @margin-rg;

        .fa {
          padding-right: 4px;
        }

        &:hover {
          background-color: @grey-020;
        }

        &:focus,
        &:active {
          background-color: @grey-030;
          outline: 2px solid @primary-060;
          outline-offset: -2px;
        }

        &.disabled {
          cursor: not-allowed;
          color: @grey-050 !important;
          background-color: transparent !important;
          outline: none !important;
        }
      }

      .separator {
        height: 0;
        border: 1px solid @grey-030;
        padding: 0 @margin-sm;
      }
    }
  }
}
</style>

<template>
  <div class="Popup" v-bind:class="sizeClass">
    <slot name="trigger"></slot>
    <div
      ref="menu"
      class="popupContent VLayout"
      v-bind:class="[hide ? 'hide':'', directionClass]"
      aria-label="popup menu"
    >
      <div class="action" v-for="(action, index) in actions" :key="`action${index}`">
        <div
          role="button"
          v-if="action"
          ref="action"
          :tabindex="action.disabled ? '' : '0'"
          v-bind:class="action.disabled ? 'disabled' : ''"
          @click="action.method"
          @keydown="event => onkeydown(action.method, event, index)"
        >
          <a v-if="action.icon" class="fa" v-bind:class="action.icon"></a>
          <span>{{action.name}}</span>
        </div>
        <div v-else class="separator"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { normalizeInput } from "../utilities";

export default {
  name: "Popup",
  timer: null,
  data: function() {
    return {
      hide: true,
      SIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge"
      },
      DIRECTION: {
        left: "left",
        right: "right"
      }
    };
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    size: {
      type: String,
      default: "default"
    },
    direction: {
      type: String,
      default: "left"
    }
  },
  computed: {
    sizeClass: function() {
      return normalizeInput(this.SIZE, this.size);
    },
    directionClass: function() {
      return normalizeInput(this.DIRECTION, this.direction);
    },
    actions: function() {
      return this.value.map((action, index) => {
        return typeof action !== "object"
          ? null
          : {
              name: action.name || `Action${index}`,
              icon: action.icon || "",
              method: action.disabled
                ? function() {}
                : action.method || function() {},
              disabled: !!action.disabled
            };
      });
    }
  },
  methods: {
    onkeydown: function(callback, event, index) {
      const keycode = event.keyCode || event.which;

      if ([13, 32, 38, 40, 27].some(code => code === keycode)) {
        event.preventDefault();
      }

      if ([13, 32].some(code => code === keycode)) {
        callback(event);
      } else if (keycode === 38) {
        if (index !== 0) {
          this.$refs.action &&
            this.$refs.action[Math.max(index - 1, 0)] &&
            this.$refs.action[Math.max(index - 1, 0)].focus();
        }
      } else if (keycode === 40) {
        this.$refs.action &&
          this.$refs.action[index + 1] &&
          this.$refs.action[index + 1].focus();
      } else if (keycode === 27) {
        this.hide = true;
        window.removeEventListener("click", this.hidePopup, true);
      }
    },
    showPopup: function() {
      this.hide = false;
      window.removeEventListener("click", this.hidePopup, true);
      window.addEventListener("click", this.hidePopup, true);
    },
    hidePopup: function(event) {
      if (!this.$el.contains(event.target)) {
        this.hide = true;
        window.removeEventListener("click", this.hidePopup, true);
      }
    }
  }
};
</script>