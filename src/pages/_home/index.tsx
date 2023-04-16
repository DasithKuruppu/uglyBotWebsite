import { Center, Image, chakra } from '@chakra-ui/react';
import UglyBotStatistics from './statistics';
import Testaminials from './testaminials';
export default function Home() {
  return (
    <main>
      <chakra.h1
        textAlign={`center`}
        fontSize={`4xl`}
        py={7}
        fontWeight={`bold`}
      >
        Welcome to UglyBot !
      </chakra.h1>
      <Image
        src="/uglyBotPancake.jpg"
        width="100%"
        maxH={{ base: `300px`, md: `700px` }}
        objectFit="contain"
        alt="UglyBot"
      />

      <Center>
        <UglyBotStatistics />
      </Center>
      <Center>
        <Testaminials />
      </Center>
    </main>
  );
}
