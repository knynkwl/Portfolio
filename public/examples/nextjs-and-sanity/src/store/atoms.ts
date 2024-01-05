import { atom } from "jotai";

type Announcement = {
  announcementText: string;
  enableLink: boolean;
  link: { [key: string]: any; text: string };
};

export const homeSliderAtom = atom<string[]>([]);
export const announcementAtom = atom<Announcement[]>([]);
export const navActiveAtom = atom<boolean>(false);
export const pageActiveAtom = atom<boolean>(false);
export const loadingAtom = atom<boolean>(true);
export const loadingDataAtom = atom<any>({});
export const headerHeightAtom = atom<number>(0);
export const modalVisibleAtom = atom<boolean>(true);
