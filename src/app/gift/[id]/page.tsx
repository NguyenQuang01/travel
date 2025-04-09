"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { getBlog } from "./hook";

const Blog = () => {
    const params = useParams();
    const id = params.id; // Lấy id từ URL
    const [data, setData] = useState<any>();
    console.log("🚀 ~ Blog ~ data:", data);
    const getDataBlog = async () => {
        const response: any = await getBlog(String(id));
        setData(response.data);
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
              src="https://images.pexels.com/photos/1303080/pexels-photo-1303080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Background"
              fill
              className="object-cover "
              priority
            />
          </div>
          <div>
            <Container className="flex justify-between items-center bg-white text-black py-10 px-6 mb-20 ">
              <div>
                <div className="text-[40px] font-bold mb-2">{data?.title}</div>
                <div className="flex items-baseline text-[#333333] leading-6 mt-5">
                  By Việt Nam
                </div>
              </div>{" "}
              <div>
                <div>f,T</div>
                <div className="text-[hsl(0,0%,20%)]  text-[18px] leading-[27px] text-right mt-5">
                  {data?.publishDate}
                </div>
              </div>
            </Container>
          </div>
        </div>
        <div className="bg-[#f8f7fd] p-2">
          <Container className="py-5 px-6 bg-white mt-5 rounded-lg">
            <div className="my-10">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.contentHtml,
                }}
                // Add a class to scope and isolate styles
                className="content-wrapper dangerouslyInnerHTML"
                // Use style to reset inherited styles
              ></div>
            </div>
          </Container>
        </div>
      </div>
    );
};

export default Blog;
