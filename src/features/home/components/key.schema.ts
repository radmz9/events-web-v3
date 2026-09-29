import { z } from 'zod';
import { eventKey } from '../../../shared/validations';

export const validateEventKey = z.object({
    eventKey: eventKey
});

export type EventKeyData = z.infer<typeof validateEventKey>;