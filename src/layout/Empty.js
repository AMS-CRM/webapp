import { 
    Card,
    Title,
    Text,
    Avatar,
    createStyles,
    Button,
    Group
} from "@mantine/core"

const useStyle = createStyles((theme) => ({
    card: {
        borderStyle: "dashed",
        justifyContent: "center"
    },
    content: {
        display:"block",
        textAlign: "center",
        maxWidth: "500px",
        margin: "auto"
    }
}))

const Empty = ({title, description, icon}) => {

    const { classes, theme } = useStyle();

    return (
        <Card className={classes.card} p="0" radius="md" contcct mb="30px" py="100px" withBorder>
           <Group className={classes.content}>
           <Avatar radius="100%" size="xl" mb="20px" background="dimmed" m="auto" >
                {icon}
           </Avatar>
            
            <Title order={3} align="center" mb="10px" >{title}</Title>
            <Text color="dimmed" align="center" m="auto">{description}</Text>
            <Button m="auto" mt="10px">+ New</Button>
           </Group>
            
        </Card>
    )

}


export default Empty;