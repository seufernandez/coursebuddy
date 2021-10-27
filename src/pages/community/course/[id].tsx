/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import {
  Text,
  Img,
  Spacer,
  Button,
  Icon,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  VStack,
  HStack,
  FormControl,
  useToast,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FiPaperclip } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { supabase } from '../../../services/supabase';
import { Input } from '../../../components/form/input';
import { NotFound } from '../../../components/NotFound';
import { api } from '../../../services/api';
import { ResumeList } from '../../../components/ResumeList';
import {
  useGetLatestResumes,
  useGetTopLikedResumes,
} from '../../../services/hooks/useResumes';
import useLocale from '../../../services/hooks/useLocale';
import { incrementCourseView } from '../../../services/hooks/useCourses';

type CreateResumeData = {
  course_id: string;
  name: string;
  description: string;
  image?: string;
  link: string;
  tags: string;
  creator_id: string;
};

type CurrentUserData = {
  id: string;
  name: string;
  avatar_url: string;
  slug_number: number;
};

type SingleCourseData = {
  id: string;
  image: string;
  name: string;
  description: string;
  likes: number;
  tags: string;
  slug_number: number;
};

interface CoursePageProps {
  singleCourseData: SingleCourseData;
  currentUser: CurrentUserData;
  courseLiked: boolean;
}

const createResumeFormSchema = yup.object().shape({
  name: yup
    .string()
    .max(120, 'Maximum 120 characters')
    .required('Wait, you would not forget the name would you?'),
  description: yup
    .string()
    .max(200, 'Maximum 200 characters')
    .required(`Don't forget the description`),
  image: yup.string().url(),
  link: yup.string().url().required('Material link required'),
  tags: yup
    .string()
    .lowercase()
    .min(3, 'Come on, at least 3 characters you can do it')
    .max(144, 'Maximum 144 characters')
    .required('Tags are important to help others to find the course :)'),
});

