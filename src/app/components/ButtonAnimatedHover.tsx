import React from "react";
import "@/app/components/button.style.css";
const ButtonAnimatedHover = ({
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

export default ButtonAnimatedHover;
