import React from "react";
import Link from "next/link";
import useStore from "@/store/useStore";
import ButtonGreen from "./ButtonGreen";

interface ButtonNextProps {
    url?: string;
}

const ButtonNext = ({ url = "/" }: ButtonNextProps) => {
    const { increase } = useStore();
    return (
        <Link href={url} replace onClick={increase}>
            <div className="flex items-center justify-end mt-3 ">
                <ButtonGreen name="Next"></ButtonGreen>
            </div>
        </Link>
    );
};

export default ButtonNext;
