/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import {
  Button,
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Img,
} from '@chakra-ui/react';

export default function Home() {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/home`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>CourseBuddy</title>
      </Head>

      <Box
        display={{ md: 'flex' }}
        w="100%"
        h="calc(100vh - 10rem)"
        mx="auto"
        my="8"
        px="8"
        maxWidth={1080}
        justifyContent="center"
      >
        <Flex align="center">
          <VStack pt="8" w="100%" mr="4" align="left">
            <Heading
              fontSize={['5xl', '5xl', '5xl']}
              fontWeight="black"
              lineHeight="0.9"
            >
              Join with{' '}
              <Text as="span" color="green.400">
                thousands of students
              </Text>{' '}
              over the World
            </Heading>

            <Box mt={['2', '2', '4']}>
              <Text fontSize={['lg', 'lg', 'xl']} lineHeight="1.2">
                You'll find: Resumes, Jobs, Articles, Classes, Tests and more
                than we can Imagine!
              </Text>
            </Box>
            <Box mt={['2', '2', '4']}>
              <Text
                as="strong"
                color="green.500"
                fontSize={['xl', 'xl', '2xl']}
                lineHeight="1"
                align="left"
              >
                Share knowledge and grow with us!
              </Text>
            </Box>
            <Box align="right" width="100%" pt={['2', '4', '6']}>
              <Link href="/community">
                <a>
                  <Button colorScheme="green" borderRadius="2xl" size="lg">
                    Join Community!
                  </Button>
                </a>
              </Link>
            </Box>
          </VStack>
        </Flex>

        <Flex w="100%" h={['50%', '50%', '100%']} align="center">
          <Img src="/assets/illustrations/rafiki.svg" alt="" />
        </Flex>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
