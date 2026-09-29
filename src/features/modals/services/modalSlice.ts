import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ModalType, ModalDataMap } from '../components/modalDefinitions';

export type ModalState = {
    isOpen: boolean;
    type: ModalType | null;
    title?: string;
    data?: ModalDataMap[ModalType] | null;
}

const initialState: ModalState = {
    isOpen: false,
    type: null,
    data: null
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: <T extends ModalType>(
                state: ModalState, 
                action: PayloadAction<{ 
                    type: T, 
                    title?: string, 
                    data?: ModalDataMap[T] 
                }>
            ) => {
            state.isOpen = true;
            state.type = action.payload.type;
            state.title = action.payload.title;
            state.data = action.payload.data;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.data = null;
            state.type = null;
            state.data = null;
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
