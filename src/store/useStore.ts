"use client";
import { create } from "zustand";

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
}

interface CounterState {
    steps: number;
    tripData: TripData;
    setTo0: () => void;
    increase: () => void;
    decrease: () => void;
    setTripData: (data: Partial<TripData>) => void;
}

const useStore = create<CounterState>((set) => ({
    steps:
        (typeof window !== "undefined" &&
            Number(localStorage.getItem("steps"))) ||
        0,
    tripData: JSON.parse(
        (typeof window !== "undefined" && localStorage.getItem("tripData")) ||
            JSON.stringify({
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
            })
    ),
    setTo0: () => set({ steps: 0 }),
    increase: () =>
        set((state) => {
            const newSteps = state.steps + 1;
            localStorage.setItem("steps", String(newSteps));
            return { steps: newSteps };
        }),
    decrease: () =>
        set((state) => {
            const newSteps = state.steps - 1;
            localStorage.setItem("steps", String(newSteps));
            return { steps: newSteps };
        }),
    setTripData: (data) =>
        set((state) => {
            const newTripData = { ...state.tripData, ...data };
            localStorage.setItem("tripData", JSON.stringify(newTripData));
            return { tripData: newTripData };
        }),
}));

export default useStore;
