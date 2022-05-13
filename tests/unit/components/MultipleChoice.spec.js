import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { useGameStore } from '@/store'

import MultipleChoice from '@/components/MultipleChoice.vue'

describe('MultipleChoice', () => {
  let wrapper
  let store

  beforeEach(() => {
    wrapper = mount(MultipleChoice, {
      props: {
        choices: ['Scorpion', 'Sub-zero', 'Liu Kang']
      },
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
                  type: 'MultipleChoice',
                  options: ['Scorpion', 'Sub-zero', 'Liu Kang'],
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

  it('player controller value is changed if a choice is selected', async () => {
    const button = await wrapper.find('button')

    await button.trigger('click')

    expect(store.setPlayerValue).toHaveBeenCalledWith('Scorpion')
  })
})

describe('MultipleChoice Empty', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MultipleChoice, {
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
                  type: 'MultipleChoice',
                  value: 0
                }
              }
            }
          }
        })]
      }
    })
  })

  it('unchosenOptions returns empty array if props are not passed', async () => {
    expect(wrapper.vm.unchosenOptions).toStrictEqual([])
  })
})
