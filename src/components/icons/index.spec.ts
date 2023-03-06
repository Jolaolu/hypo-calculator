import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import * as icons from './'

describe('icons', () => {
  Object.values(icons).forEach((icon) => {
    describe(icon.name, () => {
      it('renders an svg icon', () => {
        expect(shallowMount(icon).find('svg').exists()).toBe(true)
      })
    })
  })
})
