type Props = {
    rows: number;
    total: number;
}
export const Meta = ({ rows, total }: Props) => {
    return(
        <div className="text-xs font-mono">
            Mostrando <span className="font-bold">{rows}</span> de <span className="font-bold">{total}</span> registros.
        </div>
    )
}