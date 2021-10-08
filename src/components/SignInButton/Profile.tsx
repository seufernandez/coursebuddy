import { Avatar, Box, Flex, Text, Icon } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { ImExit } from 'react-icons/im';

interface ProfileProps {
  showProfileData?: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  const [session] = useSession();

  return (
    <Flex
      position="relative"
      align="center"
      ml={['0', '4']}
      pl={['4', '8']}
      borderLeftWidth={1}
      borderColor="purple.600"
    >
      {showProfileData && (
        <Box textAlign="right" mr="4">
          <Text fontWeight="500" color="purple.500">
            {session.user.name}
          </Text>
        </Box>
      )}
      <Avatar size="md" name={session.user.name} src={session.user.image} />
      <Icon
        color="purple.500"
        fontSize={22}
        position="absolute"
        right="-4"
        bottom="-1"
      >
        <ImExit />
      </Icon>
    </Flex>
  );
}
