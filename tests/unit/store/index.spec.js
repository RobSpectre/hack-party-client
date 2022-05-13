import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '@/store'

describe('GameStore State', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has correct default states', () => {
    const store = useGameStore()

    expect(store.game).toStrictEqual({})

    expect(store.player.name).toStrictEqual('')
    expect(store.player.color).toStrictEqual('')
    expect(store.player.score).toStrictEqual(0)
    expect(store.player.controller.type).toStrictEqual(undefined)
    expect(store.player.controller.value).toStrictEqual(0)
    expect(store.player.controller.options).toStrictEqual([])
  })

  it('sets player name correctly', () => {
    const store = useGameStore()

    store.setPlayerName('Rick')

    expect(store.player.name).toBe('Rick')
  })

  it('does not set player name with empty string', () => {
    const store = useGameStore()

    store.setPlayerName('')

    expect(store.player.name).toBe('')
  })

  it('sets player controller value correctly', () => {
    const store = useGameStore()

    store.setPlayerValue(1)

    expect(store.player.controller.value).toBe(1)
  })

  it('sets player color correctly', () => {
    const store = useGameStore()

    store.setPlayerValue(1)

    expect(store.player.controller.value).toBe(1)
  })

  it('sets player color correctly', () => {
    const store = useGameStore()

    store.setPlayerColor('#FF0000')

    expect(store.player.color).toBe('#FF0000')
  })

  it('sets player score correctly', () => {
    const store = useGameStore()

    store.setPlayerScore(1)

    expect(store.player.score).toBe(1)
  })

  it('sets player controller type', () => {
    const store = useGameStore()

    store.setPlayerController('slider')

    expect(store.player.controller.type).toBe('slider')
  })

  it('sets player state correctly', () => {
    const store = useGameStore()

    store.changePlayerState({
      name: 'Rick',
      score: 1,
      color: '#FF0000'
    })

    expect(store.player.name).toBe('Rick')
    expect(store.player.score).toBe(1)
    expect(store.player.color).toBe('#FF0000')

    expect(store.player.controller.type).toBe(undefined)
  })
})
