import { z } from 'zod';
import { codeBlock, stringWithLimit } from '../../../../shared/validations';

export const validateCode = z.object({
    userCode: codeBlock
});

export type InternalCodeData = z.infer<typeof validateCode>;

export const validateExternal = z.object({
    nombre: stringWithLimit(3, 150),
    dependencia: stringWithLimit(3, 100),
    genero: stringWithLimit(1, 1)
});

export type ExternalInfoData = z.infer<typeof validateExternal>;