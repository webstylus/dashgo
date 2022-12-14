import { Text } from '@chakra-ui/react'

export function Logo() {
  return (
    <Text fontSize={['2xl', '3xl']} fontWeight={'bold'} letterSpacing={'tight'} w={64}>
      DashGo
      <Text as={'span'} color={'purple.300'} ml={1}>
        .
      </Text>
    </Text>
  )
}
