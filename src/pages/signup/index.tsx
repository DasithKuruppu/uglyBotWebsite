// import BreadCrumbs from '@/components/BreadCrumbs';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import * as styles from './_signup.module.css';
export default function Home() {
  console.log(styles);
  return (
    <main>
      <NavBar />
      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <SignUp
          appearance={{
            elements: {
              rootBox: styles.boxCenter,
              formButtonPrimary: styles.orangeButton,
            },
          }}
          signInUrl="/signin"
        />
      </SignedOut>
      {/* </Container>
      </Box> */}
      <Footer />
    </main>
  );
}

export const Head = () => <SEO />;
