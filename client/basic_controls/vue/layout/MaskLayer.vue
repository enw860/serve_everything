<style lang="less">
@import "../../style/theme/theme.less";

.MaskLayer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;

  .MaskContentWrapper {
    background-color: @white;
  }
}
</style>

<template>
  <div
    class="MaskLayer HLayout align-center flow-center"
    v-bind:class="show ? 'show' : 'hide'"
    @click="hideMask"
  >
    <div class="MaskContentWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MaskLayer",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideMask: function(event) {
      if (!this._events.clickOutside) {
        return;
      }

      const maskContent = this.$el.querySelector(".MaskContentWrapper");
      if (!maskContent || !maskContent.contains(event.target)) {
        this.$emit("clickOutside", event);
      }
    }
  }
};
</script>