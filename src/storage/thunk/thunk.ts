import { createAsyncThunk } from "@reduxjs/toolkit"
import { $api } from "../../api/api"
import { OrderType } from "../../types/types"

// this.namespace = "api"
// this.get("/get-all-orders/", () => {
//     return Db().getAllOrders()
// })
// this.post("/set-order/", (order: any): any => {
//     return Db().setOrder(order)
// })
// this.post("/clear-order/", (id: any): any => {
//     return Db().clearOrder(id)
// })

// const serv = () => {
//     // $api.get('/get-all-orders/').then(r => console.log(r.data))

//     let date = '011 December 2022 14:48 UTC'
//     $api.post("/set-order/", {
//         id: new Date(date),
//         date: new Date(date),
//         time: ["16:00", "10:00"],
//     }).then((r) => console.log(r.data))

// $api.post("/clear-order/", {id:"2023-01-03T12:33:44.494Z"}).then(r => console.log(r))
//  }

export const getAllOrders = createAsyncThunk(
    "/getAllOrders",
    async (): Promise<OrderType[]> => {
        try {
            let allOrder = await $api.get("/get-all-orders/")
            return allOrder.data
        } catch (error) {
            throw new Error()
        }
    }
)

export const setOrder = createAsyncThunk(
    "/setOrder",
    async (payload: OrderType) => {
        try {
            await $api.post("/set-order/", payload)
            return payload
        } catch (error) {
            throw new Error()
        }
    }
)

export const clearOrder = createAsyncThunk(
    "/clearOrder",
    async (id: string) => {
        try {
            console.log("id--------->createAsyncThunk", id)

            await $api.post("/clear-order/", { id })
            return id
        } catch (error) {
            throw new Error()
        }
    }
)
