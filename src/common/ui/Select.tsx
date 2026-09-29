import type { SelectHTMLAttributes, Ref } from "react";

interface SelectProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: T[];
    getOptionValue: (option: T) => string | number;
    getOptionLabel: (option: T) => string;
    error?: string;
    placeholder?: string;
    ref: Ref<HTMLSelectElement>;
}

export const Select = <T, >({ label, options, getOptionValue, getOptionLabel, error, placeholder, className = '', ref, ...props }: SelectProps<T>) => {
    return(
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={label} className="text-sm font-medium text-slate-300 ml-1">
                {label}
            </label>

            <select
                ref={ref}
                className={`
                    border border-slate-300 bg-white text-black rounded-lg p-2.5
                    focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none
                    transition-all cursor-pointer appearance-none
                    ${error ? 'border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
                value={props.value ?? ""}
                {...props}
            >
                { placeholder && <option value="">{placeholder}</option> }

                {options.map((option, index) => (
                    <option key={index} value={getOptionValue(option)}>
                        {getOptionLabel(option)}
                    </option>
                ))}

                { error && (
                    <span className="text-xs text-red-400 mt-1 ml-1">
                        {error}
                    </span>
                ) }
            </select>
        </div>
    )
}