<template>
    <input
        class="input"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
    />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        value: {
            type: String,
            default: () => ''
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    emits: {
        input(value: string) {
            return value
        },
        focus(event: Event) {
            return event
        },
        blur(event: Event) {
            return event
        }
    },
})
</script>