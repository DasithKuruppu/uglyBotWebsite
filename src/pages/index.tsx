// import BreadCrumbs from '@/components/BreadCrumbs';
import HomePage from './_home';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
export default function Home() {
  return (
    <main>
      <NavBar />
      <HomePage />
      <Footer />
    </main>
  );
}

export const Head = () => <SEO />;
