import moment from "moment";
import create from "zustand";

import { devtools, persist } from "zustand/middleware";


export const accessToken: string | null = localStorage.getItem("accessToken");

type isSigninState = {
  userSignin: boolean;
  persistLogin: (input: boolean) => void;

  // mypageOn: (input: boolean) => void;
};

type dropDownListState ={

  dropDownOpen:boolean;
  setDropDownOpen:(input:boolean) =>void
}

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
type registSubInfoState={
  selected:string|null;
  setSelected:(input:string|null) =>void
  subCash:string
  setSubCash:(input:string) =>void




}
//년 월 일 을 입력해야한다.
//년월일을 나누지않고 통합 관리하는방법
type dateState = {
  dateCal:moment.Moment
  setDateCal:(input:moment.Moment) =>void

}

type cycleState ={
 cycle:number

  setCycle:(input:number) =>void
  cycleCal:{year:string,month:string,day:string}
  setCycleCal:(input:{year:string,month:string,day:string}) =>void
}






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


export const showDropDownList = create<dropDownListState>()((set)=>({

  dropDownOpen:false,
  setDropDownOpen:(input) => set({dropDownOpen:input})
}))


export const registSubInfoState = create<registSubInfoState>()((set)=>({

  selected:'',
  setSelected:(input) =>set({selected:input}),
  subCash:'',
  setSubCash:(input) =>set({subCash:input})
}))



export const dateState = create<dateState>()((set)=>({

  dateCal:moment(),
  setDateCal:(input) =>set({dateCal:input}),
  // subStart:,
  // setSubStart:(input) => set({subStart:input})
}))



export const cycleState = create<cycleState>()((set)=>({

  cycle:0,
  setCycle:(input) =>set({cycle:input}),
  cycleCal:{
    year:'',
    month:'',
    day:''
  },
  setCycleCal:(input) =>set({cycleCal:input})

}))
