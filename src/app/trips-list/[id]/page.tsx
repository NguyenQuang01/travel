"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Col, Row } from "antd";
import { getToursSearch } from "../hook";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import TourCard from "../components/TourCard";
import { getStyleColor } from "@/utils";

interface ReviewSummary {
  avgTransportation: number;
  avgActivities: number;
  avgMeals: number;
  avgGuide: number;
  reviewCount: number;
  avgValue: number;
  avgOverall: number;
  tourId: number;
  avgLodging: number;
}

interface TourInfo {
  id: number;
  tripId: string;
  name: string;
  lodgingLevel: string;
  video: string;
  totalDay: number;
  tripType: string;
  physicalLevel: string;
  tripPace: string;
  highlights: string;
  tripAbout: string;
  itineraryFocus: string;
  groupSize: string;
  ageRange: string;
  minGroupSize: number;
  maxGroupSize: number;
  attractions: string;
  destinations: string;
  isTrending: number;
  price: string;
  oldPrice: string;
}

interface TourData {
  images: string[];
  tourInfo: TourInfo;
  reviewSummary: ReviewSummary;
}

interface ToursResponse {
  [key: string]: TourData[];
}

const TourTheme = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<any>();
  const [theme, setTheme] = useState<string[]>();
  const [firstKey, setFirstKey] = useState<any>();

  const [travelOptions, setTravelOptions] = useState<
    Array<{
      id: number;
      name: string;
      imageUrl: string;
      description: string;
    }>
  >([]);

  useEffect(() => {
    const fetchTravelStyles = async () => {
      try {
        const response = await fetch(
          "https://www.be-travel.toditour.com/api/styles",
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": "vi,en;q=0.9,ja;q=0.8,zh-CN;q=0.7,zh;q=0.6",
              Origin: window.location.origin,
              Referer: window.location.origin + "/",
            },
          }
        );
        const data = await response.json();
        setTravelOptions(data);
      } catch (error) {
        console.error("Error fetching travel styles:", error);
      }
    };

    fetchTravelStyles();
  }, []);

  const getData = async () => {
    try {
      const response: any = await getToursSearch(String(id));
      setTheme(Object.keys(response.data.data));
      setData(response.data.data);
      if (response.data.data) {
        setFirstKey(Object.keys(response.data.data)[0]);
      }
    } catch (error) {
      console.error("Search tours error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return data ? (
    <>
      <div className="relative bg-black text-white min-h-[300px] md:h-[432px] px-4 md:px-6 py-5">
        <Image
          src="https://images.pexels.com/photos/25424413/pexels-photo-25424413/free-photo-of-xe-h-i-d-ng-d-ng-ph-giao-thong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <Container className="h-full">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: "url('/paris.jpg')",
            }}
          ></div>
          <div className="relative z-10 flex flex-col h-full w-full justify-between">
            <div className="space-y-4">
              <h1
                className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white leading-tight"
                style={{
                  textShadow: "0px 3px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                {decodeURIComponent(String(id))?.replace(/%20/g, " ")} Tours &
                Travel Packages 2025/2026
              </h1>
              <p className="text-base md:text-lg text-gray-200">
                Discover the beauty of Vietnam through our carefully curated
                tours. From bustling cities to peaceful countryside, ancient
                temples to pristine beaches, experience the rich culture and
                stunning landscapes of this Southeast Asian gem.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-base md:text-lg text-gray-200 mb-4">
                Choose your trip style:
              </p>
              <Row gutter={[16, 16]} className="flex flex-wrap items-end">
                <Col xs={10} sm={6} md={4} lg={4}>
                  <Link href="/client/my-custom-trip" className="block ">
                    <div className="bg-[#1d9c53] text-white rounded-lg shadow-md hover:opacity-80 transition p-4 h-[100px] md:h-[116px] flex items-center justify-center text-center font-bold uppercase">
                      DESIGN CUSTOM TRIP
                    </div>
                  </Link>
                </Col>
                <Col xs={24} md={1} lg={1}></Col>
                <Col xs={24} sm={12} md={19} lg={19}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                      320: { slidesPerView: 2.5, spaceBetween: 10 },
                      480: { slidesPerView: 2.5, spaceBetween: 15 },
                      768: { slidesPerView: 3, spaceBetween: 20 },
                      1024: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                    navigation
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    className="SwiperCustom"
                  >
                    {travelOptions.map((option, index) => (
                      <SwiperSlide key={index}>
                        <Link href={"/guide/" + option.name}>
                          <button
                            className="w-full h-[100px] md:h-[116px] text-white rounded-lg shadow-md transition font-bold uppercase text-center p-4"
                            style={{
                              backgroundColor: getStyleColor(option.name),
                            }}
                          >
                            {option.name}
                          </button>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-6 md:py-10">
          {data[firstKey]?.tours.map((item: TourData) => (
            <div className="mb-6 md:mb-10" key={item.tourInfo.id}>
              <TourCard data={item} />
            </div>
          ))}
        </div>
      </Container>
    </>
  ) : (
    <Loading />
  );
};

export default TourTheme;
