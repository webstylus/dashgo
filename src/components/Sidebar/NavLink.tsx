import { Icon, Link as ChakraLink, LinkProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'
import {ActiveLink} from "../ActiveLink";

interface INavLinkProps extends LinkProps {
  icon: ElementType
  children: string
    href: string
}

export function NavLink({ icon, children, href, ...rest }: INavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display={'flex'} alignContent={'center'} {...rest}>
        <Icon as={icon} fontSize={20} />
        <Text ml={4} fontWeight={'medium'}>
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
