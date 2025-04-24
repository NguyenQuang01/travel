"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import Attractions from "@/app/admin/components/attractions/page";

const TopAttractions = () => {
  return (
    <LayoutAdmin>
      <Attractions></Attractions>
    </LayoutAdmin>
  );
};

export default TopAttractions;
