import React from 'react'
import ContainerAll from 'moduls/container/all'
import { useState } from 'react'
import { Button, Card, message, Pagination, Tooltip, Popconfirm, Spin, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PaperClipOutlined } from "@ant-design/icons";
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'
import Content from './content'
import axios from 'axios'
import { useEffect } from 'react'
const { Meta } = Card;
import { truncate } from 'lodash'
import { useNavigate } from 'react-router-dom'


export const types = [
    {
        id: 1,
        label: 'Katta loyiha',
        value: 1
    },
    {
        id: 2,
        label: 'Kichik loyiha',
        value: 2
    }
]

const index = () => {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0)
    const queryClient = useQueryClient()

    const [contentModal, setContentModal] = useState({
        isOpen: false, data: null
    })

    // const [service, setService] = useState([])

    // const getService = async () => {
    //     const data = await axios.get("http://192.168.1.195:5055/services/all")
    //     setService(data.data)
    // }
    const getLength = async () => {
        const data = await axios.get("http://192.168.1.195:5055/company-details/length")
        setTotal(data?.data?.projects)
    }

    useEffect(() => {
        // getService()
        getLength()
    }, [])

    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/projects/delete/${id}`,
            method: "delete",
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["projects"] });
                message.success("Project o'chirib yuborildi");
            },
            onError: () => {
                message.error("Project o'chirilmadi...!")
            }
        })
    };

    const onChange = (page) => {
        setCurrent(page);
    };

    const cancel = (e) => {
        message.error("Ushbu ma'lumot o'chirilmadi");
    };

    return (
        <ContainerAll
            url={"/projects/all"}
            queryKey={"projects"}
            params={{
                take: 5,
                offset: current
            }}
        >
            {({ items, isLoading, meta }) => {

                return (
                    <div>
                        <div className="d-flex justify-end my-3">
                            <Tooltip placement='bottom' title={"Yangi proyekt qo'shish"}>
                                <Button type='primary' onClick={() => navigate("/projects-create")}>
                                    Add Projects
                                </Button>
                            </Tooltip>
                            <Content {...{ contentModal, setContentModal }} />
                        </div>
                        <div className="
                        my-4 gap-4 overflow-y-scroll 
                        h-[70vh] d-flex justify-center 
                        items-center flex-wrap w-[95%]"
                        >
                            {
                                items ? items.map(item => {
                                    let prsTitle = JSON.parse(item.title)
                                    let prsDesc = JSON.parse(item.desc)
                                    return (
                                        <Card
                                            key={item.id}
                                            style={{
                                                width: 300,
                                            }}
                                            cover={
                                                <img
                                                    alt="example"
                                                    src={`http://192.168.1.195:5055/projects/${item.image}`}
                                                />
                                            }
                                            actions={[
                                                <EditOutlined key="edit" onClick={() => navigate(`/projects-update/${item.id}`)} />,
                                                <Popconfirm
                                                    placement="topRight"
                                                    title={"O'chirish"}
                                                    description={"O'chirishni xoxlaysizmi?"}
                                                    onConfirm={() => deleteConfirm(item.id)}
                                                    onCancel={cancel}
                                                    okText="Ha"
                                                    cancelText="Yo'q"
                                                >
                                                    <DeleteOutlined
                                                        key={"delete"}
                                                        className="text-red-500 cursor-pointer text-lg"
                                                    />
                                                </Popconfirm>,
                                                <PaperClipOutlined
                                                    key="content"
                                                    onClick={() => setContentModal({ isOpen: true, data: item })}
                                                />
                                            ]}
                                        >
                                            <Meta
                                                title={prsTitle?.uz}
                                                description={truncate(prsDesc?.uz,
                                                    { length: 110, omission: "..." })
                                                }
                                            />
                                        </Card>

                                    )
                                }) : <Space size="middle">
                                    <Spin tip="Loading" size="large" />
                                </Space>
                            }
                        </div>
                        <div className="my-2 mx-4 float-right">
                            <Pagination current={current} pageSize={5} onChange={onChange} total={total} />
                        </div>
                    </div>
                )
            }}
        </ContainerAll>
    )
}

export default index