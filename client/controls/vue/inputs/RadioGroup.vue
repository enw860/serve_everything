<template>
  <div class="InputGroup" v-bind:class="[isDisabled ? 'disabled' : '', inputSize]">
    <div class="GroupWrapper InputWrap" v-bind:class="layoutClass">
      <div class="OptionWrapper" v-for="optionObj in computedOptions" :key="optionObj.option">
        <input
          type="radio"
          :value="optionObj.option"
          :name="describeBy"
          :id="optionObj.controlID"
          :checked="optionObj.isChecked"
          :disabled="isDisabled"
          @change="onchange"
        />
        <label :for="optionObj.controlID" class="HLayout flow-start">
          <div class="RadioSelector" />
          <span>{{optionObj.option}}</span>
        </label>
      </div>
    </div>
    <div class="error-message" v-if="!!error">{{error}}</div>
  </div>
</template>

<script>
import { generateComponentID, normalizeInput } from "../../util/utilities";
import "../../style/toolkit/inputs.less";

export default {
  name: "RadioGroup",
  data: function() {
    return {
      controlID: "",
      choice: this.value,
      LAYOUT: {
        vertical: "VLayout",
        horizontal: "HLayout"
      },
      INPUTSIZE: {
        small: "size-small",
        default: "size-normal",
        large: "size-large",
        xlarge: "size-xlarge"
      }
    };
  },
  props: {
    size: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: []
    },
    value: {
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
    layout: {
      type: String,
      default: "Vertical"
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
    errorClass: function() {
      return this.error ? "invalid-input" : "";
    },
    computedOptions: function() {
      if (!this.controlID) {
        this.controlID = generateComponentID(this.$options.name);
      }

      return this.options.map((option, index) => {
        return {
          option,
          isChecked: index === this.getSelectedIndex(),
          controlID: `${this.controlID}-RadioBtn${index}`
        };
      });
    },
    layoutClass: function() {
      return normalizeInput(this.LAYOUT, this.layout);
    }
  },
  methods: {
    onchange: function(event) {
      this.choice = this.options.indexOf(event.target.value);
      !this.isDisabled && !!this._events.change && this.$emit("change", event);
    },
    setValueByIndex: function(index) {
      if (index > -1 && index < this.options.length) {
        this.setValueByValue(this.options[index]);
      }
    },
    setValueByValue: function(value) {
      if (this.options.indexOf(value) > -1) {
        this.choice = value;
      }
    },
    getSelectedIndex: function() {
      return this.options.indexOf(this.choice);
    },
    getSelectedValue: function() {
      return this.choice || "";
    }
  }
};
</script>