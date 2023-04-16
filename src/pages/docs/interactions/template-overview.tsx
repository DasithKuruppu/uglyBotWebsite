import {
  GridItem,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { ComponentOverviewItem } from './template-componentOverviewItem';

const defaultCategories = [
  {
    title: `Raids and Events`,
    components: [
      {
        title: `/create raid`,
        url: `/docs/interactions/`,
        id: `createRaid`,
        selected: true,
      },
    ],
    id: `create`,
  },
  {
    title: `Users`,
    components: [
      {
        title: `/request profile`,
        url: `/docs/interactions/request_profile`,
        id: `requestProfile`,
        selected: false,
      },
    ],
    id: `create`,
  },
];

export default function gridListWith({ categories = defaultCategories }) {
  return (
    <VStack w="full" mt={5} alignItems="stretch" spacing={12}>
      <List w="full" spacing={12}>
        {categories.map(({ title, components, id }) => (
          <ListItem
            key={title}
            display="flex"
            flexDirection="column"
            rowGap={6}
          >
            <Heading as="h2" size="md" id={id} scrollMarginTop={24}>
              {title}
            </Heading>
            <SimpleGrid columns={{ base: 1 }} spacing={1}>
              {components.map(
                ({ title: componentTitle, url, selected, id }) => {
                  return (
                    <GridItem key={id} colSpan={1}>
                      <ComponentOverviewItem
                        url={url}
                        title={componentTitle}
                        selected={selected}
                      />
                    </GridItem>
                  );
                },
              )}
            </SimpleGrid>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}
