import '@mantine/core/styles.css'
import { MantineProvider, Container } from '@mantine/core'
import Header from './components/Header'

function App() {
  return (
    <MantineProvider>
      <Container>
        <Header score={0} bestScore={0} />
      </Container>
    </MantineProvider>
  )
}

export default App
