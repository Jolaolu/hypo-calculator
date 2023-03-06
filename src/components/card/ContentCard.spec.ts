import { describe, it, expect } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'

import ContentCard from './ContentCard.vue'

const defaultSlot = '<p>Test Content</p>'
function mountComponent(slots = {}): VueWrapper {
  return shallowMount(ContentCard, {
    slots
  })
}

describe('ContentCard', () => {
  it('displays slot content', async () => {
    const wrapper = mountComponent({ default: defaultSlot })
    expect(wrapper.find({ ref: 'card' }).html()).toContain(defaultSlot)
  })
})
