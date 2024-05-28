import { Box, Button, CircularProgress, Container, styled } from "@mui/material"
import { DestinationAction, PageData } from "../types"
import Grid from "@mui/material/Unstable_Grid2"
import { useState } from "react"

const ActionButton = styled(Button)({
    borderRadius: "2rem",
    border: "thin solid #7d7d7d",
    textTransform: 'none'
})

type InteractiveComicProps = {
    pageData: PageData
    currentFlags: Record<string, boolean>,
    changePageId: (newPageId: string) => void,
    handleFlagSet: (flag: string) => void
}

const Loader: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center" height="100vh" alignItems="center">
            <CircularProgress />
        </Box>
    )
}

const InteractiveComic: React.FC<InteractiveComicProps> = ({ pageData, currentFlags, changePageId, handleFlagSet }) => {
    const [loading, setLoading] = useState(false)
    const handlePageChange = (destinationId: DestinationAction["destinationId"]) => {
        // TODO: can we only show the loader if the image isn't cached?
        // show loader
        setLoading(true)
        // send player to the top
        window.scrollTo(0, 0)
        // change the image and available actions e.g. buttons
        changePageId(destinationId)
    }

    return (
        <Container disableGutters maxWidth="md">
            <Box display="flex" flexDirection="column">
                {loading && <Loader />}
                {/* TODO: baseUrl appended to image for GH Pages */}
                <Box component="img" src={import.meta.env.BASE_URL + pageData.image} onLoad={() => setLoading(false)} display={loading ? "none" : "block"} mb={4} />
                <Grid container spacing={2} m={3} disableEqualOverflow>
                    {pageData.actionData.map((action, index) => {
                        switch (action.type) {
                            case "button":
                                return (
                                    <Grid key={index} xs={6} xsOffset={pageData.actionData.length === 1 ? 3 : 0}>
                                        {/* @ts-ignore */}
                                        <ActionButton onClick={() => handlePageChange(action.destinationId)} fullWidth disableElevation size="large" variant="contained" color={action.color}>{action.label}</ActionButton>
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