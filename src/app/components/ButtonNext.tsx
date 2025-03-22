import React from "react";
import Link from "next/link";
import useStore from "@/store/useStore";

interface ButtonNextProps {
    url?: string;
}

const ButtonNext = ({ url = "/" }: ButtonNextProps) => {
    const { increase } = useStore();
    return (
        <Link href={url} replace>
            <button
                onClick={increase}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg float-right"
            >
                Next
            </button>
        </Link>
    );
};

export default ButtonNext;
