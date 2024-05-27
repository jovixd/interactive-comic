import { Box, Button, Container, styled } from "@mui/material"
import { DestinationAction, PageData } from "../types"
import Grid from "@mui/material/Unstable_Grid2"
import { useState } from "react"

export const ActionButton = styled(Button)({
    borderRadius: "3rem",
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
        <Box height="100vh" sx={{ background: "black" }} />
    )
}

const InteractiveComic: React.FC<InteractiveComicProps> = ({ pageData, currentFlags, changePageId, handleFlagSet }) => {
    const [imageLoaded, setImageLoaded] = useState(true)
    const handlePageChange = (destinationId: DestinationAction["destinationId"]) => {
        // show loader
        console.log("setting loader")
        setImageLoaded(false)
        // send player to the top
        window.scrollTo(0, 0)
        // change the image and available actions e.g. buttons
        changePageId(destinationId)
    }

    return (
        <Container disableGutters maxWidth="md">
            <Box display="flex" flexDirection="column">
                {/* TODO: baseUrl appended to image for GH Pages */}
                {!imageLoaded && <Loader />}
                <Box component="img" src={import.meta.env.BASE_URL + pageData.image} onLoad={() => setImageLoaded(true)} mb={4} />
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