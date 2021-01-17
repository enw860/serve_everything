<style lang="less">
@import "../../style/theme/theme.less";

.DivideLine {
  padding: 0;
  border: 0.5px solid @grey-020;

  &.divide-horizontal {
    height: 0;

    margin: 0;
    margin-top: @margin-sm;
    margin-bottom: @margin-sm;
  }

  &.divide-vertical {
    width: 0;

    margin: 0;
    margin-left: @margin-sm;
    margin-right: @margin-sm;
  }
}
</style>

<template>
  <div class="DivideLine" v-bind:class="directionClass" v-bind:style="style"></div>
</template>

<script>
import { normalizeInput } from "../utilities";
export default {
  name: "DivideLine",
  data: function() {
    return {
      DIRECTION: {
        horizontal: "divide-horizontal",
        vertical: "divide-vertical"
      }
    };
  },
  props: {
    direction: {
      type: String,
      default: "horizontal"
    },
    color: {
      type: String,
      default: ""
    },
    thickness: {
      type: Number,
      default: 0
    }
  },
  computed: {
    directionClass: function() {
      return normalizeInput(this.DIRECTION, this.direction);
    },
    style: function() {
      return {
        borderColor: this.color,
        borderWidth: this.thickness ? `${this.thickness}px` : ""
      };
    }
  }
};
</script>