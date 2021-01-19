<style lang="less">
@import "../../style/theme/theme.less";

.Badge {
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 0 2px @white;
  font-size: @font-size-xs;
  display: flex;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10;

  .badge-content-text {
    width: @badge-size;
    height: @badge-size;
    line-height: @badge-size;
    color: @white;
  }
}
</style>

<template>
  <div class="Badge" v-bind:class="vPositionClass" v-bind:style="backgroundStyle">
    <div class="badge-content-text">{{displayingContent}}</div>
  </div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";

export default {
  name: "Badge",

  data: function () {
    return {
      VPOSITIONS: {
        top: "v-align-top",
        center: "v-align-center",
        bottom: "v-align-bottom",
      },
    };
  },

  props: {
    vPosition: {
      type: String,
      default: "top",
    },
    content: {
      type: Number,
      default: 99,
      isRequred: true,
    },
    backgroundColor: {
      type: String,
      default: "",
    },
  },

  computed: {
    vPositionClass: function () {
      return normalizeInput(this.VPOSITIONS, this.vPosition || "top");
    },
    backgroundStyle: function () {
      return {
        backgroundColor: this.backgroundColor || "#da1e28",
      };
    },
    displayingContent: function () {
      return this.content > 99
        ? "+99"
        : this.content < -99
        ? "-99"
        : this.content || "";
    },
  },
};
</script>