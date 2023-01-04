import { TIME_ORDER } from "../../utils/constant"
import { useSelector } from "react-redux"
import { RootState } from "../../storage/store/store"
import { changeCurrentTime } from "../../storage/reduser/dataPicker"
import { useDispatch } from "react-redux"
import { memo } from "react"

export const CardTimeButton = memo(() => {
    const { currentOrder } = useSelector((s: RootState) => s.picker)
    const dispatch = useDispatch()

    const handlerChangeTime = (time: string) => {
        dispatch(changeCurrentTime(time))
    }

    return (
        <div className="card__time">
            {TIME_ORDER.map((time) => (
                <button
                    className={`card__time-button ${
                        currentOrder.time.includes(time) &&
                        "card__time-button-active"
                    }`}
                    onClick={() => handlerChangeTime(time)}
                >
                    {time}
                </button>
            ))}
        </div>
    )
})
