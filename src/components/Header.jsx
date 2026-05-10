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
        <Title order={1} c='#f5c518'>
          Memory Card Game
        </Title>
        <Text size='sm' c='#ffffff'>
          Click each card only once — don't repeat!
        </Text>
      </Flex>
      <Group>
        <Box
          p='sm'
          style={{
            border: '1px solid #533483',
            borderRadius: '8px',
            minWidth: '80px',
          }}
        >
          <Text size='sm' ta='center' c='#ffffff' tt='uppercase'>
            Score
          </Text>
          <Text size='lg' ta='center' c='#ffffff' tt='uppercase' fw={700}>
            {props.score}
          </Text>
        </Box>
        <Box
          p='sm'
          style={{
            border: '1px solid #533483',
            borderRadius: '8px',
            minWidth: '80px',
          }}
        >
          <Text size='sm' ta='center' c='#ffffff' tt='uppercase'>
            Best
          </Text>
          <Text size='lg' ta='center' c='#f5c518' tt='uppercase' fw={700}>
            {props.bestScore}
          </Text>
        </Box>
      </Group>
    </Group>
  )
}

export default Header
