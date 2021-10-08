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

export function SignInButton() {
  const [session] = useSession();

  const initRef = React.useRef();

  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMobile = useBreakpointValue({
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
        {isMobile ? 'Sign In with Google' : 'Sign In'}
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
                  <Box>Do you really want to sign out?</Box>
                  <Button
                    mt={4}
                    colorScheme="purple"
                    onClick={() => signOut()}
                    ref={initRef}
                  >
                    yep, Sign Out
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
