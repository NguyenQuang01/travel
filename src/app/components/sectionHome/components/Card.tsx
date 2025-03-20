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

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const imgStyle: React.CSSProperties = {
    width: "323px",
    height: "323px",
    objectFit: "cover",
};
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
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
                width={323}
                height={323}
                priority={true}
                loading="eager"
                style={imgStyle}
            />
            <Box className="p-[1.5rem] pb-0">
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            lineHeight: "18px",
                            fontSize: "18px",
                            fontWeight: "600",
                        }}
                        className="text-lg font-bold leading-[18px] truncate"
                    >
                        {prop.title}
                    </Typography>
                    <Box className="flex items-center justify-between my-2">
                        <Box
                            sx={{
                                height: "8px",
                                width: "8px",
                                background: prop.color,
                            }}
                            className="rounded-full mr-[8px]"
                        ></Box>
                        <Typography variant="body2" color="text.secondary">
                            {prop.tourTypes}
                        </Typography>
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
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box className="flex justify-between p-[1.5rem] pt-0">
                    <Box>
                        <Rating name="simple-controlled" value={prop.start} />
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
