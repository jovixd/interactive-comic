import ComicWrapper, { getPagesMap } from "../components/ComicWrapper.js"
import data from "../data/03.json"
import { Data } from "../types.js"

const comicData = data as Data

const IsekaiQuest = () => {
    return (
        <ComicWrapper pages={getPagesMap(comicData.pages)} flags={comicData.flags} coverPage="P99" startPage="P00" />
    )
}

export default IsekaiQuest
