import { Drawer, useMantineTheme, createStyles, Container } from '@mantine/core';
import CreateContact from "./CreateContact";

const useStyles = createStyles((theme) => ({
    drawer: {
        overflowY: "scroll"
    }
}))

const ApplicationForm = ({onClose, opened}) => {


    const theme = useMantineTheme();
    const { classes } = useStyles();

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
            className={classes.drawer}
        >
        <Container >
           <CreateContact />
        </Container>
      </Drawer>
    )
}

export default ApplicationForm;