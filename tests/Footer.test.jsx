import { describe, it, expect } from 'vitest'
import Footer from '../src/components/Footer'
import { renderWithMantine } from './utils/render'

describe('Footer Component', () => {
  it('matches snapshot', () => {
    const { container } = renderWithMantine(<Footer />)
    expect(container).toMatchSnapshot()
  })
})
