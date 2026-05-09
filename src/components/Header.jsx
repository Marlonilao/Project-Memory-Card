import { Group, Flex, Title, Text, Box } from '@mantine/core'

const Header = (props) => {
  return (
    <Group justify='space-between'>
      <Flex
        mih={50}
        gap='xs'
        justify='flex-start'
        align='flex-start'
        direction='column'
        wrap='wrap'
      >
        <Title order={1}>Memory Card Game</Title>
        <Text size='sm'>Click each card only once — don't repeat!</Text>
      </Flex>
      <Group>
        <Box>
          <Text size='sm'>Score</Text>
          <Text size='lg' weight={700}>
            {props.score}
          </Text>
        </Box>
        <Box>
          <Text size='sm'>Best</Text>
          <Text size='lg' weight={700}>
            {props.bestScore}
          </Text>
        </Box>
      </Group>
    </Group>
  )
}

export default Header
