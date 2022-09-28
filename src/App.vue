<template>
 	<div id="app">
		<div class="container">
			<h3 >Vue Invoice Calc</h3>

			<div class="invoice__form-wrap">
				<InvoiceForm />
			</div>

			<div class="invoice__table-wrap">
				<InvoiceTable />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InvoiceForm from "./components/Layout/InvoiceForm.vue";
import InvoiceTable from "./components/Layout/InvoiceTable.vue";

export default defineComponent({
	components: {
    InvoiceForm,
	InvoiceTable
  },
});
</script>

<style lang="scss">
@import "./assets/styles/styles.scss";
</style>
<style>
@import url("./assets/styles/reset.css");
</style>
