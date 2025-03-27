import Image from "next/image";
import React from "react";
import loading from "@/app/assets/imgs/loanding.gif";

const Loading = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="fixed inset-0 flex justify-center items-center bg-black/50">
                <Image src={loading} alt="loading" width={400} height={400} />
            </div>
        </div>
    );
};

export default Loading;
