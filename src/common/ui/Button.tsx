import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export const Button = ({ children, isLoading, className = '', ...props }: ButtonProps) => {
    return(
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className={`
                bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 
                text-white font-medium py-2.5 px-5 rounded-lg
                transition-colors cursor-pointer disabled:cursor-not-allowed
                flex items-center justify-center gap-2
                ${className}
            `}
        >
            {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            {children}
        </button>
    )
}