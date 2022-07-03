import create from "zustand";

import { devtools, persist } from "zustand/middleware";

type isSigninState = {
  userSignin: boolean;
  persistLogin: (input: boolean) => void;

  // mypageOn: (input: boolean) => void;
};

type showErrModalState = {
  showErrModal: boolean;
  setShowErrModal: (input: boolean) => void;
};

type showMypageState = {
  editUser: boolean;
  delUser: boolean;
  setEditUser: (input: boolean) => void;
  setDelUser: (input: boolean) => void;
};

export const isSigninState = create<isSigninState>()(
  devtools(
    persist(
      (set) => ({
        userSignin: false,
        persistLogin: (input) => set({ userSignin: input }),
      }),
      {
        name: "isSign-storage",
      }
    )
  )
);

export const showErrModalState = create<showErrModalState>()((set) => ({
  showErrModal: false,
  setShowErrModal: (input: boolean) => set({ showErrModal: input }),
}));

export const showMypageState = create<showMypageState>()((set) => ({
  editUser: false,
  delUser: false,
  setDelUser: (input) => set({ delUser: input }),
  setEditUser: (input) => set({ editUser: input }),
}));
