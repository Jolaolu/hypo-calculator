<template>
    <base-button  ref="decrement" class="rate-btn" @click="emit('decrement')">
        <subtract-icon />
    </base-button>
</template>
<script setup lang="ts">
import BaseButton from '@/components/form-elements/BaseButton.vue';
import SubtractIcon from '~/components/icons/SubtractIcon.vue'
const emit = defineEmits(['decrement'])
</script>