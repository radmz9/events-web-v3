import { CalendarPlus } from "lucide-react";
import { useAppDispatch } from "../../../app/hooks";
import { SectionContainer } from "../../../common/components/template/SectionContainer"
import { openModal } from "../../modals/services/modalSlice";
import { useEventCatalogs } from "../hooks/useEventCatalogs";
import { Events } from "./Events";

export const EventPage = () => {
    const { catalog } = useEventCatalogs();

    const dispatch = useAppDispatch();
    const title = 'Eventos';
    const handleCreateEvent = () => dispatch(openModal({ 
        type: 'CREATE_EVENT',
        title: 'Nuevo evento',
        data: {
            ...catalog,
            page: 1,
            size: 25
        }
    }))
    return(
        <SectionContainer
            title={title}
            onAction={handleCreateEvent}
            actionIcon={CalendarPlus}
        >
            <Events />
        </SectionContainer>
    )
}