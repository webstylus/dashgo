import { Button } from '@chakra-ui/react'

interface IPaginationItemProps {
  isCurrent?: boolean
  pageNumber: number
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  pageNumber,
  onPageChange
}: IPaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size={'sm'}
        fontSize={'xs'}
        width={4}
        colorScheme={'pink'}
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default'
        }}
      >
        {pageNumber}
      </Button>
    )
  }
  return (
    <Button
      size={'sm'}
      fontSize={'xs'}
      width={4}
      bg={'gray.700'}
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  )
}
