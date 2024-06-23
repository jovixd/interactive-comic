import { Box, Button, CircularProgress, Container, InputAdornment, TextField, Typography, styled } from "@mui/material"
import { Data, DestinationAction, InputAction, InputAnswer, PageData } from "../types.js"
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
    currentFlags: Data["flags"],
    changePageId: (newPageId: string) => void,
    handleFlagSet: (flag: string) => void,
    restart: () => void
}

const Loader = () => {
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
    const viewer = useRef<HTMLElement>()

    const handlePageChange = (action: DestinationAction) => {
        // show loader... only to hide the instant scroll
        setLoading(true)
        // send player to the top
        window.scrollTo(0, 0)
        // clear input field of the saved value
        if (name.length !== 0) {
            setName("")
        }
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

    const isActionAvailable = (action: DestinationAction) => {
        const requiredFlag = action?.requiredFlag
        if (requiredFlag === undefined || currentFlags[requiredFlag.flag] === requiredFlag.flagValue) {
            return true
        }
        return false
    }

    const setAndValidateName = (value: string) => {
        setName(value)
        if (value.trim().toLowerCase().length === 0) {
            setIsNameInvalid(true)
        }
        else {
            setIsNameInvalid(false)
        }
    }
    const findInputDestination = ((answers: InputAnswer[], name: string | "default") => {
        const nameCleaned = name.trim().toLowerCase()
        const availableAnswers = answers.filter((answer) => isActionAvailable(answer))
        
        // additional filter where actions that needed a required flag are prioritized
        const prioritizedAnswers = availableAnswers.filter((answer) => answer?.requiredFlag)
        const answersToMatch = prioritizedAnswers.length === 0 ? availableAnswers : prioritizedAnswers
        
        return answersToMatch.find((answer) => answer.answer === nameCleaned)
    })
    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>, action: InputAction) => {
        event.preventDefault()
        if (isNameInvalid) {
            return
        }
        // blur the input so the scroll to top works with devices with virtual keyboards
        viewer.current?.focus()

        const potentialMatch = findInputDestination(action.answers, name)
        if (potentialMatch === undefined) {
            const defaultMatch = findInputDestination(action.defaultAnswers, "default") as DestinationAction
            handlePageChange(defaultMatch)
        }
        else {
            handlePageChange(potentialMatch)
        }
    }

    return (
        <Container disableGutters maxWidth="md">
            <Box display="flex" flexDirection="column">
                {loading && <Loader />}
                <Box component="img" src={pageData.image} onLoad={() => setLoading(false)} display={loading ? "none" : "block"} mb={4} alt={pageData.id} ref={viewer} />
                <Box sx={{ display: loading ? "none" : "grid", gridTemplateColumns: 'repeat(2, 1fr)', gap: '1em' }} m={2} mb={6}>
                    {pageData.actionData.map((action, index) => {
                        switch (action.type) {
                            case "button":
                                return (
                                    <React.Fragment key={index}>
                                        {isActionAvailable(action) &&
                                            <ActionButton onClick={() => handlePageChange(action)} fullWidth disableElevation size="large" variant="contained" color={action.color}>{action.label}</ActionButton>}
                                    </React.Fragment>
                                )
                            case "input":
                                return (
                                    <React.Fragment key={index}>
                                        {action.caption && <Typography variant="h5" textAlign="center" sx={{ gridColumnStart: "span 2" }} mb={4}>{action.caption}</Typography>}
                                        <Box component="form" onSubmit={(event) => handleInputSubmit(event, action)} sx={{ gridColumnStart: "span 2" }}>
                                            <TextField fullWidth variant="filled" label={action.label} value={name} id="nameInput"
                                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setAndValidateName(e.target.value)}
                                                error={isNameInvalid}
                                                helperText={isNameInvalid && "Text cannot be blank"}
                                                InputProps={{
                                                    sx: { height: "4.5em" },
                                                    endAdornment: name ? <InputAdornment position="end">
                                                    <Button type="submit">Submit</Button>
                                                </InputAdornment> : null
                                                }} />
                                        </Box>
                                    </React.Fragment>
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
