import { Group, Flex, Title, Text, Box, Select } from '@mantine/core'

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
          Pokémon Memory
        </Title>
        <Text size='sm' c='#ffffff'>
          Click each Pokémon only once — don't repeat!
        </Text>
      </Flex>
      <Select
        label='Difficulty'
        data={['Easy', 'Medium', 'Hard']}
        defaultValue='Easy'
        value={props.difficulty}
        onChange={props.onDifficultyChange}
        styles={{
          label: {
            color: '#ffffff',
            textTransform: 'uppercase',
            fontSize: '12px',
            textAlign: 'center',
            marginBottom: '4px',
          },
          input: {
            backgroundColor: '#0d1b4b',
            border: '1px solid #533483',
            borderRadius: '8px',
            color: '#ffffff',
            textAlign: 'center',
            minWidth: '80px',
          },
          dropdown: {
            backgroundColor: '#0d1b4b',
            border: '1px solid #533483',
          },
          option: {
            color: '#ffffff', // ✅
            '&[dataSelected]': {
              backgroundColor: '#533483',
            },
          },
        }}
      />
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
