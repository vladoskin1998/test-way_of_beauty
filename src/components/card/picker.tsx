import DatePicker from "react-datepicker"
import { PickerDay } from "./pickerDay"
import { PickerHeader } from "./pickerHeader"
import uk from "date-fns/locale/uk"
import { useSelector } from "react-redux"
import { RootState } from "../../storage/store/store"
import { useDispatch } from "react-redux"
import { changeCurrentDate } from "../../storage/reduser/dataPicker"

export const Picker = () => {
    const dispatch = useDispatch()

    const { orders, currentOrder } = useSelector((s: RootState) => s.picker)

    const handlerChangeDate = (d: Date) => dispatch(changeCurrentDate(d))

    return (
        <DatePicker
            highlightDates={orders.map((it) => new Date(it.id))}
            inline
            fixedHeight
            locale={uk}
            selected={new Date(currentOrder.id)}
            onChange={(d: Date) => handlerChangeDate(d)}
            renderCustomHeader={(props) => <PickerHeader props={props} />}
            renderDayContents={(dayOfMonth, date) => (
                <PickerDay dayOfMonth={dayOfMonth} date={date} />
            )}
        />
    )
}
