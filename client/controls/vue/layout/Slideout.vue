<style lang="less">
@import "../../style/theme/theme.less";

.Slideout {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;

  .SlideoutContent {
    position: absolute;
    top: 0;
    max-width: max-content;
    height: 100vh;
    background-color: @white;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;

    &.slide-left {
      left: -100%;
      -webkit-animation: slideRight 0.5s forwards;
      animation: slideRight 0.5s forwards;
    }

    &.slide-right {
      right: -100%;
      -webkit-animation: slideLeft 0.5s forwards;
      animation: slideLeft 0.5s forwards;
    }

    @-webkit-keyframes slideRight {
      100% {
        left: 0;
      }
    }

    @keyframes slideRight {
      100% {
        left: 0;
      }
    }

    @-webkit-keyframes slideLeft {
      100% {
        right: 0;
      }
    }

    @keyframes slideLeft {
      100% {
        right: 0;
      }
    }
  }
}
</style>

<template>
  <div class="Slideout" v-bind:class="isVisible ? 'show' : 'hide'" @click="toggleSlideout">
    <div class="SlideoutContent" v-bind:class="directionClass">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";

export default {
  name: "Slideout",
  data: function() {
    return {
      isVisible: false,
      DIRECTION: {
        left: "slide-left",
        right: "slide-right"
      }
    };
  },
  props: {
    direction: {
      type: String,
      default: "left"
    }
  },
  computed: {
    directionClass: function() {
      return normalizeInput(this.DIRECTION, this.direction);
    }
  },
  methods: {
    toggleSlideout: function(event) {
      if (this.isVisible) {
        !this.contentCheck(event) && this.hideSlidout(event);
      } else {
        this.showSlideout(event);
      }
    },
    contentCheck: function(event) {
      const parent = this.$el.querySelector(".SlideoutContent");
      const target = event.target;
      return parent && target && parent.contains(target);
    },
    showSlideout: function(event) {
      this.isVisible = true;
      !!this._events.show && this.$emit("show", event);
    },
    hideSlidout: function(event) {
      this.isVisible = false;
      !!this._events.hide && this.$emit("hide", event);
    }
  }
};
</script>