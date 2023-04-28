// import BreadCrumbs from '@/components/BreadCrumbs';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { chakra } from '@chakra-ui/react';
import { getRaidData } from '../../hooks/useRaidData';
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
    (async () => {
      const raidData = await getRaidData();
      console.log({ raidData });
    })();
  }, []);
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
