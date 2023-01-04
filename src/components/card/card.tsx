import { CardNightButton } from "./cardHightButton"
import { Picker } from "./picker"
import { CardTimeButton } from "./cardTimeButton"
import { CardLineDate } from "./cardLineDate"
import { CardSaveButton } from "./cardSaveButton"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getAllOrders } from "../../storage/thunk/thunk"
import { AppDispatch, RootState } from "../../storage/store/store"
import { useSelector } from "react-redux"
import { useBeforeunload } from "react-beforeunload"

export default function DataPicker() {
    const [isNight, setIsNight] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { currentOrder, changingTime } = useSelector(
        (s: RootState) => s.picker
    )

    const handlerTheme = useCallback(() => setIsNight((s) => !s), [])

    useBeforeunload((event) => {
        if (!!currentOrder.time.length && changingTime) {
            event.preventDefault()
        }
    })

    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    return (
        <div className={`card ${isNight ? "card__theme" : ""}`}>
            <CardNightButton handlerTheme={handlerTheme} />
            <Picker />
            <CardTimeButton />
            <CardLineDate />
            <CardSaveButton />
        </div>
    )
}
