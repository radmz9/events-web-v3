import type React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title?: string;
}

export const Form = ({ children, title, className = '', ...props }: FormProps) => {
    return(
        <form
            {...props}
            className={`p-6 rounded-xl border border-gray-200 w-full flex flex-col gap-5 ${className}`}
        >
            { title && <h2 className="text-xl font-bold text-sliate-200 mb-2">{title}</h2> }
            {children}
        </form>
    );
}