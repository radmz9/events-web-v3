import type { Option } from "../../../common/ui/SimpleSelect";
import type { Area } from "../../areas/types/area.types";
import type { Calendar } from "../../calendars/types/calendar.types";
import type { Type } from "../../event_type/types/type.types";
import type { Modality } from "../../modalities/types/modality.types";
import type { Ods } from "../../ods/types/ods.types";
import type { Place } from "../../places/types/place.types";
import type { Sede } from "../../sedes/types/sede.types";
import type { Staff } from "../../staff/types/staff.types";
import type { Thematic } from "../../thematics/types/thematic.types";
import type { EventFormProps } from "../../events/components/EventForm";
import type { StudentFormProps } from "../../students/components/forms/StudentForm";

export interface ModalDataMap {
    CREATE_AREA: { typeId: number };
    EDIT_AREA: { area: Area };

    CREATE_CALENDAR: { foo: string };
    EDIT_CALENDAR: { calendar: Calendar };

    CREATE_SEDE: { foo: string; };
    EDIT_SEDE: { sede: Sede };

    CREATE_PLACE: { foo: string; };
    EDIT_PLACE: { place: Place };

    CREATE_MODALITY: { foo: string; };
    EDIT_MODALITY: { modality: Modality };

    CREATE_ODS: { foo: string; };
    EDIT_ODS : { ods: Ods };

    CREATE_THEAMTIC: { foo: string; };
    EDIT_THEMATIC: { thematic: Thematic };

    CREATE_TYPE: { foo: string; };
    EDIT_TYPE: { type: Type };

    CREATE_STAFF: { typeId: number, areaOptions: Option[] };
    EDIT_STAFF: { typeId: number, staff: Staff, areaOptions: Option[] };

    CREATE_ACCOUNT: { areaOptions: Option[], staffOptions: Option[] };
    UPDATE_ACCOUNT: { accountId: number; staffOptions: Option[] };
    UPDATE_PASSWORD: { foo: string };

    UPLOAD_FILE: { foo: string };

    CREATE_EVENT: EventFormProps;
    UPDATE_EVENT: EventFormProps;

    CREATE_STUDENT: StudentFormProps;
    UPDATE_STUDENT: StudentFormProps;
}

export type ModalType = keyof ModalDataMap;