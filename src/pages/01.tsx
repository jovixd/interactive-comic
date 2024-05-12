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

type DuplicateButtonProps = {
    label: string,
    j: number
}

const DuplicateButton: React.FC<DuplicateButtonProps> = ({ label, j }) => (
    <Grid display="flex" justifyContent="space-around" key={j} xs={6}>
        <ActionButton fullWidth disableElevation size="large" variant="contained" color="primary">{label}</ActionButton>
    </Grid>
)

const EscapeFromTheOceanPrison = () => {
    return (
        <Container disableGutters maxWidth="md">
            {data.map((page, i) => {
                return (
                    <>
                        <Box display="flex" flexDirection="column" key={i}>
                            <Box component="img" src={page.image} />
                            <Grid container spacing={3} key={i} disableEqualOverflow>
                                {page.actionData.map((action, j) => {
                                    return (
                                        <>
                                            <DuplicateButton label={action.label} j={j} />
                                            <DuplicateButton label={action.label} j={j} />
                                            <DuplicateButton label={action.label} j={j} />
                                            <DuplicateButton label={action.label} j={j} />
                                        </>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </>

                )
            })}
        </Container>
    )
}

export default EscapeFromTheOceanPrison