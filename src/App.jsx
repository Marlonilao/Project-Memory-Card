import '@mantine/core/styles.css'
import {
  MantineProvider,
  Container,
  Notification,
  Text,
  Modal,
  Button,
  Stack,
  Box,
  Alert,
  Loader,
  Center,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import GameGrid from './components/GameGrid'
import { IconInfoCircle } from '@tabler/icons-react'
import Footer from './components/Footer'
import { notifications, Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { pickRandom, shuffleArray } from './utils/helperFunctions'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])
  const [pokemonPool, setPokemonPool] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [opened, { open, close }] = useDisclosure(false)
  const [difficulty, setDifficulty] = useState('Easy')

  const getNumberOfPokemons = (diff) => {
    const map = { Easy: 12, Medium: 18, Hard: 24 }
    return map[diff] ?? 12
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      let pokemonsWithSprites

      const cached = localStorage.getItem('pokemons_')

      if (cached) {
        pokemonsWithSprites = JSON.parse(cached)
      } else {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?limit=1350/',
        )

        pokemonsWithSprites = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url)
            return {
              ...pokemon,
              sprite: pokemonData.data.sprites.front_default.toString(),
            }
          }),
        )

        localStorage.setItem('pokemons_', JSON.stringify(pokemonsWithSprites))
      }

      setPokemonPool(pokemonsWithSprites)

      const count = getNumberOfPokemons(difficulty)
      const chosenPokemons = pickRandom(pokemonsWithSprites, count)

      setPokemons(shuffleArray(chosenPokemons))
    }

    fetchPokemons()
  }, [])

  const handleCardClick = (pokemon) => {
    if (clickedCards.includes(pokemon.name)) {
      notifications.show({
        message: `Oops! You already clicked ${pokemon.name}!`,
        position: 'top-center',
        color: 'red',
        autoClose: 3000,
      })
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

  const resetGame = (difficultyOverride) => {
    const count = getNumberOfPokemons(difficultyOverride ?? difficulty)
    setScore(0)
    setClickedCards([])
    setPokemons(shuffleArray(pickRandom(pokemonPool, count)))
  }

  const handlePlayAgain = () => {
    close()
    resetGame()
  }

  const handleDifficultyChange = (value) => {
    setDifficulty(value)
    resetGame(value)
  }

  return (
    <MantineProvider>
      <Box
        bg='#1a1a2e'
        mih='100vh'
        p='xl'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          styles={{
            content: {
              backgroundColor: '#16213e',
              border: '1px solid #533483',
            },
            overlay: { backgroundColor: 'rgba(26, 26, 46, 0.85)' },
          }}
        >
          <Stack align='center' gap='sm' p='md'>
            <Text size='40px'>🎉</Text>
            <Text size='xl' fw={700} c='#f5c518' ta='center'>
              You Won!
            </Text>
            <Text size='sm' c='dimmed' ta='center' c='gray.4'>
              You clicked each card only once!
            </Text>
            <Button
              onClick={handlePlayAgain}
              fullWidth
              mt='md'
              style={{
                backgroundColor: '#f5c518',
                color: '#1a1a2e',
                fontWeight: 700,
              }}
            >
              Play Again
            </Button>
          </Stack>
        </Modal>
        <Notifications />
        <Container
          bg='#16213e'
          p='xl'
          style={{ borderRadius: '12px', flex: 1 }}
        >
          <Header
            score={score}
            bestScore={bestScore}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
          <Alert
            icon={<IconInfoCircle size={18} />}
            mt='md'
            radius='md'
            style={{
              backgroundColor: '#16213e',
              border: '1px solid #533483',
            }}
          >
            <Text size='xs' c='white'>
              Click every Pokémon once — they shuffle after each click. Clicking
              the same Pokémon twice resets them and your score.
            </Text>
          </Alert>
          <>
            {pokemons.length > 0 ? (
              <GameGrid pokemons={pokemons} handleCardClick={handleCardClick} />
            ) : (
              <Center mt='xl'>
                <Loader color='#f5c518' />
              </Center>
            )}
          </>
        </Container>
        <Footer />
      </Box>
    </MantineProvider>
  )
}

export default App
