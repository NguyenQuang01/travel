"use client";

import { Card } from "antd";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";
import Image from "next/image";
import { getBlogPosts } from "../api";
import { useEffect, useState } from "react";
import { API_INFO } from "@/constant/constant";
import Link from "next/link";

export default function NewsGrid() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const response: any = await getBlogPosts();
        setData(response?.data?.content);
        console.log(response?.data?.content);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <Box className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <Masonry
                columns={4}
                spacing={2}
                defaultHeight={450}
                defaultColumns={4}
                defaultSpacing={1}
                sequential
            >
                {data.map((item: any, index) => (
                    <Link href={`/blog/${item.id}`}>
                        <Card
                            key={index}
                            className="relative overflow-hidden rounded-lg shadow-lg"
                            cover={
                                <Image
                                    src={`${API_INFO.BASE_URL_ADMIN}${item.coverImage}`}
                                    alt={item?.title}
                                    width={300}
                                    height={Math.floor(
                                        Math.random() * (300 - 200 + 1) + 200
                                    )} // Random height between 200-300
                                    className="w-full"
                                />
                            }
                        >
                            <div className="absolute bottom-[0px] left-0 w-full bg-black/60 p-4">
                                <h3 className="text-white font-semibold text-sm">
                                    {item?.title}
                                </h3>
                            </div>
                        </Card>
                    </Link>
                ))}
            </Masonry>
        </Box>
    );
}
