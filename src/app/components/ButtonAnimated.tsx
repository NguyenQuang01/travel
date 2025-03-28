import React from "react";
import "@/app/components/style.css";
const ButtonAnimated = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <button className="button">
            <div className="back"></div>
            <span className="text">{children}</span>
        </button>
    );
};

export default ButtonAnimated;
