<template>
    <base-button ref="increment" class="rate-btn" @click="emit('increment')">
        <plus-icon />
    </base-button>
</template>
<script setup lang="ts">
import BaseButton from '@/components/form-elements/BaseButton.vue';
import PlusIcon from '~/components/icons/PlusIcon.vue'
const emit = defineEmits(['increment'])
</script>