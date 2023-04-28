import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  Text,
  StatNumber,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { MdQueryStats } from 'react-icons/md';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
  bg: string;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, bg } = props;
  return (
    <Stat px={{ base: 2, md: 4 }} py={`5`} shadow={`xl`} rounded={`lg`} bg={bg}>
      <Flex justifyContent={`space-between`}>
        <Box pl={{ base: 2, md: 4 }} color={`whiteAlpha.900`}>
          <StatLabel fontWeight={`medium`} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={`2xl`} fontWeight={`medium`}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={`auto`}
          color={useColorModeValue(`whiteAlpha.800`, `whiteAlpha.200`)}
          alignContent={`center`}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Box maxW="7xl" mx={`auto`} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Text fontSize="xl">
        UglyBot is a highly versatile discord bot that leverages AI to interact
        with users and aid in the creation of raids.
      </Text>

      <Divider orientation="horizontal" />
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
        py={10}
      >
        <StatsCard
          title={`Users`}
          stat={`2,000`}
          bg={`orange.500`}
          icon={<BsPerson size={`3em`} />}
        />
        <StatsCard
          title={`Servers`}
          stat={`100+`}
          bg={`green.500`}
          icon={<FiServer size={`3em`} />}
        />
        <StatsCard
          title={`Requests per month`}
          stat={`1 Million`}
          bg={`blue.500`}
          icon={<MdQueryStats size={`3em`} />}
        />
      </SimpleGrid>
    </Box>
  );
}
