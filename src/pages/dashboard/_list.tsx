import { CalendarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  Text,
  ListItem,
  Stack,
  Tag,
} from '@chakra-ui/react';
import { useUser } from 'gatsby-plugin-clerk';
import { FaCheckCircle } from 'react-icons/fa';

interface RaidsProps {
  title: string;
  eventDate: string;
  raidUrl: string;
  type: string;
  role: string;
  name: string;
  serverAvatar: string;
}
const Raid = ({
  role,
  name,
  title,
  serverAvatar,
  type,
  eventDate,
  raidUrl,
}: RaidsProps) => {
  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: `flex-start`,
        md: `space-around`,
      }}
      direction={{
        base: `column`,
        md: `row`,
      }}
      alignItems={{ md: `left` }}
    >
      {` `}
      <Stack
        width={{
          base: `100%`,
          md: `15%`,
        }}
        textAlign={`center`}
      >
        <Avatar
          src={serverAvatar}
          height={`80px`}
          width={`80px`}
          alignSelf={`center`}
        />
        <Text fontSize="md" color="tomato">
          {name}
        </Text>
        <Tag
          size={`sm`}
          variant="solid"
          colorScheme="gray"
          textAlign={`center`}
          alignSelf={`center`}
        >
          {role}
        </Tag>
      </Stack>
      <Stack
        width={{
          base: `100%`,
          md: `40%`,
        }}
        textAlign={`left`}
      >
        <Heading size={`md`}>{title}</Heading>
      </Stack>
      <List spacing={3} textAlign="start">
        <ListItem>
          <ListIcon as={CalendarIcon} color="orange.500" />
          {eventDate}
        </ListItem>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="orange.500" />
          {type}
        </ListItem>
      </List>
      <Stack>
        <Button
          as="a"
          href={raidUrl}
          size="md"
          color={`white`}
          bgColor={`orange.400`}
        >
          Goto raid
          <ExternalLinkIcon mx="2px" />
        </Button>
      </Stack>
    </Stack>
  );
};
const RaidsList = ({ raidList, raidLoaded }: any) => {
  const { isSignedIn, isLoaded } = useUser();
  console.log({ raidLoaded, isLoaded });
  const flatRaids = raidList?.flatMap(({ raids, ...server }: any) => {
    return [
      ...raids.map((raid: any) => {
        const raidUrl = `https://discord.com/channels/${raid?.serverId}/${raid?.channelId}/${raid?.messageId}`;
        const serverAvatar = server?.avatar;
        const eventDate = new Date(
          Number(raid?.eventDate) * 1000,
        ).toLocaleString();
        return { ...raid, raidUrl, eventDate, serverAvatar, ...server };
      }),
    ];
  });
  const hasRaids = isSignedIn && !!flatRaids.length;
  return (
    <Box py={6} px={5} minH={`100vh`} width={`100%`}>
      <Stack spacing={4} width={`100%`} direction={`column`}>
        <Stack
          p={5}
          alignItems={`center`}
          justifyContent={{
            base: `flex-start`,
            md: `space-around`,
          }}
          direction={{
            base: `column`,
            md: `row`,
          }}
        >
          <Stack
            width={{
              base: `100%`,
              md: `40%`,
            }}
            textAlign={`center`}
          >
            <Heading size={`lg`}>Dashboard - Active Raids</Heading>
          </Stack>
        </Stack>
        <Divider />
        {(!isLoaded || !raidLoaded) && <Text>Loading...</Text>}
        {isLoaded && raidLoaded && !hasRaids && (
          <Text>0 active raids found !</Text>
        )}
        {flatRaids?.map((raidProps: any, index: number) => {
          return (
            <>
              <Raid id={index} {...raidProps} />
              <Divider key={index + `div`} />
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default RaidsList;
