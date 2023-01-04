import { ReactDatePickerCustomHeaderProps } from "react-datepicker"
import { MONTHS } from "../../utils/constant"
import { LeftChevronIcon, RigthChevronIcon } from "../../icons/chevron"
import { memo } from "react"
export const PickerHeader = memo(
    ({ props }: { props: ReactDatePickerCustomHeaderProps }) => {
        const { date, decreaseMonth, increaseMonth } = props

        return (
            <div className="react-datepicker__header--custom-wrap">
                <h4 className="react-datepicker__header--custom-month">{`${
                    MONTHS[date.getMonth()]
                } ${date.getFullYear()}`}</h4>
                <button
                    onClick={decreaseMonth}
                    className="react-datepicker__header--custom-chevron"
                >
                    <LeftChevronIcon />
                </button>
                <button
                    onClick={increaseMonth}
                    className="react-datepicker__header--custom-chevron"
                >
                    <RigthChevronIcon />
                </button>
            </div>
        )
    }
)
