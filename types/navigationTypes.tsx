export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
  language: undefined;
  recoveryDatas: undefined;
  verifyInbox: undefined;
  resetPassword: undefined;
  resetSucess: undefined;
  pinValidate: undefined;
  resetPin: undefined;
  resetPinConfirm: undefined;
};

export type RootStackParamList = {
  dashboard: undefined;
  profile: undefined;
  points: undefined;
  commerce: undefined;
  wallatextract: undefined;
};

export type WallatStackParamList = {
  wallathome: undefined;
  wallatextract: undefined;
};

export type SignupStackParamList = {
  signup_step_0: undefined;
  signup_step_1: { email: string; password: string };
  signup_step_2: { email: string; password: string; country: string; currency: string; image: File };
  signup_step_3: { email: string; password: string; country: string; currency: string; imageProfile: File; pin: string };
  signup_step_4: undefined;
};

export type CommerceStackParamList = {
  home: undefined;
  commerce_menu: undefined;
  commerce_credit_extract: undefined;
  commerce_edit: undefined;
  commerce_access_manager: undefined;
  commerce_add_access: undefined;
  commerce_associate_edit: undefined;

  new_commerce_step_0: undefined;
  new_commerce_step_1: { CashbackType: string; PlaceType: string };
  new_commerce_step_2: { 
    CashbackType: string; 
    PlaceType: string; 
    referenceUser: string; 
    association: string; 
    title: string; 
    userPoints: string 
  };
  new_commerce_step_3: {
    CashbackType: string; 
    PlaceType: string; 
    referenceUser: string;
    association: string; 
    title: string; 
    userPoints: string;
    webSite: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
  };
  new_commerce_step_4: undefined;
  new_commerce_step_5: undefined;
  new_commerce_step_6: undefined;
  new_commerce_step_7: undefined;
};

export type DashboardTabParamList = {
  DashboardHome: undefined;
  SearchTab: any;
  WalletTab: undefined;
  QrCodeTab: undefined;
  WithdrawTab: undefined;
};

export type SendDiscountParamList = {
  home: undefined;
  purchasevalue: undefined;
  discountvalue: undefined;
  receivediscount: undefined;
};

export type SearchParamList = {
  searchhome: undefined;
  searchresult: undefined;
};