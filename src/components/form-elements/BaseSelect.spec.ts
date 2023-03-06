import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, it, expect } from 'vitest'

import BaseSelect from './BaseSelect.vue'

function mountComponent(propsData = {}) {
    return shallowMount(BaseSelect, {
        propsData
    })
}

describe('BaseSelect', () => {
    it('emits select text', async () => {
        const input = true
        const wrapper = mountComponent({ modelValue: false, label: 'foo' })
        const select = wrapper.find('.select')
        await nextTick();
        (select.element as HTMLSelectElement).value = "true";
        select.trigger('change')
        expect(wrapper.emitted('update:modelValue')![0][0]).toBe(input)
    })
})
