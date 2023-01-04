import { setOrder } from "../../storage/thunk/thunk"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../../storage/store/store"
import { AppDispatch } from "../../storage/store/store"
import { ButtonSave } from "./buttonSave"

export const CardSaveButton = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentOrder } = useSelector((s: RootState) => s.picker)

    const saveOrder = () => {
        dispatch(setOrder(currentOrder))
    }

    return (
        <ButtonSave onClick={saveOrder} disabled={!currentOrder.time.length} />
    )
}
