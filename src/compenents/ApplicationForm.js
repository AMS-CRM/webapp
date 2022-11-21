import { Drawer, useMantineTheme, Title, Container, Input, Grid, Button } from '@mantine/core';
import { IconAt } from '@tabler/icons';


const ApplicationForm = ({onClose, opened}) => {


    const theme = useMantineTheme();

    return (
        <Drawer
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            size="xl"
            padding="xl"
            position='right'
            onClose={()=>onClose(false)}
        >
        <Container >
            <Title order={2} mb="6px">Create Profile</Title>
            <Title order={5} mb="30px" weight="400">Create a user applicant's profile using passport data.</Title>

            <form>
               <Grid>
                    <Grid.Col span={6} justify="center">
                        <Input.Wrapper
                            id="input-demo"
                            withAsterisk
                            size="sm"
                            label="First Name"
                    >
                        <Input id="input-demo" placeholder="First Name" />
                    </Input.Wrapper>
                
                    </Grid.Col>
                    <Grid.Col span={6}>
                    <Input.Wrapper
                        id="input-demo"
                        withAsterisk
                        size="sm"
                        label="Last Name"
                >
                     <Input id="input-demo" placeholder="Last Name" />
                </Input.Wrapper>
                
                    </Grid.Col>

                    <Grid.Col span={12}>
                    <Input.Wrapper
                        id="input-demo"
                        withAsterisk
                        size="sm"
                        label="Middle Name"
                >
                     <Input id="input-demo" placeholder="Middle Name" />
                </Input.Wrapper>
                
                    </Grid.Col>

                    <Grid.Col span={12}>
                    <Input.Wrapper
                        id="input-demo"
                        withAsterisk
                        size="sm"
                        icon={<IconAt />}

                        label="Email"
                >
                     <Input id="input-demo" placeholder="Email" />
                </Input.Wrapper>
                
                    </Grid.Col>

                    <Grid.Col span={4}>
                            <Button>Create Profile</Button>
                    </Grid.Col>

                    
               </Grid>
        </form>
        </Container>
      </Drawer>
    )
}

export default ApplicationForm;