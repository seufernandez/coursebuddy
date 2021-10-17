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
import useLocale from '../../services/hooks/useLocale';

export default function About() {
  const t = useLocale();

  return (
    <>
      <Head>
        <title>{t.about.about}</title>
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
                {t.about.h1}{' '}
                <Text as="span" color="purple.500">
                  {t.about.h1_span}
                </Text>{' '}
              </Heading>

              <Box>
                <Text
                  color="purple.500"
                  mt={['4', '4', '8']}
                  fontSize={['lg', 'lg', 'xl']}
                  lineHeight="1.2"
                >
                  {t.about.strong}
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
            {t.about.quote}
          </Text>
          <Text
            align="end"
            fontSize="md"
            color="purple.500"
            fontWeight="medium"
          >
            {t.about.quote_author}
          </Text>
        </Box>

        <Box mt="36" mb="24">
          <Text
            fontSize={['lg', 'lg', 'xl']}
            fontWeight="md"
            lineHeight="1.5"
            align="center"
          >
            {t.about.paragraph1}
          </Text>
          <Text
            mt="4"
            fontSize={['lg', 'lg', 'xl']}
            fontWeight="md"
            lineHeight="1.5"
            align="center"
            color="purple.500"
          >
            {t.about.paragraph2}{' '}
            <Text as="span" color="purple.200" fontWeight="bold">
              {t.about.paragraph2_span}
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
                  {t.about.subtitle}
                </Text>
                <Text
                  align="left"
                  color="purple.500"
                  lineHeight="1.2"
                  fontWeight="md"
                  fontSize={['lg', 'lg', 'xl']}
                >
                  {t.about.paragraph3}
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
              {t.about.howItWorks}
            </Heading>
          </Flex>

          <VStack align="left" mt="8" spacing="4" px="4">
            <Text
              fontSize={['lg', 'lg', 'xl']}
              lineHeight="1.2"
              color="purple.500"
            >
              {t.about.bulletPoint1_part1}{' '}
              <Text as="span" fontWeight="bold" color="purple.100">
                {t.about.bulletPoint1_span}{' '}
              </Text>
              {t.about.bulletPoint1_part2}
            </Text>

            <Text
              fontSize={['lg', 'lg', 'xl']}
              lineHeight="1.2"
              color="purple.500"
            >
              {t.about.bulletPoint2}{' '}
              <Text as="span" color="purple.200" fontWeight="bold">
                {t.about.bulletPoint2_span}
              </Text>
            </Text>

            <Text
              fontSize={['lg', 'lg', 'xl']}
              lineHeight="1.2"
              color="purple.500"
            >
              {t.about.bulletPoint3}{' '}
              <Text as="span" color="purple.200" fontWeight="bold">
                {t.about.bulletPoint3_span}{' '}
              </Text>
            </Text>
          </VStack>
        </Box>
      </ChakraContainer>
    </>
  );
}
