import BreadCrumbs from '@/components/BreadCrumbs';
import Navbar from '@/components/Navbar';
import {
  Grid,
  GridItem,
  Heading,
  Box,
  Link,
  Text,
  Divider,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { SEO } from '@/components/SEO';
import Footer from '@/components/Footer';
import { MdChevronRight } from 'react-icons/md';

export default function GettingStarted() {
  const pathList = [
    {
      label: `Home`,
      path: `/`,
    },
    { label: `Privacy Policy`, path: `/privacyPolicy` },
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
              Privacy Policy
            </Heading>
          </GridItem>
          <GridItem pl="2" area={`main`}>
            <Text textAlign="left" fontWeight="400">
              UglyBot is a highly versatile Discord bot that leverages AI to
              interact with users and aid in the creation of raids. This privacy
              policy describes how UglyBot collects, uses, and shares your
              personal information.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Information We Collect
            </Heading>
            <Text textAlign="left" fontWeight="400">
              UglyBot may collect basic user data to operate and improve its
              services. This data includes, but is not limited to, your Discord
              user ID, server ID, and messages sent to UglyBot. This data will
              not be shared with third parties.
            </Text>
            <List spacing={3} py={4} fontWeight={500}>
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Your Discord user ID and server ID
              </ListItem>
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Your user name and email address if you sign in to this website
                using discord
              </ListItem>
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Messages sent to UglyBot
              </ListItem>
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Any interactions with UglyBot
              </ListItem>
            </List>
            <Text textAlign="left" fontWeight="400">
              We use this information to operate and improve our services, and
              we do not share this information with third parties.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Cookies
            </Heading>
            <Text textAlign="left" fontWeight="400">
              We use cookies on this website to provide you with a better user
              experience. We may store your user name and email address in
              cookies if you sign in to this website using discord.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Information Security
            </Heading>
            <Text textAlign="left" fontWeight="400">
              We take reasonable measures to protect your personal information
              from unauthorized access, use, and disclosure. However, no method
              of transmission over the internet or electronic storage is
              completely secure, and we cannot guarantee the absolute security
              of your personal information.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Children&apos;s Privacy
            </Heading>
            <Text textAlign="left" fontWeight="400">
              UglyBot is not intended for use by children under the age of 13,
              and we do not knowingly collect personal information from children
              under the age of 13. If we learn that we have collected personal
              information from a child under the age of 13, we will take steps
              to delete the information as soon as possible.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Contact Us
            </Heading>
            <Text textAlign="left" fontWeight="400">
              If you have any questions or concerns please contact us at our
              official{` `}
              <Link
                color="orange.500"
                fontWeight={500}
                py={2}
                href="https://discord.com/invite/SmF2qJeF6P"
              >
                Discord server
              </Link>
              .
            </Text>
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </main>
  );
}

export const Head = () => (
  <SEO
    title="UglyBot - Privacy Policy"
    description="The privacy policy of uglybot"
  />
);
