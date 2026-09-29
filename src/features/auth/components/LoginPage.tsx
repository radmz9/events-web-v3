import { CircleUser } from "lucide-react"
import { LoginForm } from "./LoginForm"
import { CenterForm } from "../../../common/components/template/CenterForm"

export const LoginPage = () => {
    return(
        <CenterForm
            icon={<CircleUser />}
            title="SIGAAE v3.0"
            subTitle="Ingresa tus credenciales para acceder"
            text={''}
        >
            <LoginForm />
            {/* <p className="mt-8 text-sm text-slate-500">
                ¿Necesitas ayuda? <a href="#" className="text-blue-600 hover:underline">Contacta a soporte</a>
            </p> */}
        </CenterForm>
    )
}