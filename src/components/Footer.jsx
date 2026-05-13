import { Box, Text } from '@mantine/core'

const Footer = () => {
  return (
    <Box
      component='footer'
      mt='xl'
      py='md'
      style={{ borderTop: '1px solid #533483' }}
    >
      <Text size='sm' c='gray.5' ta='center'>
        © 2026 · Built by Marlon Ilao · Made with ❤️ for The Odin Project using
        the PokéAPI
      </Text>
    </Box>
  )
}

export default Footer
