// tests/utils/render.jsx
import { render as testingLibraryRender } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

export function renderWithMantine(ui) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }) => (
      <MantineProvider env='test'>{children}</MantineProvider>
    ),
  })
}
