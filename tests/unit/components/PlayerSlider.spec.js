import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { useGameStore } from '@/store'

import PlayerSlider from '@/components/PlayerSlider.vue'

describe('PlayerSlider', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(PlayerSlider, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            'hack.party game client': {
              game: {
                players: [
                  {
                    index: 0,
                    name: 'Morty',
                    score: 0,
                    team: undefined
                  }
                ]
              },
              player: {
                name: 'Morty',
                color: '#FF0000',
                controller: {
                  type: 'Slider',
                  value: 0
                }
              }

            }
          }
        })]
      }
    })

    store = useGameStore()
  })

  it('player controller value is changed if the slider is changed', async () => {
    const slider = await wrapper.findComponent({ name: 'Slider' })

    await slider.vm.update(35)

    expect(store.setPlayerValue).toHaveBeenCalledWith(35)
  })

  it('slider inherits color from the game', async () => {
    expect(wrapper.vm.currentColor).toBe('#FF0000')
  })

  it('defaults to a gray color', async () => {
    store.player.color = ''

    const color = await wrapper.vm.currentColor

    expect(color).toBe('#5b6670')
  })
})
