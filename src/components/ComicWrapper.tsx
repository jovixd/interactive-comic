import InteractiveComic from "./InteractiveComic.js"
import { Data, PageData } from "../types.js"
import { useState } from "react"

type PagesMap = Record<string, PageData>

export const getPagesMap = (pageData: PageData[]) => pageData.reduce((previous: PagesMap, current) => {
    const page = current
    previous[page.id] = page
    return previous
}, {})

type ComicWrapperProps = {
    pages: PagesMap,
    flags: Data["flags"]
    coverPage: string,
    startPage: string
}

const ComicWrapper: React.FC<ComicWrapperProps> = ({pages, flags, coverPage, startPage}) => {
    const [currentPageId, setCurrentPageId] = useState(coverPage)
    const [currentFlags, setCurrentFlags] = useState(flags)
    const changePageId = (newPageId: string) => {
        setCurrentPageId(newPageId)
    }
    const handleFlagSet = (flag: string) => {
        setCurrentFlags({
            ...currentFlags,
            [flag]: true
        })
    }
    const restart = () => {
        setCurrentFlags(flags)
        changePageId(startPage)
    }
    return (
        <InteractiveComic pageData={pages[currentPageId]} currentFlags={currentFlags} changePageId={changePageId} handleFlagSet={handleFlagSet} restart={restart}/>
    )
}

export default ComicWrapper
