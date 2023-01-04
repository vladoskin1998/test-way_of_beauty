import { CheckIcon } from "../../icons/check"
export const ButtonSave = ({
    onClick,
    disabled = false,
}: {
    onClick: () => void
    disabled?: boolean
}) => {
    return (
        <button
            className={`card__save_button ${
                disabled && "card__save_button-disabled"
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            <div className="card__save_button-icons ">
                <CheckIcon />
            </div>
            Підтвердити
        </button>
    )
}
