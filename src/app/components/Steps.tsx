"use client";
import React from "react";
import { Steps } from "antd";
import useStore from "@/store/useStore";
const StepsComponent = () => {
    const { steps, tripData } = useStore();
    console.log("🚀 ~ StepsComponent ~ tripData:", tripData);
    return (
        <Steps
            size="small"
            current={steps}
            items={[
                {
                    title: "Hello",
                },
                {
                    title: "Where",
                },
                {
                    title: "Who",
                },
                {
                    title: "When",
                },
                {
                    title: "How",
                },
                {
                    title: "Star",
                },
                {
                    title: "country",
                },
                {
                    title: "Final details",
                },
            ]}
        />
    );
};

export default StepsComponent;
