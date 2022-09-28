<template>
    <div class="invoice__form">
        <div class="invoice__form-inputs">
            <div class="invoice__form-input-wrap">
                <Input
                    placeholder="Product name"
                    v-model="$v.name.$model"
                    :class="{ 'input--invalid': (!$v.name.required || !$v.name.minLength) && $v.name.$dirty }"
                    @blur="$v.name.$touch()"
                />
                <span v-if="!$v.name.required && $v.name.$dirty" class="invoice__form-input-error">This field is required</span>
                <span v-else-if="!$v.name.minLength && $v.name.$dirty" class="invoice__form-input-error">Name must have at least {{ $v.name.$params.minLength.min }} letters</span>
            </div>

            <div class="invoice__form-input-wrap invoice__form-inputs--price">
                <Input
                    type="number"
                    placeholder="Price"
                    v-model="$v.price.$model"
                    :class="{ 'input--invalid': (!$v.price.required || !$v.price.between) && $v.price.$dirty }"
                    @blur="$v.price.$touch()"
                />
                <span v-if="!$v.price.required && $v.price.$dirty" class="invoice__form-input-error">This field is required</span>
                <span v-else-if="!$v.price.between && $v.price.$dirty" class="invoice__form-input-error">The price should be between ${{ $v.price.$params.between.min }} and ${{ $v.price.$params.between.max }}</span>
            </div>

            <div class="invoice__form-input-wrap invoice__form-inputs--qta">
                <Input
                    type="number"
                    placeholder="Qty"
                    v-model="$v.qty.$model"
                    :class="{ 'input--invalid': (!$v.qty.required || !$v.qty.between) && $v.qty.$dirty }"
                    @blur="$v.qty.$touch()"
                />
                <span v-if="!$v.qty.required && $v.qty.$dirty" class="invoice__form-input-error">This field is required</span>
                <span v-else-if="!$v.qty.between && $v.qty.$dirty" class="invoice__form-input-error">The Qty should be between {{ $v.qty.$params.between.min }} and {{ $v.qty.$params.between.max }}</span>
            </div>
        </div>

        <Button
            class="invoice__form-btn"
            type="primary"
            @click="addInvoice"
        >
            Add
        </Button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, minLength, between } from 'vuelidate/lib/validators'
import { Invoice } from '../../interfaces';

import Input from '../UI/Input.vue';
import Button from '../UI/Button.vue';

export default defineComponent({
    components: {
        Input,
        Button
    },
    mixins: [validationMixin],
    data: () => ({
        name: '',
        price: null,
        qty: null 
    }),
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        price: {
            required,
            between: between(1, 10000)
        },
        qty: {
            required,
            between: between(1, 100)
        }
    },
    methods: {
        ...mapActions({
            pushInvoice: 'addInvoice'
        }),
        addInvoice(): void {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                const invoice: Invoice = {
                    id: (Math.floor(Math.random() * 100000)).toString(),
                    name: this.name,
                    price: this.price,
                    qty: this.qty
                };

                this.pushInvoice(invoice);
                this.reset();
            }
        },
        reset() {
            this.$v.name.$model = '';
            this.$v.price.$model = '';
            this.$v.qty.$model = '';
            this.$v.$reset();
        }
    }
})
</script>