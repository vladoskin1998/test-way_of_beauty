import DataPicker from "../card/card"
import { useSelector } from "react-redux"
import { RootState } from "../../storage/store/store"
import { Loader } from "../loader/loader"
export default function App() {
    let { loader } = useSelector((s: RootState) => s.picker)

    return (
        <div className="app">
            {!loader || <Loader />}
            <DataPicker />
        </div>
    )
}
