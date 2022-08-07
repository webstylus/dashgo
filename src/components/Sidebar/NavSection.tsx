import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { RiContactsLine, RiDashboardLine } from 'react-icons/ri'
import { ReactNode } from 'react'

interface INavSectionProps {
  title: string
  children: ReactNode
}

export function NavSection({ title, children }: INavSectionProps) {
  return (
    <Box>
      <Text
        fontWeight={'bold'}
        color={'gray.400'}
        fontSize={'small'}
        textTransform={'uppercase'}
      >
        {title}
      </Text>
      <Stack spacing={4} mt={8} align={'stretch'}>
        {children}
      </Stack>
    </Box>
  )
}
