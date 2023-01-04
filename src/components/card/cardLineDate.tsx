import { useSelector } from "react-redux"
import { RootState } from "../../storage/store/store"
import { parceDateUa } from "../../utils/parce"

export const CardLineDate = () => {
    const { id, time } = useSelector((s: RootState) => s.picker.currentOrder)
    return (
        <p className="card__line_time">{`${parceDateUa(id)} ${time.map(
            (it) => it
        )}`}</p>
    )
}
