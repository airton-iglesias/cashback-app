export type RootStackParamList = {
  home: undefined;
  signin: undefined;
  signup: undefined;
  dashboard: undefined;
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
  SignupStep1: undefined;
  SignupStep2: { email: string, password: string };
  SignupStep3: { email: string, password: string, country: number, currency: number, image: File };
  SignupStep4: { email: string, password: string, country: number, currency: number, imageProfile: File, pin: string };
  SignupStep5: undefined;
};

export type CommerceStackParamList = {
  home: undefined;
  new_commerce_1: undefined;
  new_commerce_2: undefined;
  new_commerce_3: undefined;
  new_commerce_4: undefined;
  new_commerce_5: undefined;
  new_commerce_6: undefined;
};