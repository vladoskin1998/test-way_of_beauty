import { MoonIcon } from "../../icons/moon"

export const CardNightButton = ({
    handlerTheme,
}: {
    handlerTheme: () => void
}) => {
    return (
        <button className="card__night" onClick={handlerTheme}>
            <MoonIcon />
        </button>
    )
}
