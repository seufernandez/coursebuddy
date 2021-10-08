import {
  Button,
  Icon,
  Img,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  VStack,
  FormControl,
  useToast,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { RiAddLine } from 'react-icons/ri';
import { getSession, useSession } from 'next-auth/client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import router from 'next/router';
import { Text } from '@chakra-ui/react';
import { supabase } from '../../services/supabase';

import { api } from '../../services/api';
import { Input } from '../../components/form/input';

import styles from './styles.module.scss';
import { CourseList } from '../../components/CourseList';
import { useGetLatestCourses } from '../../services/hooks/useCourses';

type CreateCourseData = {
  name: string;
  description: string;
  image?: string;
  tags: string;
  creator_id: string;
};

const createCourseFormSchema = yup.object().shape({
  name: yup
    .string()
    .max(120, 'O nome só pode ter no máximo 120 caracteres')
    .required('Opa, não se esqueça de colocar um nome!'),
  description: yup
    .string()
    .max(144, 'A descrição só pode ter no máximo 144 caracteres')
    .required('Não se esqueça de colocar uma descrição!'),
  image: yup.string().url(),
  tags: yup
    .string()
    .lowercase()
    .min(3, 'Precisamos de no mínimo 3 caracteres ')
    .max(144, 'A descrição só pode ter no máximo 120 caracteres')
    .required('Tags são importantes para estudantes encontrarem o curso'),
});

export default function Community({ currentUserData }) {
  const [session] = useSession();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUserId = currentUserData?.id;

  const {
    data: latestsCoursesData,
    isLoading,
    isFetching,
    error,
  } = useGetLatestCourses();

  const { register, handleSubmit, formState, errors } = useForm({
    resolver: yupResolver(createCourseFormSchema),
  });

  const handleCreateCourse: SubmitHandler<CreateCourseData> = async values => {
    const response = await api.post('api/supaRequests', {
      headers: {
        type: 'community-create-course',
      },
      values,
      currentUserId,
    });
    // console.log(response.data.newCourseId)

    onClose();

    if (response.status === 200) {
      toast({
        title: 'Course Thread created',
        description: 'Redirecting to Course Page...',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        onCloseComplete: () =>
          router.push(`/community/course/${response.data.newCourseId}`),
      });
    }
  };

  return (
    <>
      <Head>
        <title>Comunidade | CourseBuddy</title>
      </Head>

      <div className={styles.main}>
        <div className={styles.topText}>
          <Img
            src="/assets/icons/world.svg"
            alt="world, pretty handsome huh?"
          />
          <Text fontSize={['4xl']} fontWeight="bold" ml="2">
            Community
          </Text>
        </div>

        <CourseList
          title="Latests Courses"
          isLoading={isLoading}
          isFetching={isFetching}
          coursesArray={latestsCoursesData}
          error={error}
        />

        <CourseList
          title="Top Courses Ever"
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />

        {!!session && (
          <Button
            colorScheme="green"
            position="fixed"
            bottom="36px"
            right="36px"
            w="16"
            h="16"
            alignItems="center"
            borderRadius="full"
            size="lg"
            fontSize="lg"
            onClick={onOpen}
          >
            <Icon as={RiAddLine} fontSize="36" />
          </Button>
        )}
      </div>

      <Modal
        isCentered
        size="3xl"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bg="green.900">
          <ModalHeader>Novo Curso</ModalHeader>
          <ModalBody>
            <FormControl>
              <Box
                as="form"
                flex="1"
                borderRadius={8}
                bg="green.900"
                px="8"
                py="2"
                onSubmit={handleSubmit(handleCreateCourse)}
              >
                <VStack spacing="4">
                  <Input
                    name="name"
                    label="Nome do Curso"
                    description="Ex: UFMG História Bach. 3 Período -HISTÓRIA DO BRASIL II-"
                    descriptionColor="green.300"
                    focusBorderColor="green.600"
                    bg="green.700"
                    variant="filled"
                    _hover={{
                      bgColor: 'green.800',
                    }}
                    error={errors.name}
                    ref={register}
                  />

                  <Input
                    name="description"
                    label="Descrição do Curso"
                    focusBorderColor="green.600"
                    bg="green.700"
                    variant="filled"
                    _hover={{
                      bgColor: 'green.800',
                    }}
                    error={errors.description}
                    ref={register}
                  />

                  <Input
                    name="image"
                    label="Cole aqui a URL da Imagem"
                    focusBorderColor="green.600"
                    bg="green.700"
                    variant="filled"
                    _hover={{
                      bgColor: 'green.800',
                    }}
                    error={errors.image}
                    ref={register}
                  />

                  <Box w="100%" justify="flex-initial">
                    <Input
                      name="tags"
                      label="Tags (3 a 6 separadas por vírgula)"
                      description="Ex: ufmg, historia, bacharelado, 3 periodo"
                      descriptionColor="green.300"
                      focusBorderColor="green.600"
                      bg="green.700"
                      variant="filled"
                      _hover={{
                        bgColor: 'green.800',
                      }}
                      error={errors.tags}
                      ref={register}
                    />
                  </Box>
                </VStack>
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              as="a"
              colorScheme="whiteAlpha"
              variant="ghost"
              onClick={onClose}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              _hover={{
                bgColor: 'green.600',
              }}
              ml="4"
              isLoading={formState.isSubmitting}
              onClick={handleSubmit(handleCreateCourse)}
            >
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const currentUserEmail = session?.user.email;
  const { data: currentUserData, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', `${currentUserEmail}`)
    .single();

  return {
    props: { currentUserData },
  };
};
