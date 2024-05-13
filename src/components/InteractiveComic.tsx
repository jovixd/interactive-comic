import { Box, Button, Container, styled } from "@mui/material"
import { PageData } from "../types"
import Grid from "@mui/material/Unstable_Grid2"

export const ActionButton = styled(Button)({
    borderRadius: "3rem",
    textTransform: 'none',
    height: '6rem',
    fontSize: '2rem'
})

type InteractiveComicProps = {
    pageData: PageData
    currentFlags: Record<string, boolean>,
    handlePageChange: (newPageId: string) => void,
    handleFlagSet: (flag: string) => void
}

const InteractiveComic: React.FC<InteractiveComicProps> = ({ pageData, handlePageChange, handleFlagSet }) => {
    return (
        <Container disableGutters maxWidth="md">
            <Box display="flex" flexDirection="column">
                <Box component="img" src={pageData.image} mb={4} />
                <Grid container spacing={2} m={3} disableEqualOverflow>
                    {pageData.actionData.map((action, index) => {
                        switch (action.type) {
                            case "button":
                                return (
                                    <Grid key={index} xs={6}>
                                        <ActionButton onClick={() => handlePageChange(action.destinationId)} fullWidth disableElevation size="large" variant="contained" color="primary">{action.label}</ActionButton>
                                    </Grid>
                                )
                        }
                        // TODO: add offset to orphaned buttons
                    })}
                </Grid>
            </Box>
        </Container>
    )
}

export default InteractiveComic