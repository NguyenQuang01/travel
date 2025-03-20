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

    const handleClick = () => {
        setOpen(!open);
    };
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: "white" }}>
                <Container maxWidth={false}>
                    <Toolbar disableGutters className="py-[15px] ">
                        <Box
                            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
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
                            {/* {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            sx={{
                                                textAlign: "center",
                                                color: "black",
                                            }}
                                        >
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))} */}
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
                                    <Button
                                        onClick={handleCloseNavMenu}
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
                                    onClick={handleCloseNavMenu}
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
                            <Button
                                onClick={handleCloseNavMenu}
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
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default HeaderClient;
