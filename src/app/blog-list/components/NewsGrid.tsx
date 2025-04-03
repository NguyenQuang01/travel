"use client";

import { Card } from "antd";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";
import Image from "next/image";

const newsData = [
    {
        image: "https://images.pexels.com/photos/25424413/pexels-photo-25424413/free-photo-of-xe-h-i-d-ng-d-ng-ph-giao-thong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Intertrips is now part of Travelstride's Partner Network",
    },
    {
        image: "https://images.pexels.com/photos/29553367/pexels-photo-29553367/free-photo-of-ng-i-ph-n-thanh-l-ch-trong-chi-c-vay-den-h-i-an-vi-t-nam.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Top 10 Hidden Gems in Southeast Asia",
    },
    {
        image: "https://images.pexels.com/photos/29515965/pexels-photo-29515965/free-photo-of-ng-i-ph-n-thanh-l-ch-t-o-dang-cung-cac-b-c-t-ng-hu-vi-t-nam.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Urban Adventures: Exploring Metropolitan Wonders",
    },
    {
        image: "https://images.pexels.com/photos/27418885/pexels-photo-27418885/free-photo-of-phong-c-nh-m-c-di-du-l-ch-v-n.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Best Coastal Destinations for Summer 2024",
    },
    {
        image: "https://images.pexels.com/photos/25424405/pexels-photo-25424405/free-photo-of-h-i-c-ng-thuy-n-sang-tr-ng-b-n-tau.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Ultimate Guide to Mountain Trekking",
    },
    {
        image: "https://images.pexels.com/photos/30596347/pexels-photo-30596347/free-photo-of-l-h-i-soi-d-ng-bai-bi-n-quy-nhon-vi-t-nam.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Culinary Journeys: Street Food Adventures",
    },
    {
        image: "https://images.pexels.com/photos/20214474/pexels-photo-20214474/free-photo-of-mon-an-b-a-an-la-n-u-an.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Historic Landmarks You Can't Miss",
    },
    {
        image: "https://images.pexels.com/photos/25424413/pexels-photo-25424413/free-photo-of-xe-h-i-d-ng-d-ng-ph-giao-thong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Cultural Festivals Around the World",
    },
    {
        image: "https://images.pexels.com/photos/25424413/pexels-photo-25424413/free-photo-of-xe-h-i-d-ng-d-ng-ph-giao-thong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Safari Adventures in Africa",
    },
    {
        image: "https://images.pexels.com/photos/29435476/pexels-photo-29435476.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Paradise Islands: Ultimate Getaway Guide",
    },
];

export default function NewsGrid() {
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
                {newsData.map((news, index) => (
                    <Card
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg"
                        cover={
                            <Image
                                src={news.image}
                                alt={news.title}
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
                                {news.title}
                            </h3>
                        </div>
                    </Card>
                ))}
            </Masonry>
        </Box>
    );
}
