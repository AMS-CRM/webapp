import { useState, forwardRef, useMemo } from "react";
import { Title, Input, Grid, Button, Group, Avatar, Text, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconEPassport, IconAt } from "@tabler/icons";
import countryFlagEmoji from "country-flag-emoji";



const CreateContact = () => {
  const [formData, setFormData] = useState({});

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const countryList = useMemo(() => {
    return countryFlagEmoji.list.map((item) => {
        return { ...item, value: item.name, label: item.name }
    })
  })

 

  const CountriesList = forwardRef(({ emoji, name, code, ...others}, ref) => (
    <div  ref={ref} {...others}>
      <Group noWrap>
        <Text size="lg">{emoji}</Text>
       <div>
          <Text size="sm">{name}</Text>
          <Text size="xs" opacity={0.65} >
            Country Code: {code}
          </Text>
        </div>
      </Group>
    </div>
  ))


  return (
    <>
      <Title order={2} mb="6px">
        Create Profile
      </Title>
      <Title order={5} mb="30px" weight="400">
        Create a user applicant's profile using passport data.
      </Title>

      <form>
        <Grid>
          <Grid.Col span={6} justify="center">
            <Input.Wrapper label="First Name" size="xs" required>
              <Input
                placeholder="First Name"
                name="firstName"
                size="md"
                radius="md"
                value={formData.firstName}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="Last Name"  size="xs" required>
              <Input
                placeholder="Last Name"
                name="lastName"
                size="md"
                radius="md"
                value={formData.lastName}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper size="sm"  size="xs" label="Middle Name">
              <Input
                placeholder="Middle Name"
                size="md"
                radius="md"
                name="middleName"
                value={formData.middleName}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper label="Email"  size="xs" required>
              <Input
                placeholder="Email"
                size="md"
                radius="md"
                name="email"
                value={formData.email}
                icon={<IconAt size={18} />}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col>
            <DatePicker
                placeholder="Data of Birth"
                label="Date of birth"
                size="md"
                radius="md"
                withAsterisk
                value={formData.dob} 
                onChange={(value) => setFormData({ ...formData, dob: value})}
              />
          </Grid.Col>

         <Grid.Col span={12}>
            <Input.Wrapper label="Passport Number"  size="xs" required>
              <Input
                placeholder="Passport"
                size="md"
                radius="md"
                name="passport"
                value={formData.passport}
                icon={<IconEPassport size={18} />}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Select
                label="Country of Birth"
                placeholder="Country of Birth"
                itemComponent={CountriesList}
                data={countryList}
                size="sm"
                dropdownPosition="bottom"
                maxDropdownHeight={200}
                nothingFound="No Countries found"
                searchable
                filter={(value, item) =>
                    item.label.toLowerCase().includes(value.toLowerCase().trim())
                }   
            />
          </Grid.Col>

           <Grid.Col span={12}>
            <Input.Wrapper label="Address" description="Current residentail address"  size="xs" required>
              <Input
                placeholder="Address"
                 size="md"
                radius="md"
                name="passport"
                value={formData.address}
              />
            </Input.Wrapper>
          </Grid.Col>

         <Grid.Col span={6}>
            <Input.Wrapper label="State/Provience"  size="xs" required>
              <Input
                placeholder="State"
                size="md"
                radius="md"
                name="passport"
                value={formData.provience}
              />
            </Input.Wrapper>
          </Grid.Col>

           <Grid.Col span={6}>
            <Input.Wrapper label="City"  size="xs" required>
              <Input
                placeholder="City"
                size="md"
                radius="md"
                name="passport"
                value={formData.city}
              />
            </Input.Wrapper>
          </Grid.Col>

             <Grid.Col span={12}>
            <Input.Wrapper label="Postal Code"  size="xs" required>
              <Input
                placeholder="City"
                 size="md"
                radius="md"
                name="Postal Code"
                value={formData.postCode}
              />
            </Input.Wrapper>
          </Grid.Col>
          

          <Grid.Col span={4}>
            <Button>Create Profile</Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
};

export default CreateContact;
