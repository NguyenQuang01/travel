import { Container } from "@mui/material";
import { Steps } from "antd";
import Image from "next/image";
import React from "react";

const MyCustomTrip = () => {
    return (
        <Container className="mt-10">
            <Steps
                size="small"
                current={0}
                items={[
                    {
                        title: "Where",
                    },
                    {
                        title: "Who",
                    },
                    {
                        title: "When",
                    },
                    {
                        title: "How",
                    },
                    {
                        title: "Final details",
                    },
                ]}
            />
            <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg  mt-10">
                <Image
                    src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                    alt="img"
                    width={200}
                    height={200}
                    priority={true}
                    loading="eager"
                    className="w-[40px] h-[173px] md:h-[40px] h-[200px] object-cover rounded-full mr-5"
                />
                <div className="flex-1">
                    <h2 className="font-semibold text-lg">
                        Hi, ready to plan your trip? Here’s how this works.
                    </h2>
                    <p className="text-gray-600 mt-2">
                        All you need to do is answer a few questions about the
                        trip you're dreaming of. Travelstride will use your
                        input to match you with a local travel planner who can
                        help make your trip a reality.
                    </p>
                    <p className="text-gray-600 mt-2">There's no obligation.</p>
                    <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg float-right">
                        Next
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default MyCustomTrip;
