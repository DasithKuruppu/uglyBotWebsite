import { FormControl, GridItem } from '@chakra-ui/react';
import {
  MultiSelect,
  SelectOnChange,
  useMultiSelect,
} from 'chakra-multiselect';

export const Filters = () => {
  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: [
      { label: `Trial 1`, value: `test` },
      { label: `Trial 1`, value: `test` },
    ],
  });
  return (
    <>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <MultiSelect
          options={options}
          value={value}
          label="Server"
          onChange={onChange as SelectOnChange}
          create
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <MultiSelect
          options={options}
          value={value}
          label="Raid Title"
          onChange={onChange as SelectOnChange}
          create
        />
      </FormControl>
    </>
  );
};
