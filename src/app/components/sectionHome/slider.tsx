"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import "./styles/slider.css";
const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
};

const Slider = () => {
    return (
        <div className="bg-black flex items-center justify-center text-[#333] leading-6 my-0 mb-[118px] py-[30px] pb-10 md:h-[444px] h-[344px]">
            <div>
                <p className="text-[1.8rem] font-bold text-shadow-md text-[#fff] text-center mb-[80px]">
                    Choose your travel style
                </p>
                <div className="mx-auto md:w-[70vw]  w-[83vw] max-w-[126rem] h-full relative md:-mb-[11.8rem] -mb-[14.8rem]">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        breakpoints={{
                            320: {
                                slidesPerView: 3,
                                spaceBetween: 10,
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
                        <SwiperSlide>
                            <div className="flex items-center justify-center h-full">
                                <div className="card">
                                    <div className="face front">
                                        <Image
                                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                                            alt="Logo"
                                            width={201}
                                            height={44}
                                            priority={true}
                                            className="min-w-[12.6rem] h-[44px]"
                                            loading="eager"
                                            style={imgStyle}
                                        />
                                        <h1 className="text-h1">Custom</h1>
                                    </div>

                                    <div className="face back">
                                        <h2 className="text-h2 mb-5">Custom</h2>
                                        <p className="text-p">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Harum
                                            repellat maiores aperiam nemo
                                            officia, praesentium suscipit? Eum
                                            voluptate fuga eius accusamus harum
                                            cum unde natus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>{" "}
                        <SwiperSlide>
                            <div className="flex items-center justify-center h-full">
                                <div className="card">
                                    <div className="face front">
                                        <Image
                                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                                            alt="Logo"
                                            width={201}
                                            height={44}
                                            priority={true}
                                            className="min-w-[12.6rem] h-[44px]"
                                            loading="eager"
                                            style={imgStyle}
                                        />
                                        <h1 className="text-h1">Custom</h1>
                                    </div>

                                    <div className="face back">
                                        <h2 className="text-h2 mb-5">Custom</h2>
                                        <p className="text-p">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Harum
                                            repellat maiores aperiam nemo
                                            officia, praesentium suscipit? Eum
                                            voluptate fuga eius accusamus harum
                                            cum unde natus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>{" "}
                        <SwiperSlide>
                            <div className="flex items-center justify-center h-full">
                                <div className="card">
                                    <div className="face front">
                                        <Image
                                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                                            alt="Logo"
                                            width={201}
                                            height={44}
                                            priority={true}
                                            className="min-w-[12.6rem] h-[44px]"
                                            loading="eager"
                                            style={imgStyle}
                                        />
                                        <h1 className="text-h1">Custom</h1>
                                    </div>

                                    <div className="face back">
                                        <h2 className="text-h2 mb-5">Custom</h2>
                                        <p className="text-p">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Harum
                                            repellat maiores aperiam nemo
                                            officia, praesentium suscipit? Eum
                                            voluptate fuga eius accusamus harum
                                            cum unde natus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>{" "}
                        <SwiperSlide>
                            <div className="flex items-center justify-center h-full">
                                <div className="card">
                                    <div className="face front">
                                        <Image
                                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                                            alt="Logo"
                                            width={201}
                                            height={44}
                                            priority={true}
                                            className="min-w-[12.6rem] h-[44px]"
                                            loading="eager"
                                            style={imgStyle}
                                        />
                                        <h1 className="text-h1">Custom</h1>
                                    </div>

                                    <div className="face back">
                                        <h2 className="text-h2 mb-5">Custom</h2>
                                        <p className="text-p">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Harum
                                            repellat maiores aperiam nemo
                                            officia, praesentium suscipit? Eum
                                            voluptate fuga eius accusamus harum
                                            cum unde natus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>{" "}
                        <SwiperSlide>
                            <div className="flex items-center justify-center h-full">
                                <div className="card">
                                    <div className="face front">
                                        <Image
                                            src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                                            alt="Logo"
                                            width={201}
                                            height={44}
                                            priority={true}
                                            className="min-w-[12.6rem] h-[44px]"
                                            loading="eager"
                                            style={imgStyle}
                                        />
                                        <h1 className="text-h1">Custom</h1>
                                    </div>

                                    <div className="face back">
                                        <h2 className="text-h2 mb-5">Custom</h2>
                                        <p className="text-p">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Harum
                                            repellat maiores aperiam nemo
                                            officia, praesentium suscipit? Eum
                                            voluptate fuga eius accusamus harum
                                            cum unde natus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Slider;
