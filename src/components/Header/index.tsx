import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { Profile } from './Profile'
import { NotificationsNav } from './NotificationsNav'
import { SearchBox } from './SearchBox'
import { Logo } from './Logo'
import { useSidebarDrawer } from '../../Context/SidebarDrawerContext'
import { RiMenuLine } from 'react-icons/ri'

export default function () {
  const { onOpen } = useSidebarDrawer()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as={'header'}
      w={'100%'}
      maxWidth={1480}
      h={20}
      mt={4}
      px={6}
      align={'center'}
    >
      {!isWideVersion && (
        <IconButton
          aria-label={'Menu'}
          icon={<Icon as={RiMenuLine} />}
          fontSize={24}
          variant={'unstyled'}
          onClick={onOpen}
          mt={2}
          mr={2}
        />
      )}

      <Logo />
      {isWideVersion && <SearchBox />}

      <Flex align={'center'} ml={'auto'}>
        <NotificationsNav />
        <Profile showProfileData={!!isWideVersion} />
      </Flex>
    </Flex>
  )
}
