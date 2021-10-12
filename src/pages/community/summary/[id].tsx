/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Text,
  Box,
  Flex,
  VStack,
  HStack,
  Spacer,
  Button,
  Img,
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { supabase } from '../../../services/supabase';
import { NotFound } from '../../../components/NotFound';
import { api } from '../../../services/api';

type CurrentUserData = {
  id: string;
  name: string;
  avatar_url: string;
  slug_number: number;
};

type ResumeProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string;
  creator_id: string;
  created_at: string;
  users: {
    name: string;
  };
  courses: {
    id: string;
  };
};

interface SummaryPageProps {
  singleResumeData: ResumeProps;
  resumeLiked: boolean;
  currentUserData: CurrentUserData;
  notUser: boolean;
}

export default function Resume({
  singleResumeData: resume,
  resumeLiked,
  currentUserData,
  notUser = false,
}: SummaryPageProps) {
  const [liked, setLiked] = useState(resumeLiked);
  const toast = useToast();
  const session = useSession();

  const currentUserId = currentUserData?.id;
  const resumeId = resume?.id;

  const handleLikeResume = async () => {
    // try {
    if (session) {
      if (liked === false) {
        setLiked(!liked);
        const response = await api.post('/api/supaRequests', {
          headers: {
            type: 'RESUME-like-resume',
          },
          currentUserId,
          resumeId,
        });
      } else {
        setLiked(!liked);
        const response = await api.post('/api/supaRequests', {
          headers: {
            type: 'RESUME-unlike-resume',
          },
          currentUserId,
          resumeId,
        });
      }
    } else {
      toast({
        title: 'Error',
        description:
          'You must be logged in to like and organize your resumes 😊',
        status: 'error',
        position: 'top-left',
        duration: 6000,
        isClosable: true,
      });
    }
    // } catch {
    //   throw Error;
    // }
  };

  if (resume === null) {
    return (
      <>
        <Head>
          <title>404 resume page</title>
        </Head>

        <NotFound />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{resume.name}</title>
      </Head>

      <Box
        display={{ md: 'flex' }}
        width="90%"
        maxWidth={1080}
        mx="auto"
        mt={8}
        alignSelf="center"
        border="1px"
        borderColor="purple.500"
        borderRadius="2xl"
        justifyContent="center"
      >
        <Box
          position="relative"
          maxHeight={{ sm: '240px', md: 'lg', lg: 'lg' }}
          h={{ lg: 'lg', md: 'lg', sm: '240px' }}
          w={{ sm: '100%', md: '50%', lg: '50%' }}
          borderRadius="2xl"
        >
          <Img
            maxHeight={{ lg: 'lg', md: 'lg', sm: '240px' }}
            h={{ lg: 'lg', md: 'lg', sm: '240px' }}
            w="50%"
            boxSize="100%"
            objectFit="cover"
            src={
              resume.image !== ''
                ? resume.image
                : '/assets/illustrations/ResumeImageSource.svg'
            }
            fallback="/assets/illustrations/ResumeImageSource.svg"
            alt="Course Image"
            borderRadius="2xl"
          />

          <VStack
            position="absolute"
            bottom="20px"
            px="8"
            py="4"
            bg="purple.900"
            alignItems="left"
            borderRightRadius="16"
            spacing="1/4"
          >
            <Text fontWeight="400" fontStyle="Italic" color="purple.500">
              By:
            </Text>
            <Text fontWeight="600" fontSize="xl">
              {resume.users.name}
            </Text>
          </VStack>
        </Box>

        <VStack
          bg="purple.900"
          h={{ md: 'lg', sm: 'md' }}
          w={{ sm: '100%', md: '50%', lg: '50%' }}
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
            {resume.name}
          </Text>

          <Text
            px={['6', '8']}
            lineHeight="5"
            color="purple.500"
            noOfLines={6}
            fontSize={['sm', 'md', 'lg']}
          >
            {resume.description}
          </Text>

          <Spacer />

          <Box px="8">
            <Text fontWeight="400" fontStyle="Italic" color="purple.500" mb="1">
              Link:
            </Text>
            <Box
              px="4"
              py="2"
              borderRadius="2xl"
              border="1px"
              borderColor="purple.500"
            >
              <Text
                fontWeight="200"
                fontSize={['lg', 'xl']}
                color="gray.700"
                noOfLines={2}
                as="abbr"
              >
                {resume.link}
              </Text>
            </Box>

            <Flex align="center" justify="end" mt="4" mb="4" w="100%">
              <Link href={`/community/course/${resume.courses.id}`}>
                <Button
                  colorScheme="purple"
                  color="purple.500"
                  h="10"
                  w="40"
                  mr="4"
                  variant="outline"
                  _hover={{ bg: 'purple.700' }}
                >
                  Course Page
                </Button>
              </Link>

              <ChakraLink href={resume.link} isExternal h="10">
                <Button
                  colorScheme="purple"
                  color="purple.900"
                  w="56"
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ bg: 'purple.550' }}
                >
                  Go to Link
                </Button>
              </ChakraLink>
            </Flex>
          </Box>
          <Box align="right" w="100%">
            <HStack
              w="16"
              bgColor="purple.800"
              borderBottomRightRadius="2xl"
              borderTopLeftRadius="2xl"
            >
              <Button
                pl="5"
                size="lg"
                color="purple.500"
                variant="unstyled"
                fontSize="2xl"
                justifyContent="center"
                onClick={handleLikeResume}
                isDisabled={notUser}
              >
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Box>

      <Box
        width="90%"
        maxWidth={1080}
        mx="auto"
        my={12}
        justifyContent="center"
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params;
  const session = await getSession({ req });

  if (session) {
    const currentUserEmail = session.user.email;

    const { data: currentUserData } = await supabase
      .from('users')
      .select('id, name, email, avatar_url, slug_number')
      .eq('email', `${currentUserEmail}`)
      .single();

    const { data: singleResumeData } = await supabase
      .from('resumes')
      .select(
        `
        id, name, description, image, link, tags, creator_id, created_at,
        users: creator_id ( name ),
        courses: course_id ( id )
        `
      )
      .eq('id', String(id))
      .single();

    // console.log(JSON.stringify(singleResumeData, null, 2))

    const { data: liked } = await supabase
      .from('resume_likes')
      .select(
        `
      *,
      users: user_id ( name )
      `
      )
      .eq('resume_id', String(id))
      .eq('user_id', String(currentUserData.id))
      .single();

    const resumeLiked = liked !== null;

    return {
      props: {
        singleResumeData,
        currentUserData,
        resumeLiked,
      },
    };
  }

  // if user not logged in
  const { data: singleResumeData } = await supabase
    .from('resumes')
    .select(
      `
      id, name, description, image, link, tags, creator_id, created_at,
      users: creator_id ( name ),
      courses: course_id ( id )
    `
    )
    .eq('id', String(id))
    .single();

  const notUser = true;

  return {
    props: {
      singleResumeData,
      notUser,
    },
  };
};
