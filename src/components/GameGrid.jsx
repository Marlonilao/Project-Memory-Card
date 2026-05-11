import { Grid, Image, Card, UnstyledButton } from '@mantine/core'
import classes from './GameGrid.module.css'

let colspan

const GameGrid = (props) => {
  switch (props.pokemons.length) {
    case 12:
      colspan = 3
      break
    case 18:
      colspan = 2
      break
    case 24:
      colspan = 2
      break
    default:
      colspan = 3
  }

  return props.pokemons ? (
    <Grid gap='xs' mt='xl'>
      {props.pokemons.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop()
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return (
          <Grid.Col span={colspan} key={pokemon.name}>
            <Card withBorder radius='md' className={classes.card}>
              <UnstyledButton
                w='100%'
                onClick={() => props.handleCardClick(pokemon)}
              >
                <img src={sprite} alt={pokemon.name} />
              </UnstyledButton>
            </Card>
          </Grid.Col>
        )
      })}
    </Grid>
  ) : null
}

export default GameGrid
