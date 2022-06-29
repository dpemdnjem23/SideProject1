import create from'zustand'

import {devtools, persist} from'zustand/middleware'

type isSigninState = {
    userSignin: boolean;
    persistLogin:(input:boolean) =>void
  
    // mypageOn: (input: boolean) => void;
  };

export const isSigninState = create<isSigninState>()(devtools(
    persist(
      (set) => ({
          userSignin:false,
        persistLogin: (input:boolean) => set({userSignin:input }),
      }),
      {
        name: "isSign-storage"
      }
    ))
  );