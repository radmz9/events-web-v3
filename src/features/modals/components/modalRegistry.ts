import { lazy } from "react";
import type { ComponentType } from "react";
import type { ModalDataMap, ModalType } from "./modalDefinitions";

type ModalComponentProps<T extends ModalType> = ModalDataMap[T] & { onSuccess: () => void };

const AreaForm = lazy(() => import('../../areas/components/AreaForm').then(m => ({ default: m.AreaForm })));
// const AreaConfirm = lazy(() => import('../../areas/components/AreaConfirm').then(m => ({ default: m.AreaConfirm })));

const CalendarForm = lazy(() => import('../../calendars/components/CalendarForm').then(m => ({ default: m.CalendarForm })));
// const CalendarConfirm = lazy(() => import('../../calendars/components/CalendarConfirm').then(m => ({ default: m.CalendarConfirm })));

const SedeForm = lazy(() => import('../../sedes/components/SedeForm').then(m => ({ default: m.SedeForm })));

const PlaceForm = lazy(() => import('../../places/components/PlaceForm').then(m => ({ default: m.PlaceForm })));

const ModalityForm = lazy(() => import('../../modalities/components/ModalityForm').then((m) => ({ default: m.ModalityForm })));

const OdsForm = lazy(() => import('../../ods/components/OdsForm').then((m) => ({ default: m.OdsForm })));
 
const ThematicForm = lazy(() => import('../../thematics/components/ThematicForm').then((m) => ({ default: m.ThematicForm })));

const TypeForm = lazy(() => import('../../event_type/components/TypeForm').then((m) => ({ default: m.TypeForm })));

const StaffForm = lazy(() => import('../../staff/components/StaffForm').then((m) => ({ default: m.StaffForm })));

const AccountForm = lazy(() => import('../../accounts/components/AccountForm').then((m) => ({ default: m.AccountForm })));
const UpdateAccountForm = lazy(() => import('../../accounts/components/ChangeUserForm').then((m) => ({ default: m.ToggleUserForm })));
const UpdatePassword = lazy(() => import('../../profile/components/ChangePasswordForm').then((m) => ({ default: m.ChangePasswordForm })));

const UploadForm = lazy(() => import('../../csv/components/CsvForm').then((m) => ({ default: m.CsvForm })));

const EventForm = lazy(() => import('../../events/components/EventForm').then(m => ({ default: m.EventForm })));

const StudentForm = lazy(() => import('../../students/components/forms/StudentForm').then(m => ({ default: m.StudentForm })));

export const MODAL_COMPONENTS: {
    [K in ModalType]: ComponentType<ModalComponentProps<K>>;
} = {
    CREATE_AREA: AreaForm,
    EDIT_AREA: AreaForm as unknown as ComponentType<ModalComponentProps<"EDIT_AREA">>,
    // DELETE_AREA: AreaConfirm,
    CREATE_CALENDAR: CalendarForm,
    EDIT_CALENDAR: CalendarForm as unknown as ComponentType<ModalComponentProps<"EDIT_CALENDAR">>,
    // DELETE_CALENDAR: CalendarConfirm,
    CREATE_SEDE: SedeForm,
    EDIT_SEDE: SedeForm,

    CREATE_PLACE: PlaceForm,
    EDIT_PLACE: PlaceForm as unknown as ComponentType<ModalComponentProps<"EDIT_PLACE">>,

    CREATE_MODALITY: ModalityForm,
    EDIT_MODALITY: ModalityForm,

    CREATE_ODS: OdsForm,
    EDIT_ODS: OdsForm,

    CREATE_THEAMTIC: ThematicForm,
    EDIT_THEMATIC: ThematicForm,

    CREATE_TYPE: TypeForm,
    EDIT_TYPE: TypeForm,

    CREATE_STAFF: StaffForm,
    EDIT_STAFF: StaffForm,

    CREATE_ACCOUNT: AccountForm,
    UPDATE_ACCOUNT: UpdateAccountForm,
    UPDATE_PASSWORD: UpdatePassword,

    UPLOAD_FILE: UploadForm,

    CREATE_EVENT: EventForm,
    UPDATE_EVENT: EventForm,

    CREATE_STUDENT: StudentForm,
    UPDATE_STUDENT: StudentForm
}
