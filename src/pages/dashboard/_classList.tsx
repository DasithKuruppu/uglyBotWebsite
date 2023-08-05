import { ReactNode, useState } from 'react';
import {
  Box,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Image,
  WrapItem,
  Wrap,
  Center,
  Divider,
  Highlight,
  Checkbox,
} from '@chakra-ui/react';
import { ArtifactsList } from '@/consts/artifactsList';
import { MountsList } from '@/consts/mountsList';
import { CompanionList } from '@/consts/companionsList';
import { getClassOptionsList } from '@/consts/classList';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  removeClass,
  setDefaultClass,
  updateCompanions,
} from '@/hooks/useMemberData';
import { useUser } from 'gatsby-plugin-clerk';
// import { MultiSelect, useMultiSelect } from 'chakra-multiselect';

function ClassWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      width={`100%`}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: `center`, lg: `flex-start` }}
      borderColor={useColorModeValue(`gray.200`, `gray.500`)}
      borderRadius={`xl`}
    >
      {children}
    </Box>
  );
}

export default function ClassList({
  memberClassesList,
  setClassesLoaded,
}: {
  memberClassesList: any[];
  setClassesLoaded: (state: boolean) => void;
}) {
  const initialCompanionsList = memberClassesList.map(
    ({ className, companions }) => {
      const companionsList = companions || [];
      return [className, companionsList];
    },
  );
  const { user } = useUser();
  const [deleteState, setDeleteState] = useState([] as any[]);
  const [currentDefaultClass, setDefaultClassName] = useState(null as any);
  const [currentCompanionsList, setCompanionsList] = useState(
    initialCompanionsList,
  );

  const onCompanionCheck = (
    className: string,
    companionName: string,
    isChecked: boolean,
  ) => {
    console.log({ className, companionName });
    const [existingClass, checkedCompanions] = currentCompanionsList.find(
      ([existingClassName]) => existingClassName === className,
    ) || [null, []];
    console.log({ existingClass, checkedCompanions });
    const prevCompanions = checkedCompanions.filter(
      (checkedCompanion: string) => checkedCompanion !== companionName,
    );
    const newCompanions = !isChecked
      ? prevCompanions
      : [...prevCompanions, companionName];
    console.log({ companionName, isChecked, newCompanions });
    setCompanionsList([
      ...currentCompanionsList.filter(
        ([existingClassName]) => existingClassName !== className,
      ),
      [className, newCompanions],
    ]);

    /* await updateCompanions(user?.id as string, className, value); */
    // setClassesLoaded(false);
  };
  console.log({ currentCompanionsList });
  const onRemoveClass = async (className: string) => {
    setDeleteState([...deleteState, className]);
    const result = await removeClass(user?.id as string, className);
    setClassesLoaded(false);

    console.log({ result });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSaveClass = async (className: string) => {
    // const result = await onSaveClass(user?.id as string, className);
    const [existingClass, savableCompanions] = currentCompanionsList.find(
      ([existingClassName]) => existingClassName === className,
    ) || [undefined, []];
    if (existingClass) {
      console.log({ savableCompanions, className });
      await updateCompanions(user?.id as string, className, savableCompanions);
    }
    setClassesLoaded(false);
  };

  const OnSetDefaultClass = async (className: string) => {
    setDefaultClassName(className);
    await setDefaultClass(user?.id as string, className);
    setClassesLoaded(false);
  };
  const processedMemberClassList = memberClassesList
    .filter(({ className }) => {
      return !deleteState.includes(className);
    })
    .map((memberClass) => {
      return {
        ...memberClass,
        defaultClass: currentDefaultClass
          ? currentDefaultClass === memberClass.className
          : memberClass.defaultClass,
      };
    });
  const colorGreen = useColorModeValue(`green.300`, `green.700`);
  return (
    <Box py={12}>
      <Stack
        direction={`column`}
        textAlign="center"
        justify="center"
        spacing={{ base: 2, md: 8 }}
        py={10}
        maxW={`100%`}
      >
        {(processedMemberClassList || []).map(
          (
            {
              // discordMemberId,
              className,
              optionalClasses = [],
              artifactsList = [],
              mountsList = [],
              companions = [],
              defaultClass = false,
              updatedAt,
            },
            index,
          ) => {
            const updatedDate = new Date(Number(updatedAt)).toLocaleString();
            const mainClassId = getClassOptionsList().find(({ value }) => {
              return className === value;
            })?.emoji.id;
            const optionalClassIdsList = (optionalClasses || []).map(
              (optionalClass: any) => {
                return getClassOptionsList().find(
                  ({ value }) => value === optionalClass,
                )?.emoji.id;
              },
            );
            return (
              <ClassWrapper key={index}>
                <Box position={`relative`} width={`100%`}>
                  {defaultClass && (
                    <Box
                      position="absolute"
                      top="-16px"
                      left="50%"
                      style={{ transform: `translate(-50%)` }}
                    >
                      <Text
                        textTransform="uppercase"
                        bg={colorGreen}
                        px={3}
                        py={1}
                        color={`whiteAlpha.900`}
                        fontSize="sm"
                        fontWeight="600"
                        rounded="xl"
                      >
                        <CheckIcon /> Default
                      </Text>
                    </Box>
                  )}
                  <Box py={8} px={12}>
                    <Text fontWeight="500" fontSize="2xl">
                      {className}
                    </Text>
                    <HStack justifyContent="center" my={2}>
                      <Image
                        src={`https://cdn.discordapp.com/emojis/${mainClassId}.png`}
                        boxSize={`120px`}
                      ></Image>
                      {optionalClassIdsList.map((optionalClassId: string) => {
                        return (
                          <Image
                            key={optionalClassId}
                            boxSize={`60px`}
                            src={`https://cdn.discordapp.com/emojis/${optionalClassId}.png`}
                          ></Image>
                        );
                      })}
                    </HStack>
                    <Highlight
                      query={updatedDate}
                      styles={{
                        px: `2`,
                        py: `1`,
                        rounded: `full`,
                        bg: `red.100`,
                      }}
                    >
                      {`Last updated: ${updatedDate}`}
                    </Highlight>
                    <Divider />
                    {/* <HStack justifyContent="center" my={2}>
                     
                    </HStack> */}
                  </Box>

                  <Stack
                    py={4}
                    borderBottomRadius={`2xl`}
                    direction={[`column`, `row`]}
                    alignSelf={`center`}
                    width={`100%`}
                  >
                    <Box width={{ base: `100%`, md: `33%` }}>
                      <Text fontWeight="400" fontSize="xl">
                        Artifacts
                      </Text>
                      <Wrap spacing={3} textAlign="center" px={12} rounded="xl">
                        {(artifactsList || []).map(
                          (artifact: any, index: number) => {
                            const artifactId = ArtifactsList.find(
                              ({ shortName }) => shortName === artifact,
                            )?.emoji.id;
                            const iconLink = `https://cdn.discordapp.com/emojis/${artifactId}.png`;
                            return (
                              <WrapItem key={index}>
                                <Center w={`80px`} h={`80px`} rounded={`xl`}>
                                  <Image
                                    src={iconLink}
                                    boxSize={`60px`}
                                    mx={`auto`}
                                    rounded={`md`}
                                  />
                                </Center>
                              </WrapItem>
                            );
                          },
                        )}
                      </Wrap>
                    </Box>
                    <Box width={{ base: `100%`, md: `50%` }}>
                      <Text fontWeight="400" fontSize="xl">
                        Mounts
                      </Text>
                      <Wrap spacing={3} textAlign="center" px={12}>
                        {(mountsList || []).map((mount: any, index: number) => {
                          const mountId = MountsList.find(
                            ({ shortName }) => shortName === mount,
                          )?.emoji.id;
                          const iconLink = `https://cdn.discordapp.com/emojis/${mountId}.png`;
                          return (
                            <WrapItem key={`m${index}`}>
                              <Center w={`80px`} h={`80px`}>
                                <Image
                                  src={iconLink}
                                  boxSize={`60px`}
                                  mx={`auto`}
                                  rounded={`md`}
                                />
                              </Center>
                            </WrapItem>
                          );
                        })}
                      </Wrap>
                    </Box>

                    <Box width={{ base: `100%`, md: `50%` }}>
                      <Text fontWeight="400" fontSize="xl">
                        Companions
                      </Text>
                      <Wrap spacing={3} textAlign="center" px={12}>
                        {(CompanionList || []).map(
                          ({ shortName: companion }: any, index: number) => {
                            const isExisting = (companions || []).includes(
                              companion,
                            );
                            const companionId = CompanionList.find(
                              ({ shortName }) => shortName === companion,
                            )?.emoji.id;
                            const iconLink = `https://cdn.discordapp.com/emojis/${companionId}.png`;
                            return (
                              <WrapItem key={`m${index}`}>
                                <Center w={`80px`} h={`80px`}>
                                  <Image
                                    src={iconLink}
                                    boxSize={`60px`}
                                    mx={`auto`}
                                    rounded={`md`}
                                  />
                                </Center>
                                <Checkbox
                                  size="lg"
                                  colorScheme="green"
                                  alignSelf={`center`}
                                  defaultChecked={isExisting}
                                  onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    onCompanionCheck(
                                      className,
                                      companion,
                                      isChecked,
                                    );
                                  }}
                                >
                                  {companion}
                                </Checkbox>
                              </WrapItem>
                            );
                          },
                        )}
                      </Wrap>
                      {/* <MultiSelect
                        options={options}
                        value={currentCompanionsList}
                        label="Choose companions"
                        onChange={onCompanionChange(className) as any}
                      /> */}
                    </Box>
                  </Stack>

                  <Box w="100%" py={7}>
                    {!defaultClass && (
                      <Button
                        w="sm"
                        leftIcon={<CheckIcon />}
                        colorScheme="green"
                        variant="outline"
                        mx={4}
                        mt={4}
                        onClick={() => OnSetDefaultClass(className)}
                      >
                        Default
                      </Button>
                    )}
                    <Button
                      w="sm"
                      leftIcon={<CloseIcon />}
                      colorScheme="red"
                      variant="solid"
                      mx={4}
                      mt={4}
                      onClick={() => onRemoveClass(className)}
                    >
                      Remove
                    </Button>
                    <Button
                      w="sm"
                      leftIcon={<CheckIcon />}
                      colorScheme="green"
                      variant="solid"
                      mx={4}
                      mt={4}
                      onClick={() => onSaveClass(className)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </ClassWrapper>
            );
          },
        )}
      </Stack>
    </Box>
  );
}
