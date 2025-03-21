import React from "react";
import Image, { StaticImageData } from "next/image";
interface FeatureCardProps {
    icon: StaticImageData;
    data: {
        title: string;
        description: string;
    };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, data }) => {
    return (
        <div>
            <div className="flex justify-center md:justify-start">
                <Image
                    src={icon}
                    alt={data.title}
                    height={80}
                    width={80}
                    className="w-20 h-20 md:w-16 md:h-16"
                />
            </div>
            <div className="text-[20px] font-bold font-roboto text-[#333333] leading-[35px] text-center md:text-left">
                {data.title}
            </div>
            <div className="text-[hsl(0,0%,40%)] font-roboto leading-[30px] text-center md:text-left">
                {data.description}
            </div>
        </div>
    );
};

export default FeatureCard;
