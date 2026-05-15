import { vi, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GameGrid from '../src/components/GameGrid'
import {
  mockPokemonsEasy,
  mockPokemonsMedium,
  mockPokemonsHard,
} from './utils/mockPokemons'
import { renderWithMantine } from './utils/render'

describe('GameGrid Component', () => {
  it('renders nothing when pokemons is not provided', () => {
    renderWithMantine(<GameGrid />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders 12 cards when the difficulty is easy', () => {
    renderWithMantine(<GameGrid pokemons={mockPokemonsEasy} />)
    expect(screen.getAllByRole('img').length).toBe(12)
  })

  it('renders 18 cards when the difficulty is medium', () => {
    renderWithMantine(<GameGrid pokemons={mockPokemonsMedium} />)
    expect(screen.getAllByRole('img').length).toBe(18)
  })

  it('renders 24 cards when the difficulty is hard', () => {
    renderWithMantine(<GameGrid pokemons={mockPokemonsHard} />)
    expect(screen.getAllByRole('img').length).toBe(24)
  })

  it('should call the handleCardClick function when a card is clicked', async () => {
    const user = userEvent.setup()
    const handleCardClick = vi.fn()
    renderWithMantine(
      <GameGrid
        pokemons={mockPokemonsEasy}
        handleCardClick={handleCardClick}
      />,
    )

    const card = screen.getAllByRole('img')[0]
    await user.click(card)

    expect(handleCardClick).toHaveBeenCalledTimes(1)
    expect(handleCardClick).toHaveBeenCalledWith(mockPokemonsEasy[0])
  })

  it('renders the correct sprite for each pokemon', () => {
    renderWithMantine(<GameGrid pokemons={mockPokemonsEasy} />)
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    )
  })
})
