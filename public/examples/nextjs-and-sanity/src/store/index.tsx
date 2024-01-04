"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { atom, useAtom } from 'jotai';

type Announcement = {
  announcementText: string;
  enableLink: boolean;
  link: { [key: string]: any; text: string };
};

type AtomsContextType = {
  useHomeSliderAtom: () => [any, (newValue: any) => void];
  useAnnouncementAtom: () => [Announcement[], (newValue: Announcement[]) => void];
  useNavActiveAtom: () => [boolean, (newValue: boolean) => void];
  useLoadingAtom: () => [boolean, (newValue: boolean) => void];
  useLoadingDataAtom: () => [Record<string, any>, (newValue: Record<string, any>) => void];
};

const AtomsContext = createContext<AtomsContextType | undefined>(undefined);

export const homeSliderAtom = atom([]);
export const announcementAtom = atom<Announcement[]>([]);
export const navActiveAtom = atom(false);
export const loadingAtom = atom(true);
export const loadingDataAtom = atom({});

type AtomsProviderProps = {
  children: ReactNode;
};

export const AtomsProvider: React.FC<AtomsProviderProps> = ({ children }) => {
  return (
    <AtomsContext.Provider
      value={{
        useHomeSliderAtom: () => useAtom(homeSliderAtom),
        useAnnouncementAtom: () => useAtom(announcementAtom),
        useNavActiveAtom: () => useAtom(navActiveAtom),
        useLoadingAtom: () => useAtom(loadingAtom),
        useLoadingDataAtom: () => useAtom(loadingDataAtom),
      }}
    >
      {children}
    </AtomsContext.Provider>
  );
};

export const useAtoms = () => {
  const context = useContext(AtomsContext);
  if (!context) {
    throw new Error('useAtoms must be used within an AtomsProvider');
  }
  return context;
};
