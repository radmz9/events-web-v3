import type { ModalDataMap, ModalType } from "../components/modalDefinitions";

type CloseModalState = {
    isOpen: false;
    type: null;
    data: null;
};

type OpenModalState = {
    [K in ModalType]: {
        isOpen: true;
        type: K;
        data?: ModalDataMap[K];
        title?: string;
    };
}[ModalType];

export type ModalState = CloseModalState | OpenModalState;