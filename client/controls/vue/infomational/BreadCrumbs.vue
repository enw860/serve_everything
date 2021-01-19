<style lang="less">
@import "../../style/theme/theme.less";

.BreadCrumbs {
  margin: @margin-sm;

  .BreadCrumbsSeparator,
  & > .BreadCrumbsStepWrapper:not(:last-child) {
    margin-right: @margin-sm;
  }
}
</style>

<template>
  <div class="BreadCrumbs HLayout" v-bind:class="sizeClass">
    <div class="BreadCrumbsStepWrapper HLayout" v-for="(step, index) in steps" :key="step.name">
      <span class="BreadCrumbsSeparator" v-if="index > 0">/</span>
      <span v-bind:style="textStyle" class="BreadCrumbsStepName">
        <Link v-if="!!step.click" :value="step.name" :openInNewTab="false" @click="step.click" />
        <span v-else>{{step.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import Link from "./Link.vue";

export default {
  name: "BreadCrumbs",
  data: function() {
    return {
      SIZE: {
        auto: "",
        xsmall: "size-xsmall",
        small: "size-small",
        normal: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge",
        xxlarge: "size-xxlarge",
        xxxlarge: "size-xxxlarge"
      }
    };
  },
  components: {
    Link
  },
  props: {
    steps: {
      type: Array,
      default: [],
      validator: steps =>
        steps.every(step => {
          const validName = !!step.name && typeof step.name === "string";
          const validFunc =
            !step.click || (!!step.click && typeof step.click === "function");
          return validName && validFunc;
        })
    },
    size: {
      type: String,
      default: "auto"
    },
    fontWeight: {
      type: Number,
      default: 400
    },
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    sizeClass: function() {
      return normalizeInput(this.SIZE, this.size);
    },
    isDisabled: function() {
      return this.$parent.isDisabled || this.disabled;
    },
    textStyle: function() {
      return {
        fontWeight: this.fontWeight,
        color: this.color
      };
    }
  }
};
</script>