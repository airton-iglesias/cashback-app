import { z } from 'zod';

export const getNewCommerceStep2Schema = (t: (key: string) => string) => {
    return z.object({
        title: z.string({ required_error: t("commerce.validation.requiredField") }).min(1, { message: t("commerce.validation.requiredField") }),
        userPoints: z.string({ required_error: t("commerce.validation.requiredField") }).min(1, { message: t("commerce.validation.requiredField") }),
        proprietary: z.string({ required_error: t("commerce.validation.requiredField") }).optional(),
        association: z.string({ required_error: t("commerce.validation.requiredField") }).optional(),
        referenceUser: z.string().optional(),
    });
};

export type NewCommerceStep2Data = {
    title: string;
    proprietary?: string;
    association?: string;
    userPoints: string;
    referenceUser?: string;
};

export const getNewCommerceStep3Schema = (
    t: (key: string) => string,
    cashbackType: string,
    placeType: string
) => {
    return z
        .object({
            webSite: z.string().optional(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            startHour: z.string().optional(),
            endHour: z.string().optional(),
            mapAdress: z.string().optional(),
        })
        .superRefine((data, ctx) => {
            if (cashbackType !== "Permanente") {
                if (!data.startDate || data.startDate.length < 10) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t("commerce.validation.requiredField"),
                        path: ["startDate"],
                    });
                }
                if (!data.endDate || data.endDate.length < 10) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t("commerce.validation.requiredField"),
                        path: ["endDate"],
                    });
                }
                if (!data.startHour || data.startHour.length < 5) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t("commerce.validation.requiredField"),
                        path: ["startHour"],
                    });
                }
                if (!data.endHour || data.endHour.length < 5) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t("commerce.validation.requiredField"),
                        path: ["endHour"],
                    });
                }
            }
            // if (placeType === "Físico") {
            //     if (!data.mapAdress || data.mapAdress.length < 2) {
            //         ctx.addIssue({
            //             code: z.ZodIssueCode.custom,
            //             message: t("commerce.validation.requiredField"),
            //             path: ["mapAdress"],
            //         });
            //     }
            // } else if (placeType === "Web") {
            //     if (!data.webSite || data.webSite.trim().length === 0) {
            //         ctx.addIssue({
            //             code: z.ZodIssueCode.custom,
            //             message: t("commerce.validation.requiredField"),
            //             path: ["webSite"],
            //         });
            //     }
            // Opcional: você pode adicionar validação adicional para verificar se o webSite é uma URL válida
            // Exemplo:
            // else if (!isValidUrl(data.webSite)) {
            //   ctx.addIssue({
            //     code: z.ZodIssueCode.custom,
            //     message: t("commerce.validation.invalidURL"),
            //     path: ["webSite"],
            //   });
            // }
            // }
        });
};


export type NewCommerceStep3Data = {
    webSite: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    mapAdress: string;
};

export const getNewCommerceStep4Schema = (t: (key: string) => string) => {
    return z
        .object({
            description: z.string({ required_error: t("commerce.validation.requiredField") }).min(2, { message: t("commerce.validation.requiredField") }),
        })


};

export type NewCommerceStep4Data = {
    description: string;
};

export const getNewCommerceStep6Schema = (t: (key: string) => string) => {
    return z.object({
        currencyType: z
            .string({ required_error: t("commerce.validation.requiredField") })
            .nonempty({ message: t("commerce.validation.requiredField") }),

        baseDiscount: z
            .string({ required_error: t("commerce.validation.requiredField") })
            .nonempty({ message: t("commerce.validation.requiredField") })
            .refine((val) => !isNaN(Number(val)), { message: t("commerce.validation.invalidNumber") }),

        cashbackForm: z
            .string({ required_error: t("commerce.validation.requiredField") })
            .nonempty({ message: t("commerce.validation.requiredField") }),

        sections: z
            .array(
                z.object({
                    minValue: z
                        .string({ required_error: t("commerce.validation.requiredField") })
                        .nonempty({ message: t("commerce.validation.requiredField") })
                        .refine((val) => !isNaN(Number(val)), { message: t("commerce.validation.invalidNumber") }),

                    discount: z
                        .string({ required_error: t("commerce.validation.requiredField") })
                        .nonempty({ message: t("commerce.validation.requiredField") })
                        .refine((val) => !isNaN(Number(val)), { message: t("commerce.validation.invalidNumber") }),

                    cashbackType: z
                        .string({ required_error: t("commerce.validation.requiredField") })
                        .nonempty({ message: t("commerce.validation.requiredField") }),
                })
            )
            .optional(),
    })
};

export type NewCommerceStep6Data = {
    currencyType: string;
    baseDiscount: string;
    cashbackForm: string;
    sections?: {
        minValue: string;
        discount: string;
        cashbackType: string;
    }[];
};

