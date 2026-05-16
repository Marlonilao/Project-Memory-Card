import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMantine } from './utils/render'
import Header from '../src/components/Header'

describe('Header Component', () => {
  it('renders the title and subtitle', () => {
    renderWithMantine(<Header score={0} bestScore={0} />)
    expect(screen.getByText('Pokémon Memory')).toBeInTheDocument()
    expect(
      screen.getByText("Click each Pokémon only once — don't repeat!"),
    ).toBeInTheDocument()
  })

  it('renders the correct score and best score', () => {
    renderWithMantine(<Header score={5} bestScore={10} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders the difficulty select with default value Easy', () => {
    renderWithMantine(<Header score={0} bestScore={0} difficulty='Easy' />)
    expect(screen.getByRole('combobox')).toHaveValue('Easy')
  })

  it('calls onDifficultyChange when difficulty is changed', async () => {
    const user = userEvent.setup()
    const onDifficultyChange = vi.fn()
    renderWithMantine(
      <Header
        score={0}
        bestScore={0}
        difficulty='Easy'
        onDifficultyChange={onDifficultyChange}
      />,
    )

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByText('Medium'))

    expect(onDifficultyChange).toHaveBeenCalledTimes(1)
  })
})
