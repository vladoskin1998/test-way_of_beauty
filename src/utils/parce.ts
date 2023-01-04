export const parceDate = (d: Date | string): string => {
    let date = new Date(d)

    return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    })
}

export const parceDateUa = (d: Date | string): string => {
    let date = new Date(d)

    return date.toLocaleString("uk", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }).replace(/\р\.$/, '')
}


