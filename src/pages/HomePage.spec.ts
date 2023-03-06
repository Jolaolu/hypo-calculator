import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import HomePage from './HomePage.vue'

function mountComponent(): VueWrapper {
    return shallowMount(HomePage, {})
}

describe('HomePage', () => {
    it('renderscomponent', async () => {
        const wrapper = mountComponent()
        console.log(wrapper.html())
    })
})
