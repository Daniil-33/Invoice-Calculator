<template>
    <label class="check" :for="id">
        <input
            type="checkbox"
            :value="value"
            :checked="checked || model.includes(value)" :id="id"
            @input="handleInput"
            @change="$emit('change', $event)"
        />
        <span class="check__square"></span>
        <slot></slot>
    </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        value: {
            type: String,
            default: () => {}
        },
        model: {
            type: Array,
            default: () => ([])
        },
        checked: {
            type: Boolean,
            default: () => false
        }
    },
    model: {
        prop: 'model',
        event: 'input'
    },
    emits: {
        input(value: string[]) {
            return value
        },
        change(value: Event) {
            return value
        },
    },
    data: () => ({
        id: Math.floor(Math.random() * 1000)
    }),
    methods: {
        handleInput() {
            if (this.model.indexOf(this.value) !== -1) {
                this.model.splice(this.model.indexOf(this.value), 1);
            } else {
                this.model.push(this.value);
            }

            this.$emit('input', this.model);
        }
    }
})
</script>