export default function CoursePage({
  singleCourseData,
  currentUser,
  courseLiked,
}: CoursePageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [liked, setLiked] = useState(courseLiked);
  const [session] = useSession();
  const toast = useToast();
  const t = useLocale();

  useEffect(() => {
    incrementCourseView(singleCourseData.slug_number);
  }, []);

  const currentUserId = currentUser?.id;
  const courseId = singleCourseData?.id;

  const {
    data: latestsResumesData,
    isLoading: isLoadingLatestResumes,
    isFetching: isFetchingLatestResumes,
    error: errorLatestResumes,
  } = useGetLatestResumes(courseId);

  const {
    data: topResumesData,
    isLoading: isLoadingTopResumes,
    isFetching: isFetchingTopResumes,
    error: errorTopResumes,
  } = useGetTopLikedResumes(courseId);

  const { register, handleSubmit, formState, errors } = useForm({
    resolver: yupResolver(createResumeFormSchema),
  });

  const handleCreateResume: SubmitHandler<CreateResumeData> = async values => {
    const response = await api.post('/api/supaRequests', {
      headers: {
        type: 'course-create-resume',
      },
      values,
      currentUserId,
      courseId,
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    onClose();

    toast({
      title: `${t.coursePage.toast.title}`,
      description: `${t.coursePage.toast.description}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      onCloseComplete: () =>
        router.push(`/community/summary/${response.data.newResumeId}`),
    });
  };

  const handleLikeCourse = async () => {
    if (session) {
      if (liked === false) {
        setLiked(!liked);
        const response = await api.post('/api/supaRequests', {
          headers: {
            type: 'course-like-course',
          },
          currentUserId,
          courseId,
        });
      } else {
        setLiked(!liked);
        const response = await api.post('/api/supaRequests', {
          headers: {
            type: 'course-unlike-course',
          },
          currentUserId,
          courseId,
        });
      }
    }
  };

  if (singleCourseData === null) {
    return (
      <>
        <Head>
          <title>{t.page404.tabMessage}</title>
        </Head>

        <NotFound />
      </>
    );
  }

  const course = singleCourseData;

  return (
    <>
      <Head>
        <title>{course.name}</title>
        <meta name="description" content={course.description} />
      </Head>

      <Box
        w="90%"
        mx="auto"
        display={{ md: 'flex' }}
        maxWidth={1080}
        marginTop={12}
        marginBottom={4}
        border="1px"
        borderColor="green.700"
        borderRadius="2xl"
        justifyContent="center"
      >
        <Box
          position="relative"
          maxHeight={{ sm: '240px', md: 'xl', lg: 'xl' }}
          h={{ lg: 'xl', md: 'xl', sm: '240px' }}
          w={{ sm: '100%', md: '50%', lg: '50%' }}
          borderRadius="2xl"
        >
          <Img
            maxHeight={{ lg: 'xl', md: 'xl', sm: '240px' }}
            h={{ lg: 'xl', md: 'xl', sm: '240px' }}
            w="50%"
            boxSize="100%"
            objectFit="cover"
            src={
              course.image !== ''
                ? course.image
                : '/assets/illustrations/courseImg.jpg'
            }
            fallbac="/assets/illustrations/courseImg.jpg"
            alt="Course Image"
            borderRadius="2xl"
          />
        </Box>

        <VStack
          h={{ md: 'xl', sm: 'md' }}
          w={{ sm: '100%', md: '50%', lg: '50%' }}
          bg="purple.900"
          minWidth={{ md: '50%', lg: '50%' }}
          alignItems="left"
          borderBottomRadius="2xl"
          borderTopRightRadius="2xl"
        >
          <Text
            mb={['1', '2', '4']}
            fontWeight="700"
            fontSize={['xl', '2xl', '3xl']}
            lineHeight="9"
            px={['6', '8']}
            pt={['2', '3', '6']}
          >
            {course.name}
          </Text>

          <Text
            px={['6', '8']}
            lineHeight="5"
            color="green.600"
            noOfLines={6}
            fontSize={['sm', 'md', 'lg']}
          >
            {course.description}
          </Text>

          <Spacer />
          {/*
          <Box px="8">
            <Text fontWeight="200" fontSize={['lg', 'xl']} color="gray.300">
              <strong>{course.buddys_coursing}</strong> Buddy's estão fazendo
              esse curso
            </Text>

            <Button
              size="md"
              mt="4"
              colorScheme="purple"
              color="purple.900"
              _focus={{ boxShadow: 'none' }}
              _hover={{ bg: 'purple.550' }}
            >
              Ver Buddy's
            </Button>
          </Box> */}
          <Box align="right" w="100%">
            <HStack
              w="16"
              bgColor="green.900"
              borderBottomRightRadius="2xl"
              borderTopLeftRadius="2xl"
            >
              <Button
                pl="5"
                size="lg"
                color="green.500"
                variant="unstyled"
                fontSize="2xl"
                justifyContent="center"
                onClick={handleLikeCourse}
                isDisabled={!session}
              >
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>

      <Box w="90%" mx="auto" my={12} maxWidth={1080} justifyContent="center">
        <ResumeList
          title={t.coursePage.topSummaries}
          resumeArray={topResumesData}
          isLoading={isLoadingTopResumes}
          isFetching={isFetchingTopResumes}
          error={errorTopResumes}
        />

        <ResumeList
          title={t.coursePage.latestSummaries}
          resumeArray={latestsResumesData}
          isLoading={isLoadingLatestResumes}
          isFetching={isFetchingLatestResumes}
          error={errorLatestResumes}
        />
      </Box>

      {!!session && (
        <Button
          w="16"
          h="16"
          colorScheme="purple"
          position="fixed"
          bottom="36px"
          right="36px"
          alignItems="center"
          borderRadius="full"
          size="lg"
          fontSize="lg"
          onClick={onOpen}
        >
          <Icon as={FiPaperclip} fontSize="32" />
        </Button>
      )}

      <Modal
        isCentered
        size="2xl"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent bg="purple.800">
          <ModalHeader>{t.coursePage.form.newMaterial}</ModalHeader>
          <ModalBody>
            <FormControl>
              <Box
                as="form"
                flex="1"
                borderRadius={8}
                bg="purple.800"
                px="8"
                py="2"
                onSubmit={handleSubmit(handleCreateResume)}
              >
                <VStack spacing="4">
                  <Input
                    name="name"
                    label={t.coursePage.form.name}
                    description={t.coursePage.form.nameEx}
                    descriptionColor="purple.300"
                    focusBorderColor="purple.600"
                    bg="purple.600"
                    variant="filled"
                    _hover={{
                      bgColor: 'purple.700',
                    }}
                    error={errors.name}
                    ref={register}
                  />

                  <Input
                    name="description"
                    label={t.coursePage.form.description}
                    focusBorderColor="purple.600"
                    bg="purple.600"
                    variant="filled"
                    _hover={{
                      bgColor: 'purple.700',
                    }}
                    error={errors.description}
                    ref={register}
                  />

                  <Input
                    name="image"
                    label={t.coursePage.form.imageURL}
                    description={t.coursePage.form.imageURLEx}
                    descriptionColor="purple.300"
                    focusBorderColor="purple.600"
                    bg="purple.600"
                    variant="filled"
                    _hover={{
                      bgColor: 'purple.700',
                    }}
                    error={errors.image}
                    ref={register}
                  />

                  <Input
                    name="link"
                    label={t.coursePage.form.materialLink}
                    description={t.coursePage.form.materialLinkEx}
                    descriptionColor="purple.300"
                    focusBorderColor="purple.600"
                    bg="purple.600"
                    variant="filled"
                    _hover={{
                      bgColor: 'purple.700',
                    }}
                    error={errors.link}
                    ref={register}
                  />

                  <Box w="100%" justify="flex-initial">
                    <Input
                      name="tags"
                      label={t.coursePage.form.tags}
                      description={t.coursePage.form.tagsEx}
                      descriptionColor="purple.300"
                      focusBorderColor="purple.600"
                      bg="purple.600"
                      variant="filled"
                      _hover={{
                        bgColor: 'purple.700',
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
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="purple"
              _hover={{
                bgColor: 'purple.600',
              }}
              ml="4"
              isLoading={formState.isSubmitting}
              onClick={handleSubmit(handleCreateResume)}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id: slug_number } = params;
  const session = await getSession({ req });

  const currentUserEmail = session?.user.email;

  const { data: currentUser } = await supabase
    .from('users')
    .select('id, name, email, avatar_url, slug_number')
    .eq('email', `${currentUserEmail}`)
    .single();

  const { data: singleCourseData } = await supabase
    .from('courses')
    .select(
      'id, slug_number, name, image, likes, slug_number, description, tags'
    )
    .eq('slug_number', String(slug_number))
    .single();

  const { data: resumesArray } = await supabase
    .from('resumes')
    .select(
      `
    *,
    users: user_id ( name )
  `
    )
    .eq('course_id', String(singleCourseData?.id));

  const { data: liked } = await supabase
    .from('course_likes')
    .select(
      `
        *,
        users: user_id ( name )
        `
    )
    .eq('course_id', String(singleCourseData?.id))
    .eq('user_id', String(currentUser?.id))
    .single();

  const courseLiked = liked !== null;
  return {
    props: {
      singleCourseData,
      resumesArray,
      currentUser,
      courseLiked,
    },
  };
};
