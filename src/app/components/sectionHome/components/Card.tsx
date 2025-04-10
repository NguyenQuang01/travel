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
import useStore from "@/store/useStore";
import generalImg from "@/app/assets/imgs/anhChung.jpeg";
import { API_INFO } from "@/constant/constant";

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

interface Image {
    id: number;
    url: string;
    tourId: number;
}

interface Review {
    avgTransportation: number;
    avgActivities: number;
    avgMeals: number;
    avgGuide: number;
    reviewCount: number;
    avgValue: number;
    avgOverall: number;
    tourId: number;
    avgLodging: number;
}

interface Tour {
    id: number;
    tripId: string;
    name: string;
    lodgingLevel: string;
    video: string;
    totalDay: number;
    tripType: string;
    physicalLevel: string;
    tripPace: string;
    highlights: string;
    tripAbout: string;
    itineraryFocus: string;
    groupSize: string;
    ageRange: string;
    minGroupSize: number;
    maxGroupSize: number;
    attractions: string;
    destinations: string;
    isTrending: number;
    oldPrice?: number;
}

interface TourData {
    images: Image[];
    review: Review;
    tour: Tour;
}

export default function CardReview(prop: TourData) {
    const [expanded, setExpanded] = React.useState(false);
    const { setTourOrder } = useStore();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const setOder = () => {
        setTourOrder({
            img: prop?.images[0]?.url,
            name: prop.tour.name,
            star: String(prop.review.avgOverall),
            review: String(prop.review.reviewCount),
            style: prop.tour?.tripType,
            price: String(prop.tour.oldPrice),
            day: String(prop.tour.totalDay),
        });
    };
    return (
      <Card>
        <Link href={`/trips/${prop.tour.id}`} onClick={setOder}>
          <Image
            src={
              prop?.images[0]?.url
                ? `${API_INFO.BASE_URL_ADMIN}${prop?.images[0]?.url}`
                : generalImg
            }
            alt="img"
            width={200}
            height={200}
            priority={true}
            loading="eager"
            className="w-full h-[173px] md:h-[290px] h-[200px] object-cover"
          />
          <Box className="p-2 md:p-[1rem] pb-0">
            <Box>
              <p className="text-sm md:text-base font-bold leading-[16px] truncate">
                {prop.tour.name}
              </p>
              <Box className="flex items-center my-2">
                <Box
                  sx={{
                    height: "12px",
                    width: "12px",
                    background: "#000",
                    borderRadius: "10%",
                  }}
                  className=" mr-[8px]"
                ></Box>
                <p className="text-sm md:text-base truncate">
                  {prop.tour?.tripType}
                </p>
              </Box>
            </Box>
            <Box className="flex justify-between items-center">
              <Typography sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}>
                {prop.tour.totalDay} Days
              </Typography>
              <div className="flex items-center">
                <p className="md:text-sm text-xs md:mr-2 mr-1">From:</p>
                <span className="md:text-2xl text-lg">
                  {" "}
                  {prop.tour.oldPrice || 0}
                </span>
              </div>
            </Box>
          </Box>{" "}
        </Link>
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
          <Box className="flex justify-between items-center p-[1rem] pt-0">
            <Box className="text-xs md:text-base">
              <StarTwoTone twoToneColor="#FFD700" />{" "}
              {prop.review.avgOverall
                ? Number(prop.review.avgOverall).toFixed(1)
                : 5}{" "}
              / 5 Excellent
            </Box>
            <Box sx={{ pl: "10px" }}>
              <Typography
                sx={{
                  color: "#888",
                  fontSize: "14px",
                  lineHeight: "21px",
                }}
              >
                {prop.review.reviewCount} Reviews
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Card>
    );
}
