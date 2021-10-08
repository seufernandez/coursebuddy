import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useBreakpointValue, Icon, Img, Flex } from '@chakra-ui/react';
import { BiHomeAlt, BiSearchAlt, BiWorld } from 'react-icons/bi';

import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';

import styles from './header.module.scss';

export default function Header() {
  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [session] = useSession();

  if (!session) {
    return (
      <>
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <Link href="/">
              <a>
                {isWideScreen ? (
                  <img
                    className={styles.logo}
                    src="/assets/cb-logo.svg"
                    alt="logo"
                  />
                ) : (
                  <Img
                    w="12"
                    minWidth="12"
                    src="/assets/icons/buddy.png"
                    alt="logo"
                  />
                )}
              </a>
            </Link>

            <nav>
              <ActiveLink activeClassName={styles.active} href="/search">
                <a>
                  {isWideScreen ? (
                    'Search'
                  ) : (
                    <Icon fontSize={26}>
                      <BiSearchAlt />
                    </Icon>
                  )}
                </a>
              </ActiveLink>

              <ActiveLink activeClassName={styles.active} href="/community">
                <a>
                  {isWideScreen ? (
                    'Community'
                  ) : (
                    <Icon fontSize={26}>
                      <BiWorld />
                    </Icon>
                  )}
                </a>
              </ActiveLink>

              <SignInButton />
            </nav>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <a>
              {isWideScreen ? (
                <Img h="4rem" src="/assets/cb-logo.svg" alt="logo" />
              ) : (
                <Img
                  w={['0', '12']}
                  minWidth={['0', '12']}
                  src="/assets/icons/buddy.png"
                  alt="logo"
                />
              )}
            </a>
          </Link>

          <nav>
            <ActiveLink activeClassName={styles.active} href="/search">
              <a>
                {isWideScreen ? (
                  'Search'
                ) : (
                  <Icon fontSize={26}>
                    <BiSearchAlt />
                  </Icon>
                )}
              </a>
            </ActiveLink>

            <ActiveLink activeClassName={styles.active} href="/community">
              <a>
                {isWideScreen ? (
                  'Community'
                ) : (
                  <Icon fontSize={26}>
                    <BiWorld />
                  </Icon>
                )}
              </a>
            </ActiveLink>

            <ActiveLink activeClassName={styles.active} href="/home">
              <a>
                {isWideScreen ? (
                  'Home'
                ) : (
                  <Icon fontSize={26}>
                    <BiHomeAlt />
                  </Icon>
                )}
              </a>
            </ActiveLink>

            <SignInButton />
          </nav>
        </div>
      </header>
    </>
  );
}
