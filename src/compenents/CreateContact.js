import { useState, forwardRef, useMemo, useEffect } from "react";
import {
  Title,
  Input,
  Grid,
  Button,
  Group,
  Avatar,
  NumberInput,
  Text,
  Select,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconEPassport, IconAt, IconCurrencyDollar } from "@tabler/icons";
import countryFlagEmoji from "country-flag-emoji";
import PhoneInput from "./PhoneInput";
import { useDispatch, useSelector } from "react-redux";
import { useError } from "../hooks/useError";

import { getCountries } from "../features/countries/countriesSlice";
import {
  getContacts,
  createContact,
  reset,
} from "../features/contacts/contactSlice";
import { useNavigate, useLocation } from "react-router-dom";

const CreateContact = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useSelector((state) => state.countries);
  const { isError, isSuccess, message, isLoading, contact } = useSelector(
    (state) => state.contacts
  );
  const [errors, setErrors] = useError("contacts");
  const [formData, setFormData] = useState({
    nationality: "Canada",
    dial_code: "Canada",
    hourlyWage: 16.55,
  });
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      onClose(false);
      location.pathname != "/contacts"
        ? navigate("/contacts")
        : dispatch(getContacts({ page: 0 }));
    }

    return () => dispatch(reset());
  }, [isSuccess]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onDialCodeChange = (value) => {
    setFormData({
      ...formData,
      dial_code: value,
    });
  };

  const dial_code = useMemo(() => {
    return data.map((item) => {
      return {
        ...item,
        value: item.name,
        label: `${item.flag} ${item.dial_code}`,
      };
    });
  });

  const countryList = useMemo(() => {
    return data.map((item) => {
      return { ...item, value: item.name, label: item.name };
    });
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(createContact(formData));
  };

  const CountriesList = forwardRef(({ flag, name, code, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Text size="lg">{flag}</Text>
        <div>
          <Text size="md">{name}</Text>
          <Text size="md" opacity={0.65}>
            Country Code: {code}
          </Text>
        </div>
      </Group>
    </div>
  ));

  return (
    <>
      <Title order={2} mb="6px">
        Create Employee
      </Title>
      <Title order={5} mb="30px" weight="400">
        Create
      </Title>

      <form onSubmit={onSubmit}>
        <Grid>
          <Grid.Col span={6} justify="center">
            <Input.Wrapper
              label="First Name"
              size="md"
              error={errors && errors.firstName && errors.firstName}
              required
            >
              <Input
                placeholder="First Name"
                name="firstName"
                size="md"
                radius="md"
                onChange={onChange}
                variant="filled"
                value={formData.firstName}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper
              label="Last Name"
              error={errors && errors.lastName && errors.lastName}
              size="md"
              required
            >
              <Input
                placeholder="Last Name"
                name="lastName"
                size="md"
                radius="md"
                onChange={onChange}
                variant="filled"
                value={formData.lastName}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper
              size="md"
              error={errors && errors.middleName && errors.middleName}
              label="Middle Name"
            >
              <Input
                placeholder="Middle Name"
                size="md"
                radius="md"
                name="middleName"
                variant="filled"
                onChange={onChange}
                value={formData.middleName}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper
              label="Email"
              size="md"
              error={errors && errors.email && errors.email}
              required
            >
              <Input
                placeholder="Email"
                size="md"
                radius="md"
                variant="filled"
                name="email"
                onChange={onChange}
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
              error={errors && errors.dob && errors.dob}
              radius="md"
              withAsterisk
              variant="filled"
              value={formData.dob}
              onChange={(value) => setFormData({ ...formData, dob: value })}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper
              label="Employee No"
              size="md"
              error={errors && errors.employeeId && errors.employeeId}
              required
            >
              <Input
                placeholder="Passport"
                size="md"
                variant="filled"
                radius="md"
                name="employeeId"
                onChange={onChange}
                value={formData.employeeId}
                icon={<IconEPassport size={18} />}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper
              label="Hourly Wage"
              size="md"
              error={errors && errors.hourlyWage && errors.hourlyWage}
              required
            >
              <NumberInput
                placeholder="Hourly Wage"
                size="md"
                variant="filled"
                defaultValue={formData.hourlyWage}
                min={16.55}
                step={1}
                precision={2}
                max={100}
                radius="md"
                name="hourlyWage"
                onChange={(value) => {
                  setFormData({ ...formData, hourlyWage: value });
                }}
                value={formData.hourlyWage}
                icon={<IconCurrencyDollar size={18} />}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <PhoneInput
              countries={dial_code}
              onDialCodeChange={onDialCodeChange}
              onChange={onChange}
              phoneNumber={formData.phone}
              dial_code={formData.dial_code}
              dial_code_error={errors && errors.dial_code && errors.dial_code}
              phone_error={errors && errors.phone && errors.phone}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Select
              label="Country of Birth"
              placeholder="Country of Birth"
              itemComponent={CountriesList}
              data={countryList}
              size="md"
              error={errors && errors.nationality && errors.nationality}
              onChange={(value) =>
                setFormData({ ...formData, nationality: value })
              }
              dropdownPosition="bottom"
              maxDropdownHeight={200}
              variant="filled"
              defaultValue={formData.nationality}
              value={formData.nationality}
              nothingFound="No Countries found"
              searchable
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper
              label="Address"
              description="Current residentail address"
              size="md"
              error={errors && errors.address && errors.address}
              required
            >
              <Input
                placeholder="Address"
                size="md"
                radius="md"
                variant="filled"
                name="address"
                onChange={onChange}
                value={formData.address}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Input.Wrapper
              label="State/Provience"
              size="md"
              error={errors && errors.state && errors.state}
              required
            >
              <Input
                placeholder="State"
                size="md"
                radius="md"
                name="state"
                variant="filled"
                onChange={onChange}
                value={formData.provience}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Input.Wrapper
              label="City"
              size="md"
              error={errors && errors.city && errors.city}
              required
            >
              <Input
                placeholder="City"
                size="md"
                radius="md"
                onChange={onChange}
                name="city"
                variant="filled"
                value={formData.city}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper
              label="Postal Code"
              size="md"
              error={errors && errors.postalCode && errors.postalCode}
              required
            >
              <Input
                placeholder="City"
                size="md"
                radius="md"
                variant="filled"
                name="postalCode"
                onChange={onChange}
                value={formData.postalCode}
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={4}>
            <Button type="submit" loading={isLoading}>
              Create Profile
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
};

export default CreateContact;
