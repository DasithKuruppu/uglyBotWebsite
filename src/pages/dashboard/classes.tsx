import {
  Box,
  ChakraProvider,
  Flex,
  Stack,
  Grid,
  Text,
  Highlight,
  Link,
  extendTheme,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { useUser } from 'gatsby-plugin-clerk';
import { useEffect, useState } from 'react';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
// import { Filters } from './_filters';
import ClassList from './_classList';
import { SEO } from '@/components/SEO';
import { MultiSelectTheme } from 'chakra-multiselect';
import BreadCrumbs from '@/components/BreadCrumbs';
import { getMemberData } from '@/hooks/useMemberData';

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
  { label: `Classes`, path: `/dashboard/classes` },
];
export default function ClassesList() {
  const { user, isSignedIn } = useUser();
  const [classesList, setClassesList]: [any[], any] = useState([]);
  const [classesLoaded, setClassesLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const userId = user?.id;
      const memberClasses = (userId && (await getMemberData(userId))) || [];
      const [defaultClassLatest] = memberClasses.sort(
        (first: any, secound: any) => secound?.updatedAt - first?.updatedAt,
      );
      const defaultMemberClass = memberClasses.filter(
        (memberClass: any) => memberClass.default,
      );
      const [assignedDefaultClass] = defaultMemberClass;
      const memberClassesWithoutDefault = memberClasses.filter(
        (memberClasses: any) => !memberClasses.default,
      );
      const processedMemberClass = [
        ...defaultMemberClass,
        ...memberClassesWithoutDefault,
      ];
      const processedDefaultClass = assignedDefaultClass || defaultClassLatest;
      console.log({ memberClasses, user });
      setClassesList(
        processedMemberClass.map(
          ({
            discordMemberId,
            className,
            optionalClasses,
            artifactsList,
            mountsList,
            updatedAt,
          }: any) => {
            return {
              discordMemberId,
              className,
              optionalClasses,
              artifactsList,
              mountsList,
              updatedAt,
              defaultClass: processedDefaultClass?.className === className,
            };
          },
        ),
      );
      isSignedIn && setClassesLoaded(true);
    })();
  }, [user?.id, isSignedIn, classesLoaded]);
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
              <Box>
                <Stack
                  p={5}
                  alignItems={`center`}
                  justifyContent={{
                    base: `flex-start`,
                    md: `space-around`,
                  }}
                  direction={{
                    base: `column`,
                    md: `column`,
                  }}
                >
                  <Stack
                    width={{
                      base: `100%`,
                      md: `40%`,
                    }}
                    textAlign={`center`}
                  >
                    <Heading size={`md`}>Classes</Heading>
                  </Stack>
                </Stack>
                <Divider />
                <Text fontWeight={`medium`} textAlign={`left`} py={2}>
                  <Highlight
                    query={`early access`}
                    styles={{
                      px: `2`,
                      py: `1`,
                      rounded: `full`,
                      bg: `teal.100`,
                    }}
                  >
                    Please note that this is still in early access/ experimental
                    state. Stay tuned for more features, for any questions reach
                    out on our discord server.
                  </Highlight>
                </Text>
                <Text fontWeight={`medium`} textAlign={`left`} py={2}>
                  <Highlight
                    query={`early access`}
                    styles={{
                      px: `2`,
                      py: `1`,
                      rounded: `full`,
                      bg: `teal.100`,
                    }}
                  >
                    You can setup a default class here or remove a class that
                    you don&lsquo;t need or use anymore. The default class will
                    be the class that you will join by default on all raids if
                    you just press &quot;Join&quot;
                  </Highlight>
                </Text>
                {!classesLoaded && <Text py={4}>Loading...</Text>}

                {classesLoaded && (
                  <ClassList
                    memberClassesList={classesList}
                    setClassesLoaded={setClassesLoaded}
                  />
                )}
              </Box>
            ) : (
              <Flex direction={`row`} mx={4}>
                <Link
                  href="/signin?redirectTo=/dashboard/classes"
                  color="tomato"
                >
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
    title="UglyBot - User Classes"
    description="A list of classes you have for your discord account."
  />
);
