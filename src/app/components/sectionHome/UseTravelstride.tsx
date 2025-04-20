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
          "Personalize: build your own trip, supported by experts who are experienced, penetrated and knowledgeable about the local area.",
      },
      start: {
        title: "Reviewed itineraries",
        description:
          "Diverse choices: from our 100+ trips, with many different cost levels, helping you choose the most suitable trip.",
      },
      search: {
        title: "Compare 1,000+ brands",
        description:
          "Best cost, most satisfaction: all-inclusive cost, no hidden costs, clear and ensure your long-term vacation plan.",
      },
      //   money: {
      //     title: "Get up to $700 cash back",
      //     description:
      //       "Get a rebate up to 15% of your trip price after you share your review",
      //   },
    };
    return (
      <div className="bg-[#f8f7fc] pb-20 mt-10">
        <Container>
          <div className="text-[#333333] font-roboto text-2xl font-bold leading-9 text-center mb-16 pt-20">
            Why use Travelstride?
          </div>
          <div className="flex justify-center">
            <div className="container">
              <Grid container spacing={6}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FeatureCard icon={onClick} data={data.onClick} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FeatureCard icon={start} data={data.start} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FeatureCard icon={search} data={data.search} />
                </Grid>
                {/* <Grid size={{ xs: 12, md: 3 }}>
                                <FeatureCard icon={money} data={data.money} />
                            </Grid> */}
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    );
};
