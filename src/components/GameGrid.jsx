import { Grid, Image, Card, UnstyledButton } from '@mantine/core'
import classes from './GameGrid.module.css'

const GameGrid = (props) => {
  return props.pokemons ? (
    <Grid gap='xs' mt='xl'>
      {props.pokemons.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop()
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return (
          <Grid.Col span={{ base: 6, sm: 2 }} key={pokemon.name}>
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
