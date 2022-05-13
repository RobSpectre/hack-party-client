import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { useGameStore } from '@/store'

import PlayerHeader from '@/components/PlayerHeader.vue'

describe('PlayerHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PlayerHeader, {
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
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
                color: '#FF0000'
              }

            }
          }
        })]
      }
    })
  })

  it('renders the player name in the header', async () => {
    const h2 = await wrapper.find('h2')
    expect(h2.text()).toBe('Morty')
  })

  it('renders the player color', async () => {
    expect(wrapper.vm.currentColor).toBe('#FF0000')
  })

  it('renders the default color if none is supplied', async () => {
    const store = useGameStore()

    store.player.color = ''

    expect(wrapper.vm.currentColor).toBe('#5b6670')
  })
})
