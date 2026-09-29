export const getFileName = (contentDisposition: string | null): string | null => {
    if(!contentDisposition) return null;

    const fileNameStar = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);

    if(fileNameStar?.[1]){
        return decodeURIComponent(fileNameStar[1]);
    }

    const filename = contentDisposition.match(/filename="([^"]+)"?/i);

    return filename?.[1] ?? null;
}