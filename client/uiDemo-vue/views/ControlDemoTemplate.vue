<style lang="less">
.Section {
  &:not(:last-child) {
    margin-bottom: 48px;
  }
}

.SectionLabel {
  font-size: 32px;
  margin-bottom: 16px;
}
</style>

<template>
  <div>
    <div class="Section" v-if="!!this.$slots['overview']">
      <div class="SectionLabel">
        <a name="overview">Overview</a>
      </div>
      <slot name="overview"></slot>
    </div>

    <div class="Section" v-if="!!this.$slots['widgit'] && !!this.$slots['control']">
      <div class="SectionLabel">
        <a name="demo">Live demo</a>
      </div>
      <WidgitDemo>
        <slot name="widgit" slot="widgit"></slot>
        <slot name="control" slot="control"></slot>
      </WidgitDemo>
    </div>

    <div class="Section" v-if="!!this.$slots['structure']">
      <div class="SectionLabel">
        <a name="structure">DOM structure (Live)</a>
      </div>
      <slot name="structure"></slot>
    </div>

    <div class="Section" v-if="!!this.$slots['properties']">
      <div class="SectionLabel">
        <a name="properties">Settings</a>
      </div>
      <slot name="properties"></slot>
    </div>

    <div class="Section" v-if="!!this.$slots['events']">
      <div class="SectionLabel">
        <a name="events">Events</a>
      </div>
      <slot name="events"></slot>
    </div>
  </div>
</template>

<script>
import WidgitDemo from "../components/WidgitDemo.vue";

export default {
  name: "ControlDemoTemplate",
  components: {
    WidgitDemo,
  },
};
</script>