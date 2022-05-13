import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import { useGameStore } from '@/store'

import JoinGame from '@/components/JoinGame.vue'

describe('JoinGame', () => {
  let wrapper
  let store

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(JoinGame, {
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [createTestingPinia()]
      }
    })

    store = useGameStore()
  })

  it('renders with no one joined', async () => {
    expect(wrapper.vm.playerName).toBe('')
  })

  it('does nothing if Join Game is clicked and input field is empty', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    expect(store.setPlayerName).not.toHaveBeenCalled()
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('moves to the player component with inputted name', async () => {
    const input = await wrapper.find('input')
    await input.setValue('Rick')

    await wrapper.find('form').trigger('submit.prevent')

    expect(store.setPlayerName).toHaveBeenCalledWith('Rick')
    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'Player',
      params: {
        playerName: 'Rick'
      }
    })
  })
})
