"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import ContinentCustom from "@/app/admin/components/continent/page";

const Continent = () => {
    return (
        <LayoutAdmin>
            <ContinentCustom></ContinentCustom>
        </LayoutAdmin>
    );
};

export default Continent;
