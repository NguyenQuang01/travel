import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
      <Container className="bg-[#333] text-white p-8 rounded-lg">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Plan Your Italy Trip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="mb-6 md:mb-0">
              <div className="bg-[#444] px-3 py-1 rounded-md inline-block mb-4">
                Top Tours
              </div>
              <ul className="space-y-2">
                <li className="hover:text-gray-300 cursor-pointer">
                  All Italy Trips
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Attractions & Things to Do
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Suggested Itineraries
                </li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <ul className="space-y-2">
                <li className="hover:text-gray-300 cursor-pointer">
                  Iconic Italy Landmarks
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Tour Companies for Italy
                </li>
                <li className="hover:text-gray-300 cursor-pointer">
                  Italy Reviews
                </li>
              </ul>
            </div>
            <div>
              <p className="text-gray-300 text-sm md:text-base">
                All Italy, expedition cruises, self guided adventures and
                vacation packages. Find the best guided and expert planned
                vacation and holiday packages. Read more about Italy
              </p>
            </div>
          </div>
        </div>
      </Container>
    );
};

export default Banner;
