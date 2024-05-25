import { Box, Button, Container, styled } from "@mui/material"
import { PageData } from "../types"
import Grid from "@mui/material/Unstable_Grid2"
import { useEffect } from "react"

export const ActionButton = styled(Button)({
    borderRadius: "3rem",
    textTransform: 'none'
})

type InteractiveComicProps = {
    pageData: PageData
    currentFlags: Record<string, boolean>,
    handlePageChange: (newPageId: string) => void,
    handleFlagSet: (flag: string) => void
}

const InteractiveComic: React.FC<InteractiveComicProps> = ({ pageData, handlePageChange, handleFlagSet }) => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    }, [pageData.image])
    
    return (
        <Container disableGutters maxWidth="md">
            <Box display="flex" flexDirection="column">
            {/* TODO: baseUrl appended to image for GH Pages */}
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