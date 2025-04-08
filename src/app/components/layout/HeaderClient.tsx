"use client";
import React, { use, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListSubheader from "@mui/material/ListSubheader";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Modal, Tooltip } from "antd";
import ButtonGreen from "../ButtonGreen";
import {
  getActivities,
  getInterests,
  getStyles,
  getDestinations,
  getTrending,
} from "./hook";
import ButtonAnimated from "../ButtonAnimated";
const pages = [
  {
    name: "Trending",
    children: [
      {
        name: "Asia",
        children: ["Japan", "China", "Vietnam", "Thailand"],
      },
      {
        name: "Europe",
        children: null,
      },
      {
        name: "Africa",
        children: ["Egypt", "Kenya", "Morocco", "South Africa"],
      },
      {
        name: "North America",
        children: null,
      },
      {
        name: "South America",
        children: ["Brazil", "Argentina", "Peru", "Chile"],
      },
    ],
  },
  {
    name: "Destinations",
    children: [
      {
        name: "Asia",
        children: ["Japan", "China", "Vietnam", "Thailand"],
      },
      {
        name: "Europe",
        children: null,
      },
      {
        name: "Africa",
        children: ["Egypt", "Kenya", "Morocco", "South Africa"],
      },
      {
        name: "North America",
        children: null,
      },
      {
        name: "South America",
        children: ["Brazil", "Argentina", "Peru", "Chile"],
      },
    ],
  },
  {
    name: "Trip Themes & Styles",
    children: [
      {
        name: "Adventure",
        children: ["Hiking", "Climbing", "Water Sports", "Safari"],
      },
      {
        name: "Cultural",
        children: ["History", "Art", "Food", "Festivals"],
      },
      {
        name: "Wildlife",
        children: ["Bird Watching", "Marine Life", "Big Game", "Photography"],
      },
      {
        name: "Luxury",
        children: ["5-Star Hotels", "Private Tours", "Gourmet Dining"],
      },
      {
        name: "Budget",
        children: ["Backpacking", "Hostels", "Local Transport"],
      },
    ],
  },
  {
    name: "Write a Review",
    children: null,
  },
];
interface Destination {
  id: number;
  destination: string;
  continentId: number;
  imageUrl: string;
  description: string | null;
  isShow: boolean;
  show: boolean;
}

interface Continent {
  continentId: number;
  continentName: string;
  imageUrl: string;
  description: string;
}

