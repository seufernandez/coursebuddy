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
            Se junte a <span>milhares de estudantes</span> por todo o Brasil
          </h1>
          <p>
            Resumos sobre os melhores cursos do mercado, networking e premiações
          </p>
          <strong>Compartilhe conhecimento e cresça junto com a gente!</strong>
          <Box align="right" width="100%" mt="4">
            <Link href="/community">
              <a>
                <Button colorScheme="green" borderRadius="2xl" size="lg">
                  Entrar na Comunidade
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
