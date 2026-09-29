import { useForm, useWatch } from "react-hook-form";
import { type UserCodeData, validateUserCode } from "../../search/components/code.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, User } from "lucide-react";
import { useLazyCheckUserAccessQuery } from "../api/usersApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

export const SearchUser = () => {
    const { isAuth, role } = useAppSelector(state => state.auth);
    const [checkUserAccess, { isFetching }] = useLazyCheckUserAccessQuery();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm<UserCodeData>({
        resolver: zodResolver(validateUserCode),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            code: ""
        }
    });

    const code = useWatch({ control, name: "code" });

    const canSubmit = /^[a-zA-Z0-9]{7,9}$/.test(code.trim());

    const navigate = useNavigate();

    const allowed: Array<string | null> = ['ROOT', 'COORDI', 'JEFE_DPTO'];
    if(!isAuth || !allowed.includes(role)) return null;

    const onSubmit = async ({ code }: UserCodeData) => {
        try {
            const response = await checkUserAccess(code).unwrap();
            if(!response.allowed) return;
    
            const route = `/comunidad/${response.type_user}/${code}`;
            reset();
            navigate(route);
        } catch (error) {
            console.log(error);
            toast.error('Error', {
                description: 'No tienes privilegios sobre este usuario',
                duration: 5000
            });
        }
    }

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm"
        >
            <div 
                className={[
                    "group flex items-center gap-2",
                    "rounded-lg border bg-slate-50",
                    "px-3 py-1.5",
                    "transition-all duration-200",
                    "border-slate-200",
                    "focus-within:border-blue-400",
                    "focus-within:bg-white",
                    "focus-within:ring-2 focus-within:ring-blue-500/10",
                    errors.code
                        ? "border-red-400 focus-within:border-red-400"
                        : "",
                    ].join(" ")}
            >
                <User 
                    size={18}
                    aria-hidden="true"
                    className={[
                        "shrink-0 transition-colors",
                        "text-slate-400",
                        "group-focus-within:text-blue-500",
                    ].join(" ")}
                />

                <input 
                    {...register("code")}
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    placeholder="Buscar usuario...."
                    aria-label="Codigo de usuario"
                    pattern="[a-zA-Z0-9]{7,9}"
                    minLength={7}
                    maxLength={9}
                    className={[
                        "min-w-0 flex-1 bg-transparent",
                        "border-none outline-none",
                        "text-sm text-slate-900",
                        "placeholder:text-slate-400",
                        "focus:ring-0",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                    ].join(" ")}
                    disabled={isSubmitting || isFetching}
                />

                <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || isFetching}
                    aria-label="Buscar usuario"
                    className={[
                        "shrink-0 rounded-md p-1.5",
                        "text-slate-400",
                        "transition-all duration-150",
                        "hover:bg-slate-200 hover:text-slate-700 hover:cursor-pointer",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/30",
                        "disabled:pointer-events-none disabled:opacity-40",
                        "group-focus-within:text-blue-500",
                    ].join(" ")}
                >
                    <Search size={17} aria-hidden="true" />
                </button>
            </div>

            { errors.code && (
                <p className="mt-1.5 px-1 text-xs text-red-500" role="alert">
                    { errors.code.message }
                </p>
            ) }
        </form>
    )
}