"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import MyCustomTrip from "../components/my-custom-trip/page";

const Manage = () => {
    return (
        <LayoutAdmin>
            <MyCustomTrip />
        </LayoutAdmin>
    );
};

export default Manage;
