"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import TripRequestCustom from "@/app/admin/components/trip-request-custom/page";

const TripRequest = () => {
    return (
        <LayoutAdmin>
            <TripRequestCustom></TripRequestCustom>
        </LayoutAdmin>
    );
};

export default TripRequest;
