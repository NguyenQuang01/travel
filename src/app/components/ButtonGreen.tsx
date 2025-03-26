import React from "react";

const ButtonGreen = (props: { name: string; width?: string }) => {
    return (
        <button
            className={`flex items-center justify-center px-[15.5px] py-0 mr-[30px] text-white  leading-[24px] rounded-[4px] border border-solid border-[#198146] w-${props.width} h-[40px]`}
            style={{
                backgroundImage:
                    "linear-gradient(rgb(33, 172, 93) 0px, rgb(25, 129, 70) 100%)",
            }}
        >
            {props.name}
        </button>
    );
};

export default ButtonGreen;
