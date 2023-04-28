import {
  Box,
  Container,
  Flex,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
const Logo = () => {
  return (
    <Image
      display="flex"
      boxSize="50px"
      objectFit="contain"
      src="https://dasithkuruppu.github.io/uglyBot/_media/uglyBot.png"
      alt="UglyBot"
    />
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={`500`} fontSize={`lg`} mb={2}>
      {children}
    </Text>
  );
};
export default function SmallWithLogoLeft() {
  return (
    // <Container
    //   as={Stack}
    //   textAlign={`center`}
    //   py={4}
    //   direction={{ base: `column`, md: `row` }}
    //   justify={{ base: `center`, md: `space-between` }}
    //   align={{ base: `center`, md: `center` }}
    // >
    <Box
      bg={useColorModeValue(`gray.50`, `gray.900`)}
      color={useColorModeValue(`gray.700`, `gray.200`)}
      mt={20}
    >
      <Container as={Stack} maxW={`6xl`} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={`flex-start`}>
            <ListHeader>Documentation</ListHeader>
            <Link href={`/docs/gettingStarted`}>Getting Started</Link>
            <Stack direction={`row`} align={`center`} spacing={2}>
              <Link href={`/docs/interactions`}>Interactions</Link>
              <Tag
                size={`sm`}
                bg={useColorModeValue(`green.300`, `green.800`)}
                ml={2}
                color={`white`}
              >
                New
              </Tag>
            </Stack>
          </Stack>
          <Stack align={`flex-start`}>
            <ListHeader> Users </ListHeader>
            <Link href={`/signin`}>Sign In</Link>
          </Stack>
          <Stack align={`flex-start`}>
            <ListHeader>Legal</ListHeader>
            <Link href={`/privacyPolicy`}>Privacy Policy</Link>
            <Link href={`/tos`}>Terms of Service</Link>
          </Stack>
          <Stack align={`flex-start`}>
            <ListHeader>Contact Us</ListHeader>
            <Link href={`https://discord.gg/SmF2qJeF6P`}>Discord</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={`center`}
          _before={{
            content: `""`,
            borderBottom: `1px solid`,
            borderColor: useColorModeValue(`gray.200`, `gray.700`),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: `""`,
            borderBottom: `1px solid`,
            borderColor: useColorModeValue(`gray.200`, `gray.700`),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize={`sm`} textAlign={`center`}>
          © 2023 Ugly Bot. All rights reserved.
        </Text>
      </Box>
    </Box>
    // </Container>
  );
}
