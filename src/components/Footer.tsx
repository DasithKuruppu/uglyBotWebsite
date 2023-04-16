import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue(`gray.50`, `gray.900`)}
      color={useColorModeValue(`gray.700`, `gray.200`)}
      position="fixed"
      bottom={0}
      width="100%"
    >
      <Container
        as={Stack}
        textAlign={`center`}
        py={4}
        direction={{ base: `column`, md: `row` }}
        justify={{ base: `center`, md: `space-between` }}
        align={{ base: `center`, md: `center` }}
      >
        <Text marginLeft={`auto`} marginRight={`auto`} textAlign={`center`}>
          © 2023 Ugly Bot. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
