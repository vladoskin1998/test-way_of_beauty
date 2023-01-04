import React, { ReactNode } from "react"
import { memo } from 'react';

export const Modal = memo(({
    children,
    open,
    changeOpen,
}: {
    children: ReactNode
    open: boolean
    changeOpen: () => void
}) => {
    const handlerClose = (e: React.MouseEvent) => {
        changeOpen()
        e.stopPropagation()
    }

    if (!open) {
        return <></>
    }
    return (
        <div className="modal__wrap" onClick={handlerClose}>
            <div className="modal">{children}</div>
        </div>
    )
})
