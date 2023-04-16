import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue(`white`, `gray.900`)}
      boxShadow={`lg`}
      p={8}
      rounded={`xl`}
      align={`center`}
      pos={`relative`}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: `solid transparent`,
        borderLeftWidth: 16,
        borderRight: `solid transparent`,
        borderRightWidth: 16,
        borderTop: `solid`,
        borderTopWidth: 16,
        borderTopColor: useColorModeValue(`white`, `gray.900`),
        pos: `absolute`,
        bottom: `-16px`,
        left: `50%`,
        transform: `translateX(-50%)`,
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={`h3`} fontSize={`xl`} textAlign={`center`}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={`center`}
      color={useColorModeValue(`gray.600`, `gray.400`)}
      fontSize={`sm`}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src?: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={`center`} mt={8} direction={`column`}>
      <Avatar src={src} name={name} mb={2} />
      <Stack spacing={-1} align={`center`}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={`sm`} color={useColorModeValue(`gray.600`, `gray.400`)}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box
      maxW="7xl"
      mx={`auto`}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
      bg={useColorModeValue(`white.100`, `gray.700`)}
    >
      <Container maxW={`7xl`} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={`center`}>
          <Heading>What the users think</Heading>
          <Text></Text>
        </Stack>
        <Stack
          direction={{ base: `column`, md: `row` }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                9/10 will ask for more advice in future!
              </TestimonialHeading>
              <TestimonialText>
                I asked Uglybot for tips on how to improve my gameplay, it told
                me to press tab more and git gud
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar name={`Berillium`} title={`Devout cleric`} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                Why is it making pancakes forever ?
              </TestimonialHeading>
              <TestimonialText>
                I don&apos;t know why it&apos;s making pancakes forever
                sometimes, but at least its less frequent than before.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar name={`Senuri`} title={`When will it end ?`} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Why is it so ugly ?</TestimonialHeading>
              <TestimonialText>
                The ugliest bot I ever seen, how do I make it more beautiful ?
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={`https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`}
              name={`Jane Cooper`}
              title={`IDK`}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
