import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getMyCustomTrip } from "../hook";

const MyCustomTrip = () => {
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Main Country",
            dataIndex: "mainCountry",
            key: "mainCountry",
        },
        {
            title: "Additional Countries",
            dataIndex: "additionalCountries",
            key: "additionalCountries",
        },
        {
            title: "Companions Ages",
            dataIndex: "companionsAges",
            key: "companionsAges",
        },
        {
            title: "Trip Type",
            dataIndex: "tripType",
            key: "tripType",
        },
        {
            title: "Lodging Type",
            dataIndex: "lodgingType",
            key: "lodgingType",
        },
        {
            title: "Budget Per Person",
            dataIndex: "budgetPerPerson",
            key: "budgetPerPerson",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
    ];
    const getData = async () => {
        const res: any = await getMyCustomTrip();
        const stateCustomer = res.data.content.map((item: any) => ({
            ...item,
            key: item.id,
        }));

        setDataSource(stateCustomer);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div style={{ width: "100%", overflow: "auto", height: "100%" }}>
            <div className="text-2xl font-bold mb-4"> Danh sách khách hàng</div>
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: 2000 }}
            />
        </div>
    );
};

export default MyCustomTrip;
