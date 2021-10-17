import {
  Box,
  Input as ChakraInput,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import useDebounce from '../../services/hooks/useDebounce';

export function SearchInput({ value, onChange, placeholder }) {
  const [searchDisplayValue, setSearchDisplayValue] = useState(value);

  const debouncedSearch = useDebounce(onChange, 500);

  function handleChange(event) {
    setSearchDisplayValue(event.target.value);
    debouncedSearch(event.target.value);
  }

  return (
    <InputGroup>
      <ChakraInput
        size="md"
        placeholder={placeholder}
        borderColor="purple.600"
        focusBorderColor="purple.500"
        _placeholder={{ color: 'purple.500' }}
        _hover={{ borderColor: 'purple.500' }}
        onChange={event => handleChange(event)}
        value={searchDisplayValue}
      />
      <InputRightElement pointerEvents="none">
        <Box fontSize="2xl">
          <BiSearchAlt />
        </Box>
      </InputRightElement>
    </InputGroup>
  );
}
