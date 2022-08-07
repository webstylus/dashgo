import type { NextPage } from 'next'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import Head from 'next/head'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type ISignInFormDataProps = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

const Home: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<ISignInFormDataProps>({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors, isSubmitting } = formState

  const handleSignIn: SubmitHandler<ISignInFormDataProps> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(values)
  }

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>
      <Flex
        w={'100vw'}
        h={'100vh'}
        align={'center'}
        justify={'center'}
        bgPosition={'left'}
        bgGradient={'linear(to-r, neutral_purple.900, neutral_purple.800)'}
      >
        <Box
          w="595px"
          h="595px"
          borderRadius={300}
          background={'purple.300'}
          // bgGradient='radial(neutral_purple.700 1%, transparent 60%)'
          filter={'blur(584px)'}
          position={'absolute'}
          top={-350}
          left={-350}
          zIndex={0}
        />
        <Flex
          as={'form'}
          width={'100%'}
          maxWidth={360}
          bg={'gray.800'}
          p={8}
          borderRadius={8}
          flexDir={'column'}
          zIndex={1}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input
              label={'E-mail'}
              type={'email'}
              error={errors.email}
              {...register('email')}
            />
            <Input
              label={'Senha'}
              type={'password'}
              error={errors.password}
              {...register('password')}
            />
          </Stack>
          <Button
            type={'submit'}
            mt={6}
            colorScheme={'pink'}
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Home
