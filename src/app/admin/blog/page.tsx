"use client";
import React from "react";
import LayoutAdmin from "@/app/admin/layout";
import BlogComponent from "@/app/admin/components/blog/page";

const Blog = () => {
    return (
        <LayoutAdmin>
            <BlogComponent></BlogComponent>
        </LayoutAdmin>
    );
};

export default Blog;
