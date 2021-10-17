import {
  Box,
  Img,
  Text,
  Flex,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import useLocale from '../../services/hooks/useLocale';

type NotFoundProps = {
  h?: string;
  w?: string;
  boxSize?: string;
  activeBackground?: boolean;
};

export function NotFound({
  h,
  w,
  boxSize,
  activeBackground = false,
}: NotFoundProps) {
  const t = useLocale();

  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  return (
    <Box
      position="relative"
      display={{ md: 'flex' }}
      align="center"
      width={w || '90%'}
      maxWidth={1080}
      h={h || 'calc(100vh - 6rem)'}
      mx="auto"
      mb="4"
      justifyContent="center"
    >
      <Flex position="absolute" align="center" h="100%">
        <Img
          boxSize={boxSize || '280px'}
          src="/assets/illustrations/404-vector.svg"
          alignSelf="center"
        />
        <Text alignSelf="center" fontWeight="bold" fontSize="2xl" ml="4">
          {t.page404.message}
        </Text>
      </Flex>
      {!!activeBackground && (
        <HStack w="100%" h="96" spacing="4">
          <Box
            border="2px"
            borderRadius="3xl"
            borderColor="purple.700"
            borderStyle="dashed"
            w={isMobile ? '100%' : '50%'}
            h="96"
          />
          {!isMobile && (
            <Box
              w="50%"
              h="96"
              border="2px"
              borderRadius="3xl"
              borderColor="purple.700"
              borderStyle="dashed"
            />
          )}
          {!!isWideScreen && (
            <>
              <Box
                w="50%"
                h="96"
                border="2px"
                borderRadius="3xl"
                borderColor="purple.700"
                borderStyle="dashed"
              />
            </>
          )}
        </HStack>
      )}
    </Box>
  );
}
