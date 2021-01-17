<template>
  <div class="InputBox" v-bind:class="[inputSize, isDisabled ? 'disabled' : '']">
    <div class="InputWrap InputField HLayout align-center">
      <input ref="fileInput" type="file" @change="onchange" :multiple="multipleFile" />
      <Button
        btnStyle="primary"
        icon="fa-upload"
        :value="btnText"
        :disabled="isDisabled"
        :aria-describedby="describeBy"
        @click="chooseFiles"
      ></Button>
    </div>
  </div>
</template>

<script>
import { normalizeInput } from "../utilities";
import "../../style/toolkit/inputs.less";
import Button from "../infomational/Button.vue";

export default {
  name: "ColorInput",
  data: function() {
    return {
      files: []
    };
  },
  components: {
    Button
  },
  props: {
    size: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multipleFile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    describeBy: function() {
      return this.$parent.labelID || "";
    },
    isDisabled: function() {
      return this.$parent.isDisabled || this.disabled;
    },
    btnText: function() {
      const filesCount = this.files.length;
      return !!filesCount
        ? `${filesCount} ${filesCount === 1 ? "file is" : "files are"} choosen`
        : this.multipleFile
        ? "Choose files"
        : "Choose file";
    }
  },
  methods: {
    onchange: function(event) {
      this.files = event.target.files;
      !this.isDisabled && !!this._events.change && this.$emit("change", event);
    },
    getValue: function() {
      return this.files;
    },
    chooseFiles: function(event) {
      this.$refs.fileInput.click();
    }
  }
};
</script>