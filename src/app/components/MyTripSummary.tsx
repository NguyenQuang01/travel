import React from "react";

interface TripSummaryProps {
    data: {
        homeCountry: string;
        mainCountry: string;
        numTravelers: string;
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
        whenDate: string;
        totalDate: string;
        description: string;
        currency: string;
    };
}

const TripSummary: React.FC<TripSummaryProps> = ({ data }) => {
    const summaryItems = [
        {
            label: "Main Destination",
            values: [data.mainCountry || ""],
        },
        {
            label: "Additional Destinations",
            values: [data.additionalCountries || ""],
        },
        {
            label: "Number of Travelers",
            values: [data.numTravelers || ""],
        },
        {
            label: "Companions' Ages",
            values: [data.companionsAges || ""],
        },
        {
            label: "Trip Type",
            values: [data.tripType || ""],
        },
        {
            label: "Lodging Type",
            values: [data.lodgingType ? `${data.lodgingType}-Star` : ""],
        },
        {
            label: "Budget per Person",
            values: [
                data.budgetPerPerson
                    ? `${data.currency || "$"} ${data.budgetPerPerson}`
                    : "",
            ],
        },
        {
            label: "Budget Flexibility",
            values: [
                data.budgetStrictness
                    ? data.budgetStrictness.replace("-", " ")
                    : "",
            ],
        },
        {
            label: "Trip Duration",
            values: [data.totalDate || ""],
        },
        {
            label: "Planned Date",
            values: [data.whenDate || ""],
        },
        {
            label: "Home Country",
            values: [data.homeCountry || ""],
        },
        {
            label: "Contact Name",
            values: [`${data.firstName} ${data.lastName}`].filter(Boolean),
        },
        {
            label: "Email",
            values: [data.email || ""],
        },
        {
            label: "Phone Number",
            values: [data.phoneNumber || ""],
        },
        {
            label: "Preferred Contact Method",
            values: [data.contactMethod || ""],
        },
        {
            label: "Trip Dates",
            values: [
                data.dateType === "approximate"
                    ? "Approximate dates"
                    : `${data.startDate || ""} - ${data.endDate || ""}`,
            ],
        },
        {
            label: "Additional Details",
            values: [data.description || ""],
        },
    ];

    return (
        <div className=" p-6 rounded-lg shadow-lg max-w-sm">
            <div className="bg-gradient-to-b from-gray-500 to-gray-700 text-white p-4 rounded-t-lg font-bold text-lg">
                My Trip Summary
            </div>
            <div className="bg-white p-4 rounded-b-lg">
                {summaryItems.map(
                    (item, index) =>
                        item.values.some((value) => value !== "") && (
                            <div
                                key={index}
                                className="mb-3 flex justify-between"
                            >
                                <span className="text-gray-500">
                                    {item.label}
                                </span>
                                <div className="flex ">
                                    {item?.values.map((value, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="font-semibold">
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

// Dữ liệu mẫu

export default function MyTripSummary() {
    //lấy dữ liệu từ local storage
    const sampleData = JSON.parse(
        (typeof window !== "undefined" && localStorage.getItem("tripData")) ||
            JSON.stringify({
                homeCountry: "",
                mainCountry: "",
                numTravelers: "",
                additionalCountries: "",
                companionsAges: "",
                dateType: "exact",
                startDate: "",
                endDate: "",
                tripType: "",
                lodgingType: "",
                budgetPerPerson: 0,
                budgetStrictness: "",
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
    );
    return <TripSummary data={sampleData} />;
}
