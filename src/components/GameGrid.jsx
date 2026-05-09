import { Grid, Image, Card, UnstyledButton } from '@mantine/core'
import classes from './GameGrid.module.css'

const GameGrid = (props) => {
  return props.pokemons ? (
    <Grid gap='xs' mt='xl'>
      {props.pokemons.map((pokemon) => (
        <Grid.Col span={3} key={pokemon.name}>
          <Card withBorder radius='md' className={classes.card}>
            <UnstyledButton w='100%'>
              <Image radius='md' src={pokemon.sprite} />
            </UnstyledButton>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  ) : null
}

export default GameGrid
