import React, { useCallback, useState } from "react"
import { CloseIcon } from "../../icons/close"
import { Modal } from "../modal/modal"
import { PropsDayType } from "../../types/types"
import { clearOrder } from "../../storage/thunk/thunk"
import { ButtonSave } from "./buttonSave"
import { parceDate } from "../../utils/parce"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../storage/store/store"

export const PickerDay = ({ dayOfMonth, date }: PropsDayType) => {
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const openModal = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        setOpen(true)
    }, [])

    const deleteOrder = (date: Date | string) => {
        let id = parceDate(date)
        dispatch(clearOrder(id))
    }
    return (
        <div>
            <div className="react-datepicker__custom-day">
                {dayOfMonth}
                <div
                    className="react-datepicker__custom-day--close"
                    onClick={openModal}
                >
                    <CloseIcon />
                </div>
                {
                    <Modal open={open} changeOpen={() => setOpen(false)}>
                        <div className="modal__day">
                            <h2>Підтвердіть видалення часу</h2>
                            <ButtonSave
                                onClick={() => deleteOrder(date as Date)}
                            />
                        </div>
                    </Modal>
                }
            </div>
        </div>
    )
}
