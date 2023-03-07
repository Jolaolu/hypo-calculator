import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import BaseInput from './BaseInput.vue'

function mountComponent(props = {}): VueWrapper {
  return shallowMount(BaseInput, {
    props
  } as any)
}

describe('BaseInput', () => {
  it('emits input text', async () => {
    const input = 1234
    const wrapper = mountComponent({ modelValue: 1234, label: 'foo', inputName: 'foo' })
    await wrapper.find('.input').setValue(input)
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(input)
  })
})
