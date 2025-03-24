import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";

const Banner = () => {
    return (
        <Container className="mt-40">
            <Image
                src="https://client.travelstride.com/app/_next/static/images/desktop-awards-logos-11044cd8df731757db98cd6067d10a16.png"
                alt="img"
                width={200}
                height={200}
                priority={true}
                loading="eager"
                className="w-full h-auto object-cover"
            />
        </Container>
    );
};

export default Banner;
