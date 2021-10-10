/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';

import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Img,
  SimpleGrid,
  Container as ChakraContainer,
} from '@chakra-ui/react';

export default function About() {
  return (
    <>
      <Head>
        <title>About | CourseBuddy</title>
      </Head>

      <ChakraContainer w="100%" mx="auto" my="8" px="8" maxWidth={1080}>
        <Box
          h="100%"
          display={{ md: 'flex' }}
          spacing="4"
          justifyContent="center"
        >
          <Flex align="center">
            <VStack pt="8" w="100%" mr="4" align="left">
              <Heading
                fontSize={['5xl', '5xl', '5xl']}
                fontWeight="black"
                lineHeight="1"
              >
                Imagine a Library made by the{' '}
                <Text as="span" color="purple.500">
                  World Wide community
                </Text>{' '}
              </Heading>

              <Box>
                <Text
                  color="purple.500"
                  mt={['4', '4', '8']}
                  fontSize={['lg', 'lg', 'xl']}
                  lineHeight="1.2"
                >
                  Just like a "Youtube" for written files
                </Text>
              </Box>
            </VStack>
          </Flex>

          <Flex w="100%" h={['80%', '80%', '80%', '100%']} align="center">
            <Img
              src="/assets/illustrations/girl-reading-onto-books.svg"
              alt=""
            />
          </Flex>
        </Box>

        <Box mb="24" mt="12">
          <Text
            fontSize={['5xl', '5xl', '5xl']}
            fontWeight="black"
            lineHeight="1"
            align="center"
          >
            "Every student is a potencial content producer"
          </Text>
          <Text
            align="end"
            fontSize="md"
            color="purple.500"
            fontWeight="medium"
          >
            - Definitely not ALBERT EINSTEIN
          </Text>
        </Box>

        <Box mt="36" mb="24">
          <Text
            fontSize={['lg', 'lg', 'xl']}
            fontWeight="md"
            lineHeight="1.5"
            align="center"
          >
            So with this statement and the "WILLIAM GLASSER's Piramid" we notice
            that's a lot of students who are writing what they are studying on
            Digital Notes or Sumaries
          </Text>
          <Text
            mt="4"
            fontSize={['lg', 'lg', 'xl']}
            fontWeight="md"
            lineHeight="1.5"
            align="center"
            color="purple.500"
          >
            And maybe after the tests, and over the months, all that knowledge
            written by the student may be left behind and{' '}
            <Text as="span" color="purple.200" fontWeight="bold">
              will never be exploited by anyone again
            </Text>
          </Text>
        </Box>

        <Box
          h="100%"
          display={{ md: 'flex' }}
          spacing="4"
          justifyContent="center"
        >
          <Flex align="center" h={{ md: '100%', base: '44' }}>
            <VStack pt="8" w="100%" mr="4" align="left">
              <Box mb="24" mt="12">
                <Text
                  align="left"
                  fontWeight="bold"
                  lineHeight="1.2"
                  fontSize={['xl', '2xl', '2xl']}
                >
                  It's when CourseBuddy comes into the picture!
                </Text>
                <Text
                  align="left"
                  color="purple.500"
                  lineHeight="1.2"
                  fontWeight="md"
                  fontSize={['lg', 'lg', 'xl']}
                >
                  a platform where students over the world can share and left
                  their knowledge to be appreciated by the future generations
                </Text>
              </Box>
            </VStack>
          </Flex>

          <Flex
            w="100%"
            h={['30%', '80%', '80%', '100%']}
            justify="center"
            align="center"
          >
            <Img
              boxSize="md"
              src="/assets/illustrations/boy-studying.svg"
              alt=""
            />
          </Flex>
        </Box>

        <Box
          px="8"
          py="6"
          position="relative"
          border="1px"
          borderColor="purple.500"
          borderRadius="2xl"
        >
          <Flex
            align="center"
            top="-6"
            mt="0"
            px="5"
            py="3"
            borderRadius="2xl"
            position="absolute"
            bg="purple.600"
          >
            <Heading
              fontSize={['3xl', '3xl', '4xl']}
              fontWeight="black"
              lineHeight="1"
              align="center"
            >
              How it works:
            </Heading>
          </Flex>

          <VStack align="left" mt="8" spacing="4" px="4">
            <Text
              fontSize={['lg', 'lg', 'xl']}
              lineHeight="1.2"
              color="purple.500"
            >
              - Sing In to Create a{' '}
              <Text as="span" fontWeight="bold" color="purple.100">
                Course or a Topic{' '}
              </Text>
              Thread
            </Text>

            <Text
              fontSize={['lg', 'lg', 'xl']}
              lineHeight="1.2"
              color="purple.500"
            >
              - On "Thread's Page" link{' '}
              <Text as="span" color="purple.200" fontWeight="bold">
                your material data
              </Text>
            </Text>

            <Text
              fontSize={['lg', 'lg', 'xl']}
              lineHeight="1.2"
              color="purple.500"
            >
              - Then share your "Resume Link" with the{' '}
              <Text as="span" color="purple.200" fontWeight="bold">
                World Community!
              </Text>
            </Text>
          </VStack>
        </Box>
      </ChakraContainer>
    </>
  );
}
