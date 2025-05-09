"use client";
import React, { useEffect, useState } from "react";
import Slide from "./components/slide/Slide";
import Slider from "./components/sectionHome/slider";
import SlideCard from "./components/sectionHome/SlideCard";
import { UseTravelstride } from "./components/sectionHome/UseTravelstride";
import GiftCard from "./components/sectionHome/Gift";
import SlideStyle from "./components/sectionHome/SlideStyle";
import SlideBlog from "./components/sectionHome/SlideBlog";
import Banner from "./components/sectionHome/Banner";
import { getHome, getToursSearch } from "./hook";
import Manage from "@/app/admin/design-my-trip/page";
import Loading from "./components/Loading";
import Image from "next/image";
import iconZalo from "@/app/assets/imgs/zalo.png";
import iconWhatapp from "@/app/assets/imgs/whatapp.png";

export default function Home() {
  interface Image {
    id: number;
    imageUrl: string;
    sequence?: number;
    url?: string;
    tourId?: number;
  }

  interface Banner {
    id: number;
    title: string;
    subTitle: string;
    images: Image[];
  }

  interface Style {
    id: number;
    name: string;
    imageUrl: string;
    description: string | null;
  }

  interface Destination {
    id: number;
    destination: string;
    continentId: number;
    imageUrl: string;
    description: string | null;
    isShow: boolean;
    show: boolean;
  }

  interface Post {
    id: number;
    title: string;
    coverImage: string;
    types: string;
    contentHtml: string;
    publishDate: string;
    isShow: boolean;
  }

  interface Review {
    avgTransportation: number;
    avgActivities: number;
    avgMeals: number;
    avgGuide: number;
    avgValue: number;
    avgOverall: number;
    avgLodging: number;
    reviewCount: number;
    tourId: number;
  }

  interface Tour {
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
  }

  interface TripData {
    images: Image[];
    review: Review;
    tour: Tour;
  }

  interface HomeData {
    banners: Banner[];
    styles: Style[];
    destinations: Destination[];
    pots: Post[];
    destinationCount: Record<string, number>;
    findTrips: {
      data: TripData[];
    };
  }

  const [data, setData] = useState<HomeData>();
  const [dataSearch, setDataSearch] = useState([]);
  const getData = async () => {
    try {
      const response: any = await getHome();
      if (response.data) setData(response.data);
    } catch (error) {
      console.error("Get data error:", error);
    }
  };
  const searchTour = async (query: string) => {
    try {
      const response: any = await getToursSearch(query);
      if (response.data) setDataSearch(response.data.data);
    } catch (error) {
      console.error("Get data error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return data ? (
    <div>
      {/* <Manage></Manage> */}
      <Slide searchTour={searchTour} dataSearch={dataSearch} />
      <Slider data={data?.styles ?? []} />
      <Banner />
      <UseTravelstride />
      <SlideCard data={data?.findTrips.data} />
      <GiftCard />
      <SlideStyle data={data?.destinations ?? []} />
      <SlideBlog data={data?.pots ?? []} />
      <div className="fixed bottom-5 right-4 z-50">
        <a
          href="https://wa.me/0345211156"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 items-center justify-center w-14 h-14 rounded-full transition-colors duration-300 shadow-lg"
        >
          <Image
            src={iconWhatapp}
            alt="WhatsApp Contact"
            className="w-12 h-12"
          />
        </a>
        <a
          href="https://zalo.me/0338383000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 items-center justify-center w-14 h-14 rounded-full transition-colors duration-300 shadow-lg"
        >
          <Image src={iconZalo} alt="Zalo Contact" className="w-8 h-8" />
        </a>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
