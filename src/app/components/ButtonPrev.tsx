import React from "react";
import Link from "next/link";
import useStore from "@/store/useStore";

interface ButtonNextProps {
    url?: string;
}

const ButtonPrev = ({ url = "/" }: ButtonNextProps) => {
    const { decrease } = useStore();
    return (
        <Link href={url} replace>
            <button
                onClick={decrease}
                className="mt-4  text-gray-600 px-4 py-2 rounded-lg float-right"
            >
                ← Previous
            </button>
        </Link>
    );
};

export default ButtonPrev;
