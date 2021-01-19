<template>
  <div class="InputBox" v-bind:class="[inputSize, isDisabled ? 'disabled' : '']">
    <div class="InputWrap InputField HLayout align-center">
      <input
        type="color"
        :value="inputValue"
        :disabled="isDisabled"
        :aria-describedby="describeBy"
        @change="onchange"
        @focue="onfocus"
        @blur="onblur"
      />
    </div>
  </div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import "../../style/toolkit/inputs.less";

export default {
  name: "ColorInput",
  data: function() {
    return {
      inputValue: this.value,
      INPUTSIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge"
      }
    };
  },
  props: {
    value: {
      type: String,
      default: "#000000"
    },
    size: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputSize: function() {
      return this.size
        ? normalizeInput(this.INPUTSIZE, this.size)
        : this.$parent.labelSize
        ? ""
        : normalizeInput(this.INPUTSIZE, "default");
    },
    describeBy: function() {
      return this.$parent.labelID || "";
    },
    isDisabled: function() {
      return this.$parent.isDisabled || this.disabled;
    }
  },
  methods: {
    onchange: function(event) {
      this.setValue(event.target.value);
      !this.isDisabled && !!this._events.change && this.$emit("change", event);
    },
    onfocus: function(event) {
      !this.isDisabled && !!this._events.focus && this.$emit("focus", event);
    },
    onblur: function(event) {
      !this.isDisabled && !!this._events.blur && this.$emit("blur", event);
    },
    setValue: function(newVal) {
      if (newVal !== this.inputValue) {
        this.inputValue = newVal;
      }
    },
    getValue: function() {
      return this.inputValue;
    }
  }
};
</script>