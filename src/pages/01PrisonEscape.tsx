import data from "../data/01.json"
import { Data } from "../types.js"
import ComicWrapper, { getPagesMap } from "../components/ComicWrapper.js"

const comicData = data as Data

const PrisonEscape = () => {
    return (
        <ComicWrapper pages={getPagesMap(comicData.pages)} flags={comicData.flags} coverPage="P00" startPage="P01" />
    )
}

export default PrisonEscape
