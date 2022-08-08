import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import Pagination from '../../components/Pagination'
import NextLink from 'next/link'
import { useState } from 'react'
import {getUsers, useUsers} from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'
import {GetServerSideProps} from "next";

export default function UserList({users}) {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const { data } = await api.get(`users/${userId}`)

        return data
      },
      {
        staleTime: 1000 * 60 * 10 //10min
      }
    )
  }

  return (
    <Box>
      <Header />

      <Flex w={'100%'} my={6} maxWidth={1480} mx={'auto'} px={[2, 6]}>
        <Sidebar />

        <Box flex={1} borderRadius={8} bg={'gray.800'} p={8}>
          <Flex mb={8} justify={'space-between'} align={'center'}>
            <Heading size={'lg'} fontWeight={'normal'}>
              Usuários{' '}
              {!isLoading && isFetching && (
                <Spinner size={'sm'} color={'gray.500'} />
              )}
            </Heading>
            <NextLink href={'/users/create'} passHref>
              <Button
                as={'a'}
                size={'sm'}
                fontSize={'sm'}
                colorScheme={'pink'}
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justify={'center'}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={'center'}>
              <Text>Falha ao obter os dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme={'whiteAlpha'}>
                <Thead>
                  <Tr>
                    <Th px={[2, 4, 6]} color={'gray.300'} width={8}>
                      <Checkbox colorScheme={'pink'} />
                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={[2, 4, 6]}>
                        <Checkbox colorScheme={'pink'} />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color={'purple.400'}
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight={'bold'}>{user.name}</Text>
                          </Link>
                          <Text fontSize={'sm'} color={'gray.600'}>
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td textAlign={'right'}>
                        <Button
                          as={'a'}
                          size={'sm'}
                          fontSize={'sm'}
                          colorScheme={'purple'}
                          iconSpacing={isWideVersion ? 1 : 0}
                          leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                        >
                          {isWideVersion && 'Editar'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const { users, totalCount } = await getUsers(1)

  return {
    props: {users}
  }
}
