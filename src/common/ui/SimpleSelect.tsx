import {type SelectHTMLAttributes, forwardRef } from "react";

export interface Option {
    id: string | number;
    label: string;
}

interface SelectProps 
    extends SelectHTMLAttributes<HTMLSelectElement> {
        label: string;
        options: Option[];
        placeholder?: string;
        error?: string;
        // ref: Ref<HTMLSelectElement>;
    }

export const SimpleSelect = forwardRef< HTMLSelectElement, SelectProps>(
    ({
        label,
        options,
        placeholder,
        error,
        ...props
    },
    ref
) => {
    const selectId = props.id ?? label;
    return(
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={selectId} className="text-sm font-medium text-slate-500 ml-1">{label}</label>
            <select
                id={selectId}
                ref={ref}
                {...props}
                className={`border border-slate-300 rounded-lg p-2.5 text-black ${error ? 'border-red-500' : ''}`}
            >
                { placeholder && <option value={""}>{placeholder}</option> }
                {options.map((opt) => (
                    <option key={opt.id} value={String(opt.id)}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
        </div>
    )
})

SimpleSelect.displayName = "SimpleSelect";