<style lang="less">
@import "../../controls/style/theme/theme.less";

.MenuBar {
  width: 100%;
  height: 54px;
  border-bottom: 1px solid @grey-020;
  background-color: @grey-090;
  position: sticky;
  top: 0;
  z-index: 1000;

  > .Button {
    color: @white;
    &[role="button"]:active {
      color: @white !important;
    }
  }

  .SearchBar {
    margin-right: 16px;

    > .InputText {
      padding-right: 32px;
      z-index: 50;
    }

    > .Button {
      margin-left: -32px;
      z-index: 100;
    }
  }
}
</style>

<template>
  <div class="MenuBar HLayout align-center flow-between">
    <Button @click="launchNav" icon="fa-bars" value size="large" btnStyle="transparent" />
    <div class="SearchBar HLayout">
      <InputText placeholder="Search" size="small" />
      <Button icon="fa-search" value btnStyle="transparent" />
    </div>
  </div>
</template>

<script>
import store from "../store/store";
import Button from "../../controls/vue/infomational/Button.vue";
import InputText from "../../controls/vue/inputs/InputText.vue";

export default {
  name: "MenuBar",
  components: {
    Button,
    InputText,
  },
  methods: {
    launchNav: function (event) {
      store.dispatch("uiDemo/openNav");
    },
  },
};
</script>