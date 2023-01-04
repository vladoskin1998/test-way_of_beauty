import { createSlice } from "@reduxjs/toolkit"
import { OrderType } from "../../types/types"
import { getAllOrders, setOrder, clearOrder } from "../thunk/thunk"
import { parceDate } from "../../utils/parce"
export interface ReducerInterface {
    orders: OrderType[]
    loader: boolean
    currentOrder: OrderType
    error: boolean
    changingTime: boolean
}

const initialState: ReducerInterface = {
    orders: [],
    loader: false,
    currentOrder: { id: parceDate(new Date()), time: [] },
    error: false,
    changingTime: false,
}

const pickerReducer = createSlice({
    name: "picker",
    initialState,
    reducers: {
        changeCurrentDate: (state, { payload }: { payload: Date | string }) => {
            state.changingTime = false
            let date = parceDate(payload)
            state.currentOrder = state.orders.find((it) => it.id === date) || {
                ...initialState.currentOrder,
                id: date,
            }
        },
        changeCurrentTime: (state, { payload }: { payload: string }) => {
            state.changingTime = true
            let index = state.currentOrder.time.indexOf(payload)
            index !== -1
                ? state.currentOrder.time.splice(index, 1)
                : state.currentOrder.time.push(payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state) => {
            state.loader = true
        })
        builder.addCase(getAllOrders.rejected, (state) => {
            state.loader = false
        })

        builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
            state.orders = payload
            state.currentOrder =
                payload.find((it) => it.id === parceDate(new Date())) ||
                initialState.currentOrder
            state.loader = false
        })

        builder.addCase(setOrder.pending, (state) => {
            state.loader = true
        })
        builder.addCase(setOrder.rejected, (state) => {
            state.loader = false
            state.changingTime = false
        })

        builder.addCase(
            setOrder.fulfilled,
            (state, { payload }: { payload: OrderType }) => {
                let index = state.orders.findIndex((it) => it.id === payload.id)
                index !== -1
                    ? (state.orders[index] = payload)
                    : state.orders.push(payload)
                state.loader = false
                state.changingTime = false
            }
        )

        builder.addCase(clearOrder.pending, (state) => {
            state.loader = true
        })
        builder.addCase(clearOrder.rejected, (state) => {
            state.loader = false
        })

        builder.addCase(
            clearOrder.fulfilled,
            (state, { payload }: { payload: Date | string }) => {
                state.orders = state.orders.filter((it) => it.id !== payload)
                state.currentOrder = { ...state.currentOrder, time: [] }
                state.loader = false
            }
        )
    },
})

export const { changeCurrentDate, changeCurrentTime } = pickerReducer.actions

export default pickerReducer.reducer
