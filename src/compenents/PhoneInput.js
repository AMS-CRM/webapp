import { forwardRef, useEffect, useMemo } from "react";
import { Input, Text, Select, Group, Grid } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

const PhoneInput = ({countries=[]}) => {
   

  const SelectItems = forwardRef(({ flag, name, dial_code, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text size="sm">{flag}</Text>
        <Text size="sm">{dial_code}</Text>
      </Group>
    </div>
  ));

  return (
    <Input.Wrapper
        label="Phone number"
        required
        size="sm"
    >
      <Grid>
        <Grid.Col span={3}>
          <Select
            itemComponent={SelectItems}
            data={countries}
            size="sm"
            dropdownPosition="bottom"
            maxDropdownHeight={200}
            nothingFound="No Countries found"
            rightSection={<IconChevronDown size={12} />}
            rightSectionWidth={20}
            searchable
              filter={(value, item) =>
                    item.dial_code.toLowerCase().includes(value.toLowerCase().trim()) ||
                    item.name.toLowerCase().includes(value.toLowerCase().trim())
                }  
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Input placeholder="Phone Number" />
        </Grid.Col>
      </Grid>
    </Input.Wrapper>
  );
};

export default PhoneInput;
