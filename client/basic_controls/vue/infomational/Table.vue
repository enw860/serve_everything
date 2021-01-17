<style lang="less">
@import "../../style/theme/theme.less";

.Table {
  position: relative;
  width: 100%;
  text-align: left;

  table {
    border-spacing: 0;
    width: inherit;
  }

  th {
    padding: 16px;
    border-bottom: 1px solid @grey-020;
  }

  thead {
    background-color: @grey-020;
    th {
      font-weight: 600;
    }
  }
}
</style>

<template>
  <div class="Table">
    <table>
      <thead>
        <tr>
          <th
            v-for="col of colSettings"
            :key="col.name"
            :style="`min-width: ${col.width || 'auto'};`"
          >{{col.displayName}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) of tableData" :key="`table${index}`">
          <th
            v-for="col of colSettings"
            :key="`col${index}-${col.name}`"
            :style="`width: ${col.width || 'auto'};`"
          >{{data[col.name] || '-'}}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data: function () {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    colSettings: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {},
};
</script>