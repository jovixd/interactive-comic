import { Box, Button, CircularProgress, Container, TextField, styled } from "@mui/material"
import { DestinationAction, InputAction, PageData } from "../types"
import Grid from "@mui/material/Unstable_Grid2"
import React, { useState } from "react"

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
    const [name, setName] = useState('')
    const handlePageChange = (action: DestinationAction) => {
        // show loader... only to hide the instant scroll
        setLoading(true)
        // send player to the top
        window.scrollTo(0, 0)
        // set any required flags
        if (typeof action?.setFlag === "string") {
            handleFlagSet(action.setFlag)
        }
        // change the image and available actions e.g. buttons
        changePageId(action.destinationId)
    }
    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>, answers: InputAction["answers"]) => {
        event.preventDefault()
        const potentialMatch = answers.find((answer) => answer.answer === name)
        if (potentialMatch === undefined) {
            // FIXME: there will always be a default option in our data
            handlePageChange(answers.find((answer) => answer.answer === "default"))
        }
        else {
            handlePageChange(potentialMatch)
        }
    }


    return (
        <Container disableGutters maxWidth="md">
            <Box display="flex" flexDirection="column">
                {loading && <Loader />}
                {/* TODO: baseUrl appended to image for GH Pages */}
                <Box component="img" src={import.meta.env + pageData.image} onLoad={() => setLoading(false)} display={loading ? "none" : "block"} mb={4} />
                <Grid container spacing={2} m={3} disableEqualOverflow>
                    {pageData.actionData.map((action, index) => {
                        switch (action.type) {
                            case "button":
                                return (
                                    // TODO: center orphaned buttons
                                    <Grid key={index} xs={6} xsOffset={pageData.actionData.length === 1 ? 3 : 0}>
                                        {/* FIXME: using undefined as an index */}
                                        {currentFlags[action?.requiredFlag?.flag] === action?.requiredFlag?.flagValue &&
                                            <ActionButton onClick={() => handlePageChange(action)} fullWidth disableElevation size="large" variant="contained" color={action.color}>{action.label}</ActionButton>}
                                    </Grid>
                                )
                            case "input":
                                return (
                                    <Grid key={index} xs={6} xsOffset={3}>
                                        <form onSubmit={(event) => handleInputSubmit(event, action.answers)}>
                                            <TextField fullWidth variant="filled" label={action.label} value={name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                                        </form>
                                    </Grid>
                                )
                        }
                    })}
                </Grid>
            </Box>
        </Container>
    )
}

export default InteractiveComic