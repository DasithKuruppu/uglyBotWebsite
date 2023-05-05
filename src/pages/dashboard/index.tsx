import { getServerRaidData } from '@/hooks/useServerRaidData';
import {
  Box,
  ChakraProvider,
  Flex,
  Grid,
  Link,
  extendTheme,
} from '@chakra-ui/react';
import { useUser } from 'gatsby-plugin-clerk';
import { useEffect, useState } from 'react';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
// import { Filters } from './_filters';
import ListRaids from './_list';
import { SEO } from '@/components/SEO';
import { MultiSelectTheme } from 'chakra-multiselect';
import BreadCrumbs from '@/components/BreadCrumbs';

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

const pathList = [
  {
    label: `Home`,
    path: `/`,
  },
  { label: `Dashboard`, path: `/dashboard` },
];
export default function Dashboard() {
  const { user, isSignedIn } = useUser();
  const [serverList, setServerList]: [any[], any] = useState([]);
  const [raidLoaded, setRaidLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const serverDataList =
        (isSignedIn && (await getServerRaidData(user?.id as string))) || [];

      console.log({ serverDataList });
      setServerList(
        serverDataList.map(({ id, name, owner, icon, raids }) => {
          const avatar = icon
            ? `https://cdn.discordapp.com/icons/${id}/${icon}.png`
            : `https://cdn.discordapp.com/embed/avatars/0.png`;
          return {
            name,
            role: owner ? `Owner` : `Member`,
            avatar,
            content: ``,
            raids,
          };
        }),
      );
      isSignedIn && setRaidLoaded(true);
    })();
  }, [user?.id, isSignedIn]);
  return (
    <ChakraProvider theme={theme}>
      <main>
        <NavBar />
        <Box maxW="7xl" mx={`auto`} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <Grid
            h="100%"
            gap="2"
            rowGap="12"
            marginX="2rem"
            color="blackAlpha.700"
            fontWeight="bold"
          >
            <BreadCrumbs pathList={pathList} />
            {isSignedIn ? (
              <Flex direction={`row`} mx={4}>
                {/* <Flex
            direction={`column`}
            width={{ base: `full`, md: `30%`, lg: `20%` }}
            mt={20}
            mx={4}
          >
            <Filters />
          </Flex> */}
                <ListRaids raidList={serverList} raidLoaded={raidLoaded} />
                {/* <Flex
                textAlign={`center`}
                pt={10}
                justifyContent={`center`}
                direction={`column`}
                width={{ base: `full`, md: `100%`, lg: `100%` }}
                overflow={`hidden`}
                mx={4}
              >
                <Box
                  width={{ base: `full`, sm: `lg`, lg: `xl` }}
                  margin={`auto`}
                >
                  <chakra.h3
                    fontFamily={`Work Sans`}
                    fontWeight={`bold`}
                    fontSize={25}
                    textTransform={`uppercase`}
                    color={`orange.500`}
                  >
                    Active Raids
                  </chakra.h3>
                  <chakra.h2
                    margin={`auto`}
                    width={`70%`}
                    fontFamily={`Inter`}
                    fontWeight={`medium`}
                    color={useColorModeValue(`gray.500`, `gray.400`)}
                  >
                    You have
                    <chakra.strong
                      color={useColorModeValue(`gray.700`, `gray.50`)}
                    >
                      {` `} {serverList.length}
                    </chakra.strong>
                    {` `}
                    servers currently hosting raids !
                  </chakra.h2>
                </Box>

                <SimpleGrid
                  columns={{ base: 1, xl: 2 }}
                  spacing={`20`}
                  mt={16}
                  mb={16}
                  width={{ base: `full`, md: `full`, lg: `full` }}
                  mx={`auto`}
                >
                  {serverList.map((cardInfo, index) => (
                    <ServerList key={index} {...cardInfo} index={index} />
                  ))}
                </SimpleGrid>
              </Flex> */}
              </Flex>
            ) : (
              <Flex direction={`row`} mx={4}>
                <Link href="/signin" color="tomato">
                  Sign In
                </Link>
                &nbsp; to view your dashboard.
              </Flex>
            )}
          </Grid>
        </Box>
        <Footer />
      </main>
    </ChakraProvider>
  );
}

export const Head = () => (
  <SEO
    title="UglyBot - User Dashboard"
    description="The dashboard for UglyBot users."
  />
);
