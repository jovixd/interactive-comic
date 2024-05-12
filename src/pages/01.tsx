import Container from "@mui/material/Container"
import data from "../data/01.json"
import { Box, Button } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

const EscapeFromTheOceanPrison = () => {
    return (
        <Container disableGutters maxWidth="lg">
            {data.map((page, index) => {
                return (
                    <Box display="flex" flexDirection="column" key={index}>
                        <Box component="img" src={page.image}/>
                        <Grid container>
                            <Grid>
                                <Button variant="contained">Hello World!</Button>
                            </Grid>
                        </Grid>
                    </Box>
                )
            })}
        </Container>
    )
}

export default EscapeFromTheOceanPrison