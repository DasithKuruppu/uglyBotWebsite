// import BreadCrumbs from '@/components/BreadCrumbs';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Box, Container } from '@chakra-ui/react';
export default function Home() {
  return (
    <main>
      <NavBar />
      <Box maxW="7xl" mx={`auto`} pt={5} px={{ base: 2, sm: 10, md: 17 }}>
        <Container maxW="7xl" px={1} mx="auto" overflow="hidden">
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignIn />
          </SignedOut>
        </Container>
      </Box>
      <Footer />
    </main>
  );
}

export const Head = () => <SEO />;
