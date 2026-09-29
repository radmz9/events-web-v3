
const CURRENT_YEAR = new Date().getFullYear();
const INIT_YEAR = 2004;
const YEARS = Array.from(
    { length: CURRENT_YEAR - INIT_YEAR + 1 },
    (_, i) => CURRENT_YEAR - i
)

export const Select = () => {
    return(
        <div className="">
            {/* <label htmlFor="select" className="text-sm font-medium text-slate-300 ml-1">
                Selecciona año
            </label> */}
            <select 
                name="year" 
                className="rounded-lg border border-slate-300 px-3 py-2"
            >
                <option value={""}>Selecciona un año</option>
                { YEARS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                )) }
            </select>
        </div>
    )
}