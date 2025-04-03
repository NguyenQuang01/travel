"use client";

import { Card } from "antd";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";

const newsData = [
    {
        image: "https://source.unsplash.com/400x250/?travel",
        title: "Intertrips is now part of Travelstride's Partner Network",
    },
    // ... rest of your newsData array
];

export default function NewsGrid() {
    return (
        <Box className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <Masonry
                columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                spacing={2}
                sx={{ maxWidth: "1200px" }}
            >
                {newsData.map((news, index) => (
                    <Card
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg"
                        cover={
                            <img
                                src={news.image}
                                alt={news.title}
                                className="h-40 w-full object-cover"
                            />
                        }
                    >
                        <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4">
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
