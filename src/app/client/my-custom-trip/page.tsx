"use client";
import { Container } from "@mui/material";

import Image from "next/image";
import React, { use, useEffect } from "react";
import BlurText from "../../components/reactbits/BlurText";
import ButtonNext from "@/app/components/ButtonNext";
import StepsComponent from "@/app/components/Steps";
import useStore from "@/store/useStore";

const MyCustomTrip = () => {
    const { setTo0 } = useStore();
    useEffect(() => {
        setTo0();
    }, []);
    return (
        <Container className="my-10">
            <StepsComponent />
            <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg  mt-10">
                <Image
                    src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                    alt="img"
                    width={200}
                    height={200}
                    priority={true}
                    loading="eager"
                    className="w-[80px] h-[173px] md:h-[80px] h-[200px] object-cover rounded-full mr-5"
                />

                <div className="flex-1 mt-5">
                    <h2 className="font-semibold text-lg">
                        <BlurText
                            text="Hi, ready to plan your trip? Here’s how this works."
                            delay={50}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8"
                        />
                    </h2>
                    <p className="text-gray-600 mt-2">
                        All you need to do is answer a few questions about the
                        trip you're dreaming of. Travelstride will use your
                        input to match you with a local travel planner who can
                        help make your trip a reality.
                    </p>
                    <p className="text-gray-600 mt-2">There's no obligation.</p>
                    <ButtonNext url="/client/my-custom-trip/where" />
                </div>
            </div>
        </Container>
    );
};

export default MyCustomTrip;
