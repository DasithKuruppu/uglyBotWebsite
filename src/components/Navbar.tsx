import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  Image,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { SignedOut, SignedIn, UserButton, useUser } from 'gatsby-plugin-clerk';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: `Documentation`,
    children: [
      {
        label: `Getting Started`,
        subLabel: `How to get started with UglyBot`,
        href: `/docs/gettingStarted`,
      },
      {
        label: `Interactions`,
        subLabel: `Detailed documentation on how to interact with the bot`,
        href: `/docs/interactions`,
      },
    ],
  },
];

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        bg={useColorModeValue(`white`, `gray.800`)}
        color={useColorModeValue(`gray.600`, `white`)}
        minH={`60px`}
        py={{ base: 1 }}
        px={{ base: 5 }}
        borderBottom={1}
        borderStyle={`solid`}
        borderColor={useColorModeValue(`gray.200`, `gray.900`)}
        align={`center`}
      >
        <Flex
          flex={{ base: `auto`, md: `auto` }}
          maxW={{ base: `60px`, md: `auto` }}
          ml={{ base: -2 }}
          display={{ base: `flex`, md: `none` }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={`ghost`}
            aria-label={`Toggle Navigation`}
          />
        </Flex>
        <Flex flex={{ base: `auto` }} justify={{ base: `left`, md: `start` }}>
          <Box
            textAlign={useBreakpointValue({ base: `left`, md: `left` })}
            fontFamily={`heading`}
            color={useColorModeValue(`gray.800`, `white`)}
          >
            <Box>
              <Link href="/" display={`inline-flex`}>
                <Image
                  display="flex"
                  boxSize="50px"
                  objectFit="contain"
                  src="https://dasithkuruppu.github.io/uglyBot/_media/uglyBot.png"
                  alt="UglyBot"
                />

                <Text
                  textAlign="right"
                  display={{ base: `inline-flex`, md: `none` }}
                  fontSize="md"
                  boxSize="50px"
                  lineHeight={2.5}
                  mt={2}
                >
                  UglyBot
                </Text>
              </Link>
            </Box>
          </Box>

          <Flex display={{ base: `none`, md: `flex` }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={`flex-end`}
          direction={`row`}
          spacing={6}
        >
          <SignedOut>
            <Button
              as={`a`}
              fontSize={`md`}
              fontWeight={600}
              color={`white`}
              bg={`orange.400`}
              href={`/signin`}
              _hover={{
                bg: `orange.300`,
              }}
            >
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue(`gray.600`, `gray.200`);
  const linkHoverColor = useColorModeValue(`gray.800`, `white`);
  const popoverContentBgColor = useColorModeValue(`white`, `gray.800`);
  const { isSignedIn } = useUser();
  const dashboardItems: Array<NavItem> = isSignedIn
    ? [
        {
          label: `Dashboard`,
          children: [
            {
              label: `Raids`,
              subLabel: `Current Raids`,
              href: `/dashboard/`,
            },
            {
              label: `Classes`,
              subLabel: `Class setup and overview`,
              href: `/dashboard/classes`,
            },
          ],
        },
      ]
    : [];
  const discordPage = [
    {
      label: `Our Discord`,
      href: `https://discord.gg/SmF2qJeF6P`,
    },
  ];
  return (
    <Stack direction={`row`} spacing={4}>
      {[...NAV_ITEMS, ...dashboardItems, ...discordPage].map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={`hover`} placement={`bottom-start`}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? `#`}
                fontSize={`xl`}
                fontWeight={500}
                lineHeight="2"
                color={linkColor}
                _hover={{
                  textDecoration: `none`,
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={`xl`}
                bg={popoverContentBgColor}
                p={4}
                rounded={`xl`}
                minW={`sm`}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={`group`}
      display={`block`}
      p={2}
      rounded={`md`}
      _hover={{ bg: useColorModeValue(`orange.50`, `gray.900`) }}
    >
      <Stack direction={`row`} align={`center`}>
        <Box>
          <Text
            transition={`all .3s ease`}
            _groupHover={{ color: `orange.400` }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={`md`}>{subLabel}</Text>
        </Box>
        <Flex
          transition={`all .3s ease`}
          transform={`translateX(-10px)`}
          opacity={0}
          _groupHover={{ opacity: `100%`, transform: `translateX(0)` }}
          justify={`flex-end`}
          align={`center`}
          flex={1}
        >
          <Icon color={`orange.400`} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue(`white`, `gray.800`)}
      p={4}
      display={{ md: `none` }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? `#`}
        justify={`space-between`}
        align={`center`}
        _hover={{
          textDecoration: `none`,
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue(`gray.600`, `gray.200`)}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={`all .25s ease-in-out`}
            transform={isOpen ? `rotate(180deg)` : ``}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: `0!important` }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={`solid`}
          borderColor={useColorModeValue(`gray.200`, `gray.700`)}
          align={`start`}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
