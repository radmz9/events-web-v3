import { BookKey } from "lucide-react";
import { HomeForm } from "./HomeForm";
import { CenterForm } from "../../../common/components/template/CenterForm";

export const HomePage = () => {
    return(
            <CenterForm
                icon={<BookKey />}
                title="Registros"
                subTitle="Ingresa la clave del evento"
                text="Recuerda, que el evento debe estar activo."
            >
                <HomeForm />
            </CenterForm>
    )
}