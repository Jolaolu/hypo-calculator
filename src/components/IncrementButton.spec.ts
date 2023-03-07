import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import IncrementButton from './IncrementButton.vue'

function mountComponent(): VueWrapper {
  return shallowMount(IncrementButton, {})
}
describe('IncrementButton', () => {
  it(' emits click event ', () => {
    const wrapper = mountComponent()
    wrapper.findComponent({ ref: 'increment' }).trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })
})
