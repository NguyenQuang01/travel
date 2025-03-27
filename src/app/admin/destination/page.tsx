"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import DestinationCustom from "@/app/admin/components/destination/page";

const Destination = () => {
    return (
        <LayoutAdmin>
            <DestinationCustom></DestinationCustom>
        </LayoutAdmin>
    );
};

export default Destination;
