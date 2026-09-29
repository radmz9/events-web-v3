import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeModal } from "../services/modalSlice";
import { Modal } from "../../../common/ui";
import { MODAL_COMPONENTS } from "./modalRegistry";
import { Suspense } from "react";

type ModalComponent = React.ComponentType<{ onSuccess: () => void; [key: string]: unknown }>;

export const ModalManager = () => {
    const { isOpen, type, title, data } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    if(!isOpen || !type || !data) return null;

    const SelectedModal = MODAL_COMPONENTS[type] as ModalComponent;
    
    return(
        <Modal
            isOpen={isOpen}
            onClose={() => dispatch(closeModal())}
            title={title || 'Formulario'}
        >
            <Suspense fallback={<div className="h-8 w-8 text-center animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>}>
                {SelectedModal ? (
                    <SelectedModal
                        {...data}
                        onSuccess={() => dispatch(closeModal())}
                    />
                ) : <div className="p-4 text-red-500">Error: Modal {type} no registrado</div>}
            </Suspense>
        </Modal>
    )
}