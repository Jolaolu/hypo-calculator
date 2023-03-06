import { describe, it, expect } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'

import App from './App.vue'

function mountComponent(): VueWrapper {
  return shallowMount(App, {})
}

describe('App', () => {
  it('renders component properly', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('home-page-stub').exists()).toBeTruthy()
  })
})
