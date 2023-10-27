import fs from 'fs'

export const privateKEY = fs.readFileSync('./conflig/private.key', 'utf8');
export const publicKEY = fs.readFileSync('./conflig/public.key', 'utf8');

