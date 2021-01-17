<style lang="less">
@import "../../controls/style/theme/theme.less";

.Logo {
  height: 54px;
  padding: 8px 16px;

  & > div {
    color: @primary-060;
    font-size: 32px;
    margin-right: 8px;
  }

  & > span {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
  }
}
</style>

<template>
  <div class="Logo HLayout align-center">
    <div>
      <a class="fa" v-bind:class="icon"></a>
    </div>
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  name: "Logo",
  data: function() {
    return {
      icon: "fa-compass",
      name: "CompuTas!"
    };
  }
};
</script>