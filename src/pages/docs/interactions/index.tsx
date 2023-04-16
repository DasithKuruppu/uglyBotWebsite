import BreadCrumbs from '@/components/BreadCrumbs';
import Navbar from '@/components/Navbar';
import Overview from './template-overview';
import ContentWrapper from './template-contentWrapper';
import { Grid, GridItem, Heading, Box } from '@chakra-ui/react';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
const defaultCategories = [
  {
    title: `Raids and Events`,
    components: [
      {
        title: `/create raid`,
        url: `/docs/interactions/`,
        id: `createRaid`,
        selected: true,
      },
      {
        title: `/remove raid_user`,
        url: `/docs/interactions/remove_raid_user`,
        id: `removeRaidUser`,
        selected: false,
      },
      {
        title: `/request raid_summary`,
        url: `/docs/interactions/request_raid_summary`,
        id: `raidSummary`,
        selected: false,
      },
    ],
    id: `create`,
  },
  {
    title: `Users`,
    components: [
      {
        title: `/request profile`,
        url: `/docs/interactions/request_profile`,
        id: `requestProfile`,
        selected: false,
      },
      {
        title: `/ask`,
        url: `/docs/interactions/ask`,
        id: `ask`,
        selected: false,
      },
    ],
    id: `users`,
  },
  {
    title: `Server`,
    components: [
      {
        title: `/request server_profile`,
        url: `/docs/interactions/request_server_profile`,
        id: `serverProfile`,
        selected: false,
      },
    ],
    id: `server`,
  },
];
export default function defaultInteractions({
  pathList = [
    {
      label: `Home`,
      path: `/`,
    },
    { label: `Interactions`, path: `/docs/interactions` },
  ],
  categories = defaultCategories,
  mainItem: Content = () => <ContentWrapper />,
}: {
  pathList: { label: string; path: string }[];
  categories: any[];
  mainItem: React.ElementType;
}) {
  return (
    <main>
      <Navbar />
      <Box maxW="7xl" mx={`auto`} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Grid
          templateAreas={{
            md: `"header header"
               "nav main"`,
            base: `"header"
                 "nav"
                 "main"`,
          }}
          gridTemplateRows={{ md: `50px 1fr 30px`, base: `auto` }}
          gridTemplateColumns={{ md: `1fr 3fr`, base: `1fr` }}
          h="100%"
          gap="2"
          rowGap="12"
          marginX="2rem"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" area={`header`}>
            <BreadCrumbs pathList={pathList} />
            <Heading mb={8} textAlign="center" size="2xl" mt={2}>
              Interactions
            </Heading>
          </GridItem>
          <GridItem pl="2" area={`nav`}>
            <Overview categories={categories} />
          </GridItem>
          <GridItem pl="2" area={`main`}>
            <Content />
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </main>
  );
}

export const Head = () => (
  <SEO
    title="UglyBot Interactions"
    description="Documentation on all the interactions you can do with UglyBot"
  />
);
