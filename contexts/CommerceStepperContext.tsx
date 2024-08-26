import { createContext, ReactNode, useContext, useState } from "react";

interface ImageFile {
    uri: string;
    file: File;
}

interface Section {
    minValue: string;
    discount: string;
    type: string;
}

interface StepperData {
    CashbackType: string;
    PlaceType: string;
    selectedType: number;
    selectedPlace: number;
    referenceUser: string;
    association: string;
    title: string;
    email: string;
    userPoints: string;
    webSite: string;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    mapAdress: string;
    description: string;
    logoImage: ImageFile | null;
    posterImage: ImageFile | null;
    descriptionImages: ImageFile[];
    baseDiscount: string;
    cashbackForm: string;
    sections: Section[];
}

interface StepperContextProps extends StepperData {
    setStepperData: (data: Partial<StepperData>) => void;
}

const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export const StepperProvider = ({ children }: { children: ReactNode }) => {
    const [stepperData, setStepperData] = useState<StepperData>({
        CashbackType: 'Permanente',
        PlaceType: 'Físico',
        selectedType: 0,
        selectedPlace: 0,
        referenceUser: '',
        association: '',
        title: '',
        email: '',
        userPoints: '',
        webSite: '',
        startDate: '',
        endDate: '',
        startHour: '',
        endHour: '',
        mapAdress: '',
        description: '',
        logoImage: null,
        posterImage: null,
        descriptionImages: [],
        baseDiscount: '',
        cashbackForm: '',
        sections: [],
    });

    const updateStepperData = (data: Partial<StepperData>) => {
        setStepperData((prev) => ({ ...prev, ...data }));
    };

    return (
        <StepperContext.Provider value={{ ...stepperData, setStepperData: updateStepperData }}>
            {children}
        </StepperContext.Provider>
    );
};

export const useStepperContext = () => {
    const context = useContext(StepperContext);
    if (!context) throw new Error('useStepperContext must be used within a StepperProvider');
    return context;
};
