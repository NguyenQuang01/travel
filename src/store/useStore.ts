import { create } from "zustand";

// Define store data types
interface CounterState {
    steps: number;
    increase: () => void;
    decrease: () => void;
}

interface TripData {
    homeCountry: string;
    mainCountry: string;
    additionalCountries: string;
    companionsAges: string;
    dateType: string;
    startDate: string;
    endDate: string;
    tripType: string;
    lodgingType: string;
    budgetPerPerson: number;
    budgetStrictness: string;
    activityDetail: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    contactMethod: string;
    numTravelers: number;
    whenDate: string;
    totalDate: string;
    description: string;
    currency: string;
    // createdAt: string;
}

interface CounterState {
    steps: number;
    tripData: TripData;
    increase: () => void;
    decrease: () => void;
    setTripData: (data: Partial<TripData>) => void;
}

const useStore = create<CounterState>((set) => ({
    steps: 0,
    tripData: {
        homeCountry: "",
        mainCountry: "",
        numTravelers: 0,
        additionalCountries: "",
        companionsAges: "",
        dateType: "exact",
        startDate: "",
        endDate: "",
        tripType: "",
        lodgingType: "",
        budgetPerPerson: 0,
        budgetStrictness: "strict",
        activityDetail: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        contactMethod: "",
        whenDate: "",
        totalDate: "",
        description: "",
        currency: "",
    },
    increase: () => set((state) => ({ steps: state.steps + 1 })),
    decrease: () => set((state) => ({ steps: state.steps - 1 })),
    setTripData: (data) =>
        set((state) => ({
            tripData: { ...state.tripData, ...data },
        })),
}));

export default useStore;
