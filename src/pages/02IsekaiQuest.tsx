import ComicWrapper, { getPagesMap } from "../components/ComicWrapper.js"
import data from "../data/02.json"
import { Data } from "../types.js"

const comicData = data as Data

const IsekaiQuest = () => {
    // TODO: startPage can be optional if there's no clean restart in this comic
    return (
        <ComicWrapper pages={getPagesMap(comicData.pages)} flags={comicData.flags} coverPage="P00_01" startPage="P00_01" />
    )
}

export default IsekaiQuest
