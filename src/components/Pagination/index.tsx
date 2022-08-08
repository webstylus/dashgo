import { Box, Stack, Text } from '@chakra-ui/react'
import { PaginationItem } from './PaginationItem'

interface IPaginationProps {
  totalCountOfRegisters: number
  registerPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}

export default function ({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange
}: IPaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage)
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <Stack
      direction={['column', 'row']}
      spacing={6}
      mt={8}
      justify={'space-between'}
      align={'center'}
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>10</strong>
      </Box>
      <Stack direction={'row'} spacing={2}>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem pageNumber={1} onPageChange={onPageChange}/>
            {currentPage > 2 + siblingsCount && (
              <Text color={'gray.300'} width={8} textAlign={'center'}>
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem key={page} pageNumber={page} onPageChange={onPageChange}/>
          ))}
        <PaginationItem pageNumber={currentPage} isCurrent onPageChange={onPageChange}/>

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem key={page} pageNumber={page} onPageChange={onPageChange}/>
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color={'gray.300'} width={8} textAlign={'center'}>
                ...
              </Text>
            )}
            <PaginationItem pageNumber={lastPage} onPageChange={onPageChange}/>
          </>
        )}
      </Stack>
    </Stack>
  )
}
