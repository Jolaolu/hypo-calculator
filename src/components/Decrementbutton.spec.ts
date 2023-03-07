import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DecrementButton from './DecrementButton.vue'

function mountComponent(): VueWrapper {
  return shallowMount(DecrementButton, {})
}
describe('DecrementButton', () => {
  it(' emits click event ', () => {
    const wrapper = mountComponent()
    wrapper.findComponent({ ref: 'decrement' }).trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })
})
