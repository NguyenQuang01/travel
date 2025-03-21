import React from "react";
import FeatureCard from "./components/FeatureCard";
import onClick from "@/app/assets/imgs/onClick.png";
import start from "@/app/assets/imgs/start.png";
import search from "@/app/assets/imgs/search.png";
import money from "@/app/assets/imgs/money.png";
import Grid from "@mui/material/Grid2";
import Container from "../layout/Container";
export const UseTravelstride = () => {
    const data = {
        onClick: {
            title: "One click trips",
            description:
                "Experience the fun parts of travel without the hassle of planning logistics and booking different components from multiple sites",
        },
        start: {
            title: "Reviewed itineraries",
            description:
                "Learn from real traveler reviews on expert-planned trips visiting multiple destinations",
        },
        search: {
            title: "Compare 1,000+ brands",
            description:
                "Find the best trip for you, and the best prices, when you search and compare all the operators and trip designers in one place",
        },
        money: {
            title: "Get up to $700 cash back",
            description:
                "Get a rebate up to 15% of your trip price after you share your review",
        },
    };
    return (
        <div className="bg-[#f8f7fc] pb-20 mt-60">
            <Container>
                <div className="text-[#333333] font-roboto text-2xl font-bold leading-9 text-center mb-16 pt-20">
                    Why use Travelstride?
                </div>
                <div className="flex justify-center">
                    <div className="container">
                        <Grid container spacing={6}>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <FeatureCard
                                    icon={onClick}
                                    data={data.onClick}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <FeatureCard icon={start} data={data.start} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <FeatureCard icon={search} data={data.search} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <FeatureCard icon={money} data={data.money} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
        </div>
    );
};
