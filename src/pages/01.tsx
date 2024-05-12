import Container from "@mui/material/Container"
import data from "../data/01.json"
import { Box, Button, styled } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

const ActionButton = styled(Button)({
    borderRadius: "3rem",
    textTransform: 'none',
    height: '6rem',
    fontSize: '2rem',
})

const EscapeFromTheOceanPrison = () => {
    return (
        <Container disableGutters maxWidth="md">
            {data.map((page, i) => {
                return (
                    <Box display="flex" flexDirection="column" key={i}>
                        <Box component="img" src={page.image} mb={4} />
                        <Grid container spacing={3} disableEqualOverflow>
                                {page.actionData.map((action, j) => {
                                return (
                                    <Grid display="flex" justifyContent="center" key={j} xs={6}>
                                        <ActionButton fullWidth disableElevation size="large" variant="contained" color="primary">{action.label}</ActionButton>
                                    </Grid>
                                )
                            })}                            
                        </Grid>
                    </Box>
                )
            })}
        </Container>
    )
}

export default EscapeFromTheOceanPrison