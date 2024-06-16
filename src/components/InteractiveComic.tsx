import { Box, Button, CircularProgress, Container, InputAdornment, TextField, Typography, styled } from "@mui/material"
import { DestinationAction, InputAction, PageData } from "../types"
import React, { useRef, useState } from "react"

const ActionButton = styled(Button)({
    borderRadius: "3rem",
    border: "thin solid #7d7d7d",
    textTransform: 'none',
    padding: "1.5em",
    ':last-child:nth-of-type(2n-1)': {
        justifySelf: "center", gridColumnStart: "span 2", width: "50%"
    }
})

type InteractiveComicProps = {
    pageData: PageData
    currentFlags: Record<string, boolean>,
    changePageId: (newPageId: string) => void,
    handleFlagSet: (flag: string) => void,
    restart: () => void
}

const Loader: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center" height="100vh" alignItems="center">
            <CircularProgress />
        </Box>
    )
}

const InteractiveComic: React.FC<InteractiveComicProps> = ({ pageData, currentFlags, changePageId, handleFlagSet, restart }) => {
    const [loading, setLoading] = useState(false)

    // input field variables
    const [name, setName] = useState('')
    const [isNameInvalid, setIsNameInvalid] = useState(false)

    const setAndValidateName = (value: string) => {
        setName(value)
        if (value.trim().toLowerCase().length === 0) {
            setIsNameInvalid(true)
        }
        else {
            setIsNameInvalid(false)
        }
    }

    const handlePageChange = (action: DestinationAction) => {
        // show loader... only to hide the instant scroll
        setLoading(true)
        // send player to the top
        window.scrollTo(0, 0)
        // set any required flags, or reset flags and page if we're restarting
        if (action?.setFlag) {
            handleFlagSet(action.setFlag)
        }
        if (action.destinationId === "restart") {
            restart()
        }
        else {
            // change the image and available actions e.g. buttons
            changePageId(action.destinationId)
        }
    }
    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>, action: InputAction) => {
        event.preventDefault()
        if (isNameInvalid) {
            return
        }
        const nameCleaned = name.trim().toLowerCase()
        const potentialMatch = action.answers.find((answer) => answer.answer === nameCleaned)
        if (document.activeElement instanceof HTMLElement) {
            // blur the input so the scroll to top works with devices with virtual keyboards
            document.activeElement.blur()
        }
        if (potentialMatch === undefined) {
            handlePageChange(action.defaultAnswer)
        }
        else {
            handlePageChange(potentialMatch)
        }
    }

    const isVisibleButton = (action: DestinationAction) => {
        const requiredFlag = action?.requiredFlag
        if (requiredFlag === undefined || currentFlags[requiredFlag.flag] === requiredFlag.flagValue) {
            return true
        }
        return false
    }

    return (
        <Container disableGutters maxWidth="md">
            <Box display="flex" flexDirection="column">
                {loading && <Loader />}
                <Box component="img" src={pageData.image} onLoad={() => setLoading(false)} display={loading ? "none" : "block"} mb={4} alt={pageData.id} />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1em' }} m={2} mb={4}>
                    {pageData.actionData.map((action, index) => {
                        switch (action.type) {
                            case "button":
                                return (
                                    <React.Fragment key={index}>
                                        {isVisibleButton(action) &&
                                            <ActionButton onClick={() => handlePageChange(action)} fullWidth disableElevation size="large" variant="contained" color={action.color}>{action.label}</ActionButton>}
                                    </React.Fragment>
                                )
                            case "input":
                                return (
                                    <Box key={index} component="form" onSubmit={(event) => handleInputSubmit(event, action)} sx={{ gridColumnStart: "span 2" }}>
                                        <TextField fullWidth variant="filled" label={action.label} value={name} 
                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setAndValidateName(e.target.value)}
                                            error={isNameInvalid}
                                            helperText={isNameInvalid && "Text cannot be blank"}
                                            InputProps={{
                                                sx: { height: "4.5em" },
                                                endAdornment: <InputAdornment position="end">
                                                    <Button type="submit">Submit</Button>
                                                </InputAdornment>
                                            }} />
                                    </Box>
                                )
                            case "end":
                                return (
                                    <Typography key={index} variant="h3" textAlign="center" sx={{ gridColumnStart: "span 2" }} mb={2}>{action.label}</Typography>
                                )
                        }
                    })}
                </Box>
            </Box>
        </Container>
    )
}

export default InteractiveComic