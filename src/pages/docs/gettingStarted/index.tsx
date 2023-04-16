import BreadCrumbs from '@/components/BreadCrumbs';
import Navbar from '@/components/Navbar';
import InstallingGuide from './template-installing';
import { Grid, GridItem, Heading, Box } from '@chakra-ui/react';
import { SEO } from '@/components/SEO';
import Footer from '@/components/Footer';

export default function GettingStarted() {
  const pathList = [
    {
      label: `Home`,
      path: `/`,
    },
    { label: `Getting Started`, path: `/docs/gettingStarted` },
  ];
  return (
    <main>
      <Navbar />
      <Box maxW="7xl" mx={`auto`} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Grid
          templateAreas={`"header header"
                        "main main"`}
          gridTemplateRows={`50px 1fr 30px`}
          gridTemplateColumns={`150px 1fr`}
          h="100%"
          gap="2"
          rowGap="12"
          marginX="2rem"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" area={`header`}>
            <BreadCrumbs pathList={pathList} />
            <Heading mb={8} textAlign="center" size="2xl">
              Getting Started
            </Heading>
          </GridItem>
          <GridItem pl="2" area={`main`}>
            <InstallingGuide />
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </main>
  );
}

export const Head = () => (
  <SEO
    title="UglyBot - Getting Started"
    description="Guide on how to get started with UglyBot"
  />
);
