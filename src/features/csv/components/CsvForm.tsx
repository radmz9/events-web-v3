import { useForm } from "react-hook-form";
import { useUploadFileMutation } from "../api/csvApi";
import { csvSchema, type CsvFormValues } from "./csvSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { toast } from "sonner";
import { Button, Form, SimpleSelect } from "../../../common/ui";
import type { Option } from "../../../common/ui/SimpleSelect";
// import { InputFile } from "./InputFile";

interface Props {
    onSuccess: () => void;
}

type CsvUploadType = "students" | "teachers" | "staff" | "records";

const options: Option[] = [
    { id: 'students', label: 'Estudiantes'},
    { id: 'teachers', label: 'Profesores'},
    { id: 'staff', label: 'Administrativos'},
    { id: 'records', label: 'Asistencia al evento'},
    { id: 'students/update/status', label: 'Actualizar estatus de alumnos' }
]

export const CsvForm = ({ onSuccess }: Props) => {
    const [ uploadFile, { isLoading } ] = useUploadFileMutation();

    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm<CsvFormValues>({
        resolver: zodResolver(csvSchema)
    });

    const onSubmit = async(values: CsvFormValues) => {
        try {
            const formData = new FormData();
            const file = values.csvFile;
            if(file){
                formData.append('file', file)
                const url = values.type as CsvUploadType;
                const result = await uploadFile({ url , formData }).unwrap();
                if(result){
                    toast.success('Registros guardados', {
                        description: result.message,
                        duration: 10000
                    });
                    onSuccess();
                }
            }
        } catch (error) {
            console.log('Error al enviar el FORM',error)
            handleServerErrors(error, setError);
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <SimpleSelect
                label="Tipo de registro"
                id="tipo"
                placeholder="Selecciona el tipo de archivo"
                options={options}
                error={errors.type?.message}
                {...register('type')}
            />

            <div className="flex flex-col gap-2">
                <label htmlFor="uploadFile" className="text-sm font-medium text-slate-300 ml-1">
                    Selecciona tu archivo CSV
                </label>
                <input
                    id="uploadFile"
                    type="file"
                    accept=".csv"
                    className="border border-slate-300 p-2 rounded-2xl"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if(file){
                            setValue('csvFile', file, { shouldValidate: true });
                        }
                    }}
                    // placeholder="Seleccciona el archivo a subir"
                    // {...register('csvFile')}
                />
                {errors['csvFile'] && (
                    <span className="text-red-900 font-semibold text-sm mt-1 ml-1 whitespace-pre-wrap">
                        {errors['csvFile']?.message}
                    </span>
                )}
            </div>

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                { isLoading ? 'Subiendo....' : 'Enviar CSV' }
            </Button>
        </Form>
    )
}