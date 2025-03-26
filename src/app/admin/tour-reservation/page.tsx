"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import TourReservationCustom from "@/app/admin/components/tour-reservation/page";

const TourReservation = () => {
    return (
        <LayoutAdmin>
            <TourReservationCustom></TourReservationCustom>
        </LayoutAdmin>
    );
};

export default TourReservation;
