import InteractiveComic from "../components/InteractiveComic"
import data from "../data/01.json"
import { PageData } from "../types"
import { useState } from "react"

const coverPage = "P00"
const firstPage = "P01"
const pages = data.pages.reduce((previous: Record<string, PageData>, current) => {
    const page = current as PageData
    previous[page.id] = page
    return previous
}, {})
const flags: Record<string, boolean> = data.flags

const EscapeFromTheOceanPrison = () => {
    const [currentPageId, setCurrentPageId] = useState(coverPage)
    const [currentFlags, setCurrentFlags] = useState(flags)
    const changePageId = (newPageId: string) => {
        // TODO: unnecessary renders are happening, consider callbacks
        setCurrentPageId(newPageId)
    }
    const handleFlagSet = (flag: string) => {
        setCurrentFlags({
            ...currentFlags,
            [flag]: !currentFlags[flag]
        })
    }
    const restart = () => {
        setCurrentFlags(data.flags)
        changePageId(firstPage)
    }
    return (
        <InteractiveComic pageData={pages[currentPageId]} currentFlags={currentFlags} changePageId={changePageId} handleFlagSet={handleFlagSet} restart={restart}/>
    )
}

export default EscapeFromTheOceanPrison