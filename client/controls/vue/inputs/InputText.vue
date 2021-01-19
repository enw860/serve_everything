<template>
  <div class="InputBox" v-bind:class="[inputSize, isDisabled ? 'disabled' : '']">
    <div class="InputWrap InputField HLayout align-center" v-bind:class="errorClass">
      <input
        type="text"
        :value="inputValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :aria-describedby="describeBy"
        @change="onchange"
        @focus="onfocus"
        @blur="onblur"
        @keypress="onkeypress"
      />
    </div>
    <div class="error-message" v-if="!!error">{{error}}</div>
  </div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import "../../style/toolkit/inputs.less";

export default {
  name: "InputText",
  data: function () {
    return {
      inputValue: this.value,
      INPUTSIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge",
      },
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputSize: function () {
      return this.size
        ? normalizeInput(this.INPUTSIZE, this.size)
        : this.$parent.labelSize
        ? ""
        : normalizeInput(this.INPUTSIZE, "default");
    },
    describeBy: function () {
      return this.$parent.labelID || "";
    },
    isDisabled: function () {
      return this.$parent.isDisabled || this.disabled;
    },
    placeholderText: function () {
      return this.placeholder || this.$parent.value || "Placeholder";
    },
    errorClass: function () {
      return this.error ? "invalid-input" : "";
    },
  },
  methods: {
    onchange: function (event) {
      !this.isDisabled && !!this._events.change && this.$emit("change", event);
    },
    onfocus: function (event) {
      !this.isDisabled && !!this._events.focus && this.$emit("focus", event);
    },
    onblur: function (event) {
      this.setValue(event.target.value);
      !this.isDisabled && !!this._events.blur && this.$emit("blur", event);
    },
    onkeypress: function (event) {
      !this.isDisabled &&
        !!this._events.keypress &&
        this.$emit("keypress", event);
    },
    setValue: function (newVal) {
      if (newVal !== this.inputValue) {
        this.inputValue = newVal;
      }
    },
    getValue: function () {
      return this.inputValue;
    },
  },
};
</script>