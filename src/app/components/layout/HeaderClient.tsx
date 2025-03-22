"use client";
import * as React from "react";
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
import { Modal } from "antd";
const pages = [
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
                children: [
                    "Bird Watching",
                    "Marine Life",
                    "Big Game",
                    "Photography",
                ],
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

function HeaderClient() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [open, setOpen] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalOpenStyle, setIsModalOpenStyle] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
        setIsModalOpen(true);
    };
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = (page?: any) => {
        setAnchorElNav(null);
        console.log(page, "Destinations");

        page.name === "Destinations"
            ? setIsModalOpen(true)
            : setIsModalOpenStyle(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOkStyle = () => {
        setIsModalOpenStyle(false);
    };

    const handleCancelStyle = () => {
        setIsModalOpenStyle(false);
    };
    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}
            >
                <div className=" rounded-lg p-2  mx-auto">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="bg-green-100 p-4 rounded-md">
                            <h3 className="font-bold text-lg mb-2">Trending</h3>
                            <ul className="space-y-1 text-gray-700">
                                <li>Ha Long Bay</li>
                                <li>Sapa Rice Terraces</li>
                                <li>Hoi An Ancient Town</li>
                                <li>Mekong Delta</li>
                                <li>Phong Nha Caves</li>
                                <li>Ho Chi Minh City</li>
                                <li>Hue Imperial City</li>
                                <li>Phu Quoc Island</li>
                                <li>Hanoi Old Quarter</li>
                                <li>Nha Trang Beaches</li>
                                <li className="text-green-600">See all &gt;</li>
                            </ul>
                        </div>

                        {[
                            {
                                title: "Vietnam Destinations",
                                places: [
                                    "Ha Long Bay",
                                    "Hanoi",
                                    "Ho Chi Minh City",
                                    "Hoi An",
                                    "Da Nang",
                                    "Sapa",
                                    "Mekong Delta",
                                    "Phu Quoc",
                                    "Hue",
                                ],
                            },
                            {
                                title: "Vietnam Experiences",
                                places: [
                                    "Food & Cuisine",
                                    "Cultural Heritage",
                                    "Beach Resorts",
                                    "Mountain Trekking",
                                    "Historical Sites",
                                    "Local Markets",
                                    "Rice Terraces",
                                    "Buddhist Temples",
                                    "River Cruises",
                                ],
                            },
                            {
                                title: "Best Time to Visit",
                                places: [
                                    "Spring (Feb-Apr)",
                                    "Summer (May-Jul)",
                                    "Fall (Aug-Oct)",
                                    "Winter (Nov-Jan)",
                                    "Tet Holiday",
                                    "Monsoon Season",
                                    "Festival Times",
                                    "Peak Season",
                                    "Off-Peak Deals",
                                ],
                            },
                            {
                                title: "Travel Styles",
                                places: [
                                    "Luxury Tours",
                                    "Adventure Travel",
                                    "Family Trips",
                                    "Backpacking",
                                    "Photography Tours",
                                    "Culinary Tours",
                                    "Eco Tourism",
                                    "Cultural Tours",
                                    "Beach Holidays",
                                ],
                            },
                            {
                                title: "Practical Info",
                                places: [
                                    "Visa Guide",
                                    "Transportation",
                                    "Accommodations",
                                ],
                            },
                        ].map((section, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-lg mb-2">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1 text-gray-700">
                                    {section.places.map((place, i) => (
                                        <li key={i}>{place}</li>
                                    ))}
                                    <li className="text-green-600">
                                        See all &gt;
                                    </li>
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
                width={1000}
                footer={null}
            >
                <div className=" rounded-lg p-2  mx-auto">
                    <div className="grid grid-cols-6 gap-4">
                        <div className="bg-green-100 p-4 rounded-md">
                            <h3 className="font-bold text-lg mb-2">
                                Popular Themes
                            </h3>
                            <ul className="space-y-1 text-gray-700">
                                <li>Adventure Travel</li>
                                <li>Cultural Tours</li>
                                <li>Wildlife Safaris</li>
                                <li>Food & Wine</li>
                                <li>Beach Holidays</li>
                                <li>Luxury Escapes</li>
                                <li>Family Vacations</li>
                                <li>Photography Tours</li>
                                <li>Hiking & Trekking</li>
                                <li>River Cruises</li>
                                <li className="text-green-600">See all &gt;</li>
                            </ul>
                        </div>

                        {[
                            {
                                title: "Adventure & Active",
                                places: [
                                    "Hiking & Trekking",
                                    "Mountain Climbing",
                                    "Water Sports",
                                    "Cycling Tours",
                                    "Safari Adventures",
                                    "Winter Sports",
                                    "Extreme Sports",
                                    "Camping",
                                    "Desert Expeditions",
                                ],
                            },
                            {
                                title: "Cultural Experiences",
                                places: [
                                    "Historical Tours",
                                    "Art & Architecture",
                                    "Food & Wine",
                                    "Local Festivals",
                                    "Traditional Crafts",
                                    "Religious Sites",
                                    "Indigenous Culture",
                                    "Language Learning",
                                    "Music & Dance",
                                ],
                            },
                            {
                                title: "Relaxation & Wellness",
                                places: [
                                    "Spa Retreats",
                                    "Beach Resorts",
                                    "Yoga & Meditation",
                                    "Hot Springs",
                                    "Nature Escapes",
                                    "Health & Wellness",
                                    "Luxury Stays",
                                    "Island Getaways",
                                    "Mountain Retreats",
                                ],
                            },
                            {
                                title: "Special Interest",
                                places: [
                                    "Photography Tours",
                                    "Wildlife Viewing",
                                    "Cooking Classes",
                                    "Wine Tasting",
                                    "Bird Watching",
                                    "Volunteer Travel",
                                    "Educational Tours",
                                    "Agricultural Tours",
                                    "Astronomy Tours",
                                ],
                            },
                            {
                                title: "Travel Style",
                                places: [
                                    "Luxury Travel",
                                    "Budget Travel",
                                    "Family Friendly",
                                    "Solo Travel",
                                    "Group Tours",
                                ],
                            },
                        ].map((section, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-lg mb-2">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1 text-gray-700">
                                    {section.places.map((place, i) => (
                                        <li key={i}>{place}</li>
                                    ))}
                                    <li className="text-green-600">
                                        See all &gt;
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
            <AppBar position="static" sx={{ backgroundColor: "white" }}>
                <Container maxWidth={false}>
                    <Toolbar disableGutters className="py-[15px] ">
                        <Box
                            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        >
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
                                        <ListSubheader
                                            component="div"
                                            id="nested-list-subheader"
                                        >
                                            <ArrowBackIosNewIcon
                                                onClick={handleCloseNavMenu}
                                            />
                                        </ListSubheader>
                                    }
                                >
                                    <Link href="client/my-custom-trip">
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
                                            <ArrowForwardIosIcon
                                                sx={{ height: "15px" }}
                                            />
                                        </Button>
                                    </Link>

                                    {pages.map((page, index) => (
                                        <div key={index}>
                                            <ListItemButton
                                                onClick={handleClick}
                                                sx={{
                                                    ml: 2,
                                                    mr: 2,
                                                    borderBottom:
                                                        ".1rem solid #dadada",
                                                }}
                                            >
                                                <ListItemText
                                                    primary={page.name}
                                                    primaryTypographyProps={{
                                                        fontWeight:
                                                            page.name ===
                                                            "Write a Review"
                                                                ? 400
                                                                : 600,
                                                    }}
                                                />
                                                {page?.children &&
                                                    (open ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    ))}
                                            </ListItemButton>
                                            {page?.children &&
                                                page?.children.map(
                                                    (item, index) => (
                                                        <Collapse
                                                            in={open}
                                                            timeout="auto"
                                                            unmountOnExit
                                                            key={index}
                                                        >
                                                            <List
                                                                component="div"
                                                                disablePadding
                                                            >
                                                                <ListItemButton
                                                                    sx={{
                                                                        pl: 0,
                                                                        ml: 5,
                                                                        mr: 2,
                                                                        borderBottom:
                                                                            ".1rem solid #dadada",
                                                                    }}
                                                                >
                                                                    <ListItemText
                                                                        primary={
                                                                            item.name
                                                                        }
                                                                    />
                                                                    {item?.children &&
                                                                        (open ? (
                                                                            <ExpandLess />
                                                                        ) : (
                                                                            <ExpandMore />
                                                                        ))}
                                                                </ListItemButton>
                                                                {item?.children &&
                                                                    item?.children.map(
                                                                        (
                                                                            i,
                                                                            index
                                                                        ) => (
                                                                            <Collapse
                                                                                in={
                                                                                    open
                                                                                }
                                                                                timeout="auto"
                                                                                unmountOnExit
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <List
                                                                                    component="div"
                                                                                    disablePadding
                                                                                >
                                                                                    <ListItemButton
                                                                                        sx={{
                                                                                            pl: 9,
                                                                                        }}
                                                                                    >
                                                                                        <ListItemText
                                                                                            primary={
                                                                                                i
                                                                                            }
                                                                                        />
                                                                                    </ListItemButton>
                                                                                </List>
                                                                            </Collapse>
                                                                        )
                                                                    )}
                                                            </List>
                                                        </Collapse>
                                                    )
                                                )}
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

                        <Box className="hidden md:flex flex-grow justify-center">
                            {pages.map((page, index) => (
                                <Button
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
                                            page.name === "Destinations" ||
                                            page.name === "Trip Themes & Styles"
                                                ? 600
                                                : 500,
                                        textTransform: "none",
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                            <Link href="client/my-custom-trip">
                                <Button
                                    // onClick={handleCloseNavMenu}
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
                                    <ArrowForwardIosIcon
                                        sx={{ height: "15px" }}
                                    />
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default HeaderClient;
