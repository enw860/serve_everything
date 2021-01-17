<template>
  <div class="UIDemo">
    <PageContent />
    <MaskLayer></MaskLayer>
  </div>
</template>

<script>
import MaskLayer from "../controls/vue/layout/MaskLayer";
import PageContent from "./views/PageContent";

export default {
  name: "UIDemo",
  components: {
    PageContent,
    MaskLayer
  },
  data: function() {
    return {};
  },
  props: {},
  methods: {}
};
</script>