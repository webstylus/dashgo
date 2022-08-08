import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from '@chakra-ui/react'
import Header from '../../components/Header'
import { Input } from '../../components/Form/Input'
import Sidebar from '../../components/Sidebar'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../../services/api'
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../services/queryClient";
import {useRouter} from "next/router";

type ICreateFormDataProps = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'No mínimo 8 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function UserCreate() {
  const router = useRouter()
  const createUser = useMutation(async (user: ICreateFormDataProps) => {
    const { data } = await api.post('users', {
      user: { ...user, created_at: new Date() }
    })

    return data.user
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
    }
  })
  const { register, handleSubmit, formState } = useForm<ICreateFormDataProps>({
    resolver: yupResolver(createFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleCreateUser: SubmitHandler<ICreateFormDataProps> = async (
    values
  ) => {
    await createUser.mutateAsync(values)
    await router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w={'100%'} my={6} maxWidth={1480} mx={'auto'} px={6}>
        <Sidebar />

        <Box
          as={'form'}
          flex={1}
          borderRadius={8}
          bg={'gray.800'}
          p={[6, 8]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size={'lg'} fontWeight={'normal'}>
            Criar usuário
          </Heading>

          <Divider my={6} borderColor={'gray.700'} />

          <VStack spacing={[4, 8]}>
            <SimpleGrid minChildWidth={'240px'} spacing={8} width={'100%'}>
              <Input
                label={'Nome completo'}
                {...register('name')}
                error={errors.name}
              />
              <Input
                label={'E-mail'}
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth={'240px'} spacing={8} width={'100%'}>
              <Input
                label={'Senha'}
                {...register('password')}
                error={errors.password}
                type={'password'}
              />
              <Input
                label={'Confirmação da senha'}
                {...register('password_confirmation')}
                error={errors.password_confirmation}
                type={'password'}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={8} justify={'flex-end'}>
            <HStack spacing={[4, 8]}>
              <Link href={'/users'} passHref>
                <Button colorScheme={'whiteAlpha'}>Cancelar</Button>
              </Link>
              <Button
                type={'submit'}
                isLoading={isSubmitting}
                colorScheme={'pink'}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
