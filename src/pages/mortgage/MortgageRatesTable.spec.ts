import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import { rateResponse } from '@/static/mock'

import MortgageRatesTable from './MortgageRatesTable.vue'

function mountComponent(props = {}): VueWrapper {
  return shallowMount(MortgageRatesTable, {
    props
  })
}

describe('MortgageRatesTable', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mountComponent({ mortgageRates: rateResponse.data.root })
  })
  it('renders component', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.find('table').exists()).toBe(true)
  })
  it('goes back to previous component', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'base-button' }).exists()).toBe(true)
    wrapper.findComponent({ name: 'base-button' }).vm.$emit('click')
    expect(wrapper.emitted('go-back')).toBeDefined()
  })
})
