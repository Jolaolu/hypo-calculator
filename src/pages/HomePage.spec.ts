import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import HomePage from './HomePage.vue'

vi.useFakeTimers()

function mountComponent(): VueWrapper {
    return shallowMount(HomePage, {})
}

describe('HomePage', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mountComponent()
    })

    it('renders loading state after user submission', async () => {
        await wrapper.vm.$nextTick()
        wrapper.findComponent({ name: 'mortgage-calculator' }).vm.$emit('submit-user-response', '')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.loader').exists()).toBeTruthy()
    })

    it('renders mortgage recommendation after user submission', async () => {
        wrapper.findComponent({ name: 'mortgage-calculator' }).vm.$emit('submit-user-response', '')
        vi.runAllTimers()
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({name: 'mortgage-rates-table'}).exists()).toBeTruthy()
    })
    
    it('goes back to calculator', async () => {
        wrapper.findComponent({ name: 'mortgage-calculator' }).vm.$emit('submit-user-response', '')
        vi.runAllTimers()
        await wrapper.vm.$nextTick()
        wrapper.findComponent({ name: 'mortgage-rates-table' }).vm.$emit('go-back')
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent({ name: 'mortgage-calculator' }).exists()).toBe(true)
    })
})
