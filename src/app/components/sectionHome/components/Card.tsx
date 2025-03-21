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

interface CardData {
    title: string;
    tourTypes: string;
    color: string;
    numberDay: string;
    price: string;
    start: number;
    numberReview: number;
}

export default function CardReview(prop: CardData) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <Image
                src="https://images.pexels.com/photos/19479799/pexels-photo-19479799/free-photo-of-canh-tay-dan-ba-hoa-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
                alt="img"
                width={200}
                height={200}
                priority={true}
                loading="eager"
                className="w-full h-[173px] md:h-[323px] h-[200px] object-cover"
            />
            <Box className="p-2 md:p-[1.5rem] pb-0">
                <Box>
                    <p className="text-sm md:text-base font-bold leading-[16px] truncate">
                        {prop.title}
                    </p>
                    <Box className="flex items-center justify-between my-2">
                        <Box
                            sx={{
                                height: "8px",
                                width: "8px",
                                background: prop.color,
                            }}
                            className="rounded-full mr-[8px]"
                        ></Box>
                        <p className="text-sm md:text-base truncate">
                            {prop.tourTypes}
                        </p>
                    </Box>
                </Box>
                <Box className="flex justify-between">
                    <Typography>{prop.numberDay} Days</Typography>
                    <Typography>{prop.price}</Typography>
                </Box>
            </Box>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    className="h-5"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box className="flex justify-between p-[1rem] pt-0">
                    <Box>
                        <StarTwoTone twoToneColor="#FFD700" />
                    </Box>
                    <Box sx={{ pl: "10px" }}>
                        <Typography
                            sx={{
                                color: "#888",
                                fontSize: "14px",
                                lineHeight: "21px",
                            }}
                        >
                            {prop.numberReview} Reviews
                        </Typography>
                    </Box>
                </Box>
            </Collapse>
        </Card>
    );
}
