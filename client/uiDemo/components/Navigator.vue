<style lang="less">
@import "../../basic_controls/style/theme/theme.less";

.Nav-slide > .SlideoutContent {
  background-color: @grey-100;
  color: @white !important;

  .Navigator {
    width: 250px;

    .DropdownContent div.Button {
      width: 100%;
    }
  }
}
</style>

<template>
  <Slideout class="Nav-slide" ref="nav" @show="onShow" @hide="onHide">
    <div slot="content" class="Navigator">
      <Logo />
      <Dropdown
        v-for="category in Object.keys(categories)"
        :key="category"
        :title="category"
        colorStyle="dark"
      >
        <div slot="content">
          <Button
            v-for="term in categories[category]"
            :key="term.widgetName"
            :value="term.displayName"
            btnStyle="dark"
            @click="() => switchContextTerm(term)"
          ></Button>
        </div>
      </Dropdown>
    </div>
  </Slideout>
</template>

<script>
import store from "../store/store";
import Logo from "./Logo.vue";
import Slideout from "../../basic_controls/vue/layout/Slideout.vue";
import Button from "../../basic_controls/vue/infomational/Button.vue";
import Dropdown from "../../basic_controls/vue/Wrapper/Dropdown.vue";

export default {
  name: "Navigator",
  components: {
    Logo,
    Slideout,
    Button,
    Dropdown,
  },
  data: function () {
    return {
      categories: {
        Infomational: [
          {
            category: "Infomational",
            displayName: "Avatar",
            widgetName: "AvatarDemo",
          },
          {
            category: "Infomational",
            displayName: "Badge",
            widgetName: "BadgeDemo",
          },
        ],
        Inputs: [
          {
            category: "Inputs",
            displayName: "Checkbox Group",
            widgetName: "CheckboxGroup",
          },
          {
            category: "Inputs",
            displayName: "Color input",
            widgetName: "ColorInput",
          },
        ],
        Layout: [
          {
            category: "Layout",
            displayName: "Divide Line",
            widgetName: "DivideLine",
          },
          {
            category: "Layout",
            displayName: "Mask Layer",
            widgetName: "MaskLayer",
          },
        ],
        Wrapper: [
          {
            category: "Wrapper",
            displayName: "Drop Down",
            widgetName: "DropDown",
          },
          {
            category: "Wrapper",
            displayName: "Label Wrapper",
            widgetName: "LabelWrapper",
          },
        ],
      },
    };
  },
  computed: {
    displayNav: function () {
      return this.$store.state.uiDemo.displayNav;
    },
  },
  methods: {
    switchContextTerm: function (term) {
      store.dispatch("uiDemo/switchMainContent", term);
    },
    onHide: function () {
      store.dispatch("uiDemo/hideNav");
    },
  },
  watch: {
    displayNav: function (newVal, oldVal) {
      newVal && this.$refs.nav.showSlideout();
    },
  },
  beforeDestroy: function () {
    this.unwatch();
  },
};
</script>