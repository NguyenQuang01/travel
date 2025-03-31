"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { getBlog } from "./hook";

const Blog = () => {
    const params = useParams();
    const id = params.id; // Lấy id từ URL
    const getDataBlog = async () => {
        const response = await getBlog(String(id));
        console.log("🚀 ~ getDataBlog ~ response:", response);
    };
    React.useEffect(() => {
        getDataBlog();
    }, []);
    return (
        <div>
            <div>
                <div className="relative  text-white py-5  px-6 md:h-[432px]">
                    {" "}
                    <Image
                        src="https://images.pexels.com/photos/29515365/pexels-photo-29515365/free-photo-of-hoa-sen-r-c-r-trong-c-nh-quan-vi-t-nam-ng-p-tran-anh-n-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Background"
                        fill
                        className="object-cover "
                        priority
                    />
                </div>
                <div>
                    <Container className="flex justify-between items-center bg-white text-black py-10 px-6 mb-20 ">
                        <div>
                            <div className="text-[40px] font-bold mb-2">
                                15 Top Bucket List Destinations
                            </div>
                            <div className="flex items-baseline text-[#333333] leading-6 mt-5">
                                By Việt Nam
                            </div>
                        </div>{" "}
                        <div>
                            <div>f,T</div>
                            <div className="text-[hsl(0,0%,20%)]  text-[18px] leading-[27px] text-right mt-5">
                                September 29, 2014
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="bg-[#f8f7fd]">
                <Container className="py-10 px-6">
                    <div dangerouslySetInnerHTML={{ __html: "" }}></div>
                </Container>
            </div>
        </div>
    );
};

export default Blog;
