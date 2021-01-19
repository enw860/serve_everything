<style lang="less">
@import "../../style/theme/theme.less";

.Link {
  margin: @margin-sm 0;
  font-size: inherit;
  text-decoration: none;

  color: @primary-060;
  padding: 0;
  border: 0;

  &:active:visited {
    color: @primary-060;
  }

  &:hover {
    color: @primary-070;
    text-decoration: underline;
  }

  &:focus {
    outline: 1px solid @primary-060;
  }

  &.disabled {
    pointer-events: none;
    outline: none;
    text-decoration: none;
    color: @font-disabled;
  }

  &:active,
  &:active:visited,
  &:active:visited:hover {
    color: @black;
    text-decoration: underline;
  }
}
</style>

<template>
  <a
    class="Link"
    v-bind:class="[sizeClass, isDisabled ? 'disabled':'']"
    v-bind:style="textStyle"
    :aria-describedby="describeBy"
    :target="openInNewTab?'_blank':'_self'"
    :href="hrefSource"
    @click="onclick"
  >{{value}}</a>
</template>

<script>
import { normalizeInput } from "../../util/utilities";

export default {
  name: "Link",
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
  props: {
    value: {
      type: String,
      default: "auto"
    },
    size: {
      type: String,
      default: "default"
    },
    fontWeight: {
      type: Number,
      default: 400
    },
    openInNewTab: {
      type: Boolean,
      default: true
    },
    href: {
      type: String,
      default: "javascript:void(0);"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    describeBy: function() {
      return this.$parent.labelID || "";
    },
    sizeClass: function() {
      return normalizeInput(this.SIZE, this.size);
    },
    isDisabled: function() {
      return this.$parent.isDisabled || this.disabled;
    },
    textStyle: function() {
      return {
        fontWeight: this.fontWeight
      };
    },
    hrefSource: function() {
      return this.isDisabled ? "" : this.href || "javascript:void(0);";
    }
  },
  methods: {
    onclick: function(event) {
      !this.isDisabled && !!this._events.click && this.$emit("click", event);
    }
  }
};
</script>