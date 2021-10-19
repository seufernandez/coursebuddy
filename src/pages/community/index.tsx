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
import {
  useGetLatestCourses,
  useGetMostLikedCourses,
} from '../../services/hooks/useCourses';
import useLocale from '../../services/hooks/useLocale';

type CreateCourseData = {
  name: string;
  description: string;
  image?: string;
  tags: string;
  creator_id: string;
};

type CurrentUserData = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  slug_number: number;
};

interface CommunityPageProps {
  currentUser: CurrentUserData;
}

const createCourseFormSchema = yup.object().shape({
  name: yup
    .string()
    .max(120, 'Maximum 120 characters')
    .required('Wait, you would not forget the name would you?'),
  description: yup
    .string()
    .max(200, 'Maximum 200 characters')
    .required(`Don't forget the description`),
  image: yup.string().url(),
  tags: yup
    .string()
    .lowercase()
    .min(3, 'Come on, at least 3 characters you can do it')
    .max(144, 'Maximum 144 characters')
    .required('Tags are important to help others to find the course :)'),
});

export default function Community({ currentUser }: CommunityPageProps) {
  const [session] = useSession();
  const toast = useToast();
  const t = useLocale();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUserId = currentUser?.id;

  const {
    data: latestCoursesData,
    isLoading: isLoadingLatestCoursesData,
    isFetching: isFetchingLatestCoursesData,
    error: errLatestCoursesData,
  } = useGetLatestCourses();

  const {
    data: mostLikedCoursesData,
    isLoading: isLoadingMostLikedCoursesData,
    isFetching: isFetchingMostLikedCoursesData,
    error: errMostLikedCoursesData,
  } = useGetMostLikedCourses();

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

    onClose();

    if (response.status === 200) {
      toast({
        title: `${t.communityPage.toast.title}`,
        description: `${t.communityPage.toast.description}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        onCloseComplete: () =>
          router.push(`/community/course/${response.data.newCourseNumberSlug}`),
      });
    }
  };

  return (
    <>
      <Head>
        <title>{t.communityPage.community} | CourseBuddy</title>
      </Head>

      <div className={styles.main}>
        <div className={styles.topText}>
          <Img
            src="/assets/icons/world.svg"
            alt="world, pretty handsome huh?"
          />
          <Text fontSize={['4xl']} fontWeight="bold" ml="2">
            {t.communityPage.community}
          </Text>
        </div>

        <CourseList
          title={t.communityPage.latestCourses}
          coursesArray={latestCoursesData}
          isLoading={isLoadingLatestCoursesData}
          isFetching={isFetchingLatestCoursesData}
          error={errLatestCoursesData}
        />

        <CourseList
          title={t.communityPage.topLiked}
          coursesArray={mostLikedCoursesData}
          isLoading={isLoadingMostLikedCoursesData}
          isFetching={isFetchingMostLikedCoursesData}
          error={errMostLikedCoursesData}
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
          <ModalHeader>{t.communityPage.form.newCourse}</ModalHeader>
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
                    label={t.communityPage.form.courseName}
                    description={t.communityPage.form.courseNameEx}
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
                    label={t.communityPage.form.courseDescription}
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
                    label={t.communityPage.form.courseUrl}
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
                      label={t.communityPage.form.tags}
                      description={t.communityPage.form.tagsEx}
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
              {t.communityPage.form.closeButton}
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
              {t.communityPage.form.createButton}
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
  const { data: currentUser, error } = await supabase
    .from('users')
    .select('id, name, email, avatar_url, slug_number')
    .eq('email', `${currentUserEmail}`)
    .single();

  return {
    props: { currentUser },
  };
};
