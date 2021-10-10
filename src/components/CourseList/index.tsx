/* eslint-disable no-nested-ternary */
import {
  Text,
  Flex,
  VStack,
  Box,
  Spacer,
  Img,
  SimpleGrid,
  Skeleton,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiPaperclip } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import styles from './styles.module.scss';

import { NotFound } from '../NotFound';

type CourseCardContentProps = {
  id: string;
  name: string;
  image: string;
  likes: number;
  resumes_available: number;
};

interface CourseListProps {
  title?: string;
  coursesArray?: Array<CourseCardContentProps>;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
}

export function CourseList({
  coursesArray,
  title,
  isLoading = false,
  isFetching = false,
  error,
}: CourseListProps) {
  return (
    <>
      {!!title && (
        <Flex mt="8" align="center">
          <Text fontSize="3xl" fontWeight="semibold">
            {title}
          </Text>
          {isFetching && <Spinner color="purple.600" size="md" ml="3" />}
        </Flex>
      )}
      <Box width="100%" pt="4" mb="4">
        {isLoading ? (
          <SimpleGrid w="100%" spacing="4" columns={[1, 2, 2, 3]}>
            <Skeleton
              h="96"
              startColor="purple.600"
              endColor="purple.800"
              borderRadius="2xl"
            />{' '}
            <Skeleton
              h="96"
              startColor="purple.600"
              endColor="purple.800"
              borderRadius="2xl"
            />{' '}
            <Skeleton
              h="96"
              startColor="purple.600"
              endColor="purple.800"
              borderRadius="2xl"
            />{' '}
            <Skeleton
              h="96"
              startColor="purple.600"
              endColor="purple.800"
              borderRadius="2xl"
            />
            <Skeleton
              h="96"
              startColor="purple.600"
              endColor="purple.800"
              borderRadius="2xl"
            />
            <Skeleton
              h="96"
              startColor="purple.600"
              endColor="purple.800"
              borderRadius="2xl"
            />
          </SimpleGrid>
        ) : error ? (
          <Text>Error in React Query, call de Tacobell</Text>
        ) : (
          <VStack w="100%">
            {coursesArray &&
            coursesArray?.length > 0 &&
            coursesArray !== null ? (
              <SimpleGrid w="100%" spacing="4" columns={[1, 2, 2, 3]}>
                {coursesArray.map(course => (
                  <Link key={course.id} href={`community/course/${course.id}`}>
                    <a>
                      <Box
                        className={styles.courseCard}
                        position="relative"
                        bg="green.900"
                        height="96"
                        borderRadius="2xl"
                      >
                        <Img
                          src={
                            course.image !== ''
                              ? course.image
                              : '/assets/illustrations/CursoPhotoSource.svg'
                          }
                          alt="Imagem do Curso"
                          w="100%"
                          h="55%"
                          borderTopRadius="2xl"
                          objectFit="cover"
                        />
                        <VStack
                          position="absolute"
                          px={2}
                          py={1}
                          h="45%"
                          alignItems="flex-start"
                        >
                          <Text fontSize="lg" fontWeight="600" noOfLines={3}>
                            {course.name}
                          </Text>

                          <Spacer />

                          <Box alignItems="flex-start" spacing="0" pb="0.5">
                            <Flex align="baseline">
                              <Box mr="1" color="green.500">
                                <FiPaperclip />
                              </Box>
                              <Text color="green.500">
                                {course.resumes_available !== null &&
                                course.resumes_available > 0
                                  ? `${course.resumes_available} Summaries`
                                  : `No docs yet`}
                              </Text>
                            </Flex>

                            <Flex align="baseline">
                              <Box mr="1" color="green.500">
                                <AiFillHeart />
                              </Box>

                              <Text color="green.500">
                                {course.likes !== null || course.likes - 1 >= 1
                                  ? `${course.likes} Likes`
                                  : `No Likes`}
                              </Text>
                            </Flex>
                          </Box>
                        </VStack>
                      </Box>
                    </a>
                  </Link>
                ))}
              </SimpleGrid>
            ) : (
              <NotFound h="96" w="100%" boxSize="120px" activeBackground />
            )}
          </VStack>
        )}
      </Box>
    </>
  );
}
