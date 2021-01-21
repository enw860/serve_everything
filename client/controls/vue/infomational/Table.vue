<template>
	<div class="Table">
		<table>
			<thead>
				<tr>
					<th
						v-for="col of colSettings"
						:key="col.name"
						:style="`min-width: ${col.width || 'auto'};`"
					>
						{{ col.displayName }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data, index) of tableData" :key="`table${index}`">
					<th
						v-for="col of colSettings"
						:key="`col${index}-${col.name}`"
						:style="`width: ${col.width || 'auto'};`"
					>
						{{ data[col.name] || "-" }}
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import "../../style/toolkit/infomational/Table.less";

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