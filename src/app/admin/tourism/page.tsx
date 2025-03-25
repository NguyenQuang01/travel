"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import TourismCustom from "@/app/admin/components/tourism-custom/page";

const Tourism = () => {
    return (
        <LayoutAdmin>
            <TourismCustom></TourismCustom>
        </LayoutAdmin>
    );
};

export default Tourism;
