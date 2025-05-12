import { validate as isUuidValid } from 'uuid';

export const validateUUID = (id: string): boolean => isUuidValid(id);