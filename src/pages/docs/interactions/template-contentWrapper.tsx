import {
  Box,
  Container,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Text,
  Stack,
  Tooltip,
  HStack,
  Image,
  VStack,
  ListIcon,
  List,
  ListItem,
} from '@chakra-ui/react';
import { AiFillCheckSquare, AiFillQuestionCircle } from 'react-icons/ai';
import { HiChevronRight } from 'react-icons/hi';
import createRaidGif from './_createRaid.gif';
const defaultFeatures = [
  {
    id: `name`,
    required: true,
    title: `name`,
    hidden: false,
    text: `Select the name of the raid from the list of choices.`,
    examples: [`The Vault of Stars`],
  },
  {
    id: `date`,
    required: true,
    hidden: false,
    title: `date`,
    text: `Select the date and time of the raid. Note that if the timezone is not specified, it will default to New York time UTC-05:00 or the timezone of the server given on /server profile`,
    examples: [
      `2022-09-25T21:00:00 GMT+05:30`,
      `Today at 9:00 PM`,
      `Tomorrow at 21:00`,
    ],
  },
  {
    id: `type`,
    required: false,
    hidden: false,
    title: `type`,
    text: `Set type of run.`,
    examples: [`Farm`],
  },
  {
    id: `party`,
    title: `party`,
    hidden: false,
    required: false,
    text: `Team composition additional configurations.`,
    examples: [`Solo Tank`],
  },
  {
    id: `requirements`,
    title: `requirements`,
    hidden: false,
    required: false,
    text: `Raid Requirements.`,
    examples: [`Masterworks & Raptors`],
  },
  {
    id: `description`,
    title: `description`,
    hidden: false,
    required: false,
    text: `Set a description.`,
    examples: [`This is a description`],
  },
  {
    id: `duration`,
    title: `duration`,
    hidden: false,
    required: false,
    text: `Duration for the Discord event in hours (Default: 1 Hour)`,
    examples: [`1`],
  },
  {
    id: `voice`,
    title: `voice`,
    hidden: false,
    required: false,
    text: `The voice channel this raid takes place in`,
    examples: [`#lobby`],
  },
];

export default function ContentWrapper({
  features = defaultFeatures,
  title = `/create raid`,
  disableImage = false,
  imageSrc = createRaidGif,
  description = `Creates a raid with the specified options on the channel you use this command on.`,
}) {
  const colorModeBlue = useColorModeValue(`blue.50`, `blue.900`);
  const colorModeOrange = useColorModeValue(`orange.50`, `orange.900`);
  return (
    <Box>
      <Stack
        spacing={4}
        as={Container}
        maxW={`6xl`}
        minW="100%"
        mt={3}
        textAlign={`left`}
      >
        <Text
          textTransform={`uppercase`}
          color={`blue.400`}
          fontWeight={700}
          fontSize={`md`}
          bg={colorModeBlue}
          p={3}
          alignSelf={`flex-start`}
          rounded={`md`}
        >
          {title}
        </Text>
        <Text color={`gray.600`} fontSize={`md`} fontWeight={400}>
          {description}
        </Text>
        <Image
          display={disableImage ? `none` : `block`}
          rounded={`md`}
          boxSize={`full`}
          alt={`feature image`}
          src={imageSrc}
          objectFit={`cover`}
        />
      </Stack>

      <Container maxW={`6xl`} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={10}>
          {features.map(
            ({ id, title, required, text, hidden = false, examples = [] }) => (
              <HStack
                key={id}
                align={`top`}
                visibility={hidden ? `hidden` : `visible`}
              >
                {
                  {
                    true: (
                      <Tooltip hasArrow label="Mandatory" placement="top-start">
                        <Box color={`blue.400`} px={1}>
                          <Icon as={AiFillCheckSquare} boxSize={6} mt={1} />
                        </Box>
                      </Tooltip>
                    ),
                    false: (
                      <Tooltip hasArrow label="Optional" placement="top-start">
                        <Box color={`grey.400`} px={1}>
                          <Icon as={AiFillQuestionCircle} boxSize={6} mt={1} />
                        </Box>
                      </Tooltip>
                    ),
                  }[required.toString()]
                }

                <VStack align={`start`}>
                  <Text
                    textTransform={`uppercase`}
                    color={`orange.400`}
                    fontWeight={700}
                    fontSize={`md`}
                    bg={colorModeOrange}
                    p={2}
                    alignSelf={`flex-start`}
                    rounded={`md`}
                  >
                    {title}
                  </Text>
                  <Text color={`gray.500`} fontWeight={500}>
                    {text}
                  </Text>
                  <Text color={`gray.500`} fontWeight={500}>
                    Examples :
                  </Text>
                  <List spacing={3}>
                    {examples.map((example, id) => (
                      <ListItem key={id} fontWeight={400}>
                        <ListIcon as={HiChevronRight} color="green.500" />
                        {example}
                      </ListItem>
                    ))}
                  </List>
                </VStack>
              </HStack>
            ),
          )}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
