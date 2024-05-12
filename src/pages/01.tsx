import Container from "@mui/material/Container"
import data from "../data/01.json"
import { Box, Button } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

type DuplicateButtonProps = {
    label: string,
    j: number
}

const DuplicateButton: React.FC<DuplicateButtonProps> = ({label, j}) => (
    <Grid display="flex" justifyContent="space-around" key={j} xs={6}>
        <Button fullWidth size="large" variant="contained" color="primary" sx={{ borderRadius: "2rem", textTransform: 'none' }}>{label}</Button>
    </Grid>
)

const EscapeFromTheOceanPrison = () => {
    return (
        <Container fixed disableGutters maxWidth="md">
            {data.map((page, i) => {
                return (
                    <Grid container spacing={3} key={i}>
                        <Grid xs={12} display="flex">
                            <Box flexGrow={1} component="img" src={page.image} />
                        </Grid>
                        {page.actionData.map((action, j) => {
                            return (
                                <>
                                    <DuplicateButton label={action.label} j={j}/>
                                    <DuplicateButton label={action.label} j={j}/>
                                    <DuplicateButton label={action.label} j={j}/>
                                    <DuplicateButton label={action.label} j={j}/>
                                </>
                            )
                        })}
                    </Grid>
                )
            })}
        </Container>
    )
}

export default EscapeFromTheOceanPrison