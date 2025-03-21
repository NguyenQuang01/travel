"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Button, Form, Input, Modal } from "antd";
import TableTodo from "../../components/TableTodo";
import {
    postTreding,
    getTreding,
    putTreding,
    deleteTreding,
} from "../hook/treding";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingInlineEnd: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface DataType {
    key: React.Key;
    name: string;
}

type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

const Treding: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [count, setCount] = useState(2);
    const [newData, setNewData] = useState({
        name: "",
    });
    const fetchData = async () => {
        const res: any = await getTreding();
        res.data = res.data.map((item: any) => ({ ...item, key: item.id }));
        setDataSource(res.data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleDelete = async (key: React.Key) => {
        await deleteTreding(key as string | number);
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & {
        editable?: boolean;
        dataIndex: string;
    })[] = [
        {
            title: "name",
            dataIndex: "name",
            width: "85%",
            editable: true,
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_: any, record: { key: React.Key }) =>
                dataSource.length >= 1 ? (
                    <Button onClick={() => handleDelete(record.key)}>
                        Delete
                    </Button>
                ) : null,
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        await postTreding({ name: newData.name });
        fetchData();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            name: "Vui lòng nhập",
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = async (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        await putTreding({
            id: row.key as string | number,
            name: row.name,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewData({ ...newData, name: e.target.value });
    };
    return (
        <div>
            <div>Trading</div>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div style={{ display: "flex" }}>
                    <div className="mr-2">Name:</div>
                    <Input onChange={handleInput} />
                </div>
            </Modal>
            <Button
                onClick={showModal}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                Add a row
            </Button>
            <TableTodo
                components={components}
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
        </div>
    );
};

export default Treding;
