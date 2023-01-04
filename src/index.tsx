import React from "react"
import ReactDOM from "react-dom/client"
import "react-datepicker/dist/react-datepicker.css"
import "./style/style.scss"
import { Server } from "miragejs"
import App from "./components/app/App"
import { store } from "./storage/store/store"
import { Provider } from "react-redux"
import { OrderType } from "./types/types"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
)

// IMITATION SERVER
// BACKEND
// DON`T TOUCH

new Server({
    routes() {
        this.namespace = "api"
        this.get("/get-all-orders/", () => {
            return Db().getAllOrders()
        })
        this.post("/set-order/", (schema, request): any => {
            let { requestBody } = request
            console.log(JSON.parse(requestBody))

            return Db().setOrder(JSON.parse(requestBody))
        })
        this.post("/clear-order/", (schema, request): any => {
            let { requestBody } = request
            return Db().clearOrder(JSON.parse(requestBody))
        })
    },
})

// IMITATION DB
// BACKEND
// DON`T TOUCH

export const Db = () => {
    const getAllOrders = (): OrderType[] => {
        let items = localStorage.getItem("orders")
        return items ? JSON.parse(items) : ([] as OrderType[])
    }

    const setOrder = (order: OrderType): void => {
        console.log("setOrder--->", order)
        const { id, time } = order
        let allOrd: OrderType[] = getAllOrders()

        let elem = allOrd.find((it) => it.id === id)

        if (!elem) {
            localStorage.setItem(
                "orders",
                JSON.stringify([...(allOrd || []), order])
            )
            return
        }

        let changeOrd = allOrd.map((it) =>
            it.id === id ? { ...it, time } : it
        )

        localStorage.setItem("orders", JSON.stringify(changeOrd))

        return
    }

    const clearOrder = ({ id }: { id: Date }) => {
        let allOrd: OrderType[] = getAllOrders()

        console.log(allOrd)
        console.log("clear-order---->", id)

        let clearItem = allOrd.filter((it) => it.id !== id)
        localStorage.setItem("orders", JSON.stringify(clearItem))
    }

    return {
        getAllOrders,
        setOrder,
        clearOrder,
    }
}
