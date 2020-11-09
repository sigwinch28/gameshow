export const active = () => {
    return "fruits"
}

export const lists = () => {
    let lists = new Array()
    lists.push([active(), ["apple", "orange", "pear", "banana", "grape", "strawberry"]])
    return lists
}
