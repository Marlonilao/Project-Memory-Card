import '@mantine/core/styles.css'
import {
  MantineProvider,
  Container,
  Notification,
  Text,
  Modal,
  Button,
  Stack,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import GameGrid from './components/GameGrid'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [opened, { open, close }] = useDisclosure(false)

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

  function shuffleArray(array) {
    const shuffled = [...array] // create a shallow copy to avoid mutating state

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // swap elements
    }

    return shuffled
  }

  const handleCardClick = (pokemon) => {
    if (clickedCards.includes(pokemon.name)) {
      resetGame()
      if (score > bestScore) {
        setBestScore(score)
      }
      return
    } else {
      if (score + 1 === pokemons.length) {
        setScore(score + 1)
        setBestScore(score + 1)
        open()
        return
      }
      setClickedCards([...clickedCards, pokemon.name])
      setScore(score + 1)
      setPokemons((prev) => shuffleArray(prev))
    }
  }

  const resetGame = () => {
    setScore(0)
    setClickedCards([])
  }

  const handlePlayAgain = () => {
    close()
    resetGame()
  }

  return (
    <MantineProvider>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Stack>
          <Text size='xl' ta='center'>
            🎉 You Won!
          </Text>
          <Text size='md' ta='center'>
            You clicked each cards only once!
          </Text>
          <Button onClick={handlePlayAgain}>Play Again</Button>
        </Stack>
      </Modal>
      <Container>
        <Header score={score} bestScore={bestScore} />
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
        <GameGrid pokemons={pokemons} handleCardClick={handleCardClick} />
      </Container>
    </MantineProvider>
  )
}

export default App
