import { type InputHTMLAttributes, type Ref, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    ref?: Ref<HTMLInputElement>;
}

export const Input = ({ 
    label, 
    error, 
    className = '', 
    ref, 
    type = "text",
    ...props 
}: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isPassword = type === "password";
    return(
        <div className="flex flex-col gap-1 w-full">
            <label 
                htmlFor={props.id}
                className="text-sm font-medium text-slate-500 ml-1"
            >
                {label}
            </label>
            <div className="relative">

                <input
                    type={isPassword && showPassword ? "text" : type}
                    ref={ref}
                    className={`
                        w-full
                        border border-slate-300 text-black rounded-lg p-2.5
                        focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none
                        transition-all placeholder:text-slate-300
                        ${isPassword ? "pr-10" : ""}
                        ${error ? 'border-red-500 focus:ring-red-500' : ''}
                        ${className}
                    `}
                    {...props}
                />

                { isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        { showPassword ? (
                            <EyeOff size={20} />
                        ) : <Eye size={20} /> }
                    </button>
                ) }
            </div>
            { error && <span className="text-xs text-red-400 mt-1 ml-1">{error}</span> }
        </div>
    );
}