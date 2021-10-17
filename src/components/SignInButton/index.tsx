/* eslint-disable no-use-before-define */
import React from 'react';
import { useBreakpointValue, Flex } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import {
  Button,
  PopoverTrigger,
  Popover,
  Portal,
  PopoverBody,
  PopoverContent,
  PopoverCloseButton,
  Box,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import Profile from './Profile';
import styles from './styles.module.scss';
import useLocale from '../../services/hooks/useLocale';

export function SignInButton() {
  const [session] = useSession();
  const t = useLocale();

  const initRef = React.useRef();

  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isNotMobile = useBreakpointValue({
    base: false,
    sm: true,
  });

  if (!session) {
    return (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('google', { callbackUrl: '/community' })}
      >
        <FaGoogle color="#00ff9d" />
        {isNotMobile ? `${t.headers.signInWithGoogle}` : `${t.headers.signIn}`}
      </button>
    );
  }

  return (
    <>
      <Popover closeOnBlur={false} initialFocusRef={initRef}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Flex as="button" align="center" ml="4" p="2" borderRadius="xl">
                <Profile showProfileData={isWideScreen} />
              </Flex>
            </PopoverTrigger>

            <Portal>
              <PopoverContent p="2" bg="purple.700" borderColor="purple.900">
                <PopoverCloseButton />
                <PopoverBody>
                  <Box>{t.signInButton.confirmation}</Box>
                  <Button
                    mt={4}
                    colorScheme="purple"
                    onClick={() => signOut()}
                    ref={initRef}
                  >
                    {t.signInButton.confirmationButton}
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </>
  );
}
