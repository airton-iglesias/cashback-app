import { z } from 'zod';

export const getSignInSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z.string({ required_error: t('signin.RequiredField') }).trim().email(t('signin.emailInvalid')),
      password: z.string({ required_error: t('signin.RequiredField') })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          t('signin.passwordInvalid')
        ),
    })
    .required();
};

export type SignInData = {
  email: string;
  password: string;
};

export const getSignUpSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z.string({ required_error: t('signin.RequiredField') }).trim().email(t('signup.begin.emailInvalid')),
      password: z
        .string({ required_error: t('signup.begin.RequiredField') })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          t('signup.begin.passwordInvalid')
        ),
      confirmPassword: z
        .string({ required_error: t('signup.begin.RequiredField') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('signup.begin.passwordsDoNotMatch'),
    });
};

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};



export const getSignUpStep1Schema = (t: (key: string) => string) => {
  return z
    .object({
      name: z.string({ required_error: t('signup.userInfos.RequiredField') }).min(2, {
        message: t('signup.userInfos.nameInvalid'),
      }).trim(),
      country: z.string({ required_error: t('signup.userInfos.RequiredField') }),
      currency: z.string({ required_error: t('signup.userInfos.RequiredField') }),
      codeBonus: z.string().optional(),
      image: z.string().optional(),
    });
};

export type SignUpStep1Data = {
  name: string;
  country: string;
  currency: string;
  codeBonus?: string;
  image?: any;
};

export const getEmailVerificationSchema = (t: (key: string) => string) => {
  return z
    .object({
      code: z.string({ required_error: t('signup.verificationCode.RequiredField') }).min(6, {
        message: t('signup.verificationCode.lengthInvalid'),
      }).trim()
    })
    .required();
};

export type EmailVerificationData = {
  code: string
};

export const getEmailSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z.string({ required_error: t('signin.RequiredField') }).trim().email(t('signup.begin.emailInvalid')),
    })
    .required();
};

export type EmailData = {
  email: string;
};

export const getPasswordSchema = (t: (key: string) => string) => {
  return z
    .object({
      password: z
        .string({ required_error: t('signup.begin.RequiredField') })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          t('signup.begin.passwordInvalid')
        ),
      confirmPassword: z
        .string({ required_error: t('signup.begin.RequiredField') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('signup.begin.passwordsDoNotMatch'),
    })
};

export type PasswordData = {
  password: string;
  confirmPassword: string;
};