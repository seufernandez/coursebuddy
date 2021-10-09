/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps, GetStaticProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

import { Button, Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import styles from './home.module.scss';
import Header from '../components/Header';

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

      <main className={styles.contentContainer}>
        <aside>
          <h1>
            Join with <span>thousands of students</span> over the World
          </h1>
          <p>
            You'll find: Resumes, Jobs, Articles, Classes, Tests and more than
            you can Imagine!
          </p>
          <strong>Share knowledge and grow with us!</strong>
          <Box align="right" width="100%" mt="4">
            <Link href="/community">
              <a>
                <Button colorScheme="green" borderRadius="2xl" size="lg">
                  Join Community!
                </Button>
              </a>
            </Link>
          </Box>
        </aside>
        <img src="/assets/illustrations/rafiki.svg" alt="" />
      </main>
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
