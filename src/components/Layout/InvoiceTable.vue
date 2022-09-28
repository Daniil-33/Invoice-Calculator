<template>
    <div class="invoice__table">
        <template v-if="invoices.length">
            <table>
                <tbody>
                    <tr>
                        <th>
                            <Checkbox :checked="isAllChecked" @change="toggleAll"/>
                        </th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Sum</th>
                    </tr>
                    <tr v-for="item in invoices" :key="item.id">
                        <td>
                            <Checkbox v-model="selectedInvoices" :value="item.id"/>
                        </td>
                        <td>
                            <div class="invoice__table-product-name">{{ item.name }}</div>
                        </td>
                        <td>${{ item.price | floatNumberWithComas}}</td>
                        <td>{{ item.qty | numberWithSpaces}}</td>
                        <td>${{ (item.price * item.qty) | floatNumberWithComas }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="invoice__table-footer">
                <Button
                    type="danger"
                    :style="{ 'visibility': selectedInvoices.length ? 'visible' : 'hidden' }"
                    @click="removeInvoices"
                >
                    Delete
                </Button>

                <div>
                    <span class="invoice__table-total">Total:</span> ${{ totalPrice | floatNumberWithComas}}
                </div>
            </div>
        </template>

        <p v-else class="invoice__table-placeholder">You don`t have any invoices yet</p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex';
import { Invoice } from '../../interfaces';

import Checkbox from '../UI/Checkbox.vue';
import Button from '../UI/Button.vue';

export default defineComponent({
    components: {
        Checkbox,
        Button
    },
    filters: {
        numberWithSpaces(x: string) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },
        floatNumberWithComas(x: string) {
            var parts = (parseFloat(x)).toFixed(2).toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return parts.join(".");
        }
    },
    data: () => ({
        selectedInvoices: []
    }),
    computed: {
        ...mapGetters([
            'invoices'
        ]),
        totalPrice() {
            return this.invoices.reduce((acc: number, cur: Invoice) => {
                acc += parseFloat(cur.qty) * parseFloat(cur.price);
                return acc;
            }, 0)
        },
        isAllChecked() {
            return this.selectedInvoices.length !== 0 && this.invoices.length !== 0 && this.selectedInvoices.length === this.invoices.length
        }
    },
    methods: {
        ...mapActions([
            'getInvoicesFromLocalStorage',
            'deleteInvoice'
        ]),
        removeInvoices() {
            this.deleteInvoice(this.selectedInvoices);
            this.selectedInvoices = [];
        },
        toggleAll() {
            if (this.isAllChecked) {
                this.selectedInvoices = [];
            } else {
                this.selectedInvoices = this.invoices.map((el: Invoice) => el.id);
            }
        }
    },
    created() {
        this.getInvoicesFromLocalStorage()
    }
})
</script>