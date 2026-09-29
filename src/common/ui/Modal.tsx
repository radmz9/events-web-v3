import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    useEffect(() => {
        if(isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !e.defaultPrevented) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if(!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Modal content */}
            <div className="relative max-h-[90vh] w-full max-w-2xl rounded-xl bg-white shadow-2xl transition-all">
                <div className="flex items-center justify-between border-b border-slate-400 px-6 py-4">
                    <h3 className="text-lg font-semibold text-slate-500">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:cursor-pointer">
                        X
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[83vh] p-6">
                    {children}
                </div>
            </div>
            
        </div>,
        document.body
    );
}