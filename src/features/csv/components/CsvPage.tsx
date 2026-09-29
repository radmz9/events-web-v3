import { useAppDispatch } from "../../../app/hooks"
import { SectionContainer } from "../../../common/components/template/SectionContainer"
import { openModal } from "../../modals/services/modalSlice";
import { CSVFormatGuide } from "./CSVFormatGuide";

export const CsvPage = () => {
    const dispatch = useAppDispatch();

    const handleOpenForm = () => {
        dispatch(openModal({ type: 'UPLOAD_FILE', title: 'Registro de usuarios por CSV', data: { foo: 'Upload'} }))
    }
    return (
        <SectionContainer
            title="CSV"
            onAction={handleOpenForm}
            actionLabel="Subir archivo"
        >
            <CSVFormatGuide />
        </SectionContainer>
    )
}