import { z } from 'zod'

export const UserRoleEnum = z.enum([
    'ROOT',
    'COORDI',
    'JEFE_DPTO',
    'JEFE_AREA',
    'SUPERVISOR'
])

export type UserRoles = z.infer<typeof UserRoleEnum>;