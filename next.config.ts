import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.example.com",
                port: "",
                pathname: "/account123/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "static.travelstride.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
