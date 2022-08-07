import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface IProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData }: IProfileProps) {
  return (
    <Flex align={'center'}>
      {showProfileData && (
        <Box mr={4} textAlign={'right'}>
          <Text>Rafael Pacífico</Text>
          <Text color={'gray.300'} fontSize={'small'}>
            rafael@webstylus.com.br
          </Text>
        </Box>
      )}
      <Avatar
        size={'md'}
        name={'Rafael Pacífico'}
        src={'https://github.com/webstylus.png'}
      />
    </Flex>
  )
}
