import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef, InputRef, TableProps } from "antd";
import { Button, Form, Input, Modal } from "antd";
import TableTodo from "../../components/TableTodo";
import { postStyles } from "../hook/themeStyle";

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
    file: any;
}

type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

const ThemeStyle: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: "0",
            name: "Edward King 0",
            file: "32",
        },
        {
            key: "1",
            name: "Edward King 1",
            file: "32",
        },
    ]);

    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
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
            width: "30%",
            editable: true,
        },
        {
            title: "file",
            dataIndex: "file",
            render: (_, record) => (
                <Input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const newData = [...dataSource];
                            const index = newData.findIndex(
                                (item) => item.key === record.key
                            );
                            newData[index] = { ...record, file: file };
                            setDataSource(newData);
                        }
                    }}
                />
            ),
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div
                        onClick={() => {
                            Modal.confirm({
                                title: "Sure to delete?",
                                onOk: () => handleDelete(record.key),
                            });
                        }}
                    >
                        Delete
                    </div>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            name: "Vui lòng nhập",
            file: "Vui lòng nhập",
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
        const res = await postStyles({
            name: row.name,
            file: row.file,
        });
        console.log("🚀 ~ handleSave ~ res:", res);
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

    return (
        <div>
            <div>Themes & Style</div>
            <Button
                onClick={handleAdd}
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

export default ThemeStyle;
