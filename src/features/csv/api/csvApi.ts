import { baseApi } from "../../../app/services/baseApi";
import type { UploadSuccessType } from "../types/success.types";

export interface UploadFileArgs {
    url: 'students' | 'teachers' | 'staff' | 'records' | 'students/update/status';
    formData: FormData
}

export const csvApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<UploadSuccessType, UploadFileArgs>({
            query: ({ url, formData }) => ({
                url: `/csv/${url}`,
                method: 'POST',
                body: formData
            })
        })
    })
});

export const { useUploadFileMutation } = csvApi;