import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

interface IUserProps {
  id: string
  name: string
  email: string
  createdAt: string
}

export async function getUsers(): Promise<IUserProps[]> {
  const { data } = await api.get('/users')

  return data.users.map((user: IUserProps) => {
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
}

export function useUsers() {
  return useQuery(['users'], getUsers, {
    staleTime: 1000 * 5
  })
}
