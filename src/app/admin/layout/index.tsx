"use client";
import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
const { Content } = Layout;
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
    {
        label: (
            <Link href="/admin/design-my-trip" replace>
                Design my trip
            </Link>
        ),
        key: "my-trip",
    },
    {
        key: "tourism",
        label: (
            <Link href="/admin/tourism" replace>
                Tourism
            </Link>
        ),
    },
    {
      key: "trip-request",
      label: (
        <Link href="/admin/trip-request" replace>
          Trip Request
        </Link>
      ),
    },
    {
      key: "tour-reservation",
      label: (
        <Link href="/admin/tour-reservation" replace>
          Tour Reservation
        </Link>
      ),
    },
    {
      key: "style",
      label: (
        <Link href="/admin/style" replace>
          Style
        </Link>
      ),
    },
    {
      key: "type",
      label: (
        <Link href="/admin/type" replace>
          Type
        </Link>
      ),
    },
    {
      key: "destination",
      label: (
        <Link href="/admin/destination" replace>
          Destination
        </Link>
      ),
    },
    {
      key: "continent",
      label: (
        <Link href="/admin/continent" replace>
          Continent
        </Link>
      ),
    },
];
const LayoutAdmin = ({ children }: any) => {
    const [current, setCurrent] = useState("");

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                />
                ;
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
