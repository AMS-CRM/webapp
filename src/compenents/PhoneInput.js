import { forwardRef } from "react";
import { Input, Text, Select, Group, Grid } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

const PhoneInput = (props) => {
  const data = [
    {
      label: "🇦🇫 +91",
      emoji: "🇦🇫",
      code: "+91",
      value: "India",
    },
  ];

  const SelectItems = forwardRef(({ emoji, label, code, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text size="lg">{emoji}</Text>
        <Text size="sm">{code}</Text>
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
            data={data}
            size="sm"
            dropdownPosition="bottom"
            maxDropdownHeight={200}
            nothingFound="No Countries found"
            rightSection={<IconChevronDown size={12} />}
            rightSectionWidth={20}
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
