import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import MortgageCalculator from './MortgageCalculator.vue'

function mountComponent(): VueWrapper {
  return shallowMount(MortgageCalculator, {
    stubs: ['base-input', 'decrement-button', 'increment-button', 'content-card ']
  })
}

describe('MortgageCalculator', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mountComponent()
  })
  it('throws error when required inputs are not filled', async () => {
    await wrapper.vm.$nextTick()
    wrapper.findComponent({ ref: 'calculate' }).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.calculator-error').exists()).toBe(true)
  })

  it('submits user response', async () => {
    await wrapper.findComponent({ ref: 'purchase-price' }).vm.$emit('update:modelValue', 320000)
    await wrapper.findComponent({ ref: 'total-savings' }).vm.$emit('update:modelValue', 80000)
    await wrapper.findComponent({ ref: 'commision' }).vm.$emit('update:modelValue', false)
    await wrapper.findComponent({ ref: 'repayment-rate' }).vm.$emit('update:modelValue', 3)
    await wrapper.vm.$nextTick()
    wrapper.findComponent({ ref: 'calculate' }).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('submit-user-response')![0][0]).toBeDefined()
    expect(wrapper.findComponent({ ref: 'implied-loan' }).attributes().value).toBe('264204')
    expect(wrapper.findComponent({ ref: 'loan-to-value' }).attributes().value).toBe('82.56375')
  })
})
