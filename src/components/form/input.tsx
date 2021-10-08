/* eslint-disable react/require-default-props */
import {
  FormControl,
  FormLabel,
  Text,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Flex } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  description?: string;
  descriptionColor?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, description, descriptionColor, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Flex>
        {!!label && <FormLabel htmlFor={name}> {label} </FormLabel>}
        {!!description && (
          <Text as="cite" color={descriptionColor}>
            {description}
          </Text>
        )}
      </Flex>
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="purple.500"
        bg="purple.550"
        variant="filled"
        _hover={{
          bgColor: 'purple.550',
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
