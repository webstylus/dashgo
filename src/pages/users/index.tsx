import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
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
import Link from 'next/link'
import { useEffect } from 'react'
import { useUsers } from '../../services/hooks/useUsers'

export default function UserList() {
  const { data, isLoading, isFetching, error } = useUsers()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  useEffect(() => {}, [])

  return (
    <Box>
      <Header />

      <Flex w={'100%'} my={6} maxWidth={1480} mx={'auto'} px={[2, 6]}>
        <Sidebar />

        <Box flex={1} borderRadius={8} bg={'gray.800'} p={8}>
          <Flex mb={8} justify={'space-between'} align={'center'}>
            <Heading size={'lg'} fontWeight={'normal'}>
              Usuários {!isLoading && isFetching && (
                <Spinner size={'sm'} color={'gray.500'} />
              )}
            </Heading>
            <Link href={'/users/create'} passHref>
              <Button
                as={'a'}
                size={'sm'}
                fontSize={'sm'}
                colorScheme={'pink'}
                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
              >
                Criar novo
              </Button>
            </Link>
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
                  {data?.map((user) => (
                    <Tr key={user.id}>
                      <Td px={[2, 4, 6]}>
                        <Checkbox colorScheme={'pink'} />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight={'bold'}>{user.name}</Text>
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
              totalCountOfRegisters={200}
              currentPage={10}
              onPageChange={() => {}}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
