import { useEffect, useRef, useState } from "react";
import type { Option } from "./SimpleSelect";

interface SearchSelectProps {
    label: string;
    options: Option[];
    value?: string | number;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export const SearchSelect = ({
    label,
    options,
    value,
    placeholder = 'Selecciona una opcion',
    error,
    disabled = false,
    onChange,
}: SearchSelectProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => String(opt.id) === String(value));

    const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(search.toLocaleLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if( containerRef.current && !containerRef.current.contains(event.target as Node)){
                setOpen(false);
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })

    const handleSelect = (option: Option) => {
        onChange(String(option.id));
        setOpen(false);
        setSearch("");
    };

    return(
        <div 
            ref={containerRef}
            className="relative flex flex-col gap-1 w-full"
        >
            <label htmlFor="button" className="text-sm font-medium text-slate-500 ml-1">
                {label}
            </label>

            <button 
                type="button"
                disabled={disabled}
                onClick={() => setOpen(prev => !prev)}
                className={`w-full border rounded-lg p-2.5 text-left bg-white text-black flex items-center justify-between
                    ${error ? "border-red-500" : "border-slate-300"}
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >
                <span 
                    className={selectedOption ? "text-black" : "text-slate-400"}
                >
                    {selectedOption?.label ?? placeholder}
                </span>

                <span 
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                >
                    ▼
                </span>
            </button>

            {/* Dropdown */}
            { open && !disabled && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg overflow-hidden">
                    {/* Search */}
                    <div className="p-2 border-b border-slate-200">
                        <input 
                            type="text" 
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar...."
                            autoFocus
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-black outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Options */}
                    <div className="max-h-60 overflow-y-auto">
                        { filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => handleSelect(opt)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100
                                        ${String(opt.id) === String(value) ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-800"}
                                    `}
                                >   
                                    {opt.label}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-3 text-sm text-slate-500">
                                No se encontraron resultados.
                            </div>
                        ) }
                    </div>
                </div>
            ) }

            {/* Error */}
            { error && (
                <span className="text-xs text-red-400 mt-1">
                    {error}
                </span>
            ) }
        </div>
    )
}