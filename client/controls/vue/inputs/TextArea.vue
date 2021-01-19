<template>
  <div class="InputBox" v-bind:class="[inputSize, isDisabled ? 'disabled' : '']">
    <div class="HLayout align-center" v-bind:class="errorClass">
      <textarea
        :value="inputValue"
        :placeholder="placeholderText"
        :disabled="isDisabled"
        :aria-describedby="describeBy"
        :maxlength="charLimit"
        @change="onchange"
        @focue="onfocus"
        @blur="onblur"
        @keyup="onkeyup"
      />
      <div v-if="charLimit > 0" class="CharCount">{{`${inputValue.length}/${charLimit}`}}</div>
    </div>
    <div class="error-message" v-if="!!error">{{error}}</div>
  </div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import "../../style/toolkit/inputs.less";

export default {
  name: "TextArea",
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
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    },
    charLimit: {
      type: Number,
      default: NaN
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
    },
    placeholderText: function() {
      return this.placeholder || this.$parent.value || "Placeholder";
    },
    errorClass: function() {
      return this.error ? "invalid-input" : "";
    }
  },
  methods: {
    onkeyup: function(event) {
      this.setValue(event.target.value);
    },
    onchange: function(event) {
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