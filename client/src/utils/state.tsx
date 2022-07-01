import create from'zustand'

import {devtools, persist} from'zustand/middleware'

type isSigninState = {
    userSignin: boolean;
    persistLogin:(input:boolean) =>void
  
    // mypageOn: (input: boolean) => void;
  };


  type showErrModalState={
    showErrModal :boolean;
    setShowErrModal:(input:boolean) =>void



  }

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

  export const showErrModalState = create<showErrModalState>()( (set)=>({

    showErrModal :false,
    setShowErrModal: (input:boolean) => set({showErrModal:input })
  }))