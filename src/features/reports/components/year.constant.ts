export const generateYears = () => {
    const CURRENT_YEAR = new Date().getFullYear();
    const INIT_YEAR = 2004;

    return Array.from(
        { length: CURRENT_YEAR - INIT_YEAR + 1},
        (_, i) => CURRENT_YEAR - i
    )
}