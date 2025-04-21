"use client";
import { Container } from "@mui/material";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Col, Row } from "antd";
import { getToursSearch } from "../hook";
import CardReview from "@/app/components/Card";
import Banner from "@/app/components/sectionHome/Banner";
import ButtonGreen from "@/app/components/ButtonGreen";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
  const id = params.id; // Lấy id từ URL
  const [data, setData] = useState<any>();
  const [theme, setTheme] = useState<string[]>();
  const [travelOptions, setTravelOptions] = useState<
    {
      id: number;
      name: string;
      imageUrl: string;
      description: string;
    }[]
  >([]);

  const fetchTravelStyles = async () => {
    try {
      const response = await fetch(
        "https://www.be-travel.toditour.com/api/styles",
        {
          headers: {
            Accept: "application/json",
            Origin: window.location.origin,
          },
        }
      );
      const data = await response.json();
      setTravelOptions(data);
    } catch (error) {
      console.error("Error fetching travel styles:", error);
    }
  };

  useEffect(() => {
    fetchTravelStyles();
  }, []);
  const getData = async () => {
    try {
      const response: any = await getToursSearch(String(id));
      setTheme(Object.keys(response.data.data));
      console.log(response.data.data, "------------------1");
      setData(response.data.data);
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
      <div className="relative bg-black text-white pt-5  md:px-6 md:h-[532px]">
        <Image
          src="https://images.pexels.com/photos/29515365/pexels-photo-29515365/free-photo-of-hoa-sen-r-c-r-trong-c-nh-quan-vi-t-nam-ng-p-tran-anh-n-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        {/* Background */}
        <Container className="h-full">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: "url('/paris.jpg')", // Thay bằng ảnh phù hợp
            }}
          ></div>
          <div className="relative z-10 flex flex-col h-full w-full justify-between ">
            <div>
              <h1
                className="text-3xl md:text-5xl font-semibold text-white"
                style={{
                  fontSize: "30px",
                  lineHeight: "36px",
                  textShadow: "0px 3px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                {decodeURIComponent(String(id))?.replace(/%20/g, " ")} Tours &
                Travel Packages 2025/2026
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-200">
                Discover the beauty of Vietnam through our carefully curated
                tours. From bustling cities to peaceful countryside, ancient
                temples to pristine beaches, experience the rich culture and
                stunning landscapes of this Southeast Asian gem.
              </p>
            </div>
            <div>
              {" "}
              <p className="mb-4 text-lg text-gray-200  ">
                Choose your trip style:
              </p>
              <Row gutter={[32, 0]} className="flex items-end">
                <Col xs={24} sm={24} md={6} lg={5} style={{ display: "flex" }}>
                  <Link href="/client/my-custom-trip">
                    <div
                      className={`
                          bg-[#1d9c53] 
                          text-white 
                          flex 
                          items-center 
                          justify-center 
                          gap-2 
                          py-3 
                          px-2.5 
                          rounded-lg 
                          shadow-md 
                          hover:opacity-80 
                          transition 
                          font-roboto 
                          text-sm
                          font-bold
                          uppercase
                          text-center
                          h-[80px] 
                          w-full
                          max-w-[120px]
                          leading-5
                          mb-4
                          relative
                          z-[1]
                          mx-auto
                          md:text-base
                          md:h-[116px] 
                          md:max-w-[162px] 
                          md:py-5 
                          md:px-3.5 
                          md:leading-6
                          md:mb-5
                        `}
                    >
                      DESIGN CUSTOM TRIP
                    </div>
                  </Link>
                </Col>
                <Col xs={24} sm={24} md={18} lg={19}>
                  <div className="relative">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      breakpoints={{
                        320: {
                          slidesPerView: 3,
                          spaceBetween: 8,
                        },
                        480: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 15,
                        },
                        1024: {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                      }}
                      navigation
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      className="SwiperCustom"
                    >
                      {travelOptions.map((option, index) => (
                        <SwiperSlide key={index} className="p-1 flex">
                          <Link href={"/guide/" + option.name}>
                            <button
                              key={option.name}
                              className={`
                                text-white 
                                items-center 
                                justify-center 
                                gap-2 
                                py-5 
                                px-3.5 
                                rounded-lg 
                                shadow-md 
                                transition 
                                font-roboto 
                                text-sm
                                h-[80px]
                                w-full
                                max-w-[120px]
                                mx-auto
                                md:text-base 
                                md:h-[116px] 
                                md:max-w-[152px]
                              `}
                              style={{
                                backgroundColor: getStyleColor(option.name),
                                color: "white",
                                fontWeight: 700,
                                textAlign: "center",
                                textTransform: "uppercase",
                                marginBottom: "1rem",
                                lineHeight: 1.3,
                                position: "relative",
                                zIndex: 1,
                              }}
                            >
                              {option.name}
                            </button>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className=" items-center justify-center mt-20">
          {theme?.map((item, index) => (
            <div key={item} className="w-full mb-8">
              {index === 1 && (
                <div className="mt-5 mb-10">
                  <Banner />
                </div>
              )}
              <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-3 mb-8">
                <div className="text-xl md:text-[2rem] font-bold text-gray-800 tracking-tight">
                  {item}
                </div>
                <Link href={`/trips-list/${item}`}>
                  <button className="flex items-center mb-2 gap-1 text-sm md:text-base text-[#888] hover:text-[#888] transition-colors duration-200 font-medium">
                    See all {data[item].count} tours
                    <ArrowForwardIosIcon
                      className="w-2 h-2"
                      sx={{
                        height: "12px",
                        width: "12px",
                        "@media (min-width: 768px)": {
                          height: "15px",
                          width: "15px",
                        },
                      }}
                    />
                  </button>
                </Link>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                navigation
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
              >
                {data &&
                  data[item].tours.map((tour: any) => (
                    <SwiperSlide className="p-1">
                      <CardReview data={tour} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              {index === 1 && (
                <div className="relative bg-black text-white pt-5 px-4 sm:px-6 mt-20 rounded-lg min-h-[300px] md:h-[300px]">
                  <Image
                    src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Background"
                    fill
                    className="object-cover opacity-50 rounded-lg"
                    priority
                  />
                  <div className="p-6 md:mt-10">
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={8}>
                        <div className="text-white font-roboto text-xl sm:text-2xl font-bold leading-8 sm:leading-9 mb-4">
                          Want a tailor-made trip instead?
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={8}>
                        <div className="text-white font-roboto text-lg sm:text-xl font-bold leading-[22px] sm:leading-[25px]">
                          Your trip, your way, planned by an expert:
                        </div>
                        <ul className="list-disc pl-4 mt-2 sm:mt-3">
                          <li className="text-white text-sm sm:text-base my-2 sm:my-3 leading-5 sm:leading-6 text-left">
                            You choose budget, destinations, activities,
                            transport & lodging type
                          </li>
                          <li className="text-white text-sm sm:text-base leading-5 sm:leading-6 text-left">
                            Expert designs the itinerary for you, and once
                            approved, takes care of logistics
                          </li>
                        </ul>
                      </Col>
                      <Col xs={24} sm={24} md={8}>
                        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                          <Link href="/client/my-custom-trip">
                            <ButtonGreen name="Design custom trip" />
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
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
