import '@mantine/core/styles.css'
import { MantineProvider, Container, Notification, Text } from '@mantine/core'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])
  const [cards, setCards] = useState([])
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?limit=12/',
      )

      const pokemonsWithSprites = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url)
          return {
            ...pokemon,
            sprite: pokemonData.data.sprites.front_default.toString(),
          }
        }),
      )

      setPokemons(pokemonsWithSprites)
      console.log(pokemonsWithSprites)
    }
    fetchPokemons()
  }, [])

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
