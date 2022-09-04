import moment from "moment";
import create from "zustand";

import { devtools, persist } from "zustand/middleware";

export const accessToken = localStorage.getItem("accessToken") || null;

type isSigninState = {
  userSignin: boolean;
  persistLogin: (input: boolean) => void;

  // mypageOn: (input: boolean) => void;
};

type dropDownListState = {
  dropDownOpen: boolean;
  setDropDownOpen: (input: boolean) => void;
};

type showErrModalState = {
  showErrModal: boolean;
  setShowErrModal: (input: boolean) => void;
};

type showMypageState = {
  editUser: boolean;
  delUser: boolean;
  passEditUser: boolean;
  socialEditUser: boolean;
  setEditUser: (input: boolean) => void;
  setDelUser: (input: boolean) => void;
  setPassEditUser: (input: boolean) => void;
  setSocialEditUser: (input: boolean) => void;
};
type registSubInfoState = {
  selected: string | null;
  setSelected: (input: string | null) => void;
  subCash: string;
  setSubCash: (input: string) => void;
};
//년 월 일 을 입력해야한다.
//년월일을 나누지않고 통합 관리하는방법
type dateState = {
  dateCal: moment.Moment;
  setDateCal: (input: moment.Moment) => void;
  clearDateCal: () => void;
};

type cycleState = {
  cycleCal: { year: string; month: string; day: string };
  setCycleCal: (input: { year: string; month: string; day: string }) => void;
};
type showModaleState = {
  showMypageModal: boolean;
  showMypageModalOn: (input: boolean) => void;

  // mypageOn: (input: boolean) => void;
};

type mypageSubCostState = {
  subPayment: number;
  subCost: number;
  setPaymentCost: (input: number) => void;
  setSubCost: (input: number) => void;
};

type walletPageCostState = {
  walletSubCost: number;

  walletPayment: number;
  setWalletSubCost: (input: number) => void;
  setWalletPayment: (input: number) => void;
};

type mypagePaymentManage = {
  mypagePaymentManageDate: string;
  mypagePaymentManageCost: number;

  setMypagePaymentManageDate: (input: string) => void;
  setMypagePaymentManageCost: (input: number) => void;
};

type mypageNotiModal = {
  showNicknameNotiModal: boolean;
  setShowNicknameNotiModal: (input: boolean) => void;
  showPasswordNotiModal: boolean;
  setShowPasswordNotilModal: (input: boolean) => void;
};

type mypageUserInfo = {
  nickname: string;
  password: string;
  passwordCheck: string;
  setNickname: (input: string) => void;
  setPassword: (input: string) => void;
  setPasswordCheck: (input: string) => void;
};

type walletInfo = {
  id: number;
  name: string;
  cycleDay: string;
  cycleYear: string;
  cycleMonth: string;
  cost: number;
  image: string;
  end_date?: string;
  start_date?: string;
  user_id?: number;
};

type walletInfoState = {
  walletInfo: walletInfo[];
  clickModalNum: number;
  setClickModalNum: (input: number) => void;
  setWalletInfo: (input: []) => void;
  setShowSubEdit: (input: boolean) => void;
  showSubEdit: boolean;
  showSubDetail: boolean;
  setShowSubDetail: (input: boolean) => void;
};

type alarmInfo = {
  title: string;
  id: number;
  image: string;
  remain_time: number;
  read: boolean;
};

type alarmInfoState = {
  alarmInfo: alarmInfo[];
  setAlarmInfo: (input: []) => void;
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
  passEditUser: false,
  socialEditUser: false,
  setPassEditUser: (input) => set({ passEditUser: input }),
  setSocialEditUser: (input) => set({ socialEditUser: input }),
  setDelUser: (input) => set({ delUser: input }),
  setEditUser: (input) => set({ editUser: input }),
}));

export const showDropDownList = create<dropDownListState>()((set) => ({
  dropDownOpen: false,
  setDropDownOpen: (input) => set({ dropDownOpen: input }),
}));

export const registSubInfoState = create<registSubInfoState>()((set) => ({
  selected: "",
  setSelected: (input) => set({ selected: input }),
  subCash: "",
  setSubCash: (input) => set({ subCash: input }),
}));

export const dateState = create<dateState>()((set) => ({
  dateCal: moment(),
  setDateCal: (input) => set({ dateCal: input }),
  clearDateCal: () => set({ dateCal: moment() }),
  // subStart:,
  // setSubStart:(input) => set({subStart:input})
}));

export const cycleState = create<cycleState>()((set) => ({
  cycleCal: {
    year: "",
    month: "",
    day: "",
  },
  setCycleCal: (input) => set({ cycleCal: input }),
}));

export const mypageSubCostState = create<mypageSubCostState>()((set) => ({
  subCost: 0,
  subPayment: 0,
  setPaymentCost: (input) => set({ subPayment: input }),
  setSubCost: (input) => set({ subCost: input }),
}));

export const walletPageCostState = create<walletPageCostState>()((set) => ({
  walletPayment: 0,
  walletSubCost: 0,
  setWalletSubCost: (input) => set({ walletSubCost: input }),
  setWalletPayment: (input) => set({ walletPayment: input }),
}));

export const mypagePaymentManagementState = create<mypagePaymentManage>()(
  (set) => ({
    mypagePaymentManageDate: "",
    mypagePaymentManageCost: 0,
    setMypagePaymentManageCost: (input) =>
      set({ mypagePaymentManageCost: input }),
    setMypagePaymentManageDate: (input) =>
      set({ mypagePaymentManageDate: input }),
  })
);

export const mypageNotiModalState = create<mypageNotiModal>()((set) => ({
  showNicknameNotiModal: false,
  showPasswordNotiModal: false,
  setShowNicknameNotiModal: (input) => set({ showNicknameNotiModal: input }),
  setShowPasswordNotilModal: (input) => set({ showPasswordNotiModal: input }),
}));

export const mypageUserInfoState = create<mypageUserInfo>()((set) => ({
  nickname: "",
  password: "",
  passwordCheck: "",
  setPasswordCheck: (input) => set({ passwordCheck: input }),
  setPassword: (input) => set({ password: input }),
  setNickname: (input) => set({ nickname: input }),
}));

export const useWalletStore = create<walletInfoState>()((set) => ({
  walletInfo: [],
  clickModalNum: 0,
  showSubEdit: false,
  showSubDetail: false,
  setClickModalNum: (input) => set({ clickModalNum: input }),
  setWalletInfo: (input) => set({ walletInfo: input }),
  setShowSubEdit: (input) => set({ showSubEdit: input }),
  setShowSubDetail: (input) => set({ showSubDetail: input }),
}));

export const mainheaderuseStore = create<showModaleState>((set) => ({
  showMypageModal: false,
  showMypageModalOn: (input) =>
    set(() => ({
      showMypageModal: input,
    })),
}));

export const alarmInfouseStore = create<alarmInfoState>((set) => ({
  alarmInfo: [],
  setAlarmInfo: (input) => set({ alarmInfo: input }),
}));

// export const walletInfoState = create<walletInfoState>()((set) => ({
//   walletInfo:{
//     id: 0,
//     name: '',
//     cycle: '',
//     cost: 0,
//     image: '',
//     end_date: '',
//     start_date:'',
//     user_id:0
//     },
// setWalletInfo:(input) =>set({walletInfo:input})

// }));
