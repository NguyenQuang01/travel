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
            <div>
                <Image src={icon} alt={data.title} height={64} width={64} />
            </div>
            <div className="text-[20px] font-bold font-roboto text-[#333333] leading-[35px] text-left">
                {data.title}
            </div>
            <div className="text-[hsl(0,0%,40%)] font-roboto leading-[30px] text-left">
                {data.description}
            </div>
        </div>
    );
};

export default FeatureCard;
