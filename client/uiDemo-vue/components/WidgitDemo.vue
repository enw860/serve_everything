<style lang="less">
@import "../../controls/style/theme/theme.less";

.widgitDemoControl {
  width: 100%;

  .widgit {
    width: 60%;
    margin-right: 16px;
    background-color: @grey-010;
  }

  .widgitControl {
    width: 40%;

    > * > * {
      margin-left: 8px;
      margin-right: 8px;
    }

    > * > *:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
</style>

<template>
  <div class="widgitDemoControl HLayout">
    <div class="widgit HLayout align-center flow-center">
      <slot name="widgit"></slot>
    </div>
    <div class="widgitControl VLayout">
      <slot name="control"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "widgitDemo"
};
</script>

