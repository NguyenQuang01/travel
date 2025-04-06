"use client";

import { Card, Col, Row } from "antd";
import Masonry from "@mui/lab/Masonry";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import { getBlogPosts } from "../api";
import { useEffect, useState } from "react";
import { API_INFO } from "@/constant/constant";
import Link from "next/link";
import SliderBlog from "@/app/components/slide/SlideBlog";
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
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
    <div>
      <SliderBlog />
      <Box className="min-h-screen bg-gray-100 p-6 flex justify-center">
        <Container>
          <Masonry
            columns={4}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={1}
            sequential
          >
            {data.map((item: any, index) => (
              <Link href={`/blog/${item.id}`} key={index}>
                <Card
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  cover={
                    <Image
                      src={`${API_INFO.BASE_URL_ADMIN}${item.coverImage}`}
                      alt={item?.title}
                      width={300}
                      height={Math.floor(Math.random() * (300 - 200 + 1) + 200)} // Random height between 200-300
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
          <div className="mb-12 bg-white p-5 rounded-lg">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <h2 className="text-2xl font-bold mb-6">Popular posts</h2>
              </Col>
              <Col span={16}>
                {" "}
                <div className="space-y-4">
                  {data.slice(0, 5).map((item: any, index) => (
                    <Link href={`/blog/${item.id}`} key={index}>
                      <div className="flex items-center space-x-4 hover:bg-gray-50 mb-5 rounded-lg transition-colors">
                        <Image
                          src={`${API_INFO.BASE_URL_ADMIN}${item.coverImage}`}
                          alt={item?.title}
                          width={120}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800 line-clamp-2">
                            {item?.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/#"
                    className="text-blue-600 hover:underline block mt-4"
                  >
                    See all blog posts →
                  </Link>
                </div>
              </Col>
            </Row>
          </div>{" "}
          <div className="mb-12 bg-white p-8 rounded-lg">
            <Row gutter={[32, 16]}>
              <Col span={8}>
                <h2 className="text-2xl font-bold mb-6">About Travelstride</h2>
              </Col>
              <Col span={16}>
                <div className="space-y-6">
                  <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/NSnkb1IAjbE?si=PM6mJq-VAhdg3vkx"
                      title="Where are we staying"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 flex-shrink-0">
                        <SearchIcon sx={{ fontSize: 32 }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Find your perfect trip</h3>
                        <p className="text-gray-600">An epic selection of pre-planned trips on every continent, for every style. Thousands of itineraries from over 1,000 trusted travel companies.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 flex-shrink-0"><AccessTimeIcon  sx={{ fontSize: 32 }}/></div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2"> Save time</h3>
                        <p className="text-gray-600">Compare trips and tours from different companies side by side.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 flex-shrink-0">
                        <MonetizationOnIcon sx={{ fontSize: 32 }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Save money</h3>
                        <p className="text-gray-600">Find the best deals and promotions across multiple tour operators.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 flex-shrink-0">
                        <StarOutlineIcon sx={{ fontSize: 32 }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Travel confidently</h3>
                        <p className="text-gray-600">Read verified reviews and get expert advice for your travel plans.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </Box>
    </div>
  );
}
