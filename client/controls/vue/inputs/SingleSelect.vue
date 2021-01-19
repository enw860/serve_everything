<template>
  <div class="InputBox" v-bind:class="[inputSize, isDisabled ? 'disabled' : '']">
    <div class="SingleSelect InputField InputWrap HLayout align-center" v-bind:class="errorClass">
      <select :id="describeBy" :value="choice" @change="onchange">
        <option
          v-for="(optionObj, index) in computedOptions"
          :key="optionObj.option + index"
          :selected="optionObj.isChecked"
          :value="optionObj.option"
        >{{optionObj.option}}</option>
      </select>
    </div>
    <div class="error-message" v-if="!!error">{{error}}</div>
  </div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../util/utilities";
import "../../style/toolkit/inputs.less";

export default {
  name: "SingleSelect",
  data: function () {
    return {
      choice: this.value,
      INPUTSIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge",
      },
    };
  },
  props: {
    options: {
      type: Array,
      default: [],
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
    errorClass: function () {
      return this.error ? "invalid-input" : "";
    },
    computedOptions: function () {
      if (!this.controlID) {
        this.controlID = generateComponentID(this.$options.name);
      }

      return this.options.map((option, index) => {
        return {
          option,
          isChecked: index === this.getSelectedIndex(),
          controlID: `${this.controlID}-SingleSelectOption${index}`,
        };
      });
    },
  },
  methods: {
    onchange: function (event) {
      this.setValueByValue(event.target.value);
      !this.isDisabled && !!this._events.change && this.$emit("change", event);
    },
    onfocus: function (event) {
      !this.isDisabled && !!this._events.focus && this.$emit("focus", event);
    },
    onblur: function (event) {
      !this.isDisabled && !!this._events.blur && this.$emit("blur", event);
    },
    setValueByIndex: function (index) {
      if (index > -1 && index < this.options.length) {
        this.setValueByValue(this.options[index]);
      }
    },
    setValueByValue: function (value) {
      if (this.options.indexOf(value) > -1) {
        this.choice = value;
      }
    },
    getSelectedIndex: function () {
      return this.options.indexOf(this.choice);
    },
    getSelectedValue: function () {
      return this.choice || "";
    },
  },
};
</script>