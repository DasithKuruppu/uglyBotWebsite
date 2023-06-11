// import BreadCrumbs from '@/components/BreadCrumbs';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import * as styles from './_signin.module.css';
export default function SignInPage({ location }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  console.log({ location });
  const redirectTo = location.search.split(`?redirectTo=`)[1];
  return (
    <main>
      <NavBar />
      {/* <Box maxW="7xl" mx={`auto`} pt={5} px={{ base: 2, sm: 10, md: 17 }}>
        <Container maxW="7xl" px={1} mx="auto"> */}
      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <SignIn
          appearance={{
            elements: {
              rootBox: styles.boxCenter,
              formButtonPrimary: styles.orangeButton,
            },
          }}
          signUpUrl="/signup"
          redirectUrl={redirectTo || `/dashboard/classes`}
        />
      </SignedOut>
      {/* </Container>
      </Box> */}
      <Footer />
    </main>
  );
}

export const Head = () => <SEO />;
