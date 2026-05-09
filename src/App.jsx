import '@mantine/core/styles.css'
import { MantineProvider, Container, Notification, Text } from '@mantine/core'
import Header from './components/Header'

function App() {
  return (
    <MantineProvider>
      <Container>
        <Header score={0} bestScore={0} />
        <Notification
          withCloseButton={false}
          withBorder
          color='grape'
          mt='md'
          bg='grape.0'
          radius='md'
        >
          <Text size='xs' c='grape'>
            Click every card once — the cards shuffle after each click. Clicking
            the same card twice resets your score
          </Text>
        </Notification>
      </Container>
    </MantineProvider>
  )
}

export default App
