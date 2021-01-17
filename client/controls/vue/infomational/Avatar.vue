<style lang="less">
@import "../../style/theme/theme.less";

.Avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  margin: @margin-sm;
  padding: 0;
  text-align: center;
  z-index: 1;

  &[tabindex="0"] {
    cursor: pointer;

    &:focus,
    &:active {
      box-shadow: 0 0 0 1px @white, 0 0 0 3px @primary-060;
      outline: 0;
      border: 0;
    }
  }

  .AvatarContent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;

    & > i {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & > img {
      width: 100% !important;
      height: 100% !important;
    }

    & > .disabler {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      top: 0;
      z-index: 2;
      display: none;
    }
  }

  &.disabled {
    pointer-events: none;
    .disabler {
      display: block;
      background-color: @white;
      opacity: 0.8;
    }
  }
}

.avatar-round > .AvatarContent {
  border-radius: 50%;
}

.avatar-square > .AvatarContent {
  border-radius: 5px;
}

.avatar-small {
  width: @avatar-sm;
  height: @avatar-sm;
  font-size: @avatar-sm / 2;
  line-height: @avatar-sm / 2;
}

.avatar-normal {
  width: @avatar-rg;
  height: @avatar-rg;
  font-size: @avatar-rg / 2;
  line-height: @avatar-rg / 2;
}

.avatar-large {
  width: @avatar-lg;
  height: @avatar-lg;
  font-size: @avatar-lg / 2;
  line-height: @avatar-lg / 2;
}

.avatar-xlarge {
  width: @avatar-xl;
  height: @avatar-xl;
  font-size: @avatar-xl / 2;
  line-height: @avatar-xl / 2;
}

.Avatar {
  &.avatar-round > .Badge {
    left: 90%;
    &.v-align-top {
      top: 10%;
      transform: translateX(-50%) translateY(-30%);
    }

    &.v-align-center {
      left: 100%;
      transform: translateX(-50%);
    }

    &.v-align-bottom {
      top: 90%;
      transform: translateX(-50%) translateY(-70%);
    }
  }

  &.avatar-round {
    &.avatar-large > .Badge {
      left: 90%;
      &.v-align-center {
        left: 100%;
      }
    }

    &.avatar-xlarge > .Badge {
      left: 85%;
      &.v-align-center {
        left: 100%;
      }
    }
  }

  &.avatar-square > .Badge {
    left: 100%;
    &.v-align-top {
      top: 0;
      transform: translateX(-50%) translateY(-30%);
    }

    &.v-align-center {
      transform: translateX(-50%);
    }

    &.v-align-bottom {
      top: 100%;
      transform: translateX(-50%) translateY(-70%);
    }
  }
}
</style>

<template>
  <div
    class="Avatar"
    v-bind:class="[shapeClass, avatarSizeClass, isActive ? '' : 'disabled']"
    v-bind:tabindex="clickable && isActive ? '0' : ''"
    @click="onclick"
  >
    <div class="AvatarContent VLayout flow-center align-center" v-bind:style="avatarStyle">
      <div class="disabler"></div>
      <img v-if="avatarContentType === 'image'" v-bind:src="content" />
      <i
        v-else-if="avatarContentType === 'icon'"
        v-bind:class="content"
        v-bind:style="avatarIconColor"
      ></i>
      <div v-else v-bind:style="avatarIconColor">{{avatarContent}}</div>
    </div>

    <slot name="badge"></slot>
  </div>
</template>

<script>
import { normalizeInput, randDarkColor } from "../utilities.js";

export default {
  name: "Avatar",

  data: function() {
    return {
      SHAPES: {
        round: "avatar-round",
        square: "avatar-square"
      },
      SIZES: {
        default: "avatar-normal",
        small: "avatar-small",
        large: "avatar-large",
        xlarge: "avatar-xlarge"
      },
      TYPES: {
        text: "text",
        image: "image",
        icon: "icon"
      }
    };
  },

  props: {
    isActive: {
      type: Boolean,
      default: true
    },
    shape: {
      type: String,
      default: "round"
    },
    type: {
      type: String,
      default: "text"
    },
    avatarSize: {
      type: String,
      default: "default"
    },
    avatarColor: {
      type: String
    },
    iconColor: {
      type: String
    },
    content: {
      type: String,
      required: true
    }
  },

  computed: {
    shapeClass: function() {
      return normalizeInput(this.SHAPES, this.shape);
    },
    avatarSizeClass: function() {
      return normalizeInput(this.SIZES, this.avatarSize);
    },
    avatarContentType: function() {
      return normalizeInput(this.TYPES, this.type);
    },
    avatarContent: function() {
      if (this.avatarContentType === "text") {
        let words = this.content.split(" ").map(word => word[0].toUpperCase());
        return words.length > 1
          ? words.splice(0, 2).join("")
          : words.length === 0
          ? ""
          : words[0];
      } else {
        return this.content;
      }
    },
    clickable: function() {
      return !!this._events.click;
    },
    avatarStyle: function() {
      return {
        backgroundColor: this.avatarColor || randDarkColor(this.content)
      };
    },
    avatarIconColor: function() {
      return {
        color: this.iconColor || "#ffffff"
      };
    }
  },

  methods: {
    onclick: function(event) {
      !!this.clickable && this.isActive && this.$emit("click", event);
    }
  }
};
</script>
