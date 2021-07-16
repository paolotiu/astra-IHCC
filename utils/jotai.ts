import { atom } from 'jotai';

export const wastesAtom = atom<{ label: string }[]>([]);
export const dateAtom = atom(Date.now());
