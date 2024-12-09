import { z } from "zod";

export const ProfileValidationSchema = (t: (key: string) => string) => {
    return z
        .object({
            name: z
                .string()
                .min(3, t("profile.nameValidation")),
            email: z
                .string({ required_error: t('signin.RequiredField') })
                .trim()
                .email(t('signup.begin.emailInvalid')),
            telemovel: z
                .string()
                .refine(
                    (val) => /^[+]?[0-9\s\-()]{7,15}$/.test(val),
                    t("profile.phoneValidation")
                ),
        });
};

export type ProfileValidationData = {
    name: string;
    email: string;
    telemovel: string;
};
