import { atom } from "jotai";

type Announcement = {
  announcementText: string;
  enableLink: boolean;
  link: { [key: string]: any; text: string };
};

export const homeSliderAtom = atom([]);
export const announcementAtom = atom<Announcement[]>([]);
export const navActiveAtom = atom(false);
export const pageActiveAtom = atom(false);
export const loadingAtom = atom(true);
export const loadingDataAtom = atom({});
export const headerHeightAtom = atom(0);
export const modalVisibleAtom = atom(true);
