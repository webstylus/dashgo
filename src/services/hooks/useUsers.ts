import {useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query'
import { api } from '../api'

interface IUserProps {
  id: string
  name: string
  email: string
  createdAt: string
}

interface IGetUsersResponseProps {
  totalCount: number
  users: IUserProps[]
}

export async function getUsers(page: number): Promise<IGetUsersResponseProps> {
  const { data, headers } = await api.get('/users', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user: IUserProps) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    users,
    totalCount
  }
}

export function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 *10, //10minutos
    ...options
  }) as UseQueryResult<IGetUsersResponseProps, unknown>
}
