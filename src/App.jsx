import '@mantine/core/styles.css'
import {
  MantineProvider,
  Container,
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
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Header from './components/Header'
import GameGrid from './components/GameGrid'
import { IconInfoCircle, IconWifiOff } from '@tabler/icons-react'
import Footer from './components/Footer'
import { notifications, Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import {
  pickRandom,
  shuffleArray,
  getNumberOfPokemons,
  capitalizeFirstLetter,
} from './utils/helperFunctions'
import useSound from 'use-sound'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [clickedCards, setClickedCards] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [opened, { open, close }] = useDisclosure(false)
  const [difficulty, setDifficulty] = useState('Easy')
  const [error, setError] = useState(null)

  const pokemonPoolRef = useRef([])

  const [playGoodClick] = useSound('/up-chime-1.mp3', {
    volume: 0.1,
  })

  const [playBadClick] = useSound('/dats-wrong.wav')

  const [playGoodJob] = useSound('/good-job.wav', {
    volume: 0.1,
  })

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?limit=898/',
        )
        const count = getNumberOfPokemons('Easy')
        const chosenPokemons = pickRandom(response.data.results, count)

        pokemonPoolRef.current = response.data.results
        setPokemons(shuffleArray(chosenPokemons))
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error)
        setError('Failed to load Pokémon data. Please try again later.')
      }
    }

    fetchPokemons()
  }, [])

  const handleCardClick = (pokemon) => {
    if (clickedCards.includes(pokemon.name)) {
      notifications.show({
        message: `Oops! You already clicked ${capitalizeFirstLetter(pokemon.name)}!`,
        position: 'top-center',
        color: 'red',
        autoClose: 3000,
      })
      const newBestScore = Math.max(score, bestScore)
      setBestScore(newBestScore)
      playBadClick()
      resetGame()
      return
    } else {
      if (score + 1 === pokemons.length) {
        setScore(score + 1)
        setBestScore(score + 1)
        playGoodJob()
        open()
        return
      }
      playGoodClick()
      setClickedCards([...clickedCards, pokemon.name])
      setScore(score + 1)
      setPokemons((prev) => shuffleArray(prev))
    }
  }

  const resetGame = () => {
    const count = getNumberOfPokemons(difficulty)
    setScore(0)
    setClickedCards([])
    setPokemons(shuffleArray(pickRandom(pokemonPoolRef.current, count)))
  }

  const handlePlayAgain = () => {
    close()
    resetGame()
  }

  const handleDifficultyChange = (value) => {
    if (value === difficulty) return
    setDifficulty(value)
    const count = getNumberOfPokemons(value)
    setScore(0)
    setClickedCards([])
    setPokemons(shuffleArray(pickRandom(pokemonPoolRef.current, count)))
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
            <Text size='sm' ta='center' c='gray.4'>
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
        <Container bg='#16213e' p='xl' style={{ borderRadius: '12px' }}>
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
            {error ? (
              <Center mt='xl'>
                <Stack align='center' gap='sm'>
                  <IconWifiOff size={40} color='red' />{' '}
                  {/* from @tabler/icons-react */}
                  <Text c='red' ta='center'>
                    {error}
                  </Text>
                </Stack>
              </Center>
            ) : pokemons.length > 0 ? (
              <GameGrid pokemons={pokemons} handleCardClick={handleCardClick} />
            ) : (
              <Center mt='xl'>
                <Loader data-testid='loading-spinner' color='#f5c518' />
              </Center>
            )}
          </>
        </Container>
        <Box mt='auto'>
          <Footer />
        </Box>
      </Box>
    </MantineProvider>
  )
}

export default App
