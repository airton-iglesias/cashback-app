export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
};

export type RootStackParamList = {
  dashboard: undefined;
  profile: undefined;
  points: undefined;
  commerce: undefined;
};

export type SigninStackParamList = {
  SigninStep1: undefined;
  SigninStep2: { email: string };
};

export type WithdrawStackParamList = {
  WithdrawHome: undefined;
  WithdrawSucess: undefined;
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
  new_commerce_0: undefined;
  new_commerce_1: undefined;
  new_commerce_2: undefined;
  new_commerce_3: undefined;
  new_commerce_4: undefined;
  new_commerce_5: undefined;
  new_commerce_6: undefined;
  new_commerce_7: undefined;
};

export type DashboardTabParamList = {
  DashboardHome: undefined;
  SearchTab: any;
  WalletTab: undefined;
  QrCodeTab: undefined;
  WithdrawTab: undefined;
};

