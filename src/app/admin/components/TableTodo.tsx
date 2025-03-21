import { Table } from "antd";
import React from "react";
import type { TableProps } from "antd";

interface DataType {
    key: React.Key;
    name: string;
    file?: string;
}
type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;
interface PropsType {
    dataSource: DataType[];
    components: {
        body: {
            row: any;
            cell: any;
        };
    };
    columns: any[];
}
const TableTodo = (props: PropsType) => {
    const { components, dataSource, columns } = props;
    return (
        <div>
            <Table<DataType>
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
        </div>
    );
};

export default TableTodo;
