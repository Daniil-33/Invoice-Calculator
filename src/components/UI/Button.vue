<template>
    <button
        class="btn"
        :class="StyleClasses[type.toUpperCase()] || StyleClasses.SUCCESS"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

enum StyleClasses {
    'PRIMARY' = 'btn--primary',
    'DANGER' = 'btn--danger'
}

export default defineComponent({
    props: {
        type: {
            type: String,
            default: () => StyleClasses
        }
    },
    emits: {
        click(value: Event) {
            return value
        },
    },
    data: () => ({
        StyleClasses
    })
})
</script>