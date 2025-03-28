import React from "react";

const ButtonGreen = (props: { name: string; width?: string }) => {
    return (
        <button
            className={`flex items-center justify-center px-[15.5px] py-0 mr-[30px] text-white leading-[24px] rounded-[4px] border border-solid border-[#198146] w-${props.width} h-[40px] transition-colors duration-300`}
            style={{
                backgroundColor: "var(--color-button)",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                    "var(--color-button-hover)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-button)")
            }
        >
            {props.name}
        </button>
    );
};

export default ButtonGreen;
