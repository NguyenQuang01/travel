"use client";
import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import useStore from "@/store/useStore";
const StepsComponent = () => {
    const { steps, tripData } = useStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
      <div className="md:flex  hidden">
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
      </div>
    );
};

export default StepsComponent;
