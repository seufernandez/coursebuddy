import { GetServerSideProps } from 'next';

import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../../services/supabase';
import { SearchInput } from '../../components/SearchInput';
import { useGetSearchedCourses } from '../../services/hooks/useCourses';
import { CourseList } from '../../components/CourseList/index';
import { useGetSearchedResumes } from '../../services/hooks/useResumes';
import { ResumeList } from '../../components/ResumeList/index';

export default function SearchPage({ users }) {
  const [text, setText] = useState('');
  const {
    data: searchedCourses,
    isLoading: isLoadingCourse,
    isFetching: isFetchingCourse,
    refetch: refetchCourse,
    error: errorCourse,
  } = useGetSearchedCourses(text);

  const {
    data: searchedResumes,
    isLoading: isLoadingResume,
    isFetching: isFetchingResume,
    refetch: refetchResume,
    error: errorResume,
  } = useGetSearchedResumes(text);

  useEffect(() => {
    refetchCourse();
    refetchResume();
  }, [text]);

  return (
    <>
      <Head>
        <title>Search | CourseBuddy</title>
      </Head>

      <Box
        w="90%"
        mx="auto"
        maxWidth={1080}
        marginTop={12}
        marginBottom={4}
        borderColor="purple.500"
        justifyContent="center"
      >
        {' '}
        <SearchInput value={text} onChange={search => setText(search)} />
        <Box w="100%" mt="4">
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab
                _focus={{ boxShadow: 'none' }}
                _selected={{ color: 'purple.900', bg: 'green.400' }}
              >
                Courses
              </Tab>
              <Tab
                _focus={{ boxShadow: 'none' }}
                _selected={{ color: 'purple.900', bg: 'purple.500' }}
              >
                Resumes
              </Tab>
              <Tab isDisabled color="gray.900">
                Institutions (soon)
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel p="0">
                <CourseList
                  title="Results:"
                  coursesArray={searchedCourses}
                  isLoading={isLoadingCourse}
                  isFetching={isFetchingCourse}
                  error={errorCourse}
                />
              </TabPanel>
              <TabPanel p="0">
                <ResumeList
                  title="Results:"
                  resumeArray={searchedResumes}
                  isLoading={isLoadingResume}
                  isFetching={isFetchingResume}
                  error={errorResume}
                />
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
              <TabPanel>{/* <p>three!</p> */}</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: users, error } = await supabase.from('users').select('*');

  return {
    props: { users },
  };
};
