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
    { label: `Terms of Service`, path: `/tos` },
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
              Terms of Service
            </Heading>
          </GridItem>
          <GridItem pl="2" area={`main`}>
            <Text textAlign="left" fontWeight="400">
              Welcome to UglyBot, a highly versatile Discord bot that leverages
              AI to interact with users and aid in the creation of raids. By
              using UglyBot, you agree to the following terms and conditions:
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Basic User Data
            </Heading>
            <Text textAlign="left" fontWeight="400">
              UglyBot may collect basic user data to operate and improve its
              services. This data includes, but is not limited to, your Discord
              user ID, server ID, and messages sent to UglyBot. This data will
              not be shared with third parties.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Open Source
            </Heading>
            <Text textAlign="left" fontWeight="400">
              UglyBot is an open source project, meaning that anyone can view,
              modify, and distribute its source code. By contributing to
              UglyBot, you agree to license your contributions under the same
              open source license used by UglyBot.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Prohibited Uses
            </Heading>
            <Text textAlign="left" fontWeight="400">
              You agree not to use UglyBot for any illegal or unauthorized
              purpose, including but not limited to:
            </Text>
            <List spacing={3} py={4} fontWeight={500}>
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Harassment or discrimination
              </ListItem>
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Spamming
              </ListItem>
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Hacking or cracking
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={MdChevronRight} color="green.500" />
                Distributing malware
              </ListItem>
            </List>
            <Text textAlign="left" fontWeight="400">
              UglyBot reserves the right to terminate your use of its services
              at any time for any reason, including violation of these terms of
              service.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Limitation of Liability
            </Heading>
            <Text textAlign="left" fontWeight="400">
              UglyBot and its creators will not be liable for any direct,
              indirect, incidental, special, consequential, or punitive damages
              arising from or in connection with the use of UglyBot.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Changes to these Terms
            </Heading>
            <Text textAlign="left" fontWeight="400">
              UglyBot may modify these terms of service at any time without
              notice. By continuing to use UglyBot, you agree to be bound by the
              updated terms of service.
            </Text>
            <Divider pb={4} />
            <Heading as="h3" size="md">
              Contact Us
            </Heading>
            <Text textAlign="left" fontWeight="400">
              If you have any questions or concerns about these terms of
              service, please contact us at our official{` `}
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
    title="UglyBot - Terms of service"
    description="The terms of service for UglyBot."
  />
);
