import {
  Box,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { GrInstallOption, GrPersonalComputer } from 'react-icons/gr';
import { FaDiscord } from 'react-icons/fa';
import { ReactElement } from 'react';
import ImgMonkey from './_monkeyFix.jpg';
interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={`row`} align={`center`}>
      <Flex
        w={8}
        h={8}
        align={`center`}
        justify={`center`}
        rounded={`full`}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  return (
    <Box maxW="7xl" mx={`auto`} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={`uppercase`}
            color={`blue.400`}
            fontWeight={600}
            fontSize={`sm`}
            bg={useColorModeValue(`blue.50`, `blue.900`)}
            p={2}
            alignSelf={`flex-start`}
            rounded={`md`}
          >
            Overview
          </Text>
          <Heading>Installing UglyBot</Heading>
          <Text textAlign="left" fontWeight="400">
            Installing uglybot is simple and strightforward. All you need to do
            is to click{` `}
            <Link
              color="orange.500"
              href="https://discord.com/api/oauth2/authorize?client_id=1008359396864184460&permissions=8&scope=bot"
              isExternal={true}
            >
              Install
            </Link>
            {` `}
            and follow the instructions. You will have to login to your discord
            account and select the server you want to add the bot to.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue(`gray.100`, `gray.700`)}
              />
            }
          >
            <Feature
              icon={
                <Icon as={GrInstallOption} color={`orange.500`} w={5} h={5} />
              }
              iconBg={useColorModeValue(`orange.400`, `orange.900`)}
              text={`Install`}
            />
            <Feature
              icon={<Icon as={FaDiscord} color={`blue.500`} w={5} h={5} />}
              iconBg={useColorModeValue(`blue.100`, `blue.900`)}
              text={`Select discord server`}
            />
            <Feature
              icon={
                <Icon
                  as={GrPersonalComputer}
                  color={`purple.500`}
                  w={5}
                  h={5}
                />
              }
              iconBg={useColorModeValue(`purple.100`, `purple.900`)}
              text={`Start using the bot`}
            />
          </Stack>
          <Text textAlign="left" fontWeight="400">
            You can find more info on using the bot in the{` `}
            <Link
              color="orange.500"
              href="/docs/interactions"
              isExternal={true}
            >
              Interactions with uglybot
            </Link>
            {` `}.
          </Text>
        </Stack>
        <Flex>
          <Image
            rounded={`md`}
            alt={`feature image`}
            src={ImgMonkey}
            objectFit={`cover`}
          />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
