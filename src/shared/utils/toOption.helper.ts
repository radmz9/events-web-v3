export const toOptions = <T> (
    items: T[],
    config: {
        value: keyof T
        label: keyof T
    }
) => items.map((item) => ({
    id: String(item[config.value]),
    label: String(item[config.label])
}))