interface DestinationData {
  continent: Continent;
  destinations: Destination[];
}
interface Trip {
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
  price: string;
  oldPrice: string;
}
function HeaderClient() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalTrending, setIsModalTrending] = React.useState(false);
  const [isModalOpenStyle, setIsModalOpenStyle] = React.useState(false);

  const [destinations, setDestinations] = useState<DestinationData[]>([]);

  const [activities, setActivities] =
    useState<{ id: number; activity: string }[]>();
  const [styles, setStyles] = useState<{ id: number; name: string }[]>();
  const [Interests, setInterests] = useState<{ id: number; name: string }[]>();

  const [trending, setTrending] = useState<Trip[]>([]);
  const [showCustomTripButton, setShowCustomTripButton] = useState(false);
  const getMenuActivities = async () => {
    const res: any = await getActivities();
    if (res) {
      setActivities(res.data);
    }
  };
  const getMenuStyles = async () => {
    const res: any = await getStyles();
    if (res) {
      setStyles(res.data ?? []);
    }
  };
  const getMenuInterests = async () => {
    const res: any = await getInterests();
    if (res) {
      setInterests(res.data);
    }
  };
  const getMenuDestinations = async () => {
    const res: any = await getDestinations();
    if (res) {
      setDestinations(res.data);
    }
  };
  const getMenuTrending = async () => {
    const res: any = await getTrending();
    if (res) {
      setTrending(res.data ?? []);
    }
  };
  useEffect(() => {
    getMenuActivities();
    getMenuStyles();
    getMenuInterests();
    getMenuDestinations();
    getMenuTrending();
  }, []);

  const handleClick = () => {
    setOpen(!open);
    setIsModalOpen(true);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page?: any) => {
    setAnchorElNav(null);
    if (page.name === "Destinations") setIsModalOpen(true);
    if (page.name === "Trip Themes & Styles") setIsModalOpenStyle(true);
    if (page.name === "Trending") setIsModalTrending(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOkTrending = () => {
    setIsModalTrending(false);
  };

  const handleCancelTrending = () => {
    setIsModalTrending(false);
  };
  const handleOkStyle = () => {
    setIsModalOpenStyle(false);
  };

  const handleCancelStyle = () => {
    setIsModalOpenStyle(false);
  };
  useEffect(() => {
    const isHomePage = window.location.pathname === "/";
    setShowCustomTripButton(!isHomePage);
  }, []);
  return (
    <div>
      <Modal
        open={isModalTrending}
        onOk={handleOkTrending}
        onCancel={handleCancelTrending}
        width={650}
        footer={null}
      >
        <div className=" rounded-lg p-2  mx-auto mr-5">
          <div className="grid grid-cols-3 gap-2">
            {trending?.length > 0 &&
              trending?.map((trip: Trip, index: number) => (
                <h3 key={index} className="space-y-1 text-gray-700 text-center">
                  <Link href={"/guide/" + trip.name}>
                    <ButtonAnimated>
                      <Tooltip title={trip?.name} placement="top">
                        <span className="text-start whitespace-nowrap overflow-hidden text-ellipsis block w-full max-w-[150px]">
                          {trip?.name}
                        </span>
                      </Tooltip>
                    </ButtonAnimated>
                  </Link>
                </h3>
              ))}
          </div>
        </div>
      </Modal>{" "}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
        footer={null}
      >
        <div className=" rounded-lg p-2  mx-auto  mr-5">
          <div className="flex justify-between">
            {destinations.length > 0 &&
              destinations?.map((section, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg mb-2 ml-5">
                    {section.continent.continentName}
                  </h3>
                  <ul className="space-y-1 text-gray-700">
                    {section.destinations.map((place, i) => (
                      <li key={i}>
                        <Link href={"/guide/" + place.destination}>
                          <ButtonAnimated>
                            <span className="text-start whitespace-nowrap overflow-hidden text-ellipsis">
                              {place.destination}
                            </span>
                          </ButtonAnimated>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </Modal>{" "}
      <Modal
        open={isModalOpenStyle}
        onOk={handleOkStyle}
        onCancel={handleCancelStyle}
        width="50%"
        footer={null}
      >
        <div className=" rounded-lg p-2  mx-auto flex gap-10 justify-between mr-5">
          <div>
            <h3 className="font-bold text-lg mb-2 ml-5">Adventure</h3>
            <ul className="space-y-1 text-gray-700 ">
              {activities?.map((activity) => (
                <li key={activity.id}>
                  {" "}
                  <Link href={"/guide/" + activity.activity}>
                    <ButtonAnimated>
                      <span className="text-start whitespace-nowrap overflow-hidden text-ellipsis">
                        {activity.activity}
                      </span>
                    </ButtonAnimated>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 ml-5">Styles</h3>
            <ul className="space-y-1 text-gray-700">
              {styles?.map((style, index) => (
                <li key={style.id}>
                  {" "}
                  <Link href={"/guide/" + style.name}>
                    <ButtonAnimated>
                      <span className="text-start whitespace-nowrap overflow-hidden text-ellipsis">
                        {style.name}
                      </span>
                    </ButtonAnimated>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 ml-5">Interests</h3>
            <ul className="space-y-1 text-gray-700 ">
              {Interests?.map((interest, index) => (
                <li key={interest.id}>
                  {" "}
                  <Link href={"/guide/" + interest.name}>
                    <ButtonAnimated>
                      {" "}
                      <span className="text-start whitespace-nowrap overflow-hidden text-ellipsis">
                        {interest.name}
                      </span>
                    </ButtonAnimated>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters className="py-[15px] ">
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Link href="/">
                <Image
                  src="https://client.travelstride.com/app/_next/static/media/travel_stride_logo.68fd2f6b.svg"
                  alt="Logo"
                  width={201}
                  height={44}
                  priority={true}
                  className="min-w-[12.6rem] h-[44px]"
                  loading="eager"
                />
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      <ArrowBackIosNewIcon onClick={handleCloseNavMenu} />
                    </ListSubheader>
                  }
                >
                  <Link href="/client/my-custom-trip">
                    {" "}
                    <Button
                      // onClick={handleCloseNavMenu}
                      className="flex items-center  rounded-[45px] px-6 py-[1.1rem] text-[14px] "
                      sx={{
                        background: "#f6bb43",
                        color: "#333",
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: "45px",
                        padding: "4px 1rem",
                        margin: "1rem 0 1rem 1rem",
                      }}
                    >
                      Design custom trip
                      <ArrowForwardIosIcon sx={{ height: "15px" }} />
                    </Button>
                  </Link>

                  {pages.map((page, index) => (
                    <div key={index}>
                      <ListItemButton
                        onClick={handleClick}
                        sx={{
                          ml: 2,
                          mr: 2,
                          borderBottom: ".1rem solid #dadada",
                        }}
                      >
                        <ListItemText
                          primary={page.name}
                          primaryTypographyProps={{
                            fontWeight:
                              page.name === "Write a Review" ? 400 : 600,
                          }}
                        />

                        {page?.children &&
                          (open ? <ExpandLess /> : <ExpandMore />)}
                      </ListItemButton>
                      {page?.children &&
                        page?.children.map((item, index) => (
                          <Collapse
                            in={open}
                            timeout="auto"
                            unmountOnExit
                            key={index}
                          >
                            <List component="div" disablePadding>
                              <ListItemButton
                                sx={{
                                  pl: 0,
                                  ml: 5,
                                  mr: 2,
                                  borderBottom: ".1rem solid #dadada",
                                }}
                              >
                                <ListItemText primary={item.name} />
                                {item?.children &&
                                  (open ? <ExpandLess /> : <ExpandMore />)}
                              </ListItemButton>
                              {item?.children &&
                                item?.children.map((i, index) => (
                                  <Collapse
                                    in={open}
                                    timeout="auto"
                                    unmountOnExit
                                    key={index}
                                  >
                                    <List component="div" disablePadding>
                                      <ListItemButton
                                        sx={{
                                          pl: 9,
                                        }}
                                      >
                                        <ListItemText primary={i} />
                                      </ListItemButton>
                                    </List>
                                  </Collapse>
                                ))}
                            </List>
                          </Collapse>
                        ))}
                    </div>
                  ))}
                </List>
              </Menu>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                color: "black",
              }}
            >
              <Image
                src="https://client.travelstride.com/app/_next/static/media/travel_stride_logo.68fd2f6b.svg"
                alt="Logo"
                width={201}
                height={44}
                priority={true}
                className="min-w-[12.6rem] h-[44px]"
                loading="eager"
              />
            </Box>

            <Box className="hidden md:flex flex-grow justify-center items-center">
              {pages.map((page, index) => (
                <Box
                  key={index}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "pointer",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    color: "#333",
                    fill: "#333",
                    padding: "0 0.75rem",
                    fontWeight:
                      page.name === "Trending" ||
                      page.name === "Destinations" ||
                      page.name === "Trip Themes & Styles"
                        ? 600
                        : 500,
                    textTransform: "none",
                    "&:hover": {
                      borderBottom:
                        page.name === "Destinations" ||
                        page.name === "Trip Themes & Styles" ||
                        page.name === "Trending"
                          ? "3px solid var(--color-button-hover)"
                          : "",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {page.name !== "Write a Review" ? (
                    page.name
                  ) : (
                    <Link href="/tour-review-form">
                      <ButtonGreen name="Write a Review" />
                    </Link>
                  )}
                  {page.name !== "Write a Review" && <ArrowDropDownIcon />}
                </Box>
              ))}
              {showCustomTripButton && (
                <Link href="/client/my-custom-trip">
                  <Button
                    className="flex items-center  rounded-[45px]  px-6 py-[1.1rem] text-[14px]"
                    sx={{
                      background: "#f6bb43",
                      color: "#333",
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "45px",
                      padding: "4px 1rem",
                    }}
                  >
                    Design custom trip
                    <ArrowForwardIosIcon sx={{ height: "15px" }} />
                  </Button>
                </Link>
              )}
            </Box>
            <Box>
              <div id="google_translate_element"></div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default HeaderClient;
