// import BreadCrumbs from '@/components/BreadCrumbs';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { chakra } from '@chakra-ui/react';
import { getRaidData } from '../../hooks/useRaidData';
import { useUser } from 'gatsby-plugin-clerk';
import { useEffect } from 'react';
export default function Home() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    (async () => {
      const raidData = isSignedIn && (await getRaidData(user?.id as string));
      console.log({ raidData, user, isSignedIn });
    })();
  }, [user?.id, isSignedIn]);
  return (
    <main>
      <NavBar />
      <chakra.h1
        textAlign={`center`}
        fontSize={`4xl`}
        py={7}
        fontWeight={`bold`}
      >
        Raids List
      </chakra.h1>

      <Footer />
    </main>
  );
}

export const Head = () => <SEO />;
