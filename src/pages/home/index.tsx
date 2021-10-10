/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { Flex, Avatar, Img, Divider, WrapItem } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

import Head from 'next/head'
import { supabase } from '../../services/supabase';
import { CourseList } from "../../components/CourseList/index";
import { ResumeList } from '../../components/ResumeList';

import styles from './styles.module.scss';
import { useGetLikedCourses } from '../../services/hooks/useCourses';
import { useGetLikedResumes } from '../../services/hooks/useResumes';

export default function Home({currentUserId}) {
  const router = useRouter();
  const [session] = useSession();

  const {
    data: likedCoursesArray,
    isLoading,
    isFetching,
    error,
  } = useGetLikedCourses(currentUserId);

  const {
    data: likedResumesArray,
    isLoading:isLoadingLikedResumes,
    isFetching:isFetchingLikedResumes,
    error:errLikedResumes,
  } = useGetLikedResumes(currentUserId);

  useEffect(() => {
    if (!session) {
      router.push(`/`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Home | CourseBuddy</title>
      </Head>


      {!! session && <>
        <div className={styles.contentContainer}>
          <Flex alignItems="center" my="2rem" justify="center" >
            <WrapItem mr="6" >
              <Avatar size="xl" name={session.user.name} src={session?.user.image} />{" "}
            </WrapItem>
            <Text  fontSize="5xl" fontWeight="bold" color="purple.500"  >Hi, {session.user.name}!</Text>
          </Flex>
          <Divider borderColor="purple.500" border="1px" />
          <div className={styles.topText}>
            <WrapItem color="green.400" boxSize="10"  >
              <Img fill="white" alt="library" src="/assets/icons/library.svg"/>
            </WrapItem>
            <h1>Your Library</h1>
          </div>

          <CourseList
            title="Liked Courses"
            coursesArray={likedCoursesArray}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
          />

          <ResumeList
            title="Liked Summaries"
            resumeArray={likedResumesArray}
            isLoading={isLoadingLikedResumes}
            isFetching={isFetchingLikedResumes}
            error={errLikedResumes}
          />

        </div>
      </>}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: currentUserId } = await supabase
  .from('users')
  .select('id')
  .eq('email', session.user.email)
  .single();


  return {
    props: { currentUserId }
  };
};
