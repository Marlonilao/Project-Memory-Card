import { vi, describe, it, expect } from 'vitest'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  mockPokemonsEasy,
  mockPokemonsMedium,
  mockPokemonsHard,
} from './utils/mockPokemons'
import App from '../src/App'
import axios from 'axios'

vi.mock('axios')

vi.mock('../src/components/Header', () => ({
  default: ({ score, bestScore, difficulty, onDifficultyChange }) => (
    <div>
      <div>Score: {score}</div>
      <div>Best Score: {bestScore}</div>
      <select value={difficulty} onChange={onDifficultyChange}>
        <option value='Easy'>Easy</option>
        <option value='Medium'>Medium</option>
        <option value='Hard'>Hard</option>
      </select>
    </div>
  ),
}))

vi.mock('../src/components/GameGrid', () => ({
  default: ({ pokemons, handleCardClick }) => (
    <div>
      {pokemons.length > 0 &&
        pokemons.map((pokemon) => (
          <button onClick={() => handleCardClick(pokemon)} key={pokemon.name}>
            {pokemon.name}
          </button>
        ))}
    </div>
  ),
}))

describe('App Component', () => {
  it('shows loading  state while fetching pokemons', async () => {
    axios.get.mockResolvedValue({
      data: { results: mockPokemonsEasy },
    })

    render(<App />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))
  })

  it('renders pokemons after fetching', async () => {
    axios.get.mockResolvedValue({
      data: { results: mockPokemonsEasy },
    })

    render(<App />)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))

    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('ivysaur')).toBeInTheDocument()
    expect(screen.getByText('venusaur')).toBeInTheDocument()
    expect(screen.getByText('charmander')).toBeInTheDocument()
    expect(screen.getByText('charmeleon')).toBeInTheDocument()
    expect(screen.getByText('charizard')).toBeInTheDocument()
    expect(screen.getByText('squirtle')).toBeInTheDocument()
    expect(screen.getByText('wartortle')).toBeInTheDocument()
    expect(screen.getByText('blastoise')).toBeInTheDocument()
    expect(screen.getByText('caterpie')).toBeInTheDocument()
    expect(screen.getByText('metapod')).toBeInTheDocument()
    expect(screen.getByText('butterfree')).toBeInTheDocument()
  })

  it('handles card clicks and updates score', async () => {
    axios.get.mockResolvedValue({
      data: { results: mockPokemonsEasy },
    })

    render(<App />)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))

    const user = userEvent.setup()
    const bulbasaurButton = screen.getByText('bulbasaur')

    await user.click(bulbasaurButton)
    expect(screen.getByText('Score: 1')).toBeInTheDocument()

    const ivysaurButton = screen.getByText('ivysaur')
    await user.click(ivysaurButton)
    expect(screen.getByText('Score: 2')).toBeInTheDocument()

    const charmanderButton = screen.getByText('charmander')
    await user.click(charmanderButton)
    expect(screen.getByText('Score: 3')).toBeInTheDocument()
  })

  it('notify users when they click on a duplicate card, reset score and update best score', async () => {
    axios.get.mockResolvedValue({
      data: { results: mockPokemonsEasy },
    })

    render(<App />)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))

    const user = userEvent.setup()

    await user.click(screen.getByText('bulbasaur'))
    expect(screen.getByText('Score: 1')).toBeInTheDocument()

    await user.click(screen.getByText('ivysaur'))
    expect(screen.getByText('Score: 2')).toBeInTheDocument()

    await user.click(screen.getByText('bulbasaur'))
    expect(
      screen.getByText('Oops! You already clicked Bulbasaur!'),
    ).toBeInTheDocument()
    expect(screen.getByText('Score: 0')).toBeInTheDocument()
    expect(screen.getByText('Best Score: 2')).toBeInTheDocument()
  })

  it('shows congratulations notification when user clicks all cards without duplicates', async () => {
    axios.get.mockResolvedValue({
      data: { results: mockPokemonsEasy },
    })

    render(<App />)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))

    const user = userEvent.setup()

    await user.click(screen.getByText('bulbasaur'))
    await user.click(screen.getByText('ivysaur'))
    await user.click(screen.getByText('venusaur'))
    await user.click(screen.getByText('charmander'))
    await user.click(screen.getByText('charmeleon'))
    await user.click(screen.getByText('charizard'))
    await user.click(screen.getByText('squirtle'))
    await user.click(screen.getByText('wartortle'))
    await user.click(screen.getByText('blastoise'))
    await user.click(screen.getByText('caterpie'))
    await user.click(screen.getByText('metapod'))
    await user.click(screen.getByText('butterfree'))

    expect(await screen.findByText('You Won!')).toBeInTheDocument()
    expect(
      await screen.findByText('You clicked each card only once!'),
    ).toBeInTheDocument()
  })

  it('clicking playing again after winning resets the game', async () => {
    axios.get.mockResolvedValue({
      data: { results: mockPokemonsEasy },
    })

    render(<App />)

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'))

    const user = userEvent.setup()

    await user.click(screen.getByText('bulbasaur'))
    await user.click(screen.getByText('ivysaur'))
    await user.click(screen.getByText('venusaur'))
    await user.click(screen.getByText('charmander'))
    await user.click(screen.getByText('charmeleon'))
    await user.click(screen.getByText('charizard'))
    await user.click(screen.getByText('squirtle'))
    await user.click(screen.getByText('wartortle'))
    await user.click(screen.getByText('blastoise'))
    await user.click(screen.getByText('caterpie'))
    await user.click(screen.getByText('metapod'))
    await user.click(screen.getByText('butterfree'))

    expect(screen.getByText('Score: 12')).toBeInTheDocument()
    expect(await screen.findByText('You Won!')).toBeInTheDocument()

    const playAgainButton = await screen.findByRole('button', {
      name: /play again/i,
    })
    await user.click(playAgainButton)

    expect(screen.getByText('Score: 0')).toBeInTheDocument()

    await user.click(screen.getByText('bulbasaur'))
    expect(screen.getByText('Score: 1')).toBeInTheDocument()
  })
})
