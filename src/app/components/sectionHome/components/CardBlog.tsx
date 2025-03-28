import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { Box, Rating } from "@mui/material";
import { StarTwoTone } from "@ant-design/icons";
import Link from "next/link";
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand: _expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

interface Blog {
    id: number;
    title: string;
    coverImage: string;
    types: string;
    contentHtml: string;
    publishDate: string;
    isShow: boolean;
}

export default function CardBlog(prop: Blog) {
    return (
        <Link href={"/guide/" + prop.title}>
            <div>
                <Image
                    src={`http://202.92.7.92:3082${prop.coverImage}`}
                    alt="img"
                    width={200}
                    height={200}
                    priority={true}
                    loading="eager"
                    className="w-full h-[173px] md:h-[290px] h-[200px] object-cover"
                />
                <Box className="py-2 md:pt-[1rem] pb-2 bg-gray-100">
                    <Box>
                        <p className="text-sm md:text-2xl font-bold leading-[24px] ">
                            {prop.title}
                        </p>
                    </Box>
                </Box>
            </div>
        </Link>
    );
}
