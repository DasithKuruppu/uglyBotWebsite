import {
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

type Props = {
  url: string;
  title: string;
  selected: boolean;
};

export function ComponentOverviewItem(props: Props) {
  const { url, title, selected } = props;
  const colorModeBlue = useColorModeValue(`blue.50`, `blue.900`);
  const colorModeWhite = useColorModeValue(`grey.50`, `white.900`);
  const selectedColor = `blue.500`;
  const defaultColor = `grey.50`;
  const borderColor = selected ? selectedColor : defaultColor;
  const fillColor = selected ? colorModeBlue : colorModeWhite;
  return (
    <LinkBox
      as="article"
      height="full"
      rounded="lg"
      overflow="hidden"
      transition="box-shadow 0.1s ease-out"
      role="group"
      borderWidth="2px"
      borderColor={borderColor}
      _dark={{ bg: `whiteAlpha.50` }}
      _hover={{ shadow: `md` }}
    >
      <LinkOverlay href={url}>
        {/* <Text fontSize="sm" fontWeight="semibold" px="4" py="3"></Text> */}
        <Text
          textTransform={`uppercase`}
          color={`blue.400`}
          fontWeight={700}
          fontSize={`md`}
          bg={fillColor}
          p={3}
          alignSelf={`flex-start`}
          rounded={`md`}
        >
          {title}
        </Text>
      </LinkOverlay>
    </LinkBox>
  );
